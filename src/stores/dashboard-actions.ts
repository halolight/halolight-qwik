import { $ } from "@builder.io/qwik";
import type { DashboardWidget, DashboardLayout, ResponsiveLayouts } from "~/types/dashboard";
import type { DashboardStore } from "./dashboard";
import { DEFAULT_WIDGETS, DEFAULT_LAYOUTS, WIDGET_TYPES } from "~/types/dashboard";
import { dashboardUtils } from "./dashboard";

/**
 * 仪表盘操作函数 - 使用QRL包装
 */
export const dashboardActions = {
  // 添加组件
  addWidget: $((store: DashboardStore, type: string, title?: string) => {
    try {
      const widgetType = WIDGET_TYPES[type as keyof typeof WIDGET_TYPES];
      if (!widgetType) {
        throw new Error(`Unknown widget type: ${type}`);
      }

      const newWidget: DashboardWidget = {
        id: dashboardUtils.generateId(),
        type: type as any,
        title: title || widgetType.name,
        config: {},
      };

      const position = dashboardUtils.getNextPosition(store.layouts);
      const newLayout: DashboardLayout = {
        i: newWidget.id,
        x: position.x,
        y: position.y,
        w: widgetType.defaultSize.w,
        h: widgetType.defaultSize.h,
        minW: widgetType.minW,
        minH: widgetType.minH,
      };

      store.widgets = [...store.widgets, newWidget];

      // 为所有断点添加布局
      store.layouts = {
        lg: [...store.layouts.lg, newLayout],
        md: [...store.layouts.md, newLayout],
        sm: [...store.layouts.sm, newLayout],
        xs: [...store.layouts.xs, newLayout],
      };

      dashboardUtils.saveLayout(store.widgets, store.layouts);
    } catch (error) {
      store.error = error instanceof Error ? error.message : "添加组件失败";
      console.error("Failed to add widget:", error);
    }
  }),

  // 移除组件
  removeWidget: $((store: DashboardStore, id: string) => {
    store.widgets = store.widgets.filter((widget: DashboardWidget) => widget.id !== id);

    // 从所有断点移除布局
    store.layouts = {
      lg: store.layouts.lg.filter((item: DashboardLayout) => item.i !== id),
      md: store.layouts.md.filter((item: DashboardLayout) => item.i !== id),
      sm: store.layouts.sm.filter((item: DashboardLayout) => item.i !== id),
      xs: store.layouts.xs.filter((item: DashboardLayout) => item.i !== id),
    };

    dashboardUtils.saveLayout(store.widgets, store.layouts);
  }),

  // 更新组件
  updateWidget: $((store: DashboardStore, id: string, updates: Partial<DashboardWidget>) => {
    store.widgets = store.widgets.map((widget: DashboardWidget) =>
      widget.id === id ? { ...widget, ...updates } : widget,
    );
    dashboardUtils.saveLayout(store.widgets, store.layouts);
  }),

  // 更新布局
  updateLayouts: $((store: DashboardStore, layouts: Partial<ResponsiveLayouts>) => {
    store.layouts = { ...store.layouts, ...layouts };
    dashboardUtils.saveLayout(store.widgets, store.layouts);
  }),

  // 设置编辑模式
  setEditing: $((store: DashboardStore, editing: boolean) => {
    store.isEditing = editing;
  }),

  // 重置布局
  resetLayout: $((store: DashboardStore) => {
    if (confirm("确定要重置仪表盘布局吗？")) {
      store.widgets = DEFAULT_WIDGETS;
      store.layouts = DEFAULT_LAYOUTS;
      dashboardUtils.saveLayout(store.widgets, store.layouts);
      store.isEditing = false;
    }
  }),

  // 加载布局
  loadLayout: $((store: DashboardStore) => {
    const saved = dashboardUtils.loadSavedLayout();
    if (saved) {
      store.widgets = saved.widgets;
      store.layouts = saved.layouts;
    }
  }),
};