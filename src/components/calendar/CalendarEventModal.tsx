import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import type { CalendarEvent } from "~/types/calendar";

interface CalendarEventModalProps {
  isOpen: boolean;
  event: CalendarEvent | null;
}

/**
 * 日历事件模态框组件
 */
export const CalendarEventModal = component$<CalendarEventModalProps>(
  ({ isOpen, event }) => {
    const formData = useSignal({
      title: event?.title || "",
      description: event?.description || "",
      startDate: event?.startDate
        ? event.startDate.toISOString().slice(0, 16)
        : "",
      endDate: event?.endDate ? event.endDate.toISOString().slice(0, 16) : "",
      allDay: event?.allDay || false,
      color: event?.color || "#3B82F6",
      category: event?.category || "default",
      location: event?.location || "",
      reminder: event?.reminder || 0,
    });

    // 更新表单数据当事件变化时
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      const currentEvent = track(() => event);
      if (currentEvent) {
        formData.value = {
          title: currentEvent.title || "",
          description: currentEvent.description || "",
          startDate: currentEvent.startDate.toISOString().slice(0, 16),
          endDate: currentEvent.endDate.toISOString().slice(0, 16),
          allDay: currentEvent.allDay,
          color: currentEvent.color || "#3B82F6",
          category: currentEvent.category || "default",
          location: currentEvent.location || "",
          reminder: currentEvent.reminder || 0,
        };
      }
    });

    const handleSubmit = $(() => {
      if (!formData.value.title.trim()) {
        alert("请输入事件标题");
        return;
      }

      const startDate = new Date(formData.value.startDate);
      const endDate = new Date(formData.value.endDate);

      if (endDate < startDate) {
        alert("结束时间不能早于开始时间");
        return;
      }

      const updatedEvent: CalendarEvent = {
        id: event?.id || `event-${Date.now()}`,
        title: formData.value.title.trim(),
        description: formData.value.description.trim(),
        startDate,
        endDate,
        allDay: formData.value.allDay,
        color: formData.value.color,
        category: formData.value.category as any,
        location: formData.value.location.trim(),
        reminder: formData.value.reminder,
      };

      // Dispatch custom event instead of calling function prop
      const saveEvent = new CustomEvent('calendar:save-event', { detail: updatedEvent });
      document.dispatchEvent(saveEvent);
      // Dispatch custom event to close modal
      const closeEvent = new CustomEvent('calendar:close-modal');
      document.dispatchEvent(closeEvent);
    });

    if (!isOpen) return null;

    return (
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        {/* 背景遮罩 */}
        <div
          class="absolute inset-0 bg-black bg-opacity-50"
          onClick$={() => {
            // Dispatch custom event to close modal
            const closeEvent = new CustomEvent('calendar:close-modal');
            document.dispatchEvent(closeEvent);
          }}
        />

        {/* 模态框内容 */}
        <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
          <div class="p-6">
            {/* 头部 */}
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {event?.id ? "编辑事件" : "新建事件"}
              </h2>
              <button
                onClick$={() => {
                  // Dispatch custom event to close modal
                  const closeEvent = new CustomEvent('calendar:close-modal');
                  document.dispatchEvent(closeEvent);
                }}
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 表单 */}
            <form
              onSubmit$={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div class="space-y-4">
                {/* 标题 */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    事件标题 *
                  </label>
                  <input
                    type="text"
                    value={formData.value.title}
                    onInput$={(e) =>
                      (formData.value.title = (
                        e.target as HTMLInputElement
                      ).value)
                    }
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="输入事件标题"
                    required
                  />
                </div>

                {/* 描述 */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    描述
                  </label>
                  <textarea
                    value={formData.value.description}
                    onInput$={(e) =>
                      (formData.value.description = (
                        e.target as HTMLTextAreaElement
                      ).value)
                    }
                    rows={3}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="输入事件描述"
                  />
                </div>

                {/* 分类 */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    分类
                  </label>
                  <select
                    value={formData.value.category}
                    onChange$={(e) =>
                      (formData.value.category = (e.target as HTMLSelectElement)
                        .value as any)
                    }
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[
                      { value: "meeting", label: "会议" },
                      { value: "task", label: "任务" },
                      { value: "reminder", label: "提醒" },
                      { value: "deadline", label: "截止日期" },
                      { value: "release", label: "发布" },
                      { value: "demo", label: "演示" },
                      { value: "training", label: "培训" },
                      { value: "holiday", label: "假期" },
                      { value: "personal", label: "个人" },
                      { value: "default", label: "默认" },
                    ].map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 颜色 */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    颜色
                  </label>
                  <div class="flex space-x-2">
                    {[
                      "#3B82F6",
                      "#10B981",
                      "#F59E0B",
                      "#EF4444",
                      "#8B5CF6",
                      "#EC4899",
                      "#06B6D4",
                      "#F97316",
                      "#84CC16",
                      "#6B7280",
                    ].map((color) => (
                      <button
                        key={color}
                        type="button"
                        class={`w-6 h-6 rounded-full border-2 ${formData.value.color === color ? "border-gray-800 dark:border-gray-200" : "border-transparent"}`}
                        style={{ backgroundColor: color }}
                        onClick$={() => (formData.value.color = color)}
                      />
                    ))}
                  </div>
                </div>

                {/* 时间 */}
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      开始时间 *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.value.startDate}
                      onInput$={(e) =>
                        (formData.value.startDate = (
                          e.target as HTMLInputElement
                        ).value)
                      }
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      结束时间 *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.value.endDate}
                      onInput$={(e) =>
                        (formData.value.endDate = (
                          e.target as HTMLInputElement
                        ).value)
                      }
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* 全天事件 */}
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="allDay"
                    checked={formData.value.allDay}
                    onChange$={(e) =>
                      (formData.value.allDay = (
                        e.target as HTMLInputElement
                      ).checked)
                    }
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    for="allDay"
                    class="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    全天事件
                  </label>
                </div>

                {/* 地点 */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    地点
                  </label>
                  <input
                    type="text"
                    value={formData.value.location}
                    onInput$={(e) =>
                      (formData.value.location = (
                        e.target as HTMLInputElement
                      ).value)
                    }
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="输入地点"
                  />
                </div>

                {/* 提醒 */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    提醒
                  </label>
                  <select
                    value={formData.value.reminder}
                    onChange$={(e) =>
                      (formData.value.reminder = Number(
                        (e.target as HTMLSelectElement).value,
                      ))
                    }
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={0}>不提醒</option>
                    <option value={5}>5分钟前</option>
                    <option value={15}>15分钟前</option>
                    <option value={30}>30分钟前</option>
                    <option value={60}>1小时前</option>
                    <option value={1440}>1天前</option>
                  </select>
                </div>
              </div>

              {/* 按钮 */}
              <div class="flex justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                <div>
                  {event?.id && (
                    <button
                      type="button"
                      onClick$={() => {
                        if (confirm("确定要删除这个事件吗？")) {
                          // Dispatch custom event instead of calling function prop
                          const deleteEvent = new CustomEvent('calendar:delete-event', { detail: event.id });
                          document.dispatchEvent(deleteEvent);
                          // Dispatch custom event to close modal
                          const closeEvent = new CustomEvent('calendar:close-modal');
                          document.dispatchEvent(closeEvent);
                        }
                      }}
                      class="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      删除事件
                    </button>
                  )}
                </div>
                <div class="flex space-x-3">
                  <button
                    type="button"
                    onClick$={() => {
                      // Dispatch custom event to close modal
                      const closeEvent = new CustomEvent('calendar:close-modal');
                      document.dispatchEvent(closeEvent);
                    }}
                    class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {event?.id ? "保存更改" : "创建事件"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  },
);
