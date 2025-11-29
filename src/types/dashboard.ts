/**
 * 仪表盘相关类型定义
 */

// 组件类型
export type WidgetType =
  | "stats"
  | "chart-line"
  | "chart-bar"
  | "chart-pie"
  | "chart-line-echarts"
  | "chart-bar-echarts"
  | "chart-pie-echarts"
  | "chart-scatter-echarts"
  | "chart-radar-echarts"
  | "recent-users"
  | "notifications"
  | "tasks"
  | "calendar"
  | "quick-actions";

// 仪表盘组件配置
export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  config?: Record<string, unknown>;
}

// GridStack布局项
export interface DashboardLayout {
  i: string; // widget ID
  x: number; // 列位置 (0-11)
  y: number; // 行位置
  w: number; // 宽度 (1-12)
  h: number; // 高度
  minW?: number; // 最小宽度
  minH?: number; // 最小高度
  maxW?: number; // 最大宽度
  maxH?: number; // 最大高度
}

// 仪表盘状态
export interface DashboardState {
  widgets: DashboardWidget[];
  layouts: DashboardLayout[];
  isEditing: boolean;
  isLoading: boolean;
  error?: string;
}

// 响应式布局配置
export interface ResponsiveLayouts {
  lg: DashboardLayout[]; // 桌面端 (>=1200px)
  md: DashboardLayout[]; // 平板端 (>=996px)
  sm: DashboardLayout[]; // 移动端 (>=768px)
  xs: DashboardLayout[]; // 小屏 (<768px)
}

// 默认布局配置
export const DEFAULT_LAYOUTS: ResponsiveLayouts = {
  lg: [
    { i: "revenue", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "users", x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "retention", x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "security", x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "revenue-chart", x: 0, y: 2, w: 8, h: 4, minW: 4, minH: 3 },
    { i: "snapshots", x: 8, y: 2, w: 4, h: 4, minW: 3, minH: 3 },
    { i: "announcements", x: 0, y: 6, w: 6, h: 3, minW: 3, minH: 2 },
    { i: "products", x: 6, y: 6, w: 6, h: 3, minW: 3, minH: 2 },
    { i: "audit-log", x: 0, y: 9, w: 6, h: 4, minW: 4, minH: 3 },
    { i: "team-progress", x: 6, y: 9, w: 6, h: 4, minW: 4, minH: 3 },
  ],
  md: [
    { i: "revenue", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "users", x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "retention", x: 0, y: 2, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "security", x: 3, y: 2, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "revenue-chart", x: 0, y: 4, w: 6, h: 4, minW: 4, minH: 3 },
    { i: "snapshots", x: 0, y: 8, w: 6, h: 4, minW: 3, minH: 3 },
    { i: "announcements", x: 0, y: 12, w: 6, h: 3, minW: 3, minH: 2 },
    { i: "products", x: 0, y: 15, w: 6, h: 3, minW: 3, minH: 2 },
    { i: "audit-log", x: 0, y: 18, w: 6, h: 4, minW: 4, minH: 3 },
    { i: "team-progress", x: 0, y: 22, w: 6, h: 4, minW: 4, minH: 3 },
  ],
  sm: [
    { i: "revenue", x: 0, y: 0, w: 2, h: 2, minW: 1, minH: 2 },
    { i: "users", x: 2, y: 0, w: 2, h: 2, minW: 1, minH: 2 },
    { i: "retention", x: 0, y: 2, w: 2, h: 2, minW: 1, minH: 2 },
    { i: "security", x: 2, y: 2, w: 2, h: 2, minW: 1, minH: 2 },
    { i: "revenue-chart", x: 0, y: 4, w: 4, h: 4, minW: 2, minH: 3 },
    { i: "snapshots", x: 0, y: 8, w: 4, h: 4, minW: 2, minH: 3 },
    { i: "announcements", x: 0, y: 12, w: 4, h: 3, minW: 2, minH: 2 },
    { i: "products", x: 0, y: 15, w: 4, h: 3, minW: 2, minH: 2 },
    { i: "audit-log", x: 0, y: 18, w: 4, h: 4, minW: 2, minH: 3 },
    { i: "team-progress", x: 0, y: 22, w: 4, h: 4, minW: 2, minH: 3 },
  ],
  xs: [
    { i: "revenue", x: 0, y: 0, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "users", x: 0, y: 2, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "retention", x: 0, y: 4, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "security", x: 0, y: 6, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "revenue-chart", x: 0, y: 8, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "snapshots", x: 0, y: 12, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "announcements", x: 0, y: 16, w: 1, h: 3, minW: 1, minH: 2 },
    { i: "products", x: 0, y: 19, w: 1, h: 3, minW: 1, minH: 2 },
    { i: "audit-log", x: 0, y: 22, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "team-progress", x: 0, y: 26, w: 1, h: 4, minW: 1, minH: 3 },
  ],
};

