export type ThemeType = "system" | "dark" | "light";

export type ResolvedThemeType = "dark" | "light";

export type ThemeProviderValue = {
  theme: ThemeType;
  resolvedTheme: ResolvedThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};
