import {
  $,
  component$,
  useSignal,
  useVisibleTask$,
  type Signal,
  type QRL,
} from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { projectInfo } from "~/lib/project-info";
import { useAuth } from "~/stores/auth";
import { useNotificationProvider } from "~/stores/notifications";
import {
  MenuIcon,
  SearchIcon,
  BellIcon,
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  HelpCircleIcon,
  AlertTriangleIcon,
} from "~/components/icons";
import { ThemeToggle } from "~/components/layout/theme-toggle";

interface HeaderProps {
  sidebar: Signal<boolean>;
  onSearchClick$?: QRL<() => void>;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
}

interface AccountItem {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

export const Header = component$<HeaderProps>(({ sidebar, onSearchClick$ }) => {
  const navigate = useNavigate();
  const { state, logout } = useAuth();
  const notificationState = useNotificationProvider();

  // 用户信息显示
  const displayName = state.user?.name ?? "管理员";
  const displayEmail = state.user?.email ?? "admin@halolight.h7ml.cn";
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2) || "AD";

  // 账号列表（模拟多账号切换）
  const accounts = useSignal<AccountItem[]>([
    {
      id: "1",
      name: displayName,
      email: displayEmail,
      role: "超级管理员",
    },
    {
      id: "2",
      name: "测试账号",
      email: "test@halolight.h7ml.cn",
      role: "测试人员",
    },
  ]);

  // 通知数据
  const notifications = useSignal<NotificationItem[]>([
    {
      id: "1",
      title: "新用户注册",
      description: "用户 张三 刚刚完成注册",
      timestamp: "2分钟前",
      type: "info",
    },
    {
      id: "2",
      title: "系统更新",
      description: "系统将于今晚 23:00 进行维护",
      timestamp: "1小时前",
      type: "warning",
    },
    {
      id: "3",
      title: "任务完成",
      description: "数据备份任务已完成",
      timestamp: "3小时前",
      type: "success",
    },
  ]);

  // 错误数据（模拟错误收集功能）
  const errors = useSignal([
    {
      id: "1",
      message: "API请求超时",
      detail: "连接服务器超时，请检查网络连接",
      source: "API",
      timestamp: Date.now() - 5 * 60 * 1000,
    },
    {
      id: "2",
      message: "数据验证失败",
      detail: "用户输入数据格式不正确",
      source: "Validation",
      timestamp: Date.now() - 15 * 60 * 1000,
    },
  ]);

  // 处理函数
  const handleLogout = $(async () => {
    await logout();
    await navigate("/login");
  });

  const handleNavigate = $((href: string) => {
    navigate(href);
  });

  const handleSearchClick = $(() => {
    if (onSearchClick$) {
      onSearchClick$();
    } else {
      // 触发Command Menu
      const event = new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);
    }
  });

  const handleToggleSidebar = $(() => {
    sidebar.value = !sidebar.value;
  });

  const handleClearNotifications = $(() => {
    setTimeout(() => {
      // eslint-disable-next-line qwik/valid-lexical-scope
      notificationState.notifications = [];
      // eslint-disable-next-line qwik/valid-lexical-scope
      notificationState.unreadCount = 0;
    }, 0);
  });

  const handleMarkAllRead = $(() => {
    setTimeout(() => {
      // eslint-disable-next-line qwik/valid-lexical-scope
      notificationState.notifications.forEach((notification) => {
        notification.read = true;
      });
      // eslint-disable-next-line qwik/valid-lexical-scope
      notificationState.unreadCount = 0;
    }, 0);
  });

