import { component$, useStyles$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  type DocumentHead,
} from "@builder.io/qwik-city";

type RegisterResult = {
  success: boolean;
  message: string;
};

export const useRegisterAction = routeAction$<RegisterResult>((data) => {
  const company = (data.company as string | undefined)?.trim();
  const email = (data.email as string | undefined)?.trim();
  const password = (data.password as string | undefined) ?? "";

  if (!company || !email || !password) {
    return { success: false, message: "请填写所有字段" };
  }

  return {
    success: true,
    message: `${company} 已加入等待列表，我们会在 24h 内完成审批。`,
  };
});

export default component$(() => {
  useStyles$(`
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }

    @keyframes fade-in-left {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .animate-fade-in-left {
      animation: fade-in-left 0.5s ease-out forwards;
    }

    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in-up {
      animation: fade-in-up 0.5s ease-out forwards;
    }

    @keyframes scale-in {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }

    .animate-scale-in {
      animation: scale-in 0.5s ease-out forwards;
    }

    .hover-scale {
      transition: transform 0.2s ease;
    }

    .hover-scale:hover {
      transform: scale(1.1);
    }

    .info-card {
      transition: all 0.3s ease;
    }

    .info-card:hover {
      border-color: rgba(var(--primary-rgb), 0.2);
      background-color: rgba(var(--muted-rgb), 0.8);
    }
  `);

  const registerAction = useRegisterAction();

  // Read registration enabled status from environment variable (default: false)
  const registrationEnabled = import.meta.env.VITE_ENABLE_REGISTRATION === "true";

  const SOCIAL_LINKS = {
    github: "https://github.com/halolight/halolight-qwik",
    google: "https://halolight-docs.h7ml.cn",
    wechat: "https://github.com/halolight",
  };

  return (
    <div class="space-y-6">
      <div>
        <p class="section-title mb-2">创建组织</p>
        <h1 class="text-2xl font-semibold text-foreground">注册 HaloLight</h1>
        <p class="text-sm text-muted-foreground">
          注册流程遵循统一 RBAC 与组织规范。
        </p>
      </div>

      {!registrationEnabled ? (
        /* Registration Disabled UI */
        <div class="space-y-6 py-6 animate-fade-in">
          {/* Lock Icon with Rotating Border */}
          <div class="flex flex-col items-center justify-center space-y-4">
            <div class="relative animate-scale-in" style="animation-delay: 0.2s; animation-fill-mode: both;">
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                <svg
                  class="h-10 w-10 text-amber-600 dark:text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Lock"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 17v-2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="absolute -inset-2 rounded-full border-2 border-dashed border-amber-300/50 dark:border-amber-700/50 animate-spin-slow" />
            </div>

            <div class="space-y-2 text-center">
              <h3 class="text-xl font-semibold text-foreground sm:text-2xl">
                注册已关闭
              </h3>
              <p class="max-w-sm text-sm text-muted-foreground">
                系统管理员已暂时关闭新用户注册功能
              </p>
            </div>
          </div>

          {/* Information Cards */}
          <div class="space-y-3">
            {/* Contact Admin Card */}
            <div
              class="info-card flex items-start gap-3 rounded-lg border border-border/50 bg-muted/50 p-4 backdrop-blur-sm animate-fade-in-left"
              style="animation-delay: 0.3s; animation-fill-mode: both;"
            >
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <svg
                  class="h-4 w-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Mail"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium text-foreground">联系管理员</p>
                <p class="text-xs text-muted-foreground">
                  如需创建账号，请通过邮件联系系统管理员
                </p>
              </div>
            </div>

            {/* Already Have Account Card */}
            <div
              class="info-card flex items-start gap-3 rounded-lg border border-border/50 bg-muted/50 p-4 backdrop-blur-sm animate-fade-in-left"
              style="animation-delay: 0.4s; animation-fill-mode: both;"
            >
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <svg
                  class="h-4 w-4 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Phone"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium text-foreground">已有账号？</p>
                <p class="text-xs text-muted-foreground">
                  如果您已有账号，请直接登录使用系统功能
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Separator */}
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-border/50" />
            </div>
            <div class="relative flex justify-center">
              <span class="bg-background px-4 text-xs text-muted-foreground">
                感谢您的理解
              </span>
            </div>
          </div>

          {/* Gradient Return Button */}
          <div
            class="w-full space-y-3 animate-fade-in-up"
            style="animation-delay: 0.5s; animation-fill-mode: both;"
          >
            <Link href="/login" class="block w-full">
              <button
                type="button"
                class="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-700 hover:to-indigo-700"
              >
                <span class="inline-flex items-center gap-2">
                  <span>← 返回登录</span>
                </span>
              </button>
            </Link>
            <p class="text-center text-xs text-muted-foreground">使用现有账号登录系统</p>
          </div>
        </div>
      ) : (
        /* Original Registration Form */
        <>
          {/* Social Registration Buttons */}
          <div class="grid grid-cols-3 gap-2">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              class="h-11 border border-border/70 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl flex items-center justify-center group"
            >
              <svg class="h-5 w-5 hover-scale" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.google}
              target="_blank"
              rel="noopener noreferrer"
              class="h-11 border border-border/70 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl flex items-center justify-center group"
            >
              <svg class="h-5 w-5 hover-scale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.wechat}
              target="_blank"
              rel="noopener noreferrer"
              class="h-11 border border-border/70 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl flex items-center justify-center group"
            >
              <svg class="h-5 w-5 hover-scale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span class="bg-background px-3 text-muted-foreground font-medium">
                或使用邮箱注册
              </span>
            </div>
          </div>

          <Form action={registerAction} class="space-y-4">
            <div>
              <label class="text-sm font-medium text-foreground">公司 / 团队</label>
              <input
                name="company"
                required
                class="mt-2 w-full rounded-2xl border border-border/70 bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <label class="text-sm font-medium text-foreground">工作邮箱</label>
              <input
                name="email"
                type="email"
                required
                class="mt-2 w-full rounded-2xl border border-border/70 bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-foreground">设置密码</label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                class="mt-2 w-full rounded-2xl border border-border/70 bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="至少 8 位，包含数字与符号"
              />
            </div>
            <button
              type="submit"
              class="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
              disabled={registerAction.isRunning}
            >
              {registerAction.isRunning ? "创建中..." : "注册工作区"}
            </button>
          </Form>

          {registerAction.value && (
            <div
              class={[
                "rounded-2xl px-4 py-3 text-sm",
                registerAction.value.success
                  ? "bg-success/15 text-success"
                  : "bg-destructive/10 text-destructive",
              ]}
            >
              {registerAction.value.message}
            </div>
          )}

          <p class="text-center text-xs text-muted-foreground">
            已有账号？{" "}
            <Link
              href="/login"
              class="font-semibold text-primary underline-offset-2 hover:underline"
            >
              前往登录
            </Link>
          </p>
        </>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "注册 · HaloLight Qwik",
};
