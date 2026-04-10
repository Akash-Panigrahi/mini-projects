import type { ReactNode } from "react";

export type StepId = string;

export type StepperContextType = {
  activeStep: number;
  setStep: (step: number) => void;
  register: (id: StepId) => number;
};

export type StepperProps = {
  value: number;
  onChange: (step: number) => void;
  children: ReactNode;
};

export type StepProps = {
  id: StepId;
  label: ReactNode;
};
