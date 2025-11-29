import { component$, useSignal } from "@builder.io/qwik";
import { createDashboardStore } from "~/stores/dashboard";
import { dashboardActions } from "~/stores/dashboard-actions";

/**
 * 仪表盘工具栏
 */
export const DashboardToolbar = component$(() => {
  const store = useSignal(createDashboardStore());

  return (
    <div class="dashboard-toolbar mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            运营驾驶舱
          </h1>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {store.value.widgets.length} 个组件
          </div>
        </div>

        <div class="flex items-center space-x-3">
          {/* 编辑模式切换 */}
          <button
            class={`px-4 py-2 rounded-lg font-medium transition-colors ${
              store.value.isEditing
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick$={() => {
              const newEditingState = !store.value.isEditing;
              dashboardActions.setEditing(store.value, newEditingState);
              // 触发自定义事件供CommandMenu和其他组件监听
              const event = new CustomEvent("dashboard:edit-mode", {
                detail: { enabled: newEditingState },
              });
              window.dispatchEvent(event);
            }}
          >
            {store.value.isEditing ? "退出编辑" : "编辑布局"}
          </button>

          {/* 编辑模式下的额外操作 */}
          {store.value.isEditing && (
            <>
              {/* 添加组件 */}
              <button
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                onClick$={() => {
                  // 打开组件选择器
                  const selector = document.getElementById("widget-selector");
                  if (selector) {
                    selector.classList.toggle("hidden");
                  }
                  // 触发添加组件事件供CommandMenu和其他组件监听
                  const event = new CustomEvent("dashboard:add-widget");
                  window.dispatchEvent(event);
                }}
              >
                添加组件
              </button>

              {/* 重置布局 */}
              <button
                class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                onClick$={() => {
                  if (
                    confirm(
                      "确定要重置为默认布局吗？此操作将清除所有自定义设置。",
                    )
                  ) {
                    dashboardActions.resetLayout(store.value);
                    // 触发重置事件供CommandMenu和其他组件监听
                    const event = new CustomEvent("dashboard:reset-layout");
                    window.dispatchEvent(event);
                  }
                }}
              >
                重置布局
              </button>
            </>
          )}

          {/* 刷新数据 */}
          <button
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick$={() => {
              // 重新加载数据
              dashboardActions.loadLayout(store.value);
            }}
          >
            刷新
          </button>
        </div>
      </div>

      {/* 编辑模式提示 */}
      {store.value.isEditing && (
        <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                编辑模式已启用
              </h3>
              <div class="mt-1 text-sm text-blue-700 dark:text-blue-300">
                <ul class="list-disc list-inside space-y-1">
                  <li>拖拽组件标题栏可以移动位置</li>
                  <li>拖拽组件右下角可以调整大小</li>
                  <li>点击组件右上角的 × 可以删除组件</li>
                  <li>使用"添加组件"按钮可以添加新的组件</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 错误状态 */}
      {store.value.error && (
        <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                错误
              </h3>
              <div class="mt-1 text-sm text-red-700 dark:text-red-300">
                {store.value.error}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
