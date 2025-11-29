import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ArrowUpIcon, UsersIcon } from "~/components/icons";

const journeys = [
  {
    name: "新客激活 · SaaS",
    stages: ["注册", "产品引导", "首单", "复购"],
    conversion: "38%",
    lift: "+6.2%",
    owner: "Growth",
  },
  {
    name: "企业线索 · ABM",
    stages: ["线索评分", "MQL", "Demo", "成交"],
    conversion: "24%",
    lift: "+3.9%",
    owner: "Marketing",
  },
  {
    name: "续约 · 风险预警",
    stages: ["低活跃预警", "CS 触达", "方案试用", "续约"],
    conversion: "71%",
    lift: "+4.1%",
    owner: "CSM",
  },
];

const touchpoints = [
  { label: "邮件触达", volume: "18.2K", ctr: "26%" },
  { label: "应用内 Banner", volume: "9.7K", ctr: "34%" },
  { label: "Webhook 触发", volume: "4.1K", ctr: "89%" },
  { label: "短信/WhatsApp", volume: "2.4K", ctr: "21%" },
];

export default component$(() => (
  <div class="space-y-6">
    <section class="glass-panel p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="section-title">客户旅程</p>
          <h1 class="text-2xl font-semibold text-foreground">
            Journey Orchestrator
          </h1>
          <p class="text-sm text-muted-foreground">
            可视化旅程阶段、触点与转化率，便于快速调整投放与自动化规则。
          </p>
        </div>
        <button class="rounded-2xl border border-border/70 px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
          新建旅程
        </button>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      {journeys.map((journey) => (
        <div key={journey.name} class="glass-panel space-y-3 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-foreground">
                {journey.name}
              </p>
              <p class="text-xs text-muted-foreground">
                Owner · {journey.owner}
              </p>
            </div>
            <UsersIcon class="text-primary" size={18} />
          </div>
          <div class="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {journey.stages.map((stage) => (
              <span key={stage} class="rounded-full bg-muted px-3 py-1">
                {stage}
              </span>
            ))}
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="font-semibold text-foreground">
              转化率 {journey.conversion}
            </span>
            <span class="inline-flex items-center gap-1 text-success">
              <ArrowUpIcon size={14} /> {journey.lift}
            </span>
          </div>
        </div>
      ))}
    </section>

    <section class="glass-panel p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="section-title">触点表现</p>
          <p class="text-sm text-muted-foreground">按渠道查看曝光与点击。</p>
        </div>
        <span class="text-xs text-muted-foreground">Mock 数据 · 演示</span>
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        {touchpoints.map((tp) => (
          <div key={tp.label} class="rounded-2xl border border-border/60 p-4">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-foreground">{tp.label}</p>
              <span class="text-xs text-muted-foreground">CTR {tp.ctr}</span>
            </div>
            <p class="mt-2 text-2xl font-bold text-foreground">{tp.volume}</p>
            <p class="text-xs text-muted-foreground">近 30 天触达量</p>
          </div>
        ))}
      </div>
    </section>
  </div>
));

export const head: DocumentHead = {
  title: "客户旅程 · HaloLight Qwik",
};
