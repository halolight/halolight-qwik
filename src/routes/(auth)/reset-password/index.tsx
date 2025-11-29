import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  type DocumentHead,
} from "@builder.io/qwik-city";

type ResetFormResult = {
  success: boolean;
  message: string;
};

export const useResetAction = routeAction$<ResetFormResult>((data) => {
  const token = (data.token as string | undefined)?.trim();
  const password = (data.password as string | undefined) ?? "";
  const confirm = (data.confirm as string | undefined) ?? "";

  if (!token) {
    return { success: false, message: "重置令牌缺失" };
  }
  if (password.length < 8) {
    return { success: false, message: "密码至少 8 位" };
  }
  if (password !== confirm) {
    return { success: false, message: "两次输入不一致" };
  }

  return { success: true, message: "密码已更新，3 秒后可返回登录" };
});

export default component$(() => {
  const resetAction = useResetAction();

  return (
    <div class="space-y-6">
      <div>
        <p class="section-title mb-2">重置密码</p>
        <h1 class="text-2xl font-semibold text-foreground">设置新密码</h1>
        <p class="text-sm text-muted-foreground">
          输入邮件中的 token 并完成密码重置。
        </p>
      </div>

      <Form action={resetAction} class="space-y-4">
        <div>
          <label class="text-sm font-medium text-foreground">重置 Token</label>
          <input
            name="token"
            required
            class="mt-2 w-full rounded-2xl border border-border/70 bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="粘贴邮件中的 token"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-foreground">新密码</label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            class="mt-2 w-full rounded-2xl border border-border/70 bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-foreground">确认密码</label>
          <input
            name="confirm"
            type="password"
            required
            minLength={8}
            class="mt-2 w-full rounded-2xl border border-border/70 bg-transparent px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="再次输入密码"
          />
        </div>
        <button
          type="submit"
          class="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          disabled={resetAction.isRunning}
        >
          {resetAction.isRunning ? "提交中..." : "更新密码"}
        </button>
      </Form>

      {resetAction.value && (
        <div
          class={[
            "rounded-2xl px-4 py-3 text-sm",
            resetAction.value.success
              ? "bg-success/15 text-success"
              : "bg-destructive/10 text-destructive",
          ]}
        >
          {resetAction.value.message}
        </div>
      )}

      <p class="text-center text-xs text-muted-foreground">
        完成后可{" "}
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
  title: "重置密码 · HaloLight Qwik",
};
