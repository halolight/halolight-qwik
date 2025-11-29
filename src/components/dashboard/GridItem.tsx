import { component$, $, useSignal } from "@builder.io/qwik";
import { createDashboardStore } from "~/stores/dashboard";
import { dashboardActions } from "~/stores/dashboard-actions";
import type { DashboardWidget, DashboardLayout } from "~/types/dashboard";
import { StatsWidget } from "../widgets/StatsWidget";
import { ChartWidget } from "../widgets/ChartWidget";
import { EChartsWidget } from "../widgets/EChartsWidget";

interface GridItemProps {
  widget: DashboardWidget;
  layout?: DashboardLayout;
  isEditing?: boolean;
}

/**
 * 网格项组件
 */
export const GridItem = component$<GridItemProps>(
  ({ widget, layout, isEditing = false }) => {
    const store = useSignal(createDashboardStore());

    // 渲染组件内容
    const renderWidgetContent = () => {
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

    // 移除组件
    const removeWidget = $(() => {
      if (confirm(`确定要删除"${widget.title}"组件吗？`)) {
        dashboardActions.removeWidget(store.value, widget.id);
      }
    });

    return (
      <div
        class={`
        grid-stack-item
        bg-white dark:bg-gray-800
        rounded-lg shadow-sm border border-gray-200 dark:border-gray-700
        overflow-hidden
        transition-all duration-200
        ${isEditing ? "hover:shadow-md hover:border-blue-300" : ""}
      `}
        data-gs-id={widget.id}
        data-gs-x={layout?.x ?? 0}
        data-gs-y={layout?.y ?? 0}
        data-gs-w={layout?.w ?? 3}
        data-gs-h={layout?.h ?? 2}
        data-gs-min-w={layout?.minW ?? 2}
        data-gs-min-h={layout?.minH ?? 2}
        data-gs-max-w={layout?.maxW}
        data-gs-max-h={layout?.maxH}
      >
        {/* 拖拽手柄和标题栏 */}
        <div class="grid-stack-item-header">
          <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              {isEditing && (
                <div class="grid-item-drag-handle cursor-move text-gray-400 hover:text-gray-600">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              )}
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {widget.title}
              </h3>
            </div>

            <div class="flex items-center space-x-2">
              {/* 编辑模式下的操作按钮 */}
              {isEditing && (
                <button
                  class="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  onClick$={removeWidget}
                  title="删除组件"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div class="grid-stack-item-content p-4">{renderWidgetContent()}</div>

        {/* 编辑模式下的调整大小手柄 */}
        {isEditing && (
          <>
            <div class="grid-stack-item-handle grid-stack-item-handle-se" />
            <div class="grid-stack-item-handle grid-stack-item-handle-sw" />
            <div class="grid-stack-item-handle grid-stack-item-handle-ne" />
            <div class="grid-stack-item-handle grid-stack-item-handle-nw" />
          </>
        )}
      </div>
    );
  },
);
