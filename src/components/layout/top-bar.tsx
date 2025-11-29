import { $, component$, type Signal } from "@builder.io/qwik";
import { ThemeToggle } from "~/components/layout/theme-toggle";
import { useNotificationProvider } from "~/stores/notifications";
import { BellIcon, MenuIcon } from "~/components/icons";
import { useAuth } from "~/stores/auth";

type TopBarProps = {
  sidebar: Signal<boolean>;
};

export const TopBar = component$<TopBarProps>(({ sidebar }) => {
  const openSidebar = $(() => {
    sidebar.value = true;
  });
  const { state } = useAuth();
  const notificationState = useNotificationProvider();
  const displayName = state.user?.name ?? "Iris Tan";
  const subline = state.user?.email ?? "Global Ops";
  const initials =
    displayName
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || "IT";

  return (
    <header class="sticky top-0 z-20 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div class="flex flex-wrap items-center gap-3 px-4 py-4 lg:px-8">
        <div class="flex flex-1 items-center gap-3">
          <button
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 text-muted-foreground transition hover:text-foreground lg:hidden"
            aria-label="Toggle sidebar"
            onClick$={openSidebar}
          >
            <MenuIcon size={18} />
          </button>
          <div class="relative hidden min-w-[280px] flex-1 items-center lg:flex">
            <button
              class="w-full rounded-2xl border border-border/70 bg-transparent py-3 pl-4 pr-12 text-sm text-muted-foreground hover:text-foreground hover:border-primary/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center justify-start transition-all cursor-pointer group"
              onClick$={() => {
                // 触发Command Menu
                const event = new KeyboardEvent("keydown", {
                  key: "k",
                  ctrlKey: true,
                  bubbles: true,
                });
                document.dispatchEvent(event);
              }}
            >
              <span class="flex-1 text-left">搜索成员、报表或操作...</span>
              <kbd class="ml-auto hidden sm:inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                <span>⌘</span>K
              </kbd>
            </button>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="hidden rounded-2xl border border-border/70 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/50 hover:text-foreground lg:inline-flex">
            12.2 - 12.8
          </button>
          <button class="inline-flex items-center rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
            新建作战手册
          </button>
          <ThemeToggle />
          <button
            class="relative flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 text-muted-foreground transition hover:text-primary"

            onClick$={() => {
              setTimeout(() => {
                // eslint-disable-next-line qwik/valid-lexical-scope
                notificationState.isOpen = !notificationState.isOpen;
              }, 0);
            }}
          >
            <BellIcon size={18} />
            {notificationState.unreadCount > 0 && (
              <span class="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1 text-xs font-semibold text-destructive-foreground">
                {notificationState.unreadCount > 99
                  ? "99+"
                  : notificationState.unreadCount}
              </span>
            )}
          </button>
          <div class="hidden items-center gap-3 rounded-2xl border border-border/60 px-3 py-1.5 lg:flex">
            <div class="flex flex-col">
              <span class="text-sm font-semibold">{displayName}</span>
              <span class="text-xs text-muted-foreground">{subline}</span>
            </div>
            <div class="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary/70 to-primary/40 text-center text-sm font-semibold leading-10 text-primary-foreground">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
