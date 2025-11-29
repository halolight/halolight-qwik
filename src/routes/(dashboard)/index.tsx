import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ConfigurableDashboard } from "~/components/dashboard/ConfigurableDashboard";
import { StatsWidget } from "~/components/widgets/StatsWidget";
import { ChartWidget } from "~/components/widgets/ChartWidget";
import { EChartsWidget } from "~/components/widgets/EChartsWidget";
import { createDashboardStore } from "~/stores/dashboard";
import { notificationTemplates } from "~/stores/notifications";
import type { DashboardWidget } from "~/types/dashboard";

/**
 * 渲染对应的组件
 */
const renderWidget = (widget: DashboardWidget) => {
  switch (widget.type) {
    case "stats":
      return <StatsWidget title={widget.title} type={widget.id as any} />;

    case "chart-line":
      return <ChartWidget title={widget.title} type="line" />;

    case "chart-bar":
      return <ChartWidget title={widget.title} type="bar" />;

    case "chart-pie":
      return <ChartWidget title={widget.title} type="pie" />;

    // ECharts 图表组件
    case "chart-line-echarts":
      return (
        <EChartsWidget
          title={widget.title}
          type="line"
          data={widget.config?.data}
        />
      );

    case "chart-bar-echarts":
      return (
        <EChartsWidget
          title={widget.title}
          type="bar"
          data={widget.config?.data}
        />
      );

    case "chart-pie-echarts":
      return (
        <EChartsWidget
          title={widget.title}
          type="pie"
          data={widget.config?.data}
        />
      );

    case "chart-scatter-echarts":
      return (
        <EChartsWidget
          title={widget.title}
          type="scatter"
          data={widget.config?.data}
        />
      );

    case "chart-radar-echarts":
      return (
        <EChartsWidget
          title={widget.title}
          type="radar"
          data={widget.config?.data}
        />
      );

    // TODO: 实现其他组件类型
    case "recent-users":
    case "notifications":
    case "tasks":
    case "calendar":
    case "quick-actions":
    default:
      return (
        <div class="h-full flex items-center justify-center text-gray-500">
          <div class="text-center">
            <div class="text-2xl mb-2">🚧</div>
            <div class="text-sm">{widget.type} 组件开发中</div>
          </div>
        </div>
      );
  }
};

export default component$(() => {
  const store = useSignal(createDashboardStore());

  // 演示通知系统
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // 延迟显示欢迎通知
    setTimeout(() => {
      const event = new CustomEvent("notification:show", {
        detail: notificationTemplates.success(
          "欢迎回来！",
          "您的仪表盘已加载完成",
          {
            duration: 3000,
          },
        ),
      });
      window.dispatchEvent(event);
    }, 1000);

    // 显示系统状态通知
    setTimeout(() => {
      const event = new CustomEvent("notification:show", {
        detail: notificationTemplates.info("系统状态", "所有服务运行正常", {
          duration: 4000,
        }),
      });
      window.dispatchEvent(event);
    }, 3000);
  });

  return (
    <div class="dashboard-page">
      <ConfigurableDashboard />

      {/* 自定义组件内容渲染 */}
      <div class="hidden">
        {store.value.widgets.map((widget) => (
          <div key={widget.id} id={`widget-content-${widget.id}`}>
            {renderWidget(widget)}
          </div>
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "HaloLight · Qwik Admin - 运营驾驶舱",
  meta: [
    {
      name: "description",
      content:
        "HaloLight Qwik 版本：可拖拽仪表盘、实时运营数据、智能分析驾驶舱。",
    },
  ],
};
