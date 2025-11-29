import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const settings = [
  {
    title: "品牌与域名",
    desc: "logo、品牌色、自定义域名与 CDN 绑定。",
    status: "已配置",
  },
  {
    title: "环境变量",
    desc: "VITE_API_URL、VITE_MOCK 等统一管理。",
    status: "3 项已生效",
  },
  {
    title: "通知策略",
    desc: "邮件、Slack、Webhook 多渠道通知。",
    status: "2 个渠道",
  },
];

const audit = [
  { actor: "Hailey", action: "更新 RBAC 策略", time: "08:15", result: "成功" },
  {
    actor: "Miguel",
    action: "修改环境变量 VITE_API_URL",
    time: "10:04",
    result: "成功",
  },
  {
    actor: "Aiko",
    action: "关闭 Mock 模式",
    time: "13:21",
    result: "失败 · 权限不足",
  },
];

export default component$(() => (
  <div class="space-y-6">
    <section class="glass-panel p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="section-title">系统设置</p>
          <h1 class="text-2xl font-semibold text-foreground">
            Workspace Settings
          </h1>
          <p class="text-sm text-muted-foreground">
            管理品牌、环境变量、通知与 RBAC，保持配置一致性。
          </p>
        </div>
        <button class="rounded-2xl border border-border/70 px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
          保存更改
        </button>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      {settings.map((item) => (
        <div key={item.title} class="glass-panel space-y-2 p-5">
          <p class="text-sm font-semibold text-foreground">{item.title}</p>
          <p class="text-xs text-muted-foreground">{item.desc}</p>
          <span class="text-xs text-success">{item.status}</span>
        </div>
      ))}
    </section>

    <section class="glass-panel p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="section-title">审计日志</p>
          <p class="text-sm text-muted-foreground">最近配置与权限变更记录。</p>
        </div>
        <button class="rounded-xl border border-border/70 px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
          导出
        </button>
      </div>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[520px] text-sm">
          <thead>
            <tr class="text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <th class="pb-3">操作者</th>
              <th class="pb-3">动作</th>
              <th class="pb-3">时间</th>
              <th class="pb-3">结果</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/60">
            {audit.map((log) => (
              <tr key={`${log.actor}-${log.time}`} class="text-sm">
                <td class="py-3 font-medium text-foreground">{log.actor}</td>
                <td class="py-3 text-muted-foreground">{log.action}</td>
                <td class="py-3 text-muted-foreground">{log.time}</td>
                <td class="py-3">
                  <span
                    class={[
                      "rounded-full px-3 py-1 text-xs font-medium",
                      log.result.startsWith("成功")
                        ? "bg-success/15 text-success"
                        : "bg-destructive/10 text-destructive",
                    ]}
                  >
                    {log.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
));

export const head: DocumentHead = {
  title: "系统设置 · HaloLight Qwik",
};
