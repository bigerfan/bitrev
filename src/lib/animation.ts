import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText)

export function NextStep(setStep: React.Dispatch<React.SetStateAction<number>>) {
    const split = SplitText.create(".myText", { type: "words,chars" });
    const anotherSplit = SplitText.create(".myText2", { type: "words" });

    gsap.to(split.chars, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.06,
    });

    gsap.to(anotherSplit.words, {
        duration: 1,
        y: -100,
        autoAlpha: 0,
        stagger: 0.1,
        onComplete: () => setStep(prev => prev + 1)
    });

    gsap.to('.formContext', {
        height: 0,
        padding: 0,
        duration: 1
    })

}
