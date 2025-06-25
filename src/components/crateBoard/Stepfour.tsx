import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NextStep } from "@/lib/animation";
import { useBoardStore } from "@/store/boardStore";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const StepFour = ({ setStep }: props) => {
  const addColumn = useBoardStore((state) => state.addColumn);
  const [tasks, setTasks] = useState([{ id: 1, title: "" }]);
  const inputRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].title = value;
    setTasks(updatedTasks);
  };

  const handleAdd = () => {
    const lastTask = tasks[tasks.length - 1];
    if (!lastTask.title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: "" }]);
    console.log(tasks);
  };

  const handleRemove = (id: number, index: number) => {
    const removedTask = tasks.filter((task) => task.id !== id);
    const removedtag = inputRef.current[index];
    inputRef.current = inputRef.current.filter((tag) => tag !== removedtag);
    setTasks(removedTask);
  };

  useEffect(() => {
    console.log(inputRef);
    if (inputRef.current.length > 1) {
      const lastIndex = inputRef.current.length - 1;
      const el = inputRef.current[lastIndex];
      gsap.from(el, { opacity: 0, y: -20, duration: 0.5 });
    }
  }, [tasks.length]);

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Add tasks to your sprint</h2>
      <div className=" h-52 overflow-y-auto px-3 py-4 flex flex-col gap-4 custom-scrollbar">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="flex items-center gap-2 opacity-100"
            ref={(el) => {
              inputRef.current[index] = el;
            }}
          >
            <Input
              placeholder={`Task ${index + 1}`}
              value={task.title}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            {index !== tasks.length - 1 && (
              <Button
                onClick={() => handleRemove(task.id, index)}
                variant={"outline"}
              >
                Remove
              </Button>
            )}
            {index === tasks.length - 1 && (
              <Button onClick={handleAdd}>Add</Button>
            )}
          </div>
        ))}
      </div>

      <div>
        <Button onClick={() => tasks.map((task) => addColumn(task.title))}>
          Next Step
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            NextStep(() => {
              setStep((prev) => (prev -= 1));
            })
          }
        >
          Prev Step
        </Button>
      </div>
    </div>
  );
};
