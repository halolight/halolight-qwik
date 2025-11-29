import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  type DocumentHead,
} from "@builder.io/qwik-city";

type ResetResult = {
  success: boolean;
  message: string;
};

export const useForgotAction = routeAction$<ResetResult>((data) => {
  const email = (data.email as string | undefined)?.trim();

  if (!email) {
    return { success: false, message: "请输入邮箱" };
  }

  return {
    success: true,
    message: `${email} 的重置链接已发送（示例流程，不会真正发送邮件）。`,
  };
});

export default component$(() => {
  const forgotAction = useForgotAction();

  return (
    <div class="space-y-6">
      <div>
        <p class="section-title mb-2">忘记密码</p>
        <h1 class="text-2xl font-semibold text-foreground">重置您的密码</h1>
        <p class="text-sm text-muted-foreground">
          我们会向您的工作邮箱发送一步验证链接。
        </p>
      </div>

      <Form action={forgotAction} class="space-y-4">
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
        <button
          type="submit"
          class="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          disabled={forgotAction.isRunning}
        >
          {forgotAction.isRunning ? "发送中..." : "发送重置邮件"}
        </button>
      </Form>

      {forgotAction.value && (
        <div
          class={[
            "rounded-2xl px-4 py-3 text-sm",
            forgotAction.value.success
              ? "bg-success/15 text-success"
              : "bg-destructive/10 text-destructive",
          ]}
        >
          {forgotAction.value.message}
        </div>
      )}

      <p class="text-center text-xs text-muted-foreground">
        记起密码了？{" "}
        <Link
          href="/login"
          class="font-semibold text-primary underline-offset-2 hover:underline"
        >
          返回登录
        </Link>
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "忘记密码 · HaloLight Qwik",
};