// 默认组件列表
export const DEFAULT_WIDGETS: DashboardWidget[] = [
  { id: "revenue", type: "stats", title: "总收入" },
  { id: "users", type: "stats", title: "活跃用户" },
  { id: "retention", type: "stats", title: "用户留存率" },
  { id: "security", type: "stats", title: "安全拦截" },
  { id: "revenue-chart", type: "chart-line", title: "收入趋势" },
  { id: "snapshots", type: "quick-actions", title: "智能快照" },
  { id: "announcements", type: "notifications", title: "公告中心" },
  { id: "products", type: "stats", title: "产品线表现" },
  { id: "audit-log", type: "recent-users", title: "实时审计" },
  { id: "team-progress", type: "tasks", title: "团队进度" },
];

// 可用组件类型配置
export const WIDGET_TYPES = {
  stats: {
    name: "统计卡片",
    icon: "📊",
    minW: 2,
    minH: 2,
    defaultSize: { w: 3, h: 2 },
  },
  "chart-line": {
    name: "折线图",
    icon: "📈",
    minW: 4,
    minH: 3,
    defaultSize: { w: 8, h: 4 },
  },
  "chart-bar": {
    name: "柱状图",
    icon: "📊",
    minW: 4,
    minH: 3,
    defaultSize: { w: 6, h: 4 },
  },
  "chart-pie": {
    name: "饼图",
    icon: "🥧",
    minW: 3,
    minH: 3,
    defaultSize: { w: 4, h: 4 },
  },
  "recent-users": {
    name: "最近用户",
    icon: "👥",
    minW: 4,
    minH: 3,
    defaultSize: { w: 6, h: 4 },
  },
  notifications: {
    name: "通知公告",
    icon: "🔔",
    minW: 3,
    minH: 2,
    defaultSize: { w: 6, h: 3 },
  },
  tasks: {
    name: "任务管理",
    icon: "✅",
    minW: 4,
    minH: 3,
    defaultSize: { w: 6, h: 4 },
  },
  calendar: {
    name: "日历",
    icon: "📅",
    minW: 3,
    minH: 3,
    defaultSize: { w: 4, h: 4 },
  },
  "quick-actions": {
    name: "快捷操作",
    icon: "⚡",
    minW: 3,
    minH: 3,
    defaultSize: { w: 4, h: 4 },
  },
  "chart-line-echarts": {
    name: "ECharts折线图",
    icon: "📈",
    minW: 4,
    minH: 3,
    defaultSize: { w: 8, h: 4 },
  },
  "chart-bar-echarts": {
    name: "ECharts柱状图",
    icon: "📊",
    minW: 4,
    minH: 3,
    defaultSize: { w: 6, h: 4 },
  },
  "chart-pie-echarts": {
    name: "ECharts饼图",
    icon: "🥧",
    minW: 3,
    minH: 3,
    defaultSize: { w: 4, h: 4 },
  },
  "chart-scatter-echarts": {
    name: "ECharts散点图",
    icon: "🔵",
    minW: 4,
    minH: 3,
    defaultSize: { w: 6, h: 4 },
  },
  "chart-radar-echarts": {
    name: "ECharts雷达图",
    icon: "🎯",
    minW: 4,
    minH: 3,
    defaultSize: { w: 6, h: 4 },
  },
} as const;
