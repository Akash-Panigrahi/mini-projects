import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button onClick={() => setTheme("light")}>
        <span>Light</span> {theme === "light" ? "✅" : "☑️"}
      </button>
      <button onClick={() => setTheme("dark")}>
        <span>Dark</span> {theme === "dark" ? "✅" : "☑️"}
      </button>
      <button onClick={() => setTheme("system")}>
        <span> System</span> {theme === "system" ? "✅" : "☑️"}
      </button>
    </div>
  );
}

export default ThemeToggle;
