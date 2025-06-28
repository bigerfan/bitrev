import { useBoardStore } from "@/store/boardStore";
import { Column } from "./column";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Table = () => {
  const columns = useBoardStore((state) => state.columns);

  useGSAP(() => {
    gsap.from(".popop", {
      duration: 1,
      y: 100,
      stagger: 0.15,
    });

  });


  return (
    <div className="flex gap-3  ">
      {columns.map((column) => (
        <Column column={column} />
      ))}
    </div>
  );
};
