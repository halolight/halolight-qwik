import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CalendarView } from "~/components/calendar/CalendarView";

export default component$(() => {
  return (
    <div class="calendar-page">
      <CalendarView />
    </div>
  );
});

export const head: DocumentHead = {
  title: "日历 · HaloLight Qwik",
  meta: [
    {
      name: "description",
      content: "日历功能：事件管理、日程安排、提醒通知",
    },
  ],
};
