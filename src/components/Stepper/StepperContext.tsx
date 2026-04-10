import { createContext, useContext } from "react";
import type { StepperContextType } from "./types";

export const StepperContext = createContext<StepperContextType | null>(null);

export function useStepper(): StepperContextType {
  const ctx = useContext(StepperContext);

  if (!ctx)
    throw new Error("useStepper can only be used inside Stepper Provider");

  return ctx;
}
