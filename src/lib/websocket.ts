/**
 * WebSocket Service for Real-time Notifications
 *
 * This is a mock WebSocket implementation for the Qwik project.
 * In production, replace with actual WebSocket connection to your backend.
 */

export interface NotificationMessage {
  id: string;
  type: "info" | "success" | "warning" | "error" | "user" | "system" | "task" | "alert";
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

export type MessageCallback = (message: NotificationMessage) => void;
export type StatusCallback = (status: ConnectionStatus) => void;

/**
 * Mock WebSocket class that simulates real-time notifications
 */
export class MockWebSocket {
  private callbacks: {
    onOpen?: () => void;
    onMessage?: MessageCallback;
    onClose?: () => void;
    onError?: (error: Error) => void;
  } = {};

  private interval: ReturnType<typeof setInterval> | null = null;
  private isConnected = false;

  /**
   * Connect to the mock WebSocket
   */
  connect() {
    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      this.callbacks.onOpen?.();
      this.startMockMessages();
    }, 1000);
  }

  /**
   * Start sending mock messages at random intervals
   */
  private startMockMessages() {
    // Send a random notification every 10 seconds with 20% probability
    this.interval = setInterval(() => {
      if (!this.isConnected) return;

      // 20% chance to send a new notification
      if (Math.random() < 0.2) {
        const mockNotifications: NotificationMessage[] = [
          {
            id: `ws-${Date.now()}`,
            type: "user",
            title: "新用户注册",
            content: `用户 ${["张三", "李四", "王五", "赵六"][Math.floor(Math.random() * 4)]} 刚刚完成注册`,
            read: false,
            createdAt: new Date().toISOString(),
            link: "/users",
          },
          {
            id: `ws-${Date.now()}`,
            type: "system",
            title: "系统通知",
            content: "数��备份已完成",
            read: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `ws-${Date.now()}`,
            type: "task",
            title: "任务更新",
            content: "您有一个新任务待处理",
            read: false,
            createdAt: new Date().toISOString(),
            link: "/tasks",
          },
          {
            id: `ws-${Date.now()}`,
            type: "alert",
            title: "安全提醒",
            content: "检测到异常登录尝试",
            read: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `ws-${Date.now()}`,
            type: "success",
            title: "操作成功",
            content: "您的设置已成功保存",
            read: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `ws-${Date.now()}`,
            type: "info",
            title: "功能更新",
            content: "系统已升级到最新版本 v2.0.0",
            read: false,
            createdAt: new Date().toISOString(),
          },
        ];

        const randomNotification =
          mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
        this.callbacks.onMessage?.(randomNotification);
      }
    }, 10000); // Check every 10 seconds
  }

  /**
   * Register callback for connection opened
   */
  onOpen(callback: () => void) {
    this.callbacks.onOpen = callback;
  }

  /**
   * Register callback for incoming messages
   */
  onMessage(callback: MessageCallback) {
    this.callbacks.onMessage = callback;
  }

  /**
   * Register callback for connection closed
   */
  onClose(callback: () => void) {
    this.callbacks.onClose = callback;
  }

  /**
   * Register callback for errors
   */
  onError(callback: (error: Error) => void) {
    this.callbacks.onError = callback;
  }

  /**
   * Send a message through WebSocket (mock implementation)
   */
  send(data: unknown) {
    if (!this.isConnected) {
      console.warn("WebSocket is not connected");
      return;
    }
    console.log("WebSocket send:", data);
  }

  /**
   * Close the WebSocket connection
   */
  close() {
    this.isConnected = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.callbacks.onClose?.();
  }

  /**
   * Check if the WebSocket is connected
   */
  get connected(): boolean {
    return this.isConnected;
  }
}

/**
 * Create a new mock WebSocket instance
 */
export function createWebSocket(): MockWebSocket {
  return new MockWebSocket();
}
