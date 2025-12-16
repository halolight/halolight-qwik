import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  color: string;
}

interface QuickActionsWidgetProps {
  title?: string;
}

/**
 * 快捷操作小部件
 * 提供常用功能的快速访问入口
 */
export const QuickActionsWidget = component$<QuickActionsWidgetProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ title = "快捷操作" }) => {
    const nav = useNavigate();

    const actions: QuickAction[] = [
      {
        id: "1",
        label: "新建用户",
        icon: "user-plus",
        href: "/users",
        color: "blue",
      },
      {
        id: "2",
        label: "新建文档",
        icon: "file-plus",
        href: "/documents",
        color: "green",
      },
      {
        id: "3",
        label: "发送通知",
        icon: "bell",
        href: "/notifications",
        color: "purple",
      },
      {
        id: "4",
        label: "数据分析",
        icon: "chart",
        href: "/analytics",
        color: "orange",
      },
      {
        id: "5",
        label: "日程安排",
        icon: "calendar",
        href: "/calendar",
        color: "pink",
      },
      {
        id: "6",
        label: "系统设置",
        icon: "settings",
        href: "/settings",
        color: "gray",
      },
    ];

    const getIconSvg = (icon: string) => {
      switch (icon) {
        case "user-plus":
          return (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          );
        case "file-plus":
          return (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          );
        case "bell":
          return (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          );
        case "chart":
          return (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          );
        case "calendar":
          return (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          );
        case "settings":
          return (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
          );
        default:
          return null;
      }
    };

    const getColorClasses = (color: string) => {
      const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
        blue: {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
          hover: "hover:bg-blue-200 dark:hover:bg-blue-900/50",
        },
        green: {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-600 dark:text-green-400",
          hover: "hover:bg-green-200 dark:hover:bg-green-900/50",
        },
        purple: {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-600 dark:text-purple-400",
          hover: "hover:bg-purple-200 dark:hover:bg-purple-900/50",
        },
        orange: {
          bg: "bg-orange-100 dark:bg-orange-900/30",
          text: "text-orange-600 dark:text-orange-400",
          hover: "hover:bg-orange-200 dark:hover:bg-orange-900/50",
        },
        pink: {
          bg: "bg-pink-100 dark:bg-pink-900/30",
          text: "text-pink-600 dark:text-pink-400",
          hover: "hover:bg-pink-200 dark:hover:bg-pink-900/50",
        },
        gray: {
          bg: "bg-gray-100 dark:bg-gray-700",
          text: "text-gray-600 dark:text-gray-400",
          hover: "hover:bg-gray-200 dark:hover:bg-gray-600",
        },
      };
      return colorMap[color] || colorMap.gray;
    };

    return (
      <div class="h-full">
        <div class="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const colors = getColorClasses(action.color);
            return (
              <button
                key={action.id}
                onClick$={() => nav(action.href)}
                class={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${colors.bg} ${colors.hover} group`}
              >
                <div
                  class={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${colors.text}`}
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {getIconSvg(action.icon)}
                  </svg>
                </div>
                <span
                  class={`text-sm font-medium ${colors.text} group-hover:font-semibold transition-all`}
                >
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
