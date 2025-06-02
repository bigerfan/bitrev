import { useState } from "react";
import { StepOne } from "./StepOne";
import { FormTitle } from "./FormTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./stepThree";
import { StepFour } from "./Stepfour";

export const MainForm = () => {
  const [step, setStep] = useState(0);

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      gsap.from(".formContext", {
        opacity: 0,
      });
      gsap.to(".formContext", {
        height: "auto",
        padding: "auto",
        opacity: 1,
        duration: 1,
      });
    },
    { dependencies: [step] }
  );

  return (
    <div className=" rounded-xl bg-[#DCD7C9] shadow-2xl px-4 py-7 ">
      <FormTitle step={step} />
      <div className=" border-t-2 border-b-2 border-gray-200 my-4 formContext overflow-hidden opacity-100">
        <div className="px-4 py-7">
          {step == 0 && <StepOne setStep={setStep} />}
          {step == 1 && <StepTwo setStep={setStep} />}
          {step == 2 && <StepThree setStep={setStep} />}
          {step == 3 && (
            <StepFour  />
          )}
        </div>
      </div>
    </div>
  );
};
