import { component$, useVisibleTask$ } from "@builder.io/qwik";
import {
  useNotificationProvider,
  type Notification,
} from "~/stores/notifications";
import { BellIcon, CheckIcon, XIcon } from "~/components/icons";

/**
 * 通知中心组件
 */
export const NotificationCenter = component$(() => {
  const state = useNotificationProvider();

  // 监听全局通知事件
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const handleNotification = (event: CustomEvent) => {
      const { type, title, message, ...options } = event.detail;
      // Create a new notification directly without passing the state
      const newNotification: Notification = {
        id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        title,
        message,
        timestamp: new Date(),
        read: false,
        ...options,
      };

      // Use a timeout to avoid serialization issues
      setTimeout(() => {
        // Create a clean notification without action functions
        const cleanNotification = { ...newNotification };
        if (cleanNotification.action?.onClick) {
          // Store the action function reference for later execution
          const actionId = `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          (window as any)[actionId] = cleanNotification.action.onClick;
          cleanNotification.action.onClick = () => {
            (window as any)[actionId]?.();
            delete (window as any)[actionId];
          };
        }
        // eslint-disable-next-line qwik/valid-lexical-scope
        state.notifications.unshift(cleanNotification);
        // eslint-disable-next-line qwik/valid-lexical-scope
        state.unreadCount++;
      }, 0);
    };

    window.addEventListener(
      "notification:show",
      handleNotification as EventListener,
    );
    cleanup(() => {
      window.removeEventListener(
        "notification:show",
        handleNotification as EventListener,
      );
    });
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <div class="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckIcon size={16} class="text-green-600 dark:text-green-400" />
          </div>
        );
      case "error":
        return (
          <div class="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <XIcon size={16} class="text-red-600 dark:text-red-400" />
          </div>
        );
      case "warning":
        return (
          <div class="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
            <svg
              class="w-4 h-4 text-yellow-600 dark:text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div class="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <BellIcon size={16} class="text-blue-600 dark:text-blue-400" />
          </div>
        );
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString("zh-CN");
  };

  return (
    <div class="notification-center">
      {/* 通知面板 */}
      {state.isOpen && (
        <div class="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4">
          {/* 背景遮罩 */}
          <div
            class="absolute inset-0 bg-black bg-opacity-25"
            onClick$={() => {
              setTimeout(() => {
                // eslint-disable-next-line qwik/valid-lexical-scope
                state.isOpen = false;
              }, 0);
            }}
          />

          {/* 通知面板内容 */}
          <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 max-h-[80vh] overflow-hidden">
            {/* 头部 */}
            <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                通知中心
              </h3>
              <div class="flex items-center space-x-2">
                <button
                  onClick$={() => {
                    setTimeout(() => {
                      // eslint-disable-next-line qwik/valid-lexical-scope
                      state.notifications.forEach((notification) => {
                        notification.read = true;
                      });
                      // eslint-disable-next-line qwik/valid-lexical-scope
                      state.unreadCount = 0;
                    }, 0);
                  }}
                  class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  全部已读
                </button>
                <button
                  onClick$={() => {
                    setTimeout(() => {
                      // eslint-disable-next-line qwik/valid-lexical-scope
                      state.isOpen = false;
                    }, 0);
                  }}
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XIcon size={18} />
                </button>
              </div>
            </div>

            {/* 通知列表 */}
            <div class="overflow-y-auto max-h-[calc(80vh-80px)]">
              {state.notifications.length === 0 ? (
                <div class="p-8 text-center text-gray-500 dark:text-gray-400">
                  <BellIcon size={48} class="mx-auto mb-4 opacity-50" />
                  <p>暂无通知</p>
                </div>
              ) : (
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                  {state.notifications.map((notification) => {
                    const notificationId = notification.id;
                    const isRead = notification.read;
                    const hasAction = !!notification.action;
                    const actionLabel = notification.action?.label;

                    return (
                      <div
                        key={notificationId}
                        class={[
                          "p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                          !isRead
                            ? "bg-blue-50 dark:bg-blue-900/10"
                            : "",
                        ]}
                      >
                        <div class="flex items-start space-x-3">
                          {getIcon(notification.type)}
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                              <p class="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <button
                                onClick$={() => {
                                  setTimeout(() => {
                                    // eslint-disable-next-line qwik/valid-lexical-scope
                                    const index = state.notifications.findIndex(n => n.id === notificationId);
                                    if (index !== -1) {
                                      // eslint-disable-next-line qwik/valid-lexical-scope
                                      const wasRead = state.notifications[index].read;
                                      // eslint-disable-next-line qwik/valid-lexical-scope
                                      state.notifications.splice(index, 1);
                                      if (!wasRead) {
                                        // eslint-disable-next-line qwik/valid-lexical-scope
                                        state.unreadCount--;
                                      }
                                    }
                                  }, 0);
                                }}
                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              >
                                <XIcon size={14} />
                              </button>
                            </div>
                            {notification.message && (
                              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                            )}
                            <div class="flex items-center justify-between mt-2">
                              <span class="text-xs text-gray-500 dark:text-gray-500">
                                {formatTime(notification.timestamp)}
                              </span>
                              {!isRead && (
                                <button
                                  onClick$={() => {
                                    setTimeout(() => {
                                      // eslint-disable-next-line qwik/valid-lexical-scope
                                      const notificationToUpdate = state.notifications.find(n => n.id === notificationId);
                                      if (notificationToUpdate && !notificationToUpdate.read) {
                                        notificationToUpdate.read = true;
                                        // eslint-disable-next-line qwik/valid-lexical-scope
                                        state.unreadCount--;
                                      }
                                    }, 0);
                                  }}
                                  class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                >
                                  标记已读
                                </button>
                              )}
                            </div>
                            {hasAction && (
                              <button
                                onClick$={() => {
                                  setTimeout(() => {
                                    // eslint-disable-next-line qwik/valid-lexical-scope
                                    const notificationToUpdate = state.notifications.find(n => n.id === notificationId);
                                    if (notificationToUpdate?.action?.onClick) {
                                      notificationToUpdate.action.onClick();
                                      if (!notificationToUpdate.read) {
                                        notificationToUpdate.read = true;
                                        // eslint-disable-next-line qwik/valid-lexical-scope
                                        state.unreadCount--;
                                      }
                                    }
                                  }, 0);
                                }}
                                class="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                              >
                                {actionLabel}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
