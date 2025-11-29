/**
 * 日历工具函数
 */

import type { CalendarEvent, CalendarViewType, CalendarDayData } from '~/types/calendar';

/**
 * 生成日历网格数据
 */
export function generateCalendarGrid(
  currentDate: Date,
  viewType: CalendarViewType,
  events: CalendarEvent[]
): CalendarDayData[] {
  if (viewType === 'month') {
    return generateMonthGrid(currentDate, events);
  }

  // 其他视图类型返回空数组
  return [];
}

/**
 * 生成月视图网格
 */
export function generateMonthGrid(currentDate: Date, events: CalendarEvent[]): CalendarDayData[] {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 获取当月第一天和最后一天
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 获取日历网格的起始日期（周日开始）
  const startDate = new Date(firstDay);
  const startDayOfWeek = firstDay.getDay();
  startDate.setDate(firstDay.getDate() - startDayOfWeek);

  // 生成42天的网格（6周）
  const days: CalendarDayData[] = [];
  const today = new Date();

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // 获取当天的事件
    const dayEvents = events.filter(event => isEventOnDate(event, date));

    days.push({
      date,
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
      isSelected: false, // 可以在需要时设置
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      events: dayEvents
    });
  }

  return days;
}

/**
 * 检查事件是否在某一天
 */
export function isEventOnDate(event: CalendarEvent, date: Date): boolean {
  const eventStart = new Date(event.startDate);
  const eventEnd = new Date(event.endDate);
  const checkDate = new Date(date);

  // 设置时间为同一天的开始和结束
  checkDate.setHours(0, 0, 0, 0);
  eventStart.setHours(0, 0, 0, 0);
  eventEnd.setHours(23, 59, 59, 999);

  // 检查日期是否在事件时间范围内
  return checkDate.getTime() >= eventStart.getTime() &&
         checkDate.getTime() <= eventEnd.getTime();
}

/**
 * 检查两个日期是否为同一天
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

/**
 * 格式化日期
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
}

/**
 * 获取时间范围描述
 */
export function getTimeRange(startDate: Date, endDate: Date, allDay: boolean): string {
  if (allDay) {
    if (isSameDay(startDate, endDate)) {
      return '全天';
    } else {
      return `${formatDate(startDate, 'MM月DD日')} - ${formatDate(endDate, 'MM月DD日')}`;
    }
  } else {
    const startTime = formatDate(startDate, 'HH:mm');
    const endTime = formatDate(endDate, 'HH:mm');

    if (isSameDay(startDate, endDate)) {
      return `${startTime} - ${endTime}`;
    } else {
      return `${formatDate(startDate, 'MM月DD日 HH:mm')} - ${formatDate(endDate, 'MM月DD日 HH:mm')}`;
    }
  }
}

/**
 * 获取事件分类颜色
 */
export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    meeting: '#3B82F6',    // 蓝色
    task: '#10B981',       // 绿色
    reminder: '#F59E0B',   // 黄色
    deadline: '#EF4444',   // 红色
    release: '#8B5CF6',    // 紫色
    demo: '#EC4899',       // 粉色
    training: '#06B6D4',   // 青色
    holiday: '#F97316',    // 橙色
    personal: '#84CC16',   // 浅绿色
    default: '#6B7280'     // 灰色
  };

  return colorMap[category] || colorMap.default;
}

/**
 * 获取分类中文名称
 */
export function getCategoryName(category: string): string {
  const nameMap: Record<string, string> = {
    meeting: '会议',
    task: '任务',
    reminder: '提醒',
    deadline: '截止日期',
    release: '发布',
    demo: '演示',
    training: '培训',
    holiday: '假期',
    personal: '个人',
    default: '默认'
  };

  return nameMap[category] || nameMap.default;
}