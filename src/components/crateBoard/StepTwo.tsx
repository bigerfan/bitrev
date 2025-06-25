import type React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { NextStep } from "@/lib/animation";

type TProp = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const StepTwo = ({ setStep }: TProp) => {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Board Name"  />
      <Textarea placeholder="Board Info" />
      <Button onClick={() => NextStep(()=>setStep(prev => prev +=1))}>Next Step</Button>
    </div>
  );
};
