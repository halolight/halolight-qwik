import { component$ } from "@builder.io/qwik";
import { useMockData } from "~/lib/mock/useMockData";

interface StatsWidgetProps {
  title: string;
  type: "revenue" | "users" | "retention" | "security" | "products";
}

/**
 * 统计卡片组件
 */
export const StatsWidget = component$<StatsWidgetProps>(({ title, type }) => {
  const { kpiData } = useMockData();

  // 获取对应的KPI数据
  const getKPIData = () => {
    switch (type) {
      case "revenue":
        return {
          value: kpiData.revenue.value,
          change: kpiData.revenue.change,
          trend: kpiData.revenue.trend,
          unit: kpiData.revenue.unit,
        };
      case "users":
        return {
          value: kpiData.users.value,
          change: kpiData.users.change,
          trend: kpiData.users.trend,
          unit: kpiData.users.unit,
        };
      case "retention":
        return {
          value: kpiData.retention.value,
          change: kpiData.retention.change,
          trend: kpiData.retention.trend,
          unit: kpiData.retention.unit,
        };
      case "security":
        return {
          value: kpiData.security.value,
          change: kpiData.security.change,
          trend: kpiData.security.trend,
          unit: kpiData.security.unit,
        };
      case "products":
        return {
          value: "¥2.8M",
          change: "+12.3%",
          trend: "up",
          unit: "",
        };
      default:
        return {
          value: "0",
          change: "0%",
          trend: "stable",
          unit: "",
        };
    }
  };

  const data = getKPIData();

  // 获取趋势图标
  const getTrendIcon = () => {
    switch (data.trend) {
      case "up":
        return (
          <svg
            class="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        );
      case "down":
        return (
          <svg
            class="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        );
      default:
        return (
          <svg
            class="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14"
            />
          </svg>
        );
    }
  };

  // 获取变化颜色
  const getChangeColor = () => {
    if (data.change.startsWith("+"))
      return "text-green-600 dark:text-green-400";
    if (data.change.startsWith("-")) return "text-red-600 dark:text-red-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div class="stats-widget h-full flex flex-col">
      <div class="flex-1 flex flex-col justify-center">
        {/* 主要数值 */}
        <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {data.value}
          {data.unit && (
            <span class="text-lg text-gray-500 dark:text-gray-400 ml-1">
              {data.unit}
            </span>
          )}
        </div>

        {/* 变化趋势 */}
        <div class="flex items-center space-x-2">
          <div class={getChangeColor()}>{data.change}</div>
          {getTrendIcon()}
        </div>

        {/* 副标题 */}
        <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">较上期</div>
      </div>

      {/* 底部装饰 */}
      <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{title}</span>
          <span>实时更新</span>
        </div>
      </div>
    </div>
  );
});
