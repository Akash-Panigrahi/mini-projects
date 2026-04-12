import "./style.css";
import type { ProgressBarProps } from "./types";

function ProgressBar({ variant, value, buffer = 0 }: ProgressBarProps) {
  if (variant === "indeterminate") {
    return (
      <div className="progress-bar">
        <div className="indeterminate" />
      </div>
    );
  }

  const safeValue = Math.max(0, Math.min(value, 100));
  const safeBuffer = Math.max(safeValue, Math.min(buffer, 100));

  return (
    <div className="progress-bar">
      <div className="buffer" style={{ width: `${safeBuffer}%` }} />
      <div className="determinate" style={{ width: `${safeValue}%` }} />
    </div>
  );
}

export default ProgressBar;
