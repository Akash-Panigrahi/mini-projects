import "./style.css";
import type { ProgressBarProps } from "./types";

function ProgressBar({ value }: ProgressBarProps) {
  const safeValue = value === undefined ? 0 : Math.max(0, Math.min(value, 100));

  return (
    <div className="progress-bar">
      {value ? (
        <div className="determinate" style={{ width: `${safeValue}%` }} />
      ) : (
        <div className="indeterminate" />
      )}
    </div>
  );
}

export default ProgressBar;
