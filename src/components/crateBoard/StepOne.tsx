import type React from "react";
import { Button } from "../ui/button";
import { NextStep } from "@/lib/animation";

type OneProp = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const StepOne = ({ setStep }: OneProp) => {
  return (
    <div>
      <Button onClick={() => NextStep(()=>setStep(prev => prev +=1))}>Create Board</Button>
    </div>
  );
};
