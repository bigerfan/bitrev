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

type TaskProp = {
  task: TasksType;
  col: ColumnType;
};

export const Task = ({ task, col }: TaskProp) => {
  const taskref = useRef(null);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const openDialog = useBoardStore((state) => state.setOpenDialog);

  useGSAP(() => {
    if (taskref.current)
      gsap.fromTo(taskref.current, { opacity: 0 }, { opacity: 1, delay: 0.4 });
  });
  return (
    <Card
      key={task.id}
      id={`task-${col.id}-${task.id}`}
      ref={taskref}
      className="w-auto task my-4 overflow-hidden"
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
                stateOut(".task", taskref.current,()=> deleteTask(col.id, task.id));
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
