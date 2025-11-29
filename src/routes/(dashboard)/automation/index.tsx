import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ArrowUpIcon, SparkIcon } from "~/components/icons";

const workflows = [
  {
    name: "线索入库 · CRM 同步",
    trigger: "Webhook · leads.created",
    steps: 6,
    success: "99.3%",
    sla: "<1200ms",
    owner: "RevOps",
  },
  {
    name: "安全审计 · 证据包生成",
    trigger: "Scheduler · 02:00 UTC",
    steps: 4,
    success: "98.1%",
    sla: "<3s",
    owner: "SecOps",
  },
  {
    name: "逾期账单 · 智能催收",
    trigger: "Event Bus · invoice.overdue",
    steps: 5,
    success: "97.4%",
    sla: "<800ms",
    owner: "Finance",
  },
];

const templates = [
  {
    title: "入门 · 三步自动化",
    desc: "表单触发 + 条件分支 + 通知",
    tags: ["快速", "零代码"],
  },
  {
    title: "AI Copilot 升级",
    desc: "对话输出推送至数据湖与 Slack",
    tags: ["AI", "数据"],
  },
  {
    title: "安全告警降噪",
    desc: "高频告警聚合、打分与抑制",
    tags: ["SecOps", "风控"],
  },
];

export default component$(() => (
  <div class="space-y-6">
    <section class="glass-panel p-6">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="section-title">自动化编排</p>
          <h1 class="text-2xl font-semibold text-foreground">
            Automation Studio
          </h1>
          <p class="text-sm text-muted-foreground">
            统一编排事件、审批与通知，将多系统串联成可观测的工作流。
          </p>
        </div>
        <button class="rounded-2xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90">
          新建 Workflow
        </button>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workflows.map((flow) => (
        <div key={flow.name} class="glass-panel space-y-3 p-5">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-foreground">{flow.name}</p>
            <SparkIcon class="text-primary" size={16} />
          </div>
          <p class="text-xs text-muted-foreground">{flow.trigger}</p>
          <div class="flex items-center gap-3 text-xs text-muted-foreground">
            <span>步骤 {flow.steps}</span>
            <span>成功率 {flow.success}</span>
            <span>SLA {flow.sla}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="rounded-full bg-muted px-3 py-1 text-muted-foreground">
              Owner · {flow.owner}
            </span>
            <span class="inline-flex items-center gap-1 text-success">
              <ArrowUpIcon size={12} /> 健康
            </span>
          </div>
        </div>
      ))}
    </section>

    <section class="glass-panel p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="section-title">模板中心</p>
          <p class="text-sm text-muted-foreground">
            常用自动化场景，一键复制配置。
          </p>
        </div>
        <button class="rounded-xl border border-border/70 px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
          查看全部
        </button>
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-3">
        {templates.map((tpl) => (
          <div
            key={tpl.title}
            class="space-y-2 rounded-2xl border border-border/60 p-4"
          >
            <p class="text-sm font-semibold text-foreground">{tpl.title}</p>
            <p class="text-xs text-muted-foreground">{tpl.desc}</p>
            <div class="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
              {tpl.tags.map((tag) => (
                <span key={tag} class="rounded-full bg-muted px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
));

export const head: DocumentHead = {
  title: "自动化编排 · HaloLight Qwik",
};
