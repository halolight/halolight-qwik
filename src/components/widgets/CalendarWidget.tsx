import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  type: "meeting" | "task" | "event" | "reminder";
}

interface CalendarWidgetProps {
  title?: string;
}

/**
 * 日历小部件
 * 显示今日日程和即将到来的事件
 */
export const CalendarWidget = component$<CalendarWidgetProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ title = "今日日程" }) => {
    const events = useSignal<CalendarEvent[]>([]);
    const isLoading = useSignal(true);
    const today = useSignal("");

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
      try {
        // 获取今天的日期
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        today.value = `${year}-${month}-${day}`;

        // 模拟 API 调用
        await new Promise((resolve) => setTimeout(resolve, 500));
        events.value = [
          {
            id: "1",
            title: "团队站会",
            start: `${today.value}T09:00:00`,
            end: `${today.value}T09:30:00`,
            type: "meeting",
          },
          {
            id: "2",
            title: "产品设计评审",
            start: `${today.value}T10:30:00`,
            end: `${today.value}T12:00:00`,
            type: "meeting",
          },
          {
            id: "3",
            title: "完成需求文档",
            start: `${today.value}T14:00:00`,
            end: `${today.value}T16:00:00`,
            type: "task",
          },
          {
            id: "4",
            title: "客户演示",
            start: `${today.value}T16:30:00`,
            end: `${today.value}T17:30:00`,
            type: "event",
          },
          {
            id: "5",
            title: "提交周报",
            start: `${today.value}T18:00:00`,
            type: "reminder",
          },
        ];
      } finally {
        isLoading.value = false;
      }
    });

    const formatTime = (dateString: string) => {
      const date = new Date(dateString);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const formatTimeRange = (start: string, end?: string) => {
      const startTime = formatTime(start);
      if (!end) return startTime;
      const endTime = formatTime(end);
      return `${startTime} - ${endTime}`;
    };

    const getTypeIcon = (type: string) => {
      switch (type) {
        case "meeting":
          return (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          );
        case "task":
          return (
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          );
        case "event":
          return (
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
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          );
        default:
          return (
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          );
      }
    };

    const getTypeColor = (type: string) => {
      switch (type) {
        case "meeting":
          return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
        case "task":
          return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
        case "event":
          return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
        default:
          return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      }
    };

    const getTypeLabel = (type: string) => {
      switch (type) {
        case "meeting":
          return "会议";
        case "task":
          return "任务";
        case "event":
          return "活动";
        default:
          return "提醒";
      }
    };

    return (
      <div class="h-full">
        {isLoading.value ? (
          <div class="flex items-center justify-center h-32 text-gray-500">
            加载中...
          </div>
        ) : events.value.length === 0 ? (
          <div class="flex flex-col items-center justify-center h-32 text-gray-500">
            <svg
              class="w-12 h-12 mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p class="text-sm">暂无日程</p>
          </div>
        ) : (
          <div class="space-y-3">
            {events.value.map((event) => (
              <div
                key={event.id}
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700"
              >
                <div
                  class={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(event.type)}`}
                >
                  {getTypeIcon(event.type)}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimeRange(event.start, event.end)}
                    </span>
                    <span
                      class={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(event.type)}`}
                    >
                      {getTypeLabel(event.type)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
