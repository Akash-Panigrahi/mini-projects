import { useState } from "react";
import Stepper from "./Stepper";
import Step from "./Step";

function StepperPage() {
  const [step, setStep] = useState(1);

  return (
    <Stepper value={step} onChange={setStep}>
      <Step id="charizard" label="Charizard" />
      <Step id="squirtle" label="Squirtle" />
      <Step id="bulbasaur" label="Bulbasaur" />
    </Stepper>
  );
}

export default StepperPage;
