import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
import type { NotificationState } from "~/stores/notifications";
import { notificationActions } from "~/stores/notifications";
import { NotificationToast } from "./NotificationToast";
import { NotificationCenter } from "./NotificationCenter";

export const NotificationContext = createContextId<NotificationState>(
  "notification-context",
);

/**
 * 通知提供者组件
 */
export const NotificationProvider = component$(() => {
  const state = useStore<NotificationState>({
    notifications: [],
    unreadCount: 0,
    isOpen: false,
  });

  // 提供上下文
  useContextProvider(NotificationContext, state);

  // 监听全局通知事件
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const handleShowNotification = (event: CustomEvent) => {
      const {
        type,
        title,
        message,
        duration = 3000,
        ...options
      } = event.detail;

      // 如果duration为0，使用通知中心，否则使用Toast
      if (duration === 0) {
        notificationActions.addNotification(state, {
          type,
          title,
          message,
          duration: 0,
          ...options,
        });
      } else {
        notificationActions.addNotification(state, {
          type,
          title,
          message,
          duration,
          ...options,
        });
      }
    };

    const handleTogglePanel = () => {
      notificationActions.togglePanel(state);
    };

    const handleClearAll = () => {
      notificationActions.clearAll(state);
    };

    window.addEventListener(
      "notification:show",
      handleShowNotification as EventListener,
    );
    window.addEventListener("notification:toggle", handleTogglePanel);
    window.addEventListener("notification:clear-all", handleClearAll);

    cleanup(() => {
      window.removeEventListener(
        "notification:show",
        handleShowNotification as EventListener,
      );
      window.removeEventListener("notification:toggle", handleTogglePanel);
      window.removeEventListener("notification:clear-all", handleClearAll);
    });
  });

  return (
    <>
      <Slot />

      {/* Toast通知 */}
      <div class="fixed top-4 right-4 z-50 space-y-2">
        {state.notifications
          .filter((n) => n.duration && n.duration > 0)
          .map((notification) => (
            <NotificationToast
              key={notification.id}
              notification={notification}
            />
          ))}
      </div>

      {/* 通知中心 */}
      <NotificationCenter />
    </>
  );
});
