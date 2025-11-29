import { component$, useSignal, $ } from "@builder.io/qwik";
import { createDashboardStore } from "~/stores/dashboard";
import { dashboardActions } from "~/stores/dashboard-actions";
import { WIDGET_TYPES } from "~/types/dashboard";

/**
 * 组件选择器
 */
export const WidgetSelector = component$(() => {
  const store = useSignal(createDashboardStore());
  const isOpen = useSignal(false);

  // 添加组件
  const addWidget = $((type: string) => {
    dashboardActions.addWidget(store.value, type);
    isOpen.value = false;
  });

  return (
    <div class="widget-selector mb-4">
      <div class="relative">
        {/* 触发按钮 */}
        <button
          class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          onClick$={() => (isOpen.value = !isOpen.value)}
        >
          <svg
            class="w-4 h-4 mr-2"
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
          添加组件
        </button>

        {/* 下拉菜单 */}
        {isOpen.value && (
          <div class="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            {/* 头部 */}
            <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                选择组件类型
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                点击组件类型添加到仪表盘
              </p>
            </div>

            {/* 组件列表 */}
            <div class="p-4 max-h-96 overflow-y-auto">
              <div class="grid grid-cols-2 gap-3">
                {Object.entries(WIDGET_TYPES).map(([type, config]) => (
                  <button
                    key={type}
                    class="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-2 border-transparent hover:border-green-300"
                    onClick$={() => addWidget(type)}
                    title={config.name}
                  >
                    <div class="text-2xl mb-2">{config.icon}</div>
                    <div class="text-sm font-medium text-gray-900 dark:text-white text-center">
                      {config.name}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {config.defaultSize.w}×{config.defaultSize.h}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 底部 */}
            <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  共 {Object.keys(WIDGET_TYPES).length} 种组件类型
                </span>
                <button
                  class="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                  onClick$={() => (isOpen.value = false)}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 遮罩层 */}
        {isOpen.value && (
          <div
            class="fixed inset-0 z-40"
            onClick$={() => (isOpen.value = false)}
          />
        )}
      </div>
    </div>
  );
});
