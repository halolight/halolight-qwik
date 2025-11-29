import { component$ } from "@builder.io/qwik";
import type { CalendarEvent, CalendarViewType } from "~/types/calendar";
import { generateCalendarGrid } from "~/lib/calendar/utils";

interface CalendarGridProps {
  currentDate: Date;
  viewType: CalendarViewType;
  events: CalendarEvent[];
}

/**
 * 日历网格组件
 */
export const CalendarGrid = component$<CalendarGridProps>(
  ({ currentDate, viewType, events }) => {
    const gridData = generateCalendarGrid(currentDate, viewType, events);

    const isToday = (date: Date) => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };

    const isCurrentMonth = (date: Date) => {
      return date.getMonth() === currentDate.getMonth();
    };

    const getEventStyle = (event: CalendarEvent) => {
      return {
        backgroundColor: event.color + "20",
        borderLeftColor: event.color,
        color: event.color,
      };
    };

    return (
      <div class="calendar-grid flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {viewType === "month" && (
          <div class="calendar-month-view h-full">
            {/* 星期标题 */}
            <div class="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
              {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
                <div
                  key={day}
                  class="p-3 text-center text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 日期网格 */}
            <div class="grid grid-cols-7 h-[calc(100%-48px)]">
              {gridData.map((dayData) => (
                <div
                  key={dayData.date.toISOString()}
                  class={`
                  relative p-2 border-r border-b border-gray-200 dark:border-gray-700
                  ${!isCurrentMonth(dayData.date) ? "bg-gray-50 dark:bg-gray-900" : ""}
                  ${isToday(dayData.date) ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                  hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors
                  min-h-[100px]
                `}
                  onClick$={() => {
                    // Dispatch custom event instead of calling function prop
                    const dateClickEvent = new CustomEvent('calendar:date-click', { detail: dayData.date });
                    document.dispatchEvent(dateClickEvent);
                  }}
                >
                  {/* 日期数字 */}
                  <div class="flex justify-between items-start mb-2">
                    <span
                      class={`
                    text-sm font-medium
                    ${isToday(dayData.date) ? "text-blue-600 dark:text-blue-400" : ""}
                    ${!isCurrentMonth(dayData.date) ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-white"}
                  `}
                    >
                      {dayData.date.getDate()}
                    </span>
                    {isToday(dayData.date) && (
                      <span class="text-xs bg-blue-600 text-white px-1 py-0.5 rounded">
                        今天
                      </span>
                    )}
                  </div>

                  {/* 事件列表 */}
                  <div class="space-y-1">
                    {dayData.events.slice(0, 3).map((event: CalendarEvent) => (
                      <div
                        key={event.id}
                        class="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
                        style={getEventStyle(event)}
                        onClick$={() => {
                          // Dispatch custom event instead of calling function prop
                          const eventClickEvent = new CustomEvent('calendar:event-click', { detail: event });
                          document.dispatchEvent(eventClickEvent);
                        }}
                        title={event.title}
                      >
                        {event.allDay
                          ? event.title
                          : `${event.startDate.getHours()}:${event.startDate.getMinutes().toString().padStart(2, "0")} ${event.title}`}
                      </div>
                    ))}
                    {dayData.events.length > 3 && (
                      <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
                        +{dayData.events.length - 3} 更多
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewType === "week" && (
          <div class="calendar-week-view h-full">
            {/* 周视图实现 */}
            <div class="text-center py-8 text-gray-500">
              <div class="text-2xl mb-2">📅</div>
              <div>周视图开发中...</div>
            </div>
          </div>
        )}

        {viewType === "day" && (
          <div class="calendar-day-view h-full">
            {/* 日视图实现 */}
            <div class="text-center py-8 text-gray-500">
              <div class="text-2xl mb-2">📅</div>
              <div>日视图开发中...</div>
            </div>
          </div>
        )}
      </div>
    );
  },
);
