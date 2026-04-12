import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

function ProgressBarPage() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const random = 5 + Math.floor(Math.random() * (20 - 5 + 1));

      setWidth((prev) => {
        const next = prev + random;

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
      <ProgressBar value={width} />

      <progress value={width} max="100" />
    </div>
  );
}

export default ProgressBarPage;
