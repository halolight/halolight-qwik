import { component$, $, useSignal } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import {
  AUTH_TOKEN_COOKIE,
  AUTH_USER_COOKIE,
  serializeUser,
} from "~/lib/session";
import type { AuthUser } from "~/stores/auth";

type AuthResult = {
  success: boolean;
  message: string;
  token?: string;
  user?: AuthUser;
};

export const useLoginAction = routeAction$<AuthResult>(async (data, event) => {
  const email = (data.email as string | undefined)?.trim();
  const password = (data.password as string | undefined) ?? "";
  const remember = data.remember === "on";

  if (!email || !password) {
    return {
      success: false,
      message: "请输入邮箱和密码",
    };
  }

  try {
    const response = await fetch(new URL("/api/auth/login", event.url.origin).toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, remember }),
    });
    const payload = (await response.json()) as AuthResult;
    if (!response.ok) {
      return {
        success: false,
        message: payload.message ?? "凭证校验失败",
      };
    }

    if (!payload.token || !payload.user) {
      return {
        success: false,
        message: "服务器响应缺失字段",
      };
    }

    event.cookie.set(AUTH_TOKEN_COOKIE, payload.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    event.cookie.set(AUTH_USER_COOKIE, serializeUser(payload.user), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    throw event.redirect(302, "/");
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "登录失败",
    };
  }
});

export default component$(() => {
  const loginAction = useLoginAction();
  const emailRef = useSignal<HTMLInputElement>();
  const passwordRef = useSignal<HTMLInputElement>();
  const showPassword = useSignal(false);
  const rememberMe = useSignal(false);

  const demoEmail =
    import.meta.env.VITE_DEMO_EMAIL ?? "admin@halolight.h7ml.cn";
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD ?? "123456";

  const fillDemo = $(() => {
    if (demoEmail && demoPassword) {
      if (emailRef.value) {
        emailRef.value.value = demoEmail;
      }
      if (passwordRef.value) {
        passwordRef.value.value = demoPassword;
      }
    }
  });

  const SOCIAL_LINKS = {
    github: "https://github.com/halolight/halolight-qwik",
    google: "https://halolight-docs.h7ml.cn",
    wechat: "https://github.com/halolight",
  };

  const togglePasswordVisibility = $(() => {
    showPassword.value = !showPassword.value;
  });

  return (
    <div class="w-full max-w-md space-y-6">
      {/* Mobile header */}
      <div class="mb-5 lg:hidden text-center">
        <div class="inline-flex items-center gap-3 mb-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span class="text-xl font-bold text-white">Admin Pro</span>
        </div>
        <p class="text-sm text-muted-foreground">欢迎回来，请登录您的账户</p>
      </div>

      {/* Card with gradient border */}
      <div class="border border-border/50 shadow-2xl backdrop-blur-xl bg-card/80 rounded-2xl overflow-hidden">
        {/* Gradient top border */}
        <div class="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

        {/* Card Header */}
        <div class="space-y-1 text-center pb-3 sm:pb-5 pt-4 sm:pt-7 px-4 sm:px-6">
          <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            登录账户
          </h2>
          <p class="text-xs sm:text-sm mt-2 text-muted-foreground">
            输入您的邮箱和密码登录
          </p>
        </div>

        {/* Card Content */}
        <div class="space-y-3 sm:space-y-4 px-4 sm:px-6">
          {/* Social Login Buttons */}
          <div class="grid grid-cols-3 gap-2 sm:gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              class="h-11 sm:h-12 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl flex items-center justify-center group"
            >
              <svg class="h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.google}
              target="_blank"
              rel="noopener noreferrer"
              class="h-11 sm:h-12 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl flex items-center justify-center group"
            >
              <svg class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.wechat}
              target="_blank"
              rel="noopener noreferrer"
              class="h-11 sm:h-12 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl flex items-center justify-center group"
            >
              <svg class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </a>
          </div>

          {/* Separator */}
          <div class="relative py-3">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-border"></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-3 text-muted-foreground font-medium">
                或使用邮箱登录
              </span>
            </div>
          </div>

          {/* Login Form */}
          <Form action={loginAction} class="space-y-3 sm:space-y-4">
            {/* Error Message */}
            {loginAction.value && !loginAction.value.success && (
              <div class="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm">
                {loginAction.value.message}
              </div>
            )}

            {/* Email Field */}
            <div class="space-y-2">
              <label class="text-xs font-medium text-muted-foreground">邮箱地址</label>
              <div class="relative group">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  required
                  class="w-full pl-10 h-12 text-sm border border-border/50 focus:border-primary/50 rounded-xl transition-all bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.h7ml.cn"
                />
              </div>
            </div>

            {/* Password Field */}
            <div class="space-y-2">
              <label class="text-xs font-medium text-muted-foreground">密码</label>
              <div class="relative group">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input
                  ref={passwordRef}
                  name="password"
                  type={showPassword.value ? "text" : "password"}
                  required
                  class="w-full pl-10 pr-10 h-12 text-sm border border-border/50 focus:border-primary/50 rounded-xl transition-all bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick$={togglePasswordVisibility}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword.value ? (
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  ) : (
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div class="flex items-center justify-between text-xs sm:text-sm">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="remember"
                  checked={rememberMe.value}
                  onChange$={(e) => {
                    rememberMe.value = (e.target as HTMLInputElement).checked;
                  }}
                  class="rounded border-gray-300 w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="text-muted-foreground group-hover:text-foreground transition-colors">记住我</span>
              </label>
              <Link
                href="/forgot-password"
                class="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                忘记密码？
              </Link>
            </div>

            {/* Demo Account Button */}
            {demoEmail && demoPassword && (
              <div class="flex items-center gap-2 py-2">
                <div class="flex-1 h-px bg-border/50" />
                <button
                  type="button"
                  class="h-7 px-3 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick$={fillDemo}
                >
                  <svg class="h-3 w-3 mr-1.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  测试账号
                </button>
                <div class="flex-1 h-px bg-border/50" />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              class="w-full h-12 text-sm font-medium bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white disabled:opacity-50"
              disabled={loginAction.isRunning}
            >
              {loginAction.isRunning ? (
                <>
                  <svg class="mr-2 h-4 w-4 animate-spin inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  登录中...
                </>
              ) : (
                <>
                  登录
                  <span class="ml-2 inline-block animate-arrow-slide">→</span>
                </>
              )}
            </button>
          </Form>
        </div>

        {/* Card Footer */}
        <div class="flex flex-col space-y-3 sm:space-y-4 px-4 sm:px-6 pb-5 sm:pb-8 pt-2">
          <div class="relative w-full">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-border"></div>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-muted-foreground text-center">
            还没有账户？{" "}
            <Link href="/register" class="text-primary hover:text-primary/80 font-semibold transition-colors">
              立即注册
            </Link>
          </p>
          <p class="text-xs sm:text-sm text-muted-foreground/70 text-center leading-relaxed">
            阅读我们的{" "}
            <Link
              href="/terms"
              class="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              服务条款
            </Link>{" "}
            和{" "}
            <Link
              href="/privacy"
              class="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              隐私政策
            </Link>{" "}
            了解更多信息。
          </p>
          {import.meta.env.VITE_SHOW_DEMO_HINT === "true" && (
            <p class="text-xs text-muted-foreground/60 text-center leading-relaxed">
              测试账号请点击上方"测试账号"按钮自动填充
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "登录 · HaloLight Qwik",
};
