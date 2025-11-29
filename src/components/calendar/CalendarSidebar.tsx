import { component$ } from "@builder.io/qwik";
import type { CalendarEvent } from "~/types/calendar";
import {
  getTimeRange,
  getCategoryColor,
  getCategoryName,
} from "~/lib/calendar/utils";

interface CalendarSidebarProps {
  events: CalendarEvent[];
}

/**
 * 日历侧边栏组件
 */
export const CalendarSidebar = component$<CalendarSidebarProps>(
  ({ events }) => {
    const today = new Date();

    // 获取即将发生的事件（今天和未来7天）
    const upcomingEvents = events
      .filter(
        (event) =>
          event.startDate >= today &&
          event.startDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      )
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .slice(0, 5);

    // 按分类分组事件
    const eventsByCategory = (() => {
      const grouped: Record<string, CalendarEvent[]> = {};

      events.forEach((event) => {
        if (!grouped[event.category]) {
          grouped[event.category] = [];
        }
        grouped[event.category].push(event);
      });

      return grouped;
    })();

    return (
      <div class="calendar-sidebar w-80 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-fit">
        {/* 小日历 */}
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            小日历
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {today.getDate()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {today.toLocaleDateString("zh-CN", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {today.toLocaleDateString("zh-CN", { weekday: "long" })}
              </div>
            </div>
          </div>
        </div>

        {/* 即将发生的事件 */}
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            即将发生
          </h3>
          {upcomingEvents.length > 0 ? (
            <div class="space-y-2">
              {upcomingEvents.map((event: CalendarEvent) => (
                <div
                  key={event.id}
                  class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick$={() => {
                    // Dispatch custom event instead of calling function prop
                    const eventClickEvent = new CustomEvent('calendar:event-click', { detail: event });
                    document.dispatchEvent(eventClickEvent);
                  }}
                >
                  <div class="flex items-start space-x-3">
                    <div
                      class="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: event.color }}
                    />
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {event.title}
                      </div>
                      <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {getTimeRange(
                          event.startDate,
                          event.endDate,
                          event.allDay,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              暂无即将发生的事件
            </div>
          )}
        </div>

        {/* 事件分类 */}
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            事件分类
          </h3>
          <div class="space-y-2">
            {Object.entries(eventsByCategory).map(
              ([category, categoryEvents]) => (
                <div key={category} class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      {getCategoryName(category)}
                    </span>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {categoryEvents.length}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* 快速操作 */}
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            快速操作
          </h3>
          <div class="space-y-2">
            <button
              class="w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick$={() => {
                // 触发新建事件
                const event = new CustomEvent("calendar:new-event");
                window.dispatchEvent(event);
              }}
            >
              ➕ 新建事件
            </button>
            <button
              class="w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick$={() => {
                // 触发导入事件
                const event = new CustomEvent("calendar:import");
                window.dispatchEvent(event);
              }}
            >
              📥 导入日历
            </button>
            <button
              class="w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick$={() => {
                // 触发导出事件
                const event = new CustomEvent("calendar:export");
                window.dispatchEvent(event);
              }}
            >
              📤 导出日历
            </button>
          </div>
        </div>
      </div>
    );
  },
);
