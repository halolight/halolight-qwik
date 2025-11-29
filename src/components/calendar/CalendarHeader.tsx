import { component$, $ } from "@builder.io/qwik";
import type { CalendarViewType } from "~/types/calendar";

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: CalendarViewType;
}

/**
 * 日历头部组件
 */
export const CalendarHeader = component$<CalendarHeaderProps>(
  ({ currentDate, viewType }) => {
    const formatDate = (() => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      switch (viewType) {
        case "day":
          return currentDate.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        case "week": {
          const weekStart = new Date(currentDate);
          weekStart.setDate(currentDate.getDate() - currentDate.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);

          return `${weekStart.getMonth() + 1}月${weekStart.getDate()}日 - ${weekEnd.getMonth() + 1}月${weekEnd.getDate()}日, ${year}`;
        }
        case "month":
        default:
          return `${year}年${month + 1}月`;
      }
    });

    const navigatePrevious = $(() => {
      const newDate = new Date(currentDate);
      switch (viewType) {
        case "day":
          newDate.setDate(currentDate.getDate() - 1);
          break;
        case "week":
          newDate.setDate(currentDate.getDate() - 7);
          break;
        case "month":
          newDate.setMonth(currentDate.getMonth() - 1);
          break;
      }
      // Dispatch custom event instead of calling function prop
      const dateChangeEvent = new CustomEvent('calendar:date-change', { detail: newDate });
      document.dispatchEvent(dateChangeEvent);
    });

    const navigateNext = $(() => {
      const newDate = new Date(currentDate);
      switch (viewType) {
        case "day":
          newDate.setDate(currentDate.getDate() + 1);
          break;
        case "week":
          newDate.setDate(currentDate.getDate() + 7);
          break;
        case "month":
          newDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
      // Dispatch custom event instead of calling function prop
      const dateChangeEvent = new CustomEvent('calendar:date-change', { detail: newDate });
      document.dispatchEvent(dateChangeEvent);
    });

    const navigateToday = $(() => {
      // 派发自定义事件而不是调用函数prop
      const goTodayEvent = new CustomEvent('calendar:go-today');
      document.dispatchEvent(goTodayEvent);
    });

    return (
      <div class="calendar-header mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              日历
            </h1>
            <div class="text-lg text-gray-600 dark:text-gray-400">
              {formatDate()}
            </div>
          </div>

          <div class="flex items-center space-x-3">
            {/* 视图切换 */}
            <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {[
                { type: "day" as CalendarViewType, label: "日" },
                { type: "week" as CalendarViewType, label: "周" },
                { type: "month" as CalendarViewType, label: "月" },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  class={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewType === type
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                  onClick$={() => {
                    // Dispatch custom event instead of calling function prop
                    const viewChangeEvent = new CustomEvent('calendar:view-change', { detail: type });
                    document.dispatchEvent(viewChangeEvent);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* 导航控制 */}
            <div class="flex items-center space-x-2">
              <button
                class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick$={navigateToday}
              >
                今天
              </button>

              <div class="flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick$={navigatePrevious}
                  title="上一个"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border-l border-gray-300 dark:border-gray-600"
                  onClick$={navigateNext}
                  title="下一个"
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 新建事件按钮 */}
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              onClick$={() => {
                // 触发新建事件
                const event = new CustomEvent("calendar:new-event");
                window.dispatchEvent(event);
              }}
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>新建事件</span>
            </button>
          </div>
        </div>
      </div>
    );
  },
);
