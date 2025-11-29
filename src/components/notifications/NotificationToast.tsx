import { component$, useVisibleTask$, useSignal, $ } from "@builder.io/qwik";
import type { Notification } from "~/stores/notifications";
import { CheckIcon, XIcon } from "~/components/icons";

interface NotificationToastProps {
  notification: Notification;
}

/**
 * 通知Toast组件
 */
export const NotificationToast = component$<NotificationToastProps>(
  ({ notification }) => {
    const isVisible = useSignal(true);
    const isExiting = useSignal(false);
    const notificationId = useSignal(notification.id);
    const duration = useSignal(notification.duration);

    // 自动关闭
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
      if (duration.value && duration.value > 0) {
        const timer = setTimeout(() => {
          isExiting.value = true;
          setTimeout(() => {
            isVisible.value = false;
            // Dispatch custom event instead of calling function
            const closeEvent = new CustomEvent('notification:close', { detail: notificationId.value });
            document.dispatchEvent(closeEvent);
          }, 300);
        }, duration.value);

        cleanup(() => clearTimeout(timer));
      }
    });

    const handleClose = $(() => {
      isExiting.value = true;
      setTimeout(() => {
        isVisible.value = false;
        // Dispatch custom event instead of calling function
        const closeEvent = new CustomEvent('notification:close', { detail: notificationId.value });
        document.dispatchEvent(closeEvent);
      }, 300);
    });

    const getStyles = () => {
      const baseStyles =
        "fixed top-4 right-4 w-80 p-4 rounded-lg shadow-lg z-50 transition-all duration-300";

      const typeStyles = {
        success:
          "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800",
        error:
          "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800",
        warning:
          "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800",
        info: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800",
      };

      const visibilityStyles = isVisible.value
        ? isExiting.value
          ? "opacity-0 transform translate-x-full"
          : "opacity-100 transform translate-x-0"
        : "opacity-0 transform translate-x-full";

      return `${baseStyles} ${typeStyles[notification.type]} ${visibilityStyles}`;
    };

    const getIcon = () => {
      const iconStyles = {
        success: "text-green-600 dark:text-green-400",
        error: "text-red-600 dark:text-red-400",
        warning: "text-yellow-600 dark:text-yellow-400",
        info: "text-blue-600 dark:text-blue-400",
      };

      return (
        <div
          class={`w-6 h-6 rounded-full flex items-center justify-center ${iconStyles[notification.type]}`}
        >
          {notification.type === "success" && <CheckIcon size={16} />}
          {notification.type === "error" && <XIcon size={16} />}
          {notification.type === "warning" && (
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          )}
          {notification.type === "info" && (
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
      );
    };

    return (
      <div class={getStyles()}>
        <div class="flex items-start space-x-3">
          {getIcon()}
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {notification.title}
              </p>
              <button
                onClick$={handleClose}
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
            {notification.action && (
              <button
                onClick$={() => {
                  setTimeout(() => {
                    // eslint-disable-next-line qwik/valid-lexical-scope
                    const actionFn = notification.action?.onClick;
                    if (actionFn) {
                      actionFn();
                    }
                  }, 0);
                  handleClose();
                }}
                class="mt-2 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                {notification.action.label}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);
