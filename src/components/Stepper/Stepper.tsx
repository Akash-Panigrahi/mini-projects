import { useRef } from "react";
import { StepperContext } from "./StepperContext";
import type { StepId, StepperProps } from "./types";
import "./style.css";

function Stepper({ value, onChange, children }: StepperProps) {
  const stepsRef = useRef<StepId[]>([]);

  const register = (id: StepId) => {
    if (!stepsRef.current.includes(id)) {
      stepsRef.current.push(id);
    }

    return stepsRef.current.indexOf(id);
  };

  return (
    <StepperContext.Provider
      value={{ activeStep: value, setStep: onChange, register }}
    >
      <div className="stepper">{children}</div>
    </StepperContext.Provider>
  );
}

export default Stepper;
