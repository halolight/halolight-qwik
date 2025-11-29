/**
 * 日历事件类型
 */
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  color: string;
  category: CalendarEventCategory;
  location?: string;
  attendees?: string[];
  reminder?: number; // 提前提醒时间（分钟）
  recurrence?: CalendarRecurrence;
}

/**
 * 日历事件分类
 */
export type CalendarEventCategory =
  | "meeting"
  | "task"
  | "reminder"
  | "deadline"
  | "release"
  | "demo"
  | "training"
  | "holiday"
  | "personal"
  | "default";

/**
 * 日历视图类型
 */
export type CalendarViewType = "day" | "week" | "month";

/**
 * 重复规则
 */
export interface CalendarRecurrence {
  type: "daily" | "weekly" | "monthly" | "yearly";
  interval: number; // 间隔
  endDate?: Date; // 结束日期
  count?: number; // 重复次数
  daysOfWeek?: number[]; // 周几（0-6，0是周日）
}

/**
 * 日历设置
 */
export interface CalendarSettings {
  firstDayOfWeek: 0 | 1 | 6; // 0=周日, 1=周一, 6=周六
  workingHours: {
    start: string; // HH:mm
    end: string; // HH:mm
  };
  defaultView: CalendarViewType;
  showWeekNumbers: boolean;
  timeFormat: "12h" | "24h";
}

/**
 * 日历月视图数据
 */
export interface CalendarMonthData {
  year: number;
  month: number;
  weeks: CalendarWeekData[];
}

/**
 * 日历周视图数据
 */
export interface CalendarWeekData {
  weekNumber: number;
  days: CalendarDayData[];
}

/**
 * 日历日视图数据
 */
export interface CalendarDayData {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
}

/**
 * 日历时间槽
 */
export interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
  events: CalendarEvent[];
}
