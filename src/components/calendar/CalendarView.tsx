import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarSidebar } from "./CalendarSidebar";
import { CalendarEventModal } from "./CalendarEventModal";
import type { CalendarEvent, CalendarViewType } from "~/types/calendar";

/**
 * 日历视图组件
 */
export const CalendarView = component$(() => {
  const currentDate = useSignal(new Date());
  const viewType = useSignal<CalendarViewType>("month");
  const events = useSignal<CalendarEvent[]>([]);
  const selectedEvent = useSignal<CalendarEvent | null>(null);
  const isModalOpen = useSignal(false);

  // 加载日历事件数据
  useTask$(async ({ track }) => {
    track(() => currentDate.value);
    track(() => viewType.value);

    // 模拟加载事件数据
    events.value = await loadCalendarEvents(currentDate.value);
  });

  // 监听自定义事件
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const handleNewEvent = () => {
      selectedEvent.value = {
        id: "",
        title: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 60 * 1000), // 1小时后
        allDay: false,
        color: "#3B82F6",
        category: "default",
      };
      isModalOpen.value = true;
    };

    // 监听事件点击
    const handleEventClick = (event: CustomEvent) => {
      selectedEvent.value = event.detail;
      isModalOpen.value = true;
    };

    // 监听日期点击
    const handleDateClick = (event: CustomEvent) => {
      const date = event.detail;
      selectedEvent.value = {
        id: "",
        title: "",
        description: "",
        startDate: date,
        endDate: date,
        allDay: true,
        color: "#3B82F6",
        category: "default",
      };
      isModalOpen.value = true;
    };

    // 监听视图切换
    const handleViewChange = (event: CustomEvent) => {
      viewType.value = event.detail;
    };

    // 监听跳转到今天
    const handleGoToday = () => {
      currentDate.value = new Date();
    };

    // 监听日期改变
    const handleDateChange = (event: CustomEvent) => {
      const newDate = event.detail as Date;
      currentDate.value = newDate;
    };

    // 监听事件保存
    const handleEventSave = (event: CustomEvent) => {
      const eventData = event.detail as CalendarEvent;
      if (eventData.id) {
        // 更新现有事件
        events.value = events.value.map((e) => (e.id === eventData.id ? eventData : e));
      } else {
        // 添加新事件
        const newEvent = { ...eventData, id: `event-${Date.now()}` };
        events.value = [...events.value, newEvent];
      }
      isModalOpen.value = false;
    };

    // 监听事件删除
    const handleEventDelete = (event: CustomEvent) => {
      const eventId = event.detail;
      events.value = events.value.filter((e) => e.id !== eventId);
      isModalOpen.value = false;
    };

    // 监听模态框关闭
    const handleModalClose = () => {
      isModalOpen.value = false;
    };

    // 添加事件监听器
    window.addEventListener("calendar:new-event", handleNewEvent as EventListener);
    window.addEventListener("calendar:event-click", handleEventClick as EventListener);
    window.addEventListener("calendar:date-click", handleDateClick as EventListener);
    window.addEventListener("calendar:view-change", handleViewChange as EventListener);
    window.addEventListener("calendar:go-today", handleGoToday as EventListener);
    window.addEventListener("calendar:date-change", handleDateChange as EventListener);
    window.addEventListener("calendar:save-event", handleEventSave as EventListener);
    window.addEventListener("calendar:delete-event", handleEventDelete as EventListener);
    window.addEventListener("calendar:close-modal", handleModalClose as EventListener);

    cleanup(() => {
      window.removeEventListener("calendar:new-event", handleNewEvent as EventListener);
      window.removeEventListener("calendar:event-click", handleEventClick as EventListener);
      window.removeEventListener("calendar:date-click", handleDateClick as EventListener);
      window.removeEventListener("calendar:view-change", handleViewChange as EventListener);
      window.removeEventListener("calendar:go-today", handleGoToday as EventListener);
      window.removeEventListener("calendar:date-change", handleDateChange as EventListener);
      window.removeEventListener("calendar:save-event", handleEventSave as EventListener);
      window.removeEventListener("calendar:delete-event", handleEventDelete as EventListener);
      window.removeEventListener("calendar:close-modal", handleModalClose as EventListener);
    });
  });

  return (
    <div class="calendar-view h-full">
      <div class="flex h-full gap-6">
        {/* 侧边栏 */}
        <CalendarSidebar
          events={events.value}
        />

        {/* 主内容区 */}
        <div class="flex-1 flex flex-col">
          {/* 头部 */}
          <CalendarHeader
            currentDate={currentDate.value}
            viewType={viewType.value}
          />

          {/* 日历网格 */}
          <CalendarGrid
            currentDate={currentDate.value}
            viewType={viewType.value}
            events={events.value}
          />
        </div>
      </div>

      {/* 事件模态框 */}
      <CalendarEventModal
        isOpen={isModalOpen.value}
        event={selectedEvent.value}
      />
    </div>
  );
});

// 模拟加载日历事件
async function loadCalendarEvents(
  date: Date,
): Promise<CalendarEvent[]> {
  // 模拟API延迟
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      title: "团队会议",
      description: "每周例行团队会议，讨论项目进展",
      startDate: new Date(date.getFullYear(), date.getMonth(), 15, 10, 0),
      endDate: new Date(date.getFullYear(), date.getMonth(), 15, 11, 30),
      allDay: false,
      color: "#3B82F6",
      category: "meeting",
    },
    {
      id: "2",
      title: "产品发布",
      description: "新版本产品发布",
      startDate: new Date(date.getFullYear(), date.getMonth(), 20, 9, 0),
      endDate: new Date(date.getFullYear(), date.getMonth(), 20, 18, 0),
      allDay: false,
      color: "#10B981",
      category: "release",
    },
    {
      id: "3",
      title: "客户演示",
      description: "向重要客户演示新功能",
      startDate: new Date(date.getFullYear(), date.getMonth(), 25, 14, 0),
      endDate: new Date(date.getFullYear(), date.getMonth(), 25, 16, 0),
      allDay: false,
      color: "#F59E0B",
      category: "demo",
    },
    {
      id: "4",
      title: "培训日",
      description: "新员工培训",
      startDate: new Date(date.getFullYear(), date.getMonth(), 8, 0, 0),
      endDate: new Date(date.getFullYear(), date.getMonth(), 8, 23, 59),
      allDay: true,
      color: "#8B5CF6",
      category: "training",
    },
  ];
}
