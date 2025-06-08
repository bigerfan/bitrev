import { useState } from "react";
import { useBoardStore } from "@/store/boardStore";
import { Flip } from "gsap/Flip";
import gsap from "gsap";

export const AddColumn = () => {
  gsap.registerPlugin(Flip);
  const [inputValue, setIV] = useState<string>("");
  const AddColumn = useBoardStore((state) => state.addColumn);

  function handleColumnAdd() {
    const state = Flip.getState(".column");

    if (inputValue.trim() == "" || !inputValue) return;
    AddColumn(inputValue, true);
    setIV("");

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.05,
      });
    });
  }
  return (
    <div className="flex gap-2 items-start my-2 mx-3 column">
      <input
        placeholder="Add Column..."
        className="columnInput"
        value={inputValue}
        onChange={(e) => setIV(e.target.value)}
      />
      <button className="AddCButton" onClick={handleColumnAdd}>
        Add
      </button>
    </div>
  );
};
