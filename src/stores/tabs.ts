/**
 * 页签状态管理
 */

export interface TabItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  closable?: boolean;
  isActive?: boolean;
  isDirty?: boolean; // 是否有未保存的更改
  timestamp?: number;
}

export interface TabState {
  tabs: TabItem[];
  activeTabId: string | null;
  maxTabs: number;
  showTabBar: boolean;
}

/**
 * 创建页签Store
 */
export const createTabStore = (): TabState => {
  // 从localStorage加载保存的页签
  const loadSavedTabs = (): TabItem[] => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem("halolight-tabs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((tab) => tab && tab.id && tab.title && tab.path);
        }
      }
    } catch (error) {
      console.warn("Failed to load saved tabs:", error);
    }
    return [];
  };

  const savedTabs = loadSavedTabs();

  // 如果没有保存的页签，创建默认页签
  const defaultTabs: TabItem[] =
    savedTabs.length > 0
      ? savedTabs
      : [
          {
            id: "dashboard",
            title: "仪表盘",
            path: "/",
            icon: "📊",
            closable: false,
            isActive: true,
            timestamp: Date.now(),
          },
        ];

  const activeTabId =
    defaultTabs.find((tab) => tab.isActive)?.id || defaultTabs[0]?.id || null;

  return {
    tabs: defaultTabs,
    activeTabId,
    maxTabs: 10,
    showTabBar: true,
  };
};

/**
 * 页签管理操作
 */
export const tabActions = {
  // 添加页签
  addTab: (
    tabs: TabItem[],
    newTab: Omit<TabItem, "id" | "timestamp">,
  ): TabItem[] => {
    const id = `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = Date.now();

    // 检查是否已存在相同路径的页签
    const existingTab = tabs.find((tab) => tab.path === newTab.path);
    if (existingTab) {
      return tabs.map((tab) =>
        tab.id === existingTab.id
          ? { ...tab, isActive: true, timestamp }
          : { ...tab, isActive: false },
      );
    }

    // 如果页签数量超过限制，关闭最早的可关闭页签
    let updatedTabs = [...tabs];
    if (updatedTabs.length >= 10) {
      const closableTabs = updatedTabs.filter((tab) => tab.closable !== false);
      if (closableTabs.length > 0) {
        const oldestTab = closableTabs.reduce((oldest, tab) =>
          (tab.timestamp || 0) < (oldest.timestamp || 0) ? tab : oldest,
        );
        updatedTabs = updatedTabs.filter((tab) => tab.id !== oldestTab.id);
      }
    }

    // 添加新页签
    const tabToAdd: TabItem = {
      ...newTab,
      id,
      timestamp,
      isActive: true,
      closable: newTab.closable !== false,
    };

    return [
      ...updatedTabs.map((tab) => ({ ...tab, isActive: false })),
      tabToAdd,
    ];
  },

  // 关闭页签
  closeTab: (
    tabs: TabItem[],
    tabId: string,
  ): { tabs: TabItem[]; newActiveId: string | null } => {
    const tabToClose = tabs.find((tab) => tab.id === tabId);
    if (!tabToClose || tabToClose.closable === false) {
      return {
        tabs,
        newActiveId: tabs.find((tab) => tab.isActive)?.id || null,
      };
    }

    const remainingTabs = tabs.filter((tab) => tab.id !== tabId);

    // 如果被关闭的是当前活跃页签，需要激活其他页签
    let newActiveId: string | null = null;
    if (tabToClose.isActive && remainingTabs.length > 0) {
      // 优先激活右侧页签，如果没有则激活左侧页签
      const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
      const newActiveTab =
        remainingTabs[currentIndex] || remainingTabs[remainingTabs.length - 1];
      newActiveId = newActiveTab.id;
    } else {
      newActiveId = remainingTabs.find((tab) => tab.isActive)?.id || null;
    }

    return {
      tabs: remainingTabs.map((tab) => ({
        ...tab,
        isActive: tab.id === newActiveId,
      })),
      newActiveId,
    };
  },

  // 激活页签
  activateTab: (tabs: TabItem[], tabId: string): TabItem[] => {
    return tabs.map((tab) => ({
      ...tab,
      isActive: tab.id === tabId,
    }));
  },

  // 更新页签
  updateTab: (
    tabs: TabItem[],
    tabId: string,
    updates: Partial<TabItem>,
  ): TabItem[] => {
    return tabs.map((tab) => (tab.id === tabId ? { ...tab, ...updates } : tab));
  },

  // 重新排序页签
  reorderTabs: (
    tabs: TabItem[],
    fromIndex: number,
    toIndex: number,
  ): TabItem[] => {
    const newTabs = [...tabs];
    const [movedTab] = newTabs.splice(fromIndex, 1);
    newTabs.splice(toIndex, 0, movedTab);
    return newTabs;
  },

  // 保存页签到localStorage
  saveTabs: (tabs: TabItem[]) => {
    if (typeof window === "undefined") return;

    try {
      const data = {
        tabs: tabs.map((tab) => ({
          id: tab.id,
          title: tab.title,
          path: tab.path,
          icon: tab.icon,
          closable: tab.closable,
          timestamp: tab.timestamp,
        })),
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("halolight-tabs", JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to save tabs:", error);
    }
  },
};
