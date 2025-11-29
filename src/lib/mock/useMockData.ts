import { useSignal, useTask$ } from '@builder.io/qwik';
import {
  metricHighlights,
  revenueTrend,
  productPerformance,
  announcements,
  quickActions,
  securityTimeline,
  teams,
  tasks,
  type MetricDatum,
  type RevenuePoint,
  type ActivityItem,
} from './dashboard';

/**
 * KPI数据接口
 */
export interface KPIData {
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  unit?: string;
}

/**
 * Mock数据Hook
 */
export const useMockData = () => {
  // 模拟实时数据更新
  const lastUpdated = useSignal(new Date());

  useTask$(({ track }) => {
    track(() => lastUpdated.value);

    // 每30秒更新一次数据
    const interval = setInterval(() => {
      lastUpdated.value = new Date();
    }, 30000);

    return () => clearInterval(interval);
  });

  // KPI数据
  const kpiData = {
    revenue: {
      value: '¥1.82M',
      change: '+18.4%',
      trend: 'up' as const,
      unit: '',
    },
    users: {
      value: '326',
      change: '+11.2%',
      trend: 'up' as const,
      unit: '',
    },
    retention: {
      value: '97.6%',
      change: '+2.1%',
      trend: 'up' as const,
      unit: '',
    },
    security: {
      value: '1,284',
      change: '-6.7%',
      trend: 'down' as const,
      unit: '',
    },
  };

  return {
    // 基础数据
    metricHighlights,
    revenueTrend,
    productPerformance,
    announcements,
    quickActions,
    securityTimeline,
    teams,
    tasks,

    // KPI数据
    kpiData,

    // 最后更新时间
    lastUpdated: lastUpdated.value,

    // 工具函数
    getMetricByIcon: (icon: MetricDatum['icon']): MetricDatum | undefined => {
      return metricHighlights.find(metric => metric.icon === icon);
    },

    getRevenueData: () => revenueTrend,

    getProductData: () => productPerformance,

    getAnnouncements: () => announcements,

    getQuickActions: () => quickActions,

    getSecurityTimeline: () => securityTimeline,

    getTeams: () => teams,

    getTasks: () => tasks,
  };
};