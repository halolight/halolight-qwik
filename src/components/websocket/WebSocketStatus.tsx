import { component$ } from "@builder.io/qwik";
import { useWebSocket } from "./WebSocketProvider";

/**
 * WebSocket Status Indicator Component
 *
 * Displays the current connection status of the WebSocket
 */
export const WebSocketStatus = component$(() => {
  const { state } = useWebSocket();

  const statusConfig = {
    connecting: {
      text: "连接中",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      icon: "⏳",
    },
    connected: {
      text: "已连接",
      color: "text-green-500",
      bg: "bg-green-500/10",
      icon: "✓",
    },
    disconnected: {
      text: "未连接",
      color: "text-gray-500",
      bg: "bg-gray-500/10",
      icon: "○",
    },
    error: {
      text: "连接错误",
      color: "text-red-500",
      bg: "bg-red-500/10",
      icon: "✕",
    },
  };

  const config = statusConfig[state.status];

  return (
    <div
      class={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}
      title={`WebSocket ${config.text}`}
    >
      <span class="text-sm">{config.icon}</span>
      <span>{config.text}</span>
    </div>
  );
});
