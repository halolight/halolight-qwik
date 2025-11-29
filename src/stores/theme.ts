import {
  $,
  createContextId,
  useContext,
  useContextProvider,
  type QRL,
  type Signal,
} from "@builder.io/qwik";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: Signal<ThemeMode>;
  toggle: QRL<() => void>;
  setMode: QRL<(mode: ThemeMode) => void>;
};

const ThemeContext = createContextId<ThemeContextValue>(
  "halolight.theme.context",
);

export const useThemeProvider = (mode: Signal<ThemeMode>) => {
  const toggle = $(() => {
    mode.value = mode.value === "light" ? "dark" : "light";
  });

  const setMode = $((next: ThemeMode) => {
    mode.value = next;
  });

  useContextProvider(ThemeContext, {
    mode,
    toggle,
    setMode,
  });
};

export const useTheme = () => useContext(ThemeContext);
