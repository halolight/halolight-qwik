import { Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useAuthProvider } from "~/stores/auth";
import { useThemeProvider, type ThemeMode } from "~/stores/theme";

const THEME_KEY = "halolight-theme";

export default component$(() => {
  useAuthProvider();
  const theme = useSignal<ThemeMode>("light");
  useThemeProvider(theme);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (stored) {
      theme.value = stored;
      return;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    theme.value = prefersDark ? "dark" : "light";
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const current = track(() => theme.value);
    document.documentElement.dataset.theme = current;
    localStorage.setItem(THEME_KEY, current);
  });

  return (
    <div class="min-h-screen bg-background text-foreground">
      <Slot />
    </div>
  );
});
