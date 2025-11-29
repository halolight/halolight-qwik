/**
 * 通知系统状态管理
 */

import { useContext, createContextId } from "@builder.io/qwik";

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number; // 自动关闭时间（毫秒），0表示不自动关闭
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
}

export const NotificationContext = createContextId<NotificationState>(
  "notification-context",
);

/**
 * 通知操作
 */
export const notificationActions = {
  // 添加通知
  addNotification: (
    state: NotificationState,
    notification: Omit<Notification, "id" | "timestamp" | "read">,
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };

    state.notifications.unshift(newNotification);
    state.unreadCount++;

    // 自动关闭
    if (notification.duration !== undefined && notification.duration > 0) {
      setTimeout(() => {
        notificationActions.removeNotification(state, newNotification.id);
      }, notification.duration);
    }

    return newNotification;
  },

  // 移除通知
  removeNotification: (state: NotificationState, notificationId: string) => {
    const notification = state.notifications.find(
      (n) => n.id === notificationId,
    );
    if (notification && !notification.read) {
      state.unreadCount--;
    }
    state.notifications = state.notifications.filter(
      (n) => n.id !== notificationId,
    );
  },

  // 标记为已读
  markAsRead: (state: NotificationState, notificationId: string) => {
    const notification = state.notifications.find(
      (n) => n.id === notificationId,
    );
    if (notification && !notification.read) {
      notification.read = true;
      state.unreadCount--;
    }
  },

  // 标记全部已读
  markAllAsRead: (state: NotificationState) => {
    state.notifications.forEach((notification) => {
      notification.read = true;
    });
    state.unreadCount = 0;
  },

  // 清空通知
  clearAll: (state: NotificationState) => {
    state.notifications = [];
    state.unreadCount = 0;
  },

  // 切换通知面板
  togglePanel: (state: NotificationState) => {
    state.isOpen = !state.isOpen;
  },

  // 关闭通知面板
  closePanel: (state: NotificationState) => {
    state.isOpen = false;
  },
};

/**
 * 通知提供者Hook
 */
export function useNotificationProvider() {
  const state = useContext(NotificationContext);
  return state;
}

/**
 * 预设通知模板
 */
export const notificationTemplates = {
  // 成功通知
  success: (
    title: string,
    message?: string,
    options?: Partial<Notification>,
  ) => ({
    type: "success" as const,
    title,
    message,
    duration: 3000,
    ...options,
  }),

  // 错误通知
  error: (
    title: string,
    message?: string,
    options?: Partial<Notification>,
  ) => ({
    type: "error" as const,
    title,
    message,
    duration: 5000,
    ...options,
  }),

  // 警告通知
  warning: (
    title: string,
    message?: string,
    options?: Partial<Notification>,
  ) => ({
    type: "warning" as const,
    title,
    message,
    duration: 4000,
    ...options,
  }),

  // 信息通知
  info: (title: string, message?: string, options?: Partial<Notification>) => ({
    type: "info" as const,
    title,
    message,
    duration: 3000,
    ...options,
  }),
};
