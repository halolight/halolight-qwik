import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
}

interface RecentUsersWidgetProps {
  title?: string;
}

/**
 * 最近用户小部件
 * 显示最近注册或活跃的用户列表
 */
export const RecentUsersWidget = component$<RecentUsersWidgetProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ title = "最近用户" }) => {
    const users = useSignal<User[]>([]);
    const isLoading = useSignal(true);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
      try {
        // 模拟 API 调用
        await new Promise((resolve) => setTimeout(resolve, 500));
        users.value = [
          {
            id: "1",
            name: "张三",
            email: "zhangsan@example.com",
            joinedAt: "刚刚",
          },
          {
            id: "2",
            name: "李四",
            email: "lisi@example.com",
            joinedAt: "5分钟前",
          },
          {
            id: "3",
            name: "王五",
            email: "wangwu@example.com",
            joinedAt: "10分钟前",
          },
          {
            id: "4",
            name: "赵六",
            email: "zhaoliu@example.com",
            joinedAt: "30分钟前",
          },
          {
            id: "5",
            name: "孙七",
            email: "sunqi@example.com",
            joinedAt: "1小时前",
          },
        ];
      } finally {
        isLoading.value = false;
      }
    });

    const getInitials = (name: string) => {
      return name.charAt(0).toUpperCase();
    };

    const getAvatarColor = (id: string) => {
      const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-yellow-500",
        "bg-indigo-500",
      ];
      const index = parseInt(id, 10) % colors.length;
      return colors[index];
    };

    return (
      <div class="h-full">
        {isLoading.value ? (
          <div class="flex items-center justify-center h-32 text-gray-500">
            加载中...
          </div>
        ) : (
          <div class="space-y-3">
            {users.value.map((user) => (
              <div
                key={user.id}
                class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div
                  class={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(user.id)}`}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      class="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
                <span class="text-xs text-gray-400 whitespace-nowrap">
                  {user.joinedAt}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
