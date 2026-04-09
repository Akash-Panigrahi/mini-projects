import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ResolvedThemeType, ThemeProviderValue, ThemeType } from "./types";

const ThemeContext = createContext<ThemeProviderValue | null>(null);

const STORAGE_KEY = "app-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem(STORAGE_KEY) as ThemeType) || "system",
  );

  const getSystemTheme = (): ResolvedThemeType => {
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefers ? "dark" : "light";
  };

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedThemeType>(
    theme === "system" ? getSystemTheme() : theme,
  );

  const applyTheme = (theme: ThemeType) => {
    document.documentElement.dataset.theme = theme;
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);

    const newResolvedTheme = theme === "system" ? getSystemTheme() : theme;

    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const systemTheme = getSystemTheme();
      setResolvedTheme(systemTheme);
      applyTheme(systemTheme);
    };

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return ctx;
}
