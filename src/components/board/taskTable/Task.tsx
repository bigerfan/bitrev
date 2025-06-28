import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import type {  TasksType } from "@/lib/types";
import { useBoardStore } from "@/store/boardStore";
import gsap from "gsap";
import { memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { stateOut } from "@/lib/animation";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { isOneDayBefore } from "@/lib/functions";

type TaskProp = {
  task: TasksType;
  columnId: string;
};

export const Task = memo(({ task, columnId }: TaskProp) => {
  const taskref = useRef(null);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const openDialog = useBoardStore((state) => state.setOpenDialog);
  const moveTask = useBoardStore((state) => state.moveTask);

  const deadLine = task.deadLine ? new Date(task.deadLine) : undefined;

  let warning = false;

  if (deadLine && isOneDayBefore(deadLine)) warning = true;

  useGSAP(() => {
    if (taskref.current )
      gsap.fromTo(taskref.current, { opacity: 0 }, { opacity: 1, delay: 0.4 });

    const draggable = Draggable.create(taskref.current, {
      onDragStart: function () {
        this.target.classList.remove("task");
        gsap.to(".task", {
          opacity: 0.1,
        });
        gsap.to(taskref.current, {
          scale: 1.1,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
          zIndex: 9999,
          opacity: 1,
          duration: 0.2,
        });
      },
      onDrag: function () {
        const zones = document.querySelectorAll(".drag-zone");

        zones.forEach((zone) => {
          // finding dropzones and animatethem when draggingcard get on them
          const rect = zone.getBoundingClientRect();
          const isOver =
            this.pointerX > rect.left &&
            this.pointerX < rect.right &&
            this.pointerY > rect.top &&
            this.pointerY < rect.bottom;

          if (isOver) {
            zone.classList.add("highlight-zone");
          } else {
            zone.classList.remove("highlight-zone");
          }
        });
      },
      autoScroll: 1,
      zIndexBoost: true,
      onPress: function (e) {
        this.lastX = this.x;
        this.lastY = this.y;
      },
      onDragEnd: () => {
        setTimeout(
          () => gsap.to(".task", { opacity: 1, stagger: 0.1, zIndex: 1 }),
          300
        );
      },
      onRelease: function () {
        const zones = document.querySelectorAll(".drag-zone");

        let isIn = false;
        for (const zone of zones) {
          const rect = zone.getBoundingClientRect();
          const targetId = zone.id;

          this.target.classList.add("task");

          isIn =
            this.pointerX > rect.left &&
            this.pointerX < rect.right &&
            this.pointerY > rect.top &&
            this.pointerY < rect.bottom;

          if (isIn) zone.classList.remove("highlight-zone");

          if (isIn && targetId && targetId !== columnId) {
            zone.classList.remove("highlight-zone");
            const state = Flip.getState(`.task-${columnId}, .task-${targetId} `);

            moveTask(targetId, task.id);
            requestAnimationFrame(() => {
              Flip.from(state, {
                duration: 0.7,
                ease: "power2.inOut",
              });
            });
            break;
          } else {
            gsap.to(this.target, {
              x: this.startX,
              y: this.startY,
              duration: 0.3,
              ease: "power4.inOut",
            });
          }
        }
        gsap.to(taskref.current, { opacity: 1, scale: 1, boxShadow: "none" });
      },
      type: "x,y",
    });

    return () => {
      draggable[0].kill();
    };
  }, []);

  return (
    <Card
      id={task.id}
      ref={taskref}
      className={`w-auto task-${
        columnId
      } task draggable-Task my-4 overflow-hidden bg-muted ${
        warning && "warningCard"
      }`}
      parent-col={columnId}
    >
      <CardContent className="break-words whitespace-pre-line ">
        {task.name}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 ">
          <Button
            variant={"default"}
            className=""
            onClick={() =>
              openDialog({
                value: columnId,
                task: task,
              })
            }
          >
            <FaRegEdit />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              if (taskref.current)
                stateOut(`.task-${columnId}`, taskref.current, () =>
                  deleteTask(columnId, task.id)
                );
            }}
            className=""
          >
            <MdDeleteOutline />
          </Button>
        </div>
        <div>
          <span>{task.deadLine && new Date(task.deadLine).toDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
})
