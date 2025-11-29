import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ShieldIcon } from "~/components/icons";

const incidents = [
  {
    time: "09:24",
    title: "异地高频登录 · 自动 MFA",
    channel: "Zero Trust",
    severity: "warning",
    detail: "组织 ID #2891，14 分钟 27 次失败，已触发多因子。",
  },
  {
    time: "11:08",
    title: "数据导出 · 财务总账",
    channel: "Audit Stream",
    severity: "info",
    detail: "审批链完成，脱敏报表已投递安全盘。",
  },
  {
    time: "16:17",
    title: "合规巡检 · CN-ISMS",
    channel: "Compliance",
    severity: "critical",
    detail: "12 项整改建议已闭环，证据包待复核。",
  },
];

const posture = [
  { label: "端点健康", value: "92%", trend: "+4.2%" },
  { label: "访问策略命中", value: "1,284", trend: "+6.7%" },
  { label: "恶意流量拦截", value: "37%", trend: "-3.1%" },
];

const severityClass = (level: string) => {
  switch (level) {
    case "critical":
      return "bg-destructive/15 text-destructive";
    case "warning":
      return "bg-warning/15 text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default component$(() => (
  <div class="space-y-6">
    <section class="glass-panel p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="section-title">安全中心</p>
          <h1 class="text-2xl font-semibold text-foreground">
            Security Control Tower
          </h1>
          <p class="text-sm text-muted-foreground">
            汇总身份、网络与合规事件，支持即时审计与封禁动作。
          </p>
        </div>
        <ShieldIcon class="text-primary" size={24} />
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      {posture.map((item) => (
        <div key={item.label} class="glass-panel space-y-2 p-5">
          <p class="text-sm text-muted-foreground">{item.label}</p>
          <p class="text-2xl font-bold text-foreground">{item.value}</p>
          <p class="text-xs text-success">{item.trend} · 近 30 天</p>
        </div>
      ))}
    </section>

    <section class="glass-panel p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="section-title">实时事件流</p>
          <p class="text-sm text-muted-foreground">优先级排序的安全事件。</p>
        </div>
        <button class="rounded-xl border border-border/70 px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
          导出 CSV
        </button>
      </div>
      <div class="mt-4 space-y-3">
        {incidents.map((incident) => (
          <div
            key={incident.title}
            class="rounded-2xl border border-border/60 p-4"
          >
            <div class="flex items-center justify-between text-xs text-muted-foreground">
              <span>{incident.time}</span>
              <span
                class={`rounded-full px-3 py-1 font-medium ${severityClass(incident.severity)}`}
              >
                {incident.channel}
              </span>
            </div>
            <p class="mt-2 text-sm font-semibold text-foreground">
              {incident.title}
            </p>
            <p class="text-xs text-muted-foreground">{incident.detail}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
));

export const head: DocumentHead = {
  title: "安全中心 · HaloLight Qwik",
};
