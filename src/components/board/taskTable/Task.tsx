import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import type { ColumnType, TasksType } from "@/lib/types";
import { useBoardStore } from "@/store/boardStore";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { stateOut } from "@/lib/animation";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";

type TaskProp = {
  task: TasksType;
  col: ColumnType;
};

export const Task = ({ task, col }: TaskProp) => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(Draggable);
  gsap.registerPlugin(Flip);

  const taskref = useRef(null);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const openDialog = useBoardStore((state) => state.setOpenDialog);
  const moveTask = useBoardStore((state) => state.moveTask);

  useGSAP(() => {
    if (taskref.current)
      gsap.fromTo(taskref.current, { opacity: 0 }, { opacity: 1, delay: 0.4 });

    const state = Flip.getState(`.task`);

    const test = Draggable.create(taskref.current, {
      edgeResistance: 0.8,
      onDragStart: (e) => console.log(e),
      zIndexBoost: true,
      onPress: function () {
        this.lastX = this.x;
        this.lastY = this.y;
      },
      onRelease: function () {
        const Columns = document.querySelectorAll(
          ".drag-zone"
        ) as NodeListOf<HTMLDivElement>;
        let isIn = false;
        for (const zone of Columns) {
          const rect = zone.getBoundingClientRect();
          const colId = zone.attributes.getNamedItem("column-id")?.nodeValue;

          isIn =
            this.pointerX > rect.left &&
            this.pointerX < rect.right &&
            this.pointerY > rect.top &&
            this.pointerY < rect.bottom;

          if (isIn && colId) {
            moveTask(parseInt(colId), task.id);
            break;
          }
        }
      },
      type: "x,y",
      onDragEnd: () => {
        Flip.from(state, {
          duration: 0.7,
          ease: "power2.inOut",
          stagger: 0.2,
          onEnter: () => {
            alert("tetas");
          },
        });
      },
    });

    return () => {
      test[0]?.kill();
    };
  }, [col.id, task.id]);
  return (
    <Card
      key={task.id}
      id={`task-${col.id}-${task.id}`}
      ref={taskref}
      className={`w-auto task-${col.id} task my-4 overflow-hidden`}
    >
      <CardContent className="break-words whitespace-normal ">
        {task.name}
      </CardContent>
      <CardFooter className="">
        <div className="flex gap-2">
          <Button
            variant={"secondary"}
            className=""
            onClick={() =>
              openDialog({
                value: col.id,
                taskId: task.id,
                EditedContent: task.name,
              })
            }
          >
            <FaRegEdit />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              if (taskref.current)
                stateOut(`.task-${col.id}`, taskref.current, () =>
                  deleteTask(col.id, task.id)
                );
            }}
            className=""
          >
            <MdDeleteOutline />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <GrStatusInfo />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};
