import {
  component$,
  useSignal,
  useVisibleTask$,
  useTask$,
  $,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { createTabStore, tabActions } from "~/stores/tabs";

// 获取页面标题
function getPageTitle(path: string): string {
  const titleMap: Record<string, string> = {
    "/": "仪表盘",
    "/analytics": "数据分析",
    "/journeys": "客户旅程",
    "/automation": "自动化",
    "/security": "安全中心",
    "/settings": "系统设置",
  };

  return titleMap[path] || "未知页面";
}

// 获取页面图标
function getPageIcon(path: string): string {
  const iconMap: Record<string, string> = {
    "/": "📊",
    "/analytics": "📈",
    "/journeys": "🛤️",
    "/automation": "⚙️",
    "/security": "🔒",
    "/settings": "⚙️",
  };

  return iconMap[path] || "📄";
}

/**
 * TabBar 多页签组件
 */
export const TabBar = component$(() => {
  const location = useLocation();
  const tabStore = useSignal(createTabStore());
  const isDragging = useSignal(false);
  const draggedTab = useSignal<string | null>(null);
  const scrollContainerRef = useSignal<HTMLDivElement | null>(null);

  // 监听路由变化，自动添加或激活页签
  useTask$(({ track }) => {
    const currentPath = track(() => location.url.pathname);
    const currentTitle = getPageTitle(currentPath);
    const currentIcon = getPageIcon(currentPath);

    // 检查是否需要添加新页签
    const existingTab = tabStore.value.tabs.find(
      (tab) => tab.path === currentPath,
    );

    if (!existingTab) {
      // 添加新页签
      const newTabs = tabActions.addTab(tabStore.value.tabs, {
        title: currentTitle,
        path: currentPath,
        icon: currentIcon,
        closable: true,
      });
      tabStore.value.tabs = newTabs;
      tabStore.value.activeTabId =
        newTabs.find((tab) => tab.path === currentPath)?.id || null;
    } else {
      // 激活现有页签
      tabStore.value.tabs = tabActions.activateTab(
        tabStore.value.tabs,
        existingTab.id,
      );
      tabStore.value.activeTabId = existingTab.id;
    }

    // 保存到localStorage
    tabActions.saveTabs(tabStore.value.tabs);
  });

  // 客户端滚动处理
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (!scrollContainerRef.value) return;

    const container = scrollContainerRef.value;
    const activeTab = tabStore.value.tabs.find((tab) => tab.isActive);

    if (activeTab) {
      // 滚动到活跃页签
      setTimeout(() => {
        const activeElement = container.querySelector(
          `[data-tab-id="${activeTab.id}"]`,
        );
        if (activeElement) {
          activeElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }, 100);
    }

    // 键盘快捷键支持
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "w":
            e.preventDefault();
            {
              const activeTab = tabStore.value.tabs.find((tab) => tab.isActive);
              if (activeTab && activeTab.closable !== false) {
                closeTab(activeTab.id);
              }
            }
            break;
          case "Tab":
            e.preventDefault();
            cycleTabs(e.shiftKey);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    cleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  // 关闭页签
  const closeTab = $((tabId: string) => {
    const result = tabActions.closeTab(tabStore.value.tabs, tabId);
    tabStore.value.tabs = result.tabs;
    tabStore.value.activeTabId = result.newActiveId;
    tabActions.saveTabs(result.tabs);

    // 如果关闭了当前页签，需要导航到新激活的页签
    if (result.newActiveId) {
      const newActiveTab = result.tabs.find(
        (tab) => tab.id === result.newActiveId,
      );
      if (newActiveTab) {
        // Qwik会自动处理导航，我们只需要更新状态
      }
    }
  });

  // 循环切换页签
  const cycleTabs = $((reverse = false) => {
    const tabs = tabStore.value.tabs;
    const activeIndex = tabs.findIndex((tab) => tab.isActive);

    if (activeIndex === -1) return;

    let nextIndex;
    if (reverse) {
      nextIndex = activeIndex === 0 ? tabs.length - 1 : activeIndex - 1;
    } else {
      nextIndex = activeIndex === tabs.length - 1 ? 0 : activeIndex + 1;
    }

    const nextTab = tabs[nextIndex];
    if (nextTab) {
      tabStore.value.tabs = tabActions.activateTab(tabs, nextTab.id);
      tabStore.value.activeTabId = nextTab.id;
    }
  });

  // 拖拽开始
  const handleDragStart = $((e: DragEvent, tabId: string) => {
    isDragging.value = true;
    draggedTab.value = tabId;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  });

  // 拖拽结束
  const handleDragEnd = $(() => {
    isDragging.value = false;
    draggedTab.value = null;
  });

  // 放置处理
  const handleDrop = $((e: DragEvent, targetTabId: string) => {
    e.preventDefault();

    if (!draggedTab.value || draggedTab.value === targetTabId) return;

    const fromIndex = tabStore.value.tabs.findIndex(
      (tab) => tab.id === draggedTab.value,
    );
    const toIndex = tabStore.value.tabs.findIndex(
      (tab) => tab.id === targetTabId,
    );

    if (fromIndex !== -1 && toIndex !== -1) {
      tabStore.value.tabs = tabActions.reorderTabs(
        tabStore.value.tabs,
        fromIndex,
        toIndex,
      );
      tabActions.saveTabs(tabStore.value.tabs);
    }
  });

  // 右键菜单
  const handleContextMenu = $((e: MouseEvent, tabId: string) => {
    e.preventDefault();

    const tab = tabStore.value.tabs.find((t) => t.id === tabId);
    if (!tab) return;

    // 这里可以实现右键菜单
    const menuItems = [
      {
        label: "关闭页签",
        action: () => closeTab(tabId),
        disabled: tab.closable === false,
      },
      {
        label: "关闭其他页签",
        action: () => {
          tabStore.value.tabs = tabStore.value.tabs.filter(
            (t) => t.id === tabId || t.closable === false,
          );
          tabActions.saveTabs(tabStore.value.tabs);
        },
      },
      {
        label: "关闭右侧页签",
        action: () => {
          const tabIndex = tabStore.value.tabs.findIndex((t) => t.id === tabId);
          tabStore.value.tabs = tabStore.value.tabs.filter(
            (t, index) => index <= tabIndex || t.closable === false,
          );
          tabActions.saveTabs(tabStore.value.tabs);
        },
      },
    ];

    // 实现右键菜单显示逻辑
    console.log("Context menu for tab:", tab.title, menuItems);
  });

  if (!tabStore.value.showTabBar || tabStore.value.tabs.length <= 1) {
    return null;
  }

  return (
    <div class="tab-bar bg-background border-b border-border/60 px-4">
      <div class="flex items-center">
        <div
          ref={(el) => (scrollContainerRef.value = el)}
          class="flex-1 flex items-center overflow-x-auto scrollbar-hide"
          style={{ maxWidth: "calc(100% - 120px)" }}
        >
          <div class="flex items-center min-w-max">
            {tabStore.value.tabs.map((tab) => (
              <div
                key={tab.id}
                data-tab-id={tab.id}
                class={[
                  "tab-item relative flex items-center px-3 py-2 text-sm border-r border-border/40",
                  "hover:bg-muted/50 transition-colors cursor-pointer select-none",
                  tab.isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground",
                  isDragging.value && draggedTab.value === tab.id
                    ? "opacity-50"
                    : "",
                  "min-w-[120px] max-w-[200px]",
                ].join(" ")}
                draggable={tab.closable !== false}
                onDragStart$={(e) => handleDragStart(e, tab.id)}
                onDragEnd$={handleDragEnd}
                onDragOver$={(e) => e.preventDefault()}
                onDrop$={(e) => handleDrop(e, tab.id)}
                onContextMenu$={(e) => handleContextMenu(e, tab.id)}
              >
                <Link
                  href={tab.path}
                  class="flex items-center flex-1 min-w-0"
                  onClick$={(e) => {
                    // 如果点击的是关闭按钮，不触发链接跳转
                    if ((e.target as HTMLElement).closest(".tab-close")) {
                      e.preventDefault();
                    }
                  }}
                >
                  <span class="mr-2">{tab.icon}</span>
                  <span class="truncate">{tab.title}</span>
                  {tab.isDirty && <span class="ml-1 text-warning">●</span>}
                </Link>

                {tab.closable !== false && (
                  <button
                    class="tab-close ml-2 p-0.5 rounded hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick$={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    title="关闭页签"
                  >
                    <svg
                      class="w-3 h-3"
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

                {tab.isActive && (
                  <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div class="flex items-center ml-4 space-x-2">
          <button
            class="p-1.5 rounded hover:bg-muted/50 transition-colors"
            onClick$={() => cycleTabs(true)}
            title="上一个页签 (Ctrl+Shift+Tab)"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            class="p-1.5 rounded hover:bg-muted/50 transition-colors"
            onClick$={() => cycleTabs(false)}
            title="下一个页签 (Ctrl+Tab)"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div class="w-px h-4 bg-border/40" />

          <button
            class="p-1.5 rounded hover:bg-muted/50 transition-colors"
            onClick$={() => {
              // 显示页签列表菜单
              const activeTab = tabStore.value.tabs.find((tab) => tab.isActive);
              if (activeTab) {
                console.log("Tab list menu:", tabStore.value.tabs);
              }
            }}
            title="页签列表"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .tab-item {
          position: relative;
          user-select: none;
        }

        .tab-item[draggable="true"] {
          cursor: move;
        }

        .tab-item.dragging {
          opacity: 0.5;
        }

        .tab-close {
          opacity: 0.6;
        }

        .tab-close:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
});
