import {
  component$,
  useVisibleTask$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { createDashboardStore } from "~/stores/dashboard";
import { dashboardActions } from "~/stores/dashboard-actions";
import { DashboardToolbar } from "./DashboardToolbar";
import { GridItem } from "./GridItem";
import { WidgetSelector } from "./WidgetSelector";

import "gridstack/dist/gridstack.min.css";

/**
 * 可拖拽仪表盘组件
 */
export const ConfigurableDashboard = component$(() => {
  const store = useSignal(createDashboardStore());
  const gridRef = useSignal<any | null>(null);
  const containerRef = useSignal<HTMLDivElement | null>(null);
  const isGridReady = useSignal(false);

  // 客户端初始化GridStack
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ cleanup }) => {
    if (typeof window === "undefined") return;

    try {
      const GridStack = (await import("gridstack")).GridStack;

      if (!containerRef.value) return;

      // 初始化GridStack
      const grid = GridStack.init(
        {
          float: false,
          cellHeight: "90px",
          margin: 12,
          column: 12,
          draggable: {
            handle: ".grid-item-drag-handle",
          },
          resizable: {
            handles: "se, sw, ne, nw",
          },
          acceptWidgets: true,
          removable: true,
          animate: true,
        },
        containerRef.value,
      );

      gridRef.value = grid as any;
      isGridReady.value = true;

      // 监听布局变化
      grid.on("change", (event, items) => {
        if (!items || items.length === 0) return;

        // 获取当前断点
        const getCurrentBreakpoint = (): string => {
          if (typeof window === "undefined") return "lg";

          const width = window.innerWidth;
          if (width >= 1200) return "lg";
          if (width >= 996) return "md";
          if (width >= 768) return "sm";
          return "xs";
        };

        // 更新当前断点的布局
        const currentBreakpoint = getCurrentBreakpoint();
        const newLayouts = items.map((item) => ({
          i: item.id as string,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        }));

        dashboardActions.updateLayouts(store.value, {
          [currentBreakpoint]: newLayouts,
        });
      });

      // 监听组件移除
      grid.on("removed", (event, items) => {
        if (!items || items.length === 0) return;

        items.forEach((item) => {
          const widgetId = item.id as string;
          dashboardActions.removeWidget(store.value, widgetId);
        });
      });

      // 清理函数
      cleanup(() => {
        if (gridRef.value) {
          (gridRef.value as any).destroy();
          gridRef.value = null;
        }
      });
    } catch (error) {
      console.error("Failed to initialize GridStack:", error);
      store.value.error = "初始化拖拽布局失败";
    }
  });

  // 监听编辑模式变化
  useTask$(({ track }) => {
    track(() => store.value.isEditing);
    track(() => isGridReady.value);

    if (!gridRef.value || !isGridReady.value) return;

    if (store.value.isEditing) {
      // 启用编辑模式
      (gridRef.value as any).enable();
      (gridRef.value as any).setStatic(false);
    } else {
      // 禁用编辑模式
      (gridRef.value as any).disable();
      (gridRef.value as any).setStatic(true);
    }
  });

  // 获取当前布局
  const getCurrentLayout = () => {
    const getCurrentBreakpoint = (): string => {
      if (typeof window === "undefined") return "lg";

      const width = window.innerWidth;
      if (width >= 1200) return "lg";
      if (width >= 996) return "md";
      if (width >= 768) return "sm";
      return "xs";
    };

    const breakpoint = getCurrentBreakpoint();
    return (
      store.value.layouts[breakpoint as keyof typeof store.value.layouts] ||
      store.value.layouts.lg
    );
  };

  return (
    <div class="dashboard-container">
      {/* 工具栏 */}
      <DashboardToolbar />

      {/* 组件选择器 */}
      {store.value.isEditing && <WidgetSelector />}

      {/* 错误提示 */}
      {store.value.error && (
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {store.value.error}
        </div>
      )}

      {/* 加载状态 */}
      {store.value.isLoading && (
        <div class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">加载中...</span>
        </div>
      )}

      {/* 网格容器 */}
      {!store.value.isLoading && (
        <div class="grid-stack-container">
          <div
            ref={(el) => (containerRef.value = el)}
            class="grid-stack"
            data-gs-column="12"
            data-gs-row="auto"
            data-gs-min-row="1"
          >
            {store.value.widgets.map((widget) => (
              <GridItem
                key={widget.id}
                widget={widget}
                layout={getCurrentLayout().find((l) => l.i === widget.id)}
                isEditing={store.value.isEditing}
              />
            ))}
          </div>
        </div>
      )}

      {/* 空状态 */}
      {!store.value.isLoading && store.value.widgets.length === 0 && (
        <div class="text-center py-12">
          <div class="text-gray-400 text-lg mb-2">暂无组件</div>
          <div class="text-gray-500 text-sm mb-4">
            {store.value.isEditing
              ? '点击上方"添加组件"按钮开始构建您的仪表盘'
              : "请启用编辑模式以添加组件"}
          </div>
          {!store.value.isEditing && (
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick$={() => dashboardActions.setEditing(store.value, true)}
            >
              启用编辑模式
            </button>
          )}
        </div>
      )}
    </div>
  );
});
