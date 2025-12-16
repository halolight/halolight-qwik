import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
}

interface NotificationsWidgetProps {
  title?: string;
}

/**
 * 通知小部件
 * 显示系统通知和提醒列表
 */
export const NotificationsWidget = component$<NotificationsWidgetProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ title = "通知" }) => {
    const notifications = useSignal<Notification[]>([]);
    const isLoading = useSignal(true);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
      try {
        // 模拟 API 调用
        await new Promise((resolve) => setTimeout(resolve, 500));
        notifications.value = [
          {
            id: "1",
            title: "系统更新",
            message: "系统将在今晚 22:00 进行维护",
            time: "5分钟前",
            type: "info",
            read: false,
          },
          {
            id: "2",
            title: "备份完成",
            message: "数据库备份已成功完成",
            time: "1小时前",
            type: "success",
            read: false,
          },
          {
            id: "3",
            title: "存储空间不足",
            message: "当前存储空间使用率已达 85%",
            time: "2小时前",
            type: "warning",
            read: true,
          },
          {
            id: "4",
            title: "登录异常",
            message: "检测到异常登录尝试",
            time: "3小时前",
            type: "error",
            read: true,
          },
          {
            id: "5",
            title: "新消息",
            message: "您有 3 条未读消息",
            time: "5小时前",
            type: "info",
            read: true,
          },
        ];
      } finally {
        isLoading.value = false;
      }
    });

    const getTypeIcon = (type: string) => {
      switch (type) {
        case "success":
          return (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
        case "warning":
          return (
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          );
        case "error":
          return (
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
        default:
          return (
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
      }
    };

    const getTypeColor = (type: string) => {
      switch (type) {
        case "success":
          return "text-green-500";
        case "warning":
          return "text-yellow-500";
        case "error":
          return "text-red-500";
        default:
          return "text-blue-500";
      }
    };

    const getTypeBgColor = (type: string) => {
      switch (type) {
        case "success":
          return "bg-green-100 dark:bg-green-900/30";
        case "warning":
          return "bg-yellow-100 dark:bg-yellow-900/30";
        case "error":
          return "bg-red-100 dark:bg-red-900/30";
        default:
          return "bg-blue-100 dark:bg-blue-900/30";
      }
    };

    return (
      <div class="h-full">
        {isLoading.value ? (
          <div class="flex items-center justify-center h-32 text-gray-500">
            加载中...
          </div>
        ) : (
          <div class="space-y-3">
            {notifications.value.map((notification) => (
              <div
                key={notification.id}
                class={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                }`}
              >
                <div
                  class={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeBgColor(notification.type)} ${getTypeColor(notification.type)}`}
                >
                  {getTypeIcon(notification.type)}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {notification.title}
                      {!notification.read && (
                        <span class="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </p>
                    <span class="text-xs text-gray-400 whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
