import { Card, CardContent, CardFooter } from "@/components/ui/card";

import type { TasksType } from "@/lib/types";
import { useBoardStore } from "@/store/boardStore";
import gsap from "gsap";
import { memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { isOneDayBefore } from "@/lib/functions";
import { TaskInfo } from "./TaskInfo";
import { TaskActions } from "./TaskActions";

type TaskProp = {
  task: TasksType;
  columnId: string;
};

export const Task = memo(({ task, columnId }: TaskProp) => {
  const taskref = useRef(null);

  const moveTask = useBoardStore((state) => state.moveTask);
  const openDialog = useBoardStore((state) => state.setOpenDialog);

  const deadLine = task.deadLine ? new Date(task.deadLine) : undefined;

  let warning = false;

  if (deadLine && isOneDayBefore(deadLine)) warning = true;

  useGSAP(() => {
    if (taskref.current)
      gsap.fromTo(taskref.current, { opacity: 0 }, { opacity: 1, delay: 0.4 });
  }, []);

  useGSAP(() => {
    const draggable = Draggable.create(taskref.current, {
      onDragStart: function () {
        this.target.classList.remove("task");
        gsap.to(".task", {
          opacity: 0.1,
        });
        gsap.to(taskref.current, {
          scale: 1.1,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
          opacity: 1,
          duration: 0.2,
          zIndex:10,
        });
      },
      cursor: 'default'
      ,
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
      zIndexBoost: false,
      onPress: function () {
        this.lastX = this.x;
        this.lastY = this.y;
      },
      onDragEnd: () => {
        setTimeout(
          () => {gsap.to(".task", { opacity: 1, stagger: 0.1 })
          gsap.to(taskref.current,{zIndex:0})
        },
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
            const state = Flip.getState(
              `.task-${columnId}, .task-${targetId} `
            );

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
      className={`relative w-auto task-${columnId} task draggable-Task my-4 overflow-hidden bg-muted ${
        warning&& task.status !== 'Done' && "warningCard"
      }`}
      parent-col={columnId}
      key={task.id}
    >
      <CardContent className="break-words whitespace-pre-line ">
        {task.name}
      </CardContent>
      <CardFooter className="flex justify-between">
        <TaskActions
          editAction={() =>
            openDialog({
              value: columnId,
              task: task,
            })
          }
          taskId={task.id}
          taskref={taskref}
          columnId={columnId}
        />
        <TaskInfo deadLine={task.deadLine} status={task.status} />
      </CardFooter>
    </Card>
  );
});
