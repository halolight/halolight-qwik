import { component$ } from "@builder.io/qwik";
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
  const registerAction = useRegisterAction();

  return (
    <div class="space-y-6">
      <div>
        <p class="section-title mb-2">创建组织</p>
        <h1 class="text-2xl font-semibold text-foreground">注册 HaloLight</h1>
        <p class="text-sm text-muted-foreground">
          注册流程遵循统一 RBAC 与组织规范。
        </p>
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
    </div>
  );
});

export const head: DocumentHead = {
  title: "注册 · HaloLight Qwik",
};
