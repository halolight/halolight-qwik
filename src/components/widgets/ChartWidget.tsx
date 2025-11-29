import { component$ } from "@builder.io/qwik";
import { useMockData } from "~/lib/mock/useMockData";

interface ChartWidgetProps {
  title: string;
  type: "line" | "bar" | "pie";
  chartData?: any;
}

/**
 * 图表组件
 */
export const ChartWidget = component$<ChartWidgetProps>(
  ({ title, type, chartData }) => {
    const { revenueTrend, productPerformance } = useMockData();

    // 获取图表数据
    const getChartData = () => {
      if (chartData) return chartData;

      switch (type) {
        case "line":
          return revenueTrend;
        case "bar":
          return productPerformance;
        case "pie":
          return [
            { name: "产品A", value: 35, color: "#3B82F6" },
            { name: "产品B", value: 25, color: "#10B981" },
            { name: "产品C", value: 20, color: "#F59E0B" },
            { name: "产品D", value: 20, color: "#EF4444" },
          ];
        default:
          return revenueTrend;
      }
    };

    const data = getChartData();

    // 渲染折线图
    const renderLineChart = () => {
      const maxValue = Math.max(...data.map((d: any) => d.value));
      const minValue = Math.min(...data.map((d: any) => d.value));
      const range = maxValue - minValue;

      // 生成SVG路径
      const points = data
        .map((item: any, index: number) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item.value - minValue) / range) * 80 - 10;
          return `${x},${y}`;
        })
        .join(" ");

      return (
        <div class="h-full flex flex-col">
          <div class="flex-1 relative">
            <svg
              class="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* 网格线 */}
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="#f3f4f6"
                    stroke-width="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" opacity="0.5" />

              {/* 面积图 */}
              <defs>
                <linearGradient
                  id="areaGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.3" />
                  <stop
                    offset="100%"
                    stop-color="#3B82F6"
                    stop-opacity="0.05"
                  />
                </linearGradient>
              </defs>

              <path
                d={`M 0,100 L ${points} L 100,100 Z`}
                fill="url(#areaGradient)"
              />

              {/* 线条 */}
              <polyline
                points={points}
                fill="none"
                stroke="#3B82F6"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              {/* 数据点 */}
              {data.map((item: any, index: number) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((item.value - minValue) / range) * 80 - 10;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#3B82F6"
                    class="hover:r-4 transition-all"
                  />
                );
              })}
            </svg>
          </div>

          {/* X轴标签 */}
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            {data.slice(0, 5).map((item: any, index: number) => (
              <span key={index}>{item.label}</span>
            ))}
          </div>
        </div>
      );
    };

    // 渲染柱状图
    const renderBarChart = () => {
      const maxValue = Math.max(...data.map((d: any) => d.value));

      return (
        <div class="h-full flex flex-col">
          <div class="flex-1 flex items-end space-x-2 p-4">
            {data.map((item: any, index: number) => {
              const height = (item.value / maxValue) * 80;
              const colors = [
                "#3B82F6",
                "#10B981",
                "#F59E0B",
                "#EF4444",
                "#8B5CF6",
              ];
              const color = colors[index % colors.length];

              return (
                <div key={index} class="flex-1 flex flex-col items-center">
                  <div
                    class="w-full rounded-t transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      backgroundColor: color,
                      minHeight: "4px",
                    }}
                    title={`${item.name}: ${item.value}`}
                  />
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Y轴标签 */}
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>0</span>
            <span>{Math.round(maxValue / 2)}</span>
            <span>{maxValue}</span>
          </div>
        </div>
      );
    };

    // 渲染饼图
    const renderPieChart = () => {
      const total = data.reduce(
        (sum: number, item: any) => sum + item.value,
        0,
      );
      let currentAngle = 0;

      return (
        <div class="h-full flex items-center justify-center">
          <div class="relative w-32 h-32">
            <svg class="w-full h-full" viewBox="0 0 100 100">
              {data.map((item: any, index: number) => {
                const angle = (item.value / total) * 360;
                const radius = 40;
                const centerX = 50;
                const centerY = 50;

                // 计算路径
                const startAngle = (currentAngle * Math.PI) / 180;
                const endAngle = ((currentAngle + angle) * Math.PI) / 180;

                const x1 = centerX + radius * Math.cos(startAngle);
                const y1 = centerY + radius * Math.sin(startAngle);
                const x2 = centerX + radius * Math.cos(endAngle);
                const y2 = centerY + radius * Math.sin(endAngle);

                const largeArcFlag = angle > 180 ? 1 : 0;

                const pathData = [
                  `M ${centerX} ${centerY}`,
                  `L ${x1} ${y1}`,
                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  "Z",
                ].join(" ");

                currentAngle += angle;

                return (
                  <g key={index}>
                    <path
                      d={pathData}
                      fill={item.color}
                      class="hover:opacity-80 transition-opacity"
                    />
                    <title>{`${item.name}: ${item.value}%`}</title>
                  </g>
                );
              })}
            </svg>

            {/* 图例 */}
            <div class="absolute -right-32 top-0 w-28">
              {data.map((item: any, index: number) => (
                <div key={index} class="flex items-center mb-2 text-xs">
                  <div
                    class="w-3 h-3 rounded mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span class="text-gray-600 dark:text-gray-400">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div class="chart-widget h-full flex flex-col">
        <div class="flex-1">
          {type === "line" && renderLineChart()}
          {type === "bar" && renderBarChart()}
          {type === "pie" && renderPieChart()}
        </div>

        {/* 底部信息 */}
        <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{title}</span>
            <span>实时更新</span>
          </div>
        </div>
      </div>
    );
  },
);
