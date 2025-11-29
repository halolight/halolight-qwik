import {
  Slot,
  component$,
  useOnDocument,
  useSignal,
  useTask$,
  $,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Sidebar } from "~/components/layout/sidebar";
import { Header } from "~/components/layout/header";
import { Footer } from "~/components/layout/footer";
import { TabBar } from "~/components/layout/TabBar";
import { CommandMenu } from "~/components/command/CommandMenu";
import { NotificationProvider } from "~/components/notifications/NotificationProvider";
import { WebSocketProvider } from "~/components/websocket/WebSocketProvider";
import { AUTH_TOKEN_COOKIE, AUTH_USER_COOKIE, parseUser } from "~/lib/session";
import { useAuth } from "~/stores/auth";
import type { AuthUser } from "~/stores/auth";
type DashboardSession = {
  token: string;
  user: AuthUser;
};

export const useDashboardSession = routeLoader$<DashboardSession>(
  async ({ cookie, redirect }) => {
    const token = cookie.get(AUTH_TOKEN_COOKIE)?.value;
    const userCookie = cookie.get(AUTH_USER_COOKIE)?.value;
    const user = parseUser(userCookie);

    if (!token || !user) {
      throw redirect(302, "/login");
    }

    return {
      token,
      user,
    };
  },
);

export default component$(() => {
  const sidebarOpen = useSignal(false);
  const session = useDashboardSession();
  const { login } = useAuth();

  useTask$(({ track }) => {
    const data = track(() => session.value);
    if (data?.user && data?.token) {
      login(data);
    }
  });

  useOnDocument(
    "keydown",
    $((event) => {
      if (event.key === "Escape" && sidebarOpen.value) {
        sidebarOpen.value = false;
      }
    }),
  );

  return (
    <WebSocketProvider>
      <NotificationProvider>
        <div class="relative min-h-screen bg-background text-foreground lg:flex">
          <Sidebar isOpen={sidebarOpen} />
          <div class="flex min-h-screen w-full flex-col lg:pl-80">
            <Header sidebar={sidebarOpen} />
            <TabBar />
            <main class="flex-1 px-4 pb-10 pt-6 lg:px-8">
              <Slot />
            </main>
            <Footer />
          </div>
          <CommandMenu />
        </div>
      </NotificationProvider>
    </WebSocketProvider>
  );
});
