import {
  type DashboardWidget,
  type ResponsiveLayouts,
  DEFAULT_WIDGETS,
  DEFAULT_LAYOUTS,
} from "~/types/dashboard";

/**
 * 仪表盘状态管理 - 纯数据结构，不包含方法
 */
export interface DashboardStore {
  // 状态
  widgets: DashboardWidget[];
  layouts: ResponsiveLayouts;
  isEditing: boolean;
  isLoading: boolean;
  error?: string;
}

/**
 * 创建仪表盘Store - 只包含状态数据
 */
export const createDashboardStore = (): DashboardStore => {
  // 从localStorage加载保存的布局
  const loadSavedLayout = (): {
    widgets: DashboardWidget[];
    layouts: ResponsiveLayouts;
  } | null => {
    if (typeof window === "undefined") return null;

    try {
      const saved = localStorage.getItem("halolight-dashboard-layout");
      if (saved) {
        const parsed = JSON.parse(saved);
        // 验证数据结构
        if (parsed.widgets && parsed.layouts) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Failed to load saved dashboard layout:", error);
    }
    return null;
  };

  // 初始化状态
  const savedLayout = loadSavedLayout();
  const initialWidgets = savedLayout?.widgets || DEFAULT_WIDGETS;
  const initialLayouts = savedLayout?.layouts || DEFAULT_LAYOUTS;

  return {
    // 状态
    widgets: initialWidgets,
    layouts: initialLayouts,
    isEditing: false,
    isLoading: false,
    error: undefined,
  };
};

/**
 * 仪表盘工具函数 - 在组件内部使用
 */
export const dashboardUtils = {
  // 生成唯一ID
  generateId: (): string => {
    return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // 获取下一个可用位置
  getNextPosition: (layouts: ResponsiveLayouts): { x: number; y: number } => {
    const lgLayouts = layouts.lg;
    if (lgLayouts.length === 0) return { x: 0, y: 0 };

    // 找到最底部的组件
    const maxY = Math.max(...lgLayouts.map((item) => item.y + item.h));
    return { x: 0, y: maxY };
  },

  // 保存布局到localStorage
  saveLayout: (widgets: DashboardWidget[], layouts: ResponsiveLayouts) => {
    if (typeof window === "undefined") return;

    try {
      const data = {
        widgets,
        layouts,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("halolight-dashboard-layout", JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to save dashboard layout:", error);
    }
  },

  // 从localStorage加载布局
  loadSavedLayout: (): { widgets: DashboardWidget[]; layouts: ResponsiveLayouts } | null => {
    if (typeof window === "undefined") return null;

    try {
      const saved = localStorage.getItem("halolight-dashboard-layout");
      if (saved) {
        const parsed = JSON.parse(saved);
        // 验证数据结构
        if (parsed.widgets && parsed.layouts) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Failed to load saved dashboard layout:", error);
    }
    return null;
  },
};
