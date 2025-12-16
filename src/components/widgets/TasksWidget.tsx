import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface Task {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
}

interface TasksWidgetProps {
  title?: string;
}

/**
 * 任务列表小部件
 * 显示待办任务列表，包含状态和优先级标记
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TasksWidget = component$<TasksWidgetProps>(({ title = "任务列表" }) => {
  const tasks = useSignal<Task[]>([]);
  const isLoading = useSignal(true);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 500));
      tasks.value = [
        {
          id: "1",
          title: "完成项目文档",
          status: "in_progress",
          priority: "high",
        },
        {
          id: "2",
          title: "代码审查",
          status: "completed",
          priority: "medium",
        },
        {
          id: "3",
          title: "团队周会",
          status: "pending",
          priority: "high",
        },
        {
          id: "4",
          title: "优化数据库查询",
          status: "in_progress",
          priority: "medium",
        },
        {
          id: "5",
          title: "更新依赖包",
          status: "pending",
          priority: "low",
        },
      ];
    } finally {
      isLoading.value = false;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "in_progress":
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in_progress":
        return "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "已完成";
      case "in_progress":
        return "进行中";
      default:
        return "待处理";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "高";
      case "medium":
        return "中";
      default:
        return "低";
    }
  };

  return (
    <div class="h-full">
      {isLoading.value ? (
        <div class="flex items-center justify-center h-32 text-gray-500">
          加载中...
        </div>
      ) : (
        <div class="space-y-3">
          {tasks.value.map((task) => (
            <div
              key={task.id}
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div class={getStatusClass(task.status)}>
                {getStatusIcon(task.status)}
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class={`text-sm font-medium ${
                    task.status === "completed"
                      ? "line-through text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.title}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {getStatusLabel(task.status)}
                </p>
              </div>
              <span
                class={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityClass(task.priority)}`}
              >
                {getPriorityLabel(task.priority)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
