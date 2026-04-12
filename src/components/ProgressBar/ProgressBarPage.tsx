import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const random = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

function ProgressBarPage() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const incr = random(5, 20);

      setWidth((prev) => {
        const next = prev + incr;

        if (next > 100) {
          clearInterval(id);
        }

        return Math.min(next, 100);
      });
    }, 500);

    return () => clearInterval(id);
  }, [setWidth]);

  return (
    <div className="progress-bar-page">
      <ProgressBar variant="determinate" value={width} />

      <ProgressBar
        variant="determinate"
        value={width}
        buffer={width + random(5, 20)}
      />

      <ProgressBar variant="indeterminate" />

      <progress value={width} max="100" />
    </div>
  );
}

export default ProgressBarPage;
