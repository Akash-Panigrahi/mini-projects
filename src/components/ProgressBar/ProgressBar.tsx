import "./style.css";

function ProgressBar({ value = 50 }) {
  const safeValue = Math.max(0, Math.min(value, 100));

  return (
    <div className="progress-bar">
      <div className="value" style={{ width: `${safeValue}%` }} />
    </div>
  );
}

export default ProgressBar;
