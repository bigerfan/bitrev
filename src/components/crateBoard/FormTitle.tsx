import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

type FormProp = {
  step: number;
};

type TA = {
  title: string;
  subText: string;
  step: number;
};



const textArray: TA[] = [
  {
    title: "WELCOME TO BITREV",
    subText: "Let's Build Your Board And Start Tracking",
    step: 0,
  },
  {
    title: "NAME YOUR BOARD",
    subText: "Give your board a clear and recognizable name",
    step: 1,
  },
  {
    title: "PICK A STYLE",
    subText: "Choose a background color or image for your board",
    step: 2,
  },
  {
    title: "DEFINE YOUR LISTS",
    subText:
      "Set up the columns your tasks will live in (e.g. To Do, Doing, Done)",
    step: 3,
  },
];

export const FormTitle = ({ step }: FormProp) => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  const currentObjectData = textArray.find((obj) => obj.step == step);

  useGSAP(
    () => {
      const split = SplitText.create(".myText", { type: "words,chars" });
      const anotherSplit = SplitText.create(".myText2", { type: "words" });

      gsap.from(split.chars, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.1,
      });

      gsap.from(anotherSplit.words, {
        duration: 1,
        y: -100,
        autoAlpha: 0,
        stagger: 0.2,
      });
    },
    { dependencies: [step] }
  );
  return (
    <>
      {currentObjectData && (
        <div className="w-2xl prose">
          <h1 className=" myText h-fit overflow-hidden border-b-2 border-gray-600">
            {currentObjectData.title}
          </h1>
          <h2 className="myText2 h-fit overflow-hidden">
            {currentObjectData.subText}
          </h2>
        </div>
      )}
    </>
  );
};