  // 移动端适配检查
  const isMobile = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  });

  return (
    <header class="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:sticky lg:top-0">
      <div class="flex flex-1 items-center gap-4 px-4 lg:px-8">
        {/* 移动端菜单按钮 */}
        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:text-foreground hover:bg-accent lg:hidden"
          aria-label="Toggle sidebar"
          onClick$={handleToggleSidebar}
        >
          <MenuIcon size={18} />
        </button>

        {/* Logo/品牌区域 */}
        <div class="flex items-center gap-3">
          <div class="hidden lg:flex items-center gap-2">
            <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span class="text-primary-foreground font-bold text-sm">HL</span>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-lg font-semibold text-foreground">{projectInfo.name}</h1>
              <p class="text-xs text-muted-foreground">{projectInfo.description}</p>
            </div>
          </div>
        </div>

        {/* 搜索栏 */}
        <div class="flex-1 flex justify-center">
          <button
            class="hidden sm:flex w-full max-w-md items-center justify-between rounded-lg border border-border/70 bg-background/50 px-4 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/60 hover:bg-background hover:text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            onClick$={handleSearchClick}
          >
            <div class="flex items-center gap-2">
              <SearchIcon size={16} />
              <span>搜索成员、报表或操作...</span>
            </div>
            <kbd class="ml-auto hidden sm:inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>⌘</span>K
            </kbd>
          </button>

          {/* 移动端搜索按钮 */}
          <button
            class="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:text-foreground hover:bg-accent"
            onClick$={handleSearchClick}
            aria-label="Search"
          >
            <SearchIcon size={18} />
          </button>
        </div>
      </div>

      {/* 右侧功能区 */}
      <div class="flex items-center gap-2 px-4 lg:px-8">
        {/* 日期范围选择器 */}
        <button class="hidden md:inline-flex h-10 items-center rounded-lg border border-border/70 bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/60 hover:text-foreground">
          12.2 - 12.8
        </button>

        {/* 新建按钮 */}
        <button class="inline-flex h-10 items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
          新建作战手册
        </button>

        {/* 主题切换 */}
        <ThemeToggle />

        {/* 通知 */}
        <div class="relative group">
          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:text-foreground hover:bg-accent relative"
            onClick$={() => {
              setTimeout(() => {
                // eslint-disable-next-line qwik/valid-lexical-scope
                notificationState.isOpen = !notificationState.isOpen;
              }, 0);
            }}
            aria-label="Notifications"
          >
            <BellIcon size={18} />
            {notificationState.unreadCount > 0 && (
              <span class="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1 text-xs font-semibold text-destructive-foreground">
                {notificationState.unreadCount > 99 ? "99+" : notificationState.unreadCount}
              </span>
            )}
          </button>

          {/* 通知下拉菜单 */}
          <div class="absolute right-0 top-full mt-2 w-80 rounded-lg border border-border bg-background shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="p-4 border-b border-border">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold">通知</h3>
                <Link
                  href="/notifications"
                  class="text-xs text-primary hover:underline"
                  onClick$={() => handleNavigate("/notifications")}
                >
                  查看全部
                </Link>
              </div>
            </div>
            <div class="max-h-80 overflow-y-auto">
              {notifications.value.map((notification) => (
                <div key={notification.id} class="p-3 border-b border-border/50 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div class="flex items-start gap-3">
                    <div class="mt-1">
                      {notification.type === "info" && <div class="h-2 w-2 rounded-full bg-blue-500"></div>}
                      {notification.type === "success" && <div class="h-2 w-2 rounded-full bg-green-500"></div>}
                      {notification.type === "warning" && <div class="h-2 w-2 rounded-full bg-yellow-500"></div>}
                      {notification.type === "error" && <div class="h-2 w-2 rounded-full bg-red-500"></div>}
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-foreground">{notification.title}</p>
                      <p class="text-xs text-muted-foreground mt-1">{notification.description}</p>
                      <p class="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="p-3 border-t border-border">
              <div class="flex items-center justify-between">
                <button
                  class="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick$={handleMarkAllRead}
                >
                  标记已读
                </button>
                <button
                  class="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick$={handleClearNotifications}
                >
                  清空全部
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 错误收集 */}
        <div class="relative group">
          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:text-foreground hover:bg-accent relative"
            aria-label="Errors"
          >
            <AlertTriangleIcon size={18} />
            {errors.value.length > 0 && (
              <span class="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-semibold text-white">
                {errors.value.length > 99 ? "99+" : errors.value.length}
              </span>
            )}
          </button>

          {/* 错误下拉菜单 */}
          <div class="absolute right-0 top-full mt-2 w-80 rounded-lg border border-border bg-background shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="p-4 border-b border-border">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold">错误收集</h3>
                <button
                  class="text-xs text-primary hover:underline"
                  onClick$={() => errors.value = []}
                >
                  清空
                </button>
              </div>
            </div>
            <div class="max-h-80 overflow-y-auto">
              {errors.value.length === 0 && (
                <div class="p-4 text-sm text-muted-foreground text-center">
                  暂无错误
                </div>
              )}
              {errors.value.map((error) => (
                <div key={error.id} class="p-3 border-b border-border/50 hover:bg-accent/50 transition-colors">
                  <div class="flex items-start gap-2">
                    <AlertTriangleIcon size={14} class="text-orange-500 mt-0.5" />
                    <div class="flex-1">
                      <p class="text-sm font-medium text-foreground">{error.message}</p>
                      {error.detail && (
                        <p class="text-xs text-muted-foreground mt-1">{error.detail}</p>
                      )}
                      <div class="flex items-center gap-2 mt-2">
                        <span class="text-xs text-muted-foreground">
                          {new Date(error.timestamp).toLocaleTimeString()}
                        </span>
                        <span class="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {error.source}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 快速设置 */}
        <div class="relative group">
          <button class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:text-foreground hover:bg-accent">
            <SettingsIcon size={18} />
          </button>
        </div>

        {/* 用户菜单 */}
        <div class="relative group">
          <button class="inline-flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2 text-sm transition hover:border-primary/60 hover:bg-accent">
            <div class="h-8 w-8 rounded-full bg-gradient-to-br from-primary/70 to-primary/40 flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {initials}
            </div>
            <div class="hidden sm:block text-left">
              <p class="text-sm font-medium text-foreground">{displayName}</p>
              <p class="text-xs text-muted-foreground">{displayEmail}</p>
            </div>
          </button>

          {/* 用户下拉菜单 */}
          <div class="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-background shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="p-3 border-b border-border">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-gradient-to-br from-primary/70 to-primary/40 flex items-center justify-center text-primary-foreground font-semibold">
                  {initials}
                </div>
                <div>
                  <p class="text-sm font-medium">{displayName}</p>
                  <p class="text-xs text-muted-foreground">{displayEmail}</p>
                </div>
              </div>
            </div>

            {/* 账号切换 */}
            {accounts.value.length > 1 && (
              <>
                <div class="p-2 border-b border-border">
                  <p class="text-xs text-muted-foreground px-2 py-1">快速切换账号</p>
                  {accounts.value.map((account) => (
                    <button
                      key={account.id}
                      class="w-full flex items-center gap-2 p-2 text-sm rounded hover:bg-accent transition-colors text-left"
                    >
                      <div class="h-6 w-6 rounded bg-gradient-to-br from-primary/70 to-primary/40 flex items-center justify-center text-primary-foreground text-xs font-semibold">
                        {account.name.charAt(0).toUpperCase()}
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-medium">{account.name}</p>
                        <p class="text-xs text-muted-foreground">{account.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* 菜单项 */}
            <div class="p-2">
              <Link
                href="/profile"
                class="w-full flex items-center gap-2 p-2 text-sm rounded hover:bg-accent transition-colors"
                onClick$={() => handleNavigate("/profile")}
              >
                <UserIcon size={16} />
                个人资料
              </Link>
              <Link
                href="/settings"
                class="w-full flex items-center gap-2 p-2 text-sm rounded hover:bg-accent transition-colors"
                onClick$={() => handleNavigate("/settings")}
              >
                <SettingsIcon size={16} />
                账户设置
              </Link>
              <a
                href={projectInfo.docs}
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center gap-2 p-2 text-sm rounded hover:bg-accent transition-colors"
              >
                <HelpCircleIcon size={16} />
                帮助文档
              </a>
              <button
                class="w-full flex items-center gap-2 p-2 text-sm rounded hover:bg-accent transition-colors text-destructive"
                onClick$={handleLogout}
              >
                <LogOutIcon size={16} />
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});