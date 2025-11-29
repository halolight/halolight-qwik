import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
  type QRL,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { useAuth } from "~/stores/auth";

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  icon?: string;
  action?: QRL<() => void>;
  path?: string;
  keywords?: string[];
  shortcut?: string;
}

interface CommandCategory {
  id: string;
  title: string;
  items: CommandItem[];
}

/**
 * 命令菜单组件
 */
export const CommandMenu = component$(() => {
  const isOpen = useSignal(false);
  const searchQuery = useSignal("");
  const activeIndex = useSignal(0);
  const navigate = useNavigate();
  const auth = useAuth();

  // 命令数据
  const commands: CommandItem[] = [
    // 导航相关
    {
      id: "nav-dashboard",
      title: "打开仪表盘",
      description: "返回主仪表盘页面",
      category: "导航",
      icon: "📊",
      path: "/",
      shortcut: "⌘D",
      keywords: ["dashboard", "home", "main", "仪表盘", "首页"],
    },
    {
      id: "nav-analytics",
      title: "数据分析",
      description: "查看数据分析页面",
      category: "导航",
      icon: "📈",
      path: "/analytics",
      shortcut: "⌘A",
      keywords: ["analytics", "data", "分析", "数据"],
    },
    {
      id: "nav-journeys",
      title: "客户旅程",
      description: "管理客户旅程",
      category: "导航",
      icon: "🛤️",
      path: "/journeys",
      shortcut: "⌘J",
      keywords: ["journeys", "customer", "journey", "客户", "旅程"],
    },
    {
      id: "nav-automation",
      title: "自动化",
      description: "配置自动化流程",
      category: "导航",
      icon: "⚙️",
      path: "/automation",
      shortcut: "⌘U",
      keywords: ["automation", "workflow", "自动化", "工作流"],
    },
    {
      id: "nav-security",
      title: "安全中心",
      description: "安全管理与监控",
      category: "导航",
      icon: "🔒",
      path: "/security",
      shortcut: "⌘S",
      keywords: ["security", "safe", "安全", "防护"],
    },
    {
      id: "nav-settings",
      title: "系统设置",
      description: "系统配置与管理",
      category: "导航",
      icon: "⚙️",
      path: "/settings",
      shortcut: "⌘,",
      keywords: ["settings", "config", "设置", "配置"],
    },

    // 仪表盘操作
    {
      id: "dashboard-edit",
      title: "编辑仪表盘",
      description: "进入仪表盘编辑模式",
      category: "仪表盘",
      icon: "✏️",
      action: $(() => {
        // 触发仪表盘编辑模式
        const event = new CustomEvent("dashboard:edit-mode", {
          detail: { enabled: true },
        });
        window.dispatchEvent(event);
      }),
      shortcut: "⌘E",
      keywords: ["edit", "dashboard", "编辑", "仪表盘"],
    },
    {
      id: "dashboard-reset",
      title: "重置仪表盘",
      description: "恢复默认仪表盘布局",
      category: "仪表盘",
      icon: "🔄",
      action: $(() => {
        if (confirm("确定要重置仪表盘布局吗？")) {
          const event = new CustomEvent("dashboard:reset-layout");
          window.dispatchEvent(event);
        }
      }),
      keywords: ["reset", "layout", "重置", "布局"],
    },
    {
      id: "dashboard-add-widget",
      title: "添加组件",
      description: "向仪表盘添加新组件",
      category: "仪表盘",
      icon: "➕",
      action: $(() => {
        const event = new CustomEvent("dashboard:add-widget");
        window.dispatchEvent(event);
      }),
      shortcut: "⌘N",
      keywords: ["add", "widget", "component", "添加", "组件"],
    },

    // 主题相关
    {
      id: "theme-toggle",
      title: "切换主题",
      description: "在明暗主题间切换",
      category: "主题",
      icon: "🌙",
      action: $(() => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }),
      shortcut: "⌘T",
      keywords: ["theme", "dark", "light", "toggle", "主题", "明暗"],
    },
    {
      id: "theme-light",
      title: "浅色主题",
      description: "切换到浅色主题",
      category: "主题",
      icon: "☀️",
      action: $(() => {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }),
      keywords: ["light", "theme", "浅色", "主题"],
    },
    {
      id: "theme-dark",
      title: "深色主题",
      description: "切换到深色主题",
      category: "主题",
      icon: "🌙",
      action: $(() => {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }),
      keywords: ["dark", "theme", "深色", "主题"],
    },

    // 系统操作
    {
      id: "refresh",
      title: "刷新页面",
      description: "重新加载当前页面",
      category: "系统",
      icon: "🔄",
      action: $(() => {
        window.location.reload();
      }),
      shortcut: "⌘R",
      keywords: ["refresh", "reload", "刷新", "重新加载"],
    },
    {
      id: "fullscreen",
      title: "全屏模式",
      description: "切换全屏显示",
      category: "系统",
      icon: "🖥️",
      action: $(() => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }),
      shortcut: "F11",
      keywords: ["fullscreen", "全屏", "最大化"],
    },

    // 通知相关
    {
      id: "notifications-show",
      title: "显示通知",
      description: "打开通知中心",
      category: "通知",
      icon: "🔔",
      action: $(() => {
        const event = new CustomEvent("notification:show", {
          detail: {
            type: "info",
            title: "通知中心",
            message: "通知中心已打开",
            duration: 2000,
          },
        });
        window.dispatchEvent(event);
        // 打开通知面板
        setTimeout(() => {
          const toggleEvent = new CustomEvent("notification:toggle");
          window.dispatchEvent(toggleEvent);
        }, 100);
      }),
      keywords: ["notification", "通知", "消息", "bell"],
    },
    {
      id: "notifications-clear",
      title: "清空通知",
      description: "清空所有通知",
      category: "通知",
      icon: "🗑️",
      action: $(() => {
        const event = new CustomEvent("notification:show", {
          detail: {
            type: "success",
            title: "通知已清空",
            message: "所有通知已被清空",
            duration: 2000,
          },
        });
        window.dispatchEvent(event);
        // 触发清空事件
        setTimeout(() => {
          const clearEvent = new CustomEvent("notification:clear-all");
          window.dispatchEvent(clearEvent);
        }, 100);
      }),
      keywords: ["clear", "notification", "清空", "通知"],
    },

    // 日历相关
    {
      id: "nav-calendar",
      title: "打开日历",
      description: "查看日历和事件管理",
      category: "导航",
      icon: "📅",
      path: "/calendar",
      shortcut: "⌘C",
      keywords: ["calendar", "日程", "日历", "事件", "calendar"],
    },
    {
      id: "calendar-new-event",
      title: "新建日历事件",
      description: "创建新的日历事件",
      category: "日历",
      icon: "➕",
      action: $(() => {
        const event = new CustomEvent("calendar:new-event");
        window.dispatchEvent(event);
      }),
      shortcut: "⌘N",
      keywords: ["new", "event", "calendar", "新建", "事件", "日历"],
    },

    // 账号切换
    ...(auth.state.accounts.length > 0
      ? auth.state.accounts.map((account) => ({
          id: `switch-account-${account.id}`,
          title: `切换为 ${account.name}`,
          description: account.email,
          category: "账号",
          icon: account.id === auth.state.activeAccountId ? "✓" : "👤",
          action: $(() => {
            if (account.id === auth.state.activeAccountId) {
              return;
            }
            auth.switchAccount(account.id);
            // 显示切换成功通知
            const event = new CustomEvent("notification:show", {
              detail: {
                type: "success",
                title: "切换成功",
                message: `已切换到账号：${account.name}`,
                duration: 2000,
              },
            });
            window.dispatchEvent(event);
          }),
          keywords: ["account", "switch", "账号", "切换", account.name, account.email],
        }))
      : []),

    // 帮助相关
    {
      id: "help-docs",
      title: "查看文档",
      description: "打开帮助文档",
      category: "帮助",
      icon: "📖",
      action: $(() => {
        window.open("/docs", "_blank");
      }),
      shortcut: "⌘H",
      keywords: ["help", "docs", "document", "帮助", "文档"],
    },
    {
      id: "shortcuts",
      title: "快捷键",
      description: "查看所有可用快捷键",
      category: "帮助",
      icon: "⌨️",
      action: $(() => {
        alert(
          "快捷键列表：\n" +
            "⌘K - 打开命令菜单\n" +
            "⌘D - 仪表盘\n" +
            "⌘A - 数据分析\n" +
            "⌘T - 切换主题\n" +
            "⌘E - 编辑仪表盘\n" +
            "⌘R - 刷新页面\n" +
            "F11 - 全屏模式\n" +
            "Ctrl+Tab - 下一个页签\n" +
            "Ctrl+Shift+Tab - 上一个页签\n" +
            "Ctrl+W - 关闭当前页签",
        );
      }),
      keywords: ["shortcuts", "keyboard", "快捷键"],
    },
  ];

  // 过滤和分组命令
  const filteredCommands = useSignal<CommandCategory[]>([]);

  useTask$(({ track }) => {
    const query = track(() => searchQuery.value.toLowerCase());

    if (!query) {
      // 按类别分组显示所有命令
      const categories = new Map<string, CommandItem[]>();
      commands.forEach((cmd) => {
        if (!categories.has(cmd.category)) {
          categories.set(cmd.category, []);
        }
        categories.get(cmd.category)?.push(cmd);
      });

      filteredCommands.value = Array.from(categories.entries()).map(
        ([title, items]) => ({
          id: title.toLowerCase(),
          title,
          items,
        }),
      );
    } else {
      // 搜索过滤
      const filtered = commands.filter((cmd) => {
        const searchText =
          `${cmd.title} ${cmd.description || ""} ${cmd.keywords?.join(" ") || ""}`.toLowerCase();
        return searchText.includes(query);
      });

      // 按类别分组
      const categories = new Map<string, CommandItem[]>();
      filtered.forEach((cmd) => {
        if (!categories.has(cmd.category)) {
          categories.set(cmd.category, []);
        }
        categories.get(cmd.category)?.push(cmd);
      });

      filteredCommands.value = Array.from(categories.entries()).map(
        ([title, items]) => ({
          id: title.toLowerCase(),
          title,
          items,
        }),
      );
    }

    // 重置激活索引
    activeIndex.value = 0;
  });

  // 键盘导航
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        isOpen.value = !isOpen.value;
        if (isOpen.value) {
          searchQuery.value = "";
          activeIndex.value = 0;
        }
        return;
      }

      if (!isOpen.value) return;

      const allItems = filteredCommands.value.flatMap((cat) => cat.items);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          activeIndex.value = Math.min(
            activeIndex.value + 1,
            allItems.length - 1,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          activeIndex.value = Math.max(activeIndex.value - 1, 0);
          break;
        case "Enter":
          e.preventDefault();
          {
            const selectedItem = allItems[activeIndex.value];
            if (selectedItem) {
              executeCommand(selectedItem);
            }
          }
          break;
        case "Escape":
          e.preventDefault();
          isOpen.value = false;
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    cleanup(() => document.removeEventListener("keydown", handleKeyDown));
  });

  // 执行命令
  const executeCommand = $((command: CommandItem) => {
    if (command.action) {
      command.action();
    } else if (command.path) {
      navigate(command.path);
    }
    isOpen.value = false;
    searchQuery.value = "";
  });

  // 监听仪表盘事件
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const handleDashboardEvent = (event: Event) => {
      if (event.type === "dashboard:edit-mode") {
        const customEvent = event as CustomEvent;
        // 可以在这里处理编辑模式切换
        console.log("Dashboard edit mode:", customEvent.detail.enabled);
      } else if (event.type === "dashboard:reset-layout") {
        // 处理重置布局
        console.log("Dashboard layout reset");
      } else if (event.type === "dashboard:add-widget") {
        // 处理添加组件
        console.log("Add widget requested");
      }
    };

    window.addEventListener("dashboard:edit-mode", handleDashboardEvent);
    window.addEventListener("dashboard:reset-layout", handleDashboardEvent);
    window.addEventListener("dashboard:add-widget", handleDashboardEvent);

    cleanup(() => {
      window.removeEventListener("dashboard:edit-mode", handleDashboardEvent);
      window.removeEventListener(
        "dashboard:reset-layout",
        handleDashboardEvent,
      );
      window.removeEventListener("dashboard:add-widget", handleDashboardEvent);
    });
  });

  // 获取所有项目的扁平列表 - 暂时注释掉，因为暂未使用
  // const getAllItems = $(() => {
  //   return filteredCommands.value.flatMap((cat) => cat.items);
  // });

  if (!isOpen.value) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick$={() => (isOpen.value = false)}
      />

      {/* 命令面板 */}
      <div class="fixed inset-0 z-50 flex items-start justify-center pt-20">
        <div class="command-panel bg-background border border-border/60 rounded-lg shadow-2xl w-full max-w-2xl max-h-[70vh] overflow-hidden">
          {/* 搜索输入 */}
          <div class="p-4 border-b border-border/60">
            <div class="flex items-center gap-3">
              <svg
                class="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery.value}
                onInput$={(e) =>
                  (searchQuery.value = (e.target as HTMLInputElement).value)
                }
                placeholder="输入命令或搜索..."
                class="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                autoFocus
              />
              <div class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                ESC
              </div>
            </div>
          </div>

          {/* 命令列表 */}
          <div class="overflow-y-auto max-h-[50vh]">
            {filteredCommands.value.length === 0 ? (
              <div class="p-8 text-center text-muted-foreground">
                <p>未找到相关命令</p>
                <p class="text-sm mt-2">尝试输入其他关键词</p>
              </div>
            ) : (
              <>
                {filteredCommands.value.map((category, categoryIndex) => (
                  <div key={category.id} class="command-category">
                    <div class="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {category.title}
                    </div>
                    <div class="command-items">
                      {category.items.map((item, itemIndex) => {
                        const globalIndex =
                          filteredCommands.value
                            .slice(0, categoryIndex)
                            .reduce((acc, cat) => acc + cat.items.length, 0) +
                          itemIndex;

                        return (
                          <button
                            key={item.id}
                            class={[
                              "w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors",
                              "flex items-center gap-3",
                              activeIndex.value === globalIndex
                                ? "bg-muted"
                                : "",
                              "border-l-2 border-transparent",
                              activeIndex.value === globalIndex
                                ? "border-primary"
                                : "",
                            ].join(" ")}
                            onClick$={() => executeCommand(item)}
                            onMouseEnter$={() =>
                              (activeIndex.value = globalIndex)
                            }
                          >
                            <div class="flex items-center gap-3 flex-1">
                              <span class="text-lg">{item.icon || "📄"}</span>
                              <div class="flex-1 min-w-0">
                                <p class="font-medium text-foreground truncate">
                                  {item.title}
                                </p>
                                {item.description && (
                                  <p class="text-sm text-muted-foreground truncate">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div class="flex items-center gap-2">
                              {item.shortcut && (
                                <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                  {item.shortcut}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* 底部提示 */}
          <div class="p-3 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-between">
            <div class="flex items-center gap-4">
              <span>↑↓ 选择</span>
              <span>↵ 执行</span>
              <span>ESC 关闭</span>
            </div>
            <div>
              <span>⌘K 打开命令菜单</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .command-panel {
          animation: slideIn 0.2s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .command-category:not(:first-child) {
          border-top: 1px solid rgba(var(--border), 0.5);
        }

        .command-items {
          padding: 4px 0;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
});
