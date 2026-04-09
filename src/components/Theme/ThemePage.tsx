import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";
import "./style.css";

function ThemePage() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

export default ThemePage;
