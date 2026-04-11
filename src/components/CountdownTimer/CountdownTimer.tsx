import { useEffect, useState } from "react";
import type { CountdownTimerProps } from "./types";
import "./style.css";

function CountdownTimer({ duration = 5 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 1000); // change to ms
  const [isRunning, setIsRunning] = useState(false);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    let rafId: number;

    const tick = () => {
      const remaining = Math.max(endTime! - Date.now(), 0);

      setTimeLeft(remaining);

      if (remaining > 0) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isRunning, endTime]);

  const handleStart = () => {
    setIsRunning(true);
    setEndTime(timeLeft + Date.now());
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setEndTime(null);
    setTimeLeft(duration * 1000);
  };

  const formatTime = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const millis = ms % 1000;

    const pad = (n: number, by = 2) => n.toString().padStart(by, "0");

    return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(millis, 3)}`;
  };

  return (
    <div className="countdown-timer">
      <div className="time">
        <code>{formatTime(timeLeft)}</code>
      </div>

      <div className="actions">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default CountdownTimer;
