import { useEffect, useState } from "react";
import { useStepper } from "./StepperContext";
import type { StepProps } from "./types";

function Step({ id, label }: StepProps) {
  const { activeStep, setStep, register } = useStepper();

  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(register(id));
  }, [register, id]);

  if (index === null) return;

  const isActive = activeStep === index;
  const isCompleted = index < activeStep;

  return (
    <div
      className="step"
      onClick={() => setStep(index)}
      style={{
        scale: isActive ? 1.01 : 1,
      }}
    >
      <div
        className="index"
        style={{
          background: isActive || isCompleted ? "#1976d2" : "grey",
        }}
      >
        {index + 1}
      </div>
      <div
        className="label"
        style={{
          color: isActive || isCompleted ? "black" : "grey",
          fontWeight: isActive ? "bold" : "",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default Step;
