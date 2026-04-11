import { useEffect, useState } from "react";
import "./style.css";

function Stopwatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    let rafId: number;
    let lastUpdate = 0;

    const tick = () => {
      const now = Date.now();

      if (now - lastUpdate > 50) {
        setElapsedTime(now - startTime!);
        lastUpdate = now;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setStartTime(Date.now() - elapsedTime); // resume support
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  const formatTime = (ms: number) => {
    const milliseconds = ms % 1000;
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    const pad = (n: number, by = 2) => n.toString().padStart(by, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
  };

  return (
    <div className="stopwatch">
      <div className="time">
        <code>{formatTime(elapsedTime)}</code>
      </div>

      <div className="actions">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
