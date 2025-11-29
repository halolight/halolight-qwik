import {
  component$,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import type { EChartsOption } from "echarts";
import {
  lineChartData,
  barChartData,
  pieChartData,
  scatterData,
  radarData,
} from "~/lib/mock/echarts-data";

interface EChartsWidgetProps {
  title: string;
  type: "line" | "bar" | "pie" | "scatter" | "radar";
  data?: any;
  options?: Partial<EChartsOption>;
  height?: number;
}

/**
 * ECharts 图表组件（Qwik适配版）
 */
export const EChartsWidget = component$<EChartsWidgetProps>(
  ({ title, type, data, height = 300 }) => {
    const chartRef = useSignal<HTMLDivElement | null>(null);
    const chartInstance = useSignal<any>(null);
    const isLoaded = useSignal(false);
    const theme = useSignal("light");

    // 监听主题变化 - 只在客户端执行
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => document.documentElement.getAttribute("data-theme"));
      theme.value =
        document.documentElement.getAttribute("data-theme") || "light";
    });

    // 客户端初始化ECharts
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ cleanup }) => {
      if (typeof window === "undefined" || !chartRef.value) return;

      try {
        // 动态导入ECharts
        const echarts = await import("echarts");

        // 初始化图表
        chartInstance.value = echarts.init(
          chartRef.value,
          theme.value === "dark" ? "dark" : undefined,
        );

        // 设置图表选项 - 确保参数可序列化
        const chartType = type;
        const chartData = data;
        const chartOptions = generateChartOptions(
          chartType,
          chartData,
          {}, // 使用空对象避免序列化问题
          theme.value,
        );
        chartInstance.value.setOption(chartOptions);

        isLoaded.value = true;

        // 响应式处理
        const resizeHandler = () => {
          if (chartInstance.value) {
            chartInstance.value.resize();
          }
        };

        window.addEventListener("resize", resizeHandler);

        // 清理函数
        cleanup(() => {
          if (chartInstance.value) {
            chartInstance.value.dispose();
            chartInstance.value = null;
          }
          window.removeEventListener("resize", resizeHandler);
        });
      } catch (error) {
        console.error("Failed to initialize ECharts:", error);
      }
    });

    return (
      <div class="echarts-widget h-full flex flex-col">
        <div class="flex-1" style={{ height: `${height}px` }}>
          <div
            ref={(el) => (chartRef.value = el)}
            class="w-full h-full"
            style={{ minHeight: "200px" }}
          >
            {!isLoaded.value && (
              <div class="flex items-center justify-center h-full text-gray-500">
                <div class="text-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <div class="text-sm">加载图表中...</div>
                </div>
              </div>
            )}
          </div>
        </div>

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

/**
 * 生成图表配置
 */
function generateChartOptions(
  type: string,
  data: any,
  _customOptions: Partial<EChartsOption>,
  theme: string = "light",
): EChartsOption {
  const isDark = theme === "dark";
  const textColor = isDark ? "#e0e0e0" : "#666";
  const axisLineColor = isDark ? "#444" : "#e0e0e0";
  const splitLineColor = isDark ? "#333" : "#f0f0f0";
  const backgroundColor = isDark ? "transparent" : "#fff";
  const baseOptions: EChartsOption = {
    backgroundColor,
    grid: {
      top: "10%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(255, 255, 255, 0.9)",
      borderColor: isDark ? "#444" : "#ccc",
      textStyle: {
        color: textColor,
      },
    },
    textStyle: {
      color: textColor,
      fontSize: 12,
    },
  };

  switch (type) {
    case "line":
      return {
        ...baseOptions,
        xAxis: {
          type: "category",
          data: data?.categories || lineChartData.categories,
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor },
          splitLine: { lineStyle: { color: splitLineColor } },
        },
        series: [
          {
            data: data?.values || data?.series || lineChartData.values,
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#3b82f6",
              width: 3,
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(59, 130, 246, 0.3)" },
                  { offset: 1, color: "rgba(59, 130, 246, 0.05)" },
                ],
              },
            },
          },
        ],
        ..._customOptions,
      };

    case "bar":
      return {
        ...baseOptions,
        xAxis: {
          type: "category",
          data: data?.categories || barChartData.categories,
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor },
          splitLine: { lineStyle: { color: splitLineColor } },
        },
        series: data?.series || [
          {
            data: data?.values || barChartData.values,
            type: "bar",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#3b82f6" },
                  { offset: 1, color: "#1d4ed8" },
                ],
              },
              borderRadius: [4, 4, 0, 0],
            },
          },
        ],
        ..._customOptions,
      };

    case "pie":
      return {
        ...baseOptions,
        tooltip: {
          trigger: "item",
          formatter: "{a} \u003cbr/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: textColor,
          },
        },
        series: [
          {
            name: data?.name || "数据分布",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: isDark ? "#1f2937" : "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "18",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data?.items || pieChartData.items,
          },
        ],
        ..._customOptions,
      };

    case "scatter":
      return {
        ...baseOptions,
        xAxis: {
          type: "value",
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor },
          splitLine: { lineStyle: { color: splitLineColor } },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor },
          splitLine: { lineStyle: { color: splitLineColor } },
        },
        series: [
          {
            symbolSize: 20,
            data: data?.points || scatterData.points,
            type: "scatter",
          },
        ],
        ..._customOptions,
      };

    case "radar":
      return {
        ...baseOptions,
        radar: {
          indicator: data?.indicators || radarData.indicators,
          shape: "polygon",
          splitNumber: 5,
          axisName: {
            color: textColor,
          },
          splitLine: {
            lineStyle: {
              color: axisLineColor,
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: axisLineColor,
            },
          },
        },
        series: [
          {
            name: data?.name || radarData.name,
            type: "radar",
            lineStyle: {
              color: "#3b82f6",
              width: 2,
            },
            areaStyle: {
              color: "rgba(59, 130, 246, 0.3)",
            },
            data: [
              {
                value: data?.values || radarData.values,
                name: "预算分配",
              },
            ],
          },
        ],
        ..._customOptions,
      };

    default:
      return baseOptions;
  }
}
