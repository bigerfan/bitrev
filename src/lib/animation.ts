import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(SplitText)
gsap.registerPlugin(Flip)

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

export function stateOut(state: string, selector: HTMLElement | string , onComplete?: () => void) {
    const tl = gsap.timeline({
        onComplete: onComplete
    });

    const flipState = Flip.getState(state)

    tl.to(selector, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.in",
    })
        .set(selector, {
            scale: 0,
            opacity: 0,
            display: 'none',
            ease: "power2.inOut",
            onComplete: () => {
                Flip.from(flipState, {
                    duration: 0.5,
                    ease: "power2.inOut",
                    stagger: 0.05,
                });
            }
        })

    console.log(selector)
}

export function stateIn(state: string, selector?: HTMLElement | string | null, onComplete?: () => void) {

    const flipState = Flip.getState(state)

    if (selector)
        gsap.set(selector, {
            duration: .2,
            display: 'block',
            scale: 1,
            opacity: 1
        })


    Flip.from(flipState, {
        onStart: onComplete,
        duration: .5,
        ease: 'power2.inOut',
        stagger: .05,
        onEnter: (e) => {
            console.log(e)
            gsap.fromTo(e, { opacity: 0 }, { opacity: 1, delay: .4 })
        },

    })

    // gsap.to(selector, {
    //     width: '22rem',
    //     scale:1,
    //     paddingRight: 16,
    //     paddingLeft:16,
    //     duration: .3,
    //     ease: 'power2.inOut',
    //     opacity: 0,
    //     onComplete: ()=>{
    //         gsap.to(selector,{opacity:1,duration: .2,ease: 'power1.inOut'})
    //     }
    // })


}



