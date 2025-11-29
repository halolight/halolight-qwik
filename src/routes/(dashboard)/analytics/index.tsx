import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { EChartsWidget } from "~/components/widgets/EChartsWidget";
import {
  lineChartData,
  barChartData,
  pieChartData,
  scatterData,
  radarData,
  salesTrendData,
  multiBarData,
} from "~/lib/mock/echarts-data";

export default component$(() => {
  return (
    <div class="space-y-8">
      <section class="glass-panel p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="section-title mb-1">数据可视化</p>
            <h1 class="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
              ECharts 图表展示
            </h1>
            <p class="text-sm text-muted-foreground">
              基于 ECharts 的强大数据可视化组件
            </p>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div class="glass-panel p-6">
          <h3 class="text-lg font-semibold mb-4 text-foreground">
            销售趋势（折线图）
          </h3>
          <EChartsWidget
            title="月度销售趋势"
            type="line"
            data={lineChartData}
            height={300}
          />
        </div>

        <div class="glass-panel p-6">
          <h3 class="text-lg font-semibold mb-4 text-foreground">
            产品销量（柱状图）
          </h3>
          <EChartsWidget
            title="产品销量对比"
            type="bar"
            data={barChartData}
            height={300}
          />
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div class="glass-panel p-6">
          <h3 class="text-lg font-semibold mb-4 text-foreground">
            访问来源（饼图）
          </h3>
          <EChartsWidget
            title="流量来源分析"
            type="pie"
            data={pieChartData}
            height={300}
          />
        </div>

        <div class="glass-panel p-6">
          <h3 class="text-lg font-semibold mb-4 text-foreground">
            数据分布（散点图）
          </h3>
          <EChartsWidget
            title="数据相关性分析"
            type="scatter"
            data={scatterData}
            height={300}
          />
        </div>
      </section>

      <section class="glass-panel p-6">
        <h3 class="text-lg font-semibold mb-4 text-foreground">
          多维度分析（雷达图）
        </h3>
        <EChartsWidget
          title="部门绩效雷达图"
          type="radar"
          data={radarData}
          height={400}
        />
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div class="glass-panel p-6">
          <h3 class="text-lg font-semibold mb-4 text-foreground">复杂折线图</h3>
          <EChartsWidget
            title="多系列销售趋势"
            type="line"
            data={salesTrendData}
            height={300}
          />
        </div>

        <div class="glass-panel p-6">
          <h3 class="text-lg font-semibold mb-4 text-foreground">混合图表</h3>
          <EChartsWidget
            title="蒸发量与降水量对比"
            type="bar"
            data={multiBarData}
            height={300}
          />
        </div>
      </section>

      <section class="glass-panel p-6">
        <h3 class="text-lg font-semibold mb-4 text-foreground">图表特性说明</h3>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div class="space-y-2">
            <h4 class="font-semibold text-foreground">🎨 主题适配</h4>
            <p class="text-sm text-muted-foreground">
              自动适配明暗主题，提供一致的视觉体验
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold text-foreground">📱 响应式设计</h4>
            <p class="text-sm text-muted-foreground">
              图表自动调整大小，完美适配各种屏幕尺寸
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold text-foreground">⚡ 高性能</h4>
            <p class="text-sm text-muted-foreground">
              基于 ECharts，支持大数据量和复杂交互
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold text-foreground">🔧 易于扩展</h4>
            <p class="text-sm text-muted-foreground">
              支持自定义配置，可轻松添加新的图表类型
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "数据分析 - HaloLight Qwik Admin",
  meta: [
    {
      name: "description",
      content:
        "基于 ECharts 的数据可视化分析页面，包含折线图、柱状图、饼图、散点图、雷达图等多种图表类型。",
    },
  ],
};
