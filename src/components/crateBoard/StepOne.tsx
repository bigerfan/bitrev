import type React from "react";
import { Button } from "../ui/button";
import { NextStep } from "@/lib/animation";

type OneProp = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const StepOne = ({ setStep }: OneProp) => {
  return (
    <div>
      <Button onClick={() => NextStep(setStep)}>Create Board</Button>
    </div>
  );
};
