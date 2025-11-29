import {
  component$,
  Slot,
  useStore,
  useContextProvider,
  useVisibleTask$,
  createContextId,
  useContext,
  $,
  type QRL,
  type Signal,
  useComputed$,
} from "@builder.io/qwik";
import {
  createWebSocket,
  type MockWebSocket,
  type NotificationMessage,
  type ConnectionStatus,
} from "~/lib/websocket";

/**
 * WebSocket Context State
 */
export interface WebSocketState {
  status: ConnectionStatus;
  lastMessage: NotificationMessage | null;
}

/**
 * WebSocket Context
 */
export const WebSocketContext = createContextId<WebSocketState>(
  "websocket-context"
);

/**
 * WebSocket Provider Component
 *
 * Manages WebSocket connection and provides real-time notification functionality
 */
export const WebSocketProvider = component$(() => {
  const state = useStore<WebSocketState>({
    status: "disconnected",
    lastMessage: null,
  });

  // Provide context
  useContextProvider(WebSocketContext, state);

  // Initialize WebSocket connection
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    let ws: MockWebSocket | null = null;

    const connect = () => {
      state.status = "connecting";
      ws = createWebSocket();

      ws.onOpen(() => {
        state.status = "connected";
        console.log("WebSocket connected");
      });

      ws.onMessage((message) => {
        state.lastMessage = message;

        // Dispatch custom event for notification system
        const event = new CustomEvent("notification:show", {
          detail: {
            type: message.type,
            title: message.title,
            message: message.content,
            duration: 0, // 0 means persistent notification in notification center
          },
        });
        window.dispatchEvent(event);

        // Also show a toast notification
        const toastEvent = new CustomEvent("notification:show", {
          detail: {
            type: message.type === "user" || message.type === "task" ? "info" : message.type,
            title: message.title,
            message: message.content,
            duration: 5000,
          },
        });
        window.dispatchEvent(toastEvent);
      });

      ws.onClose(() => {
        state.status = "disconnected";
        console.log("WebSocket disconnected");
      });

      ws.onError((error) => {
        state.status = "error";
        console.error("WebSocket error:", error);
      });

      ws.connect();
    };

    // Connect on mount
    connect();

    // Cleanup on unmount
    cleanup(() => {
      ws?.close();
    });
  });

  return <Slot />;
});

/**
 * WebSocket Hook Return Type
 */
export interface UseWebSocketReturn {
  state: WebSocketState;
  status: Signal<ConnectionStatus>;
  lastMessage: Signal<NotificationMessage | null>;
  sendMessage: QRL<(message: unknown) => void>;
  reconnect: QRL<() => void>;
}

/**
 * Use WebSocket Hook
 *
 * Access WebSocket state and methods
 */
export const useWebSocket = (): UseWebSocketReturn => {
  const state = useContext(WebSocketContext);

  const status = useComputed$(() => state.status);
  const lastMessage = useComputed$(() => state.lastMessage);

  const sendMessage = $((message: unknown) => {
    // In a real implementation, send message through WebSocket
    console.log("Sending message:", message);
  });

  const reconnect = $(() => {
    // In a real implementation, reconnect WebSocket
    console.log("Reconnecting WebSocket...");
  });

  return {
    state,
    status,
    lastMessage,
    sendMessage,
    reconnect,
  };
};

/**
 * Use Realtime Notifications Hook
 *
 * Subscribe to real-time notifications
 */
export const useRealtimeNotifications = (
  onNotification?: QRL<(notification: NotificationMessage) => void>
) => {
  const { state } = useWebSocket();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const lastMessage = track(() => state.lastMessage);

    if (lastMessage && onNotification) {
      onNotification(lastMessage);
    }
  });

  return {
    status: state.status,
    lastMessage: state.lastMessage,
  };
};
