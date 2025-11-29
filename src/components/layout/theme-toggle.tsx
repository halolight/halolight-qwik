import { component$ } from "@builder.io/qwik";
import { MoonIcon, SunIcon } from "~/components/icons";
import { useTheme } from "~/stores/theme";

export const ThemeToggle = component$(() => {
  const { mode, toggle } = useTheme();

  return (
    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 text-muted-foreground transition hover:border-primary/50 hover:text-primary"
      onClick$={toggle}
      aria-label="Toggle theme"
    >
      {mode.value === "light" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
});
