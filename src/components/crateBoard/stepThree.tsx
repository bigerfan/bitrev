import type React from "react";
import { Button } from "../ui/button";
import { NextStep } from "@/lib/animation";
import { ColorPicker } from "../ui/colorpicker";
import { useState } from "react";

type TProp = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const StepThree = ({ setStep }: TProp) => {
  const [color, setColor] = useState("#0f0f0f");
  const [Seccolor, SecsetColor] = useState("#0f0f0f");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="mx-2 my-4">Main Color</h1>
        <ColorPicker value={color} onChange={(v)=>setColor(v)} />
      </div>
      <div>
        <h2 className="mx-2 my-4">Sub Color</h2>
        <ColorPicker value={Seccolor} onChange={(v)=>SecsetColor(v)} />
      </div>
      <Button onClick={() => NextStep(setStep)}>Next Step</Button>
    </div>
  );
};
