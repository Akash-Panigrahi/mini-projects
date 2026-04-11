import { useEffect, useRef, useState } from "react";
import "./style.css";

function Stopwatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number>(null);
  const rAFRef = useRef<number>(null);

  useEffect(() => {
    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  const handleStart = () => {
    if (isRunning) return;

    if (!startTimeRef.current) startTimeRef.current = Date.now();

    const tick = () => {
      setElapsedTime(Date.now() - startTimeRef.current!);

      rAFRef.current = requestAnimationFrame(tick);
    };

    rAFRef.current = requestAnimationFrame(tick);
  };

  const handlePause = () => {
    setIsRunning(false);
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
  };

  const handleReset = () => {
    handlePause();
    setElapsedTime(0);
    startTimeRef.current = null;
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
