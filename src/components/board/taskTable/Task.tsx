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

type TaskProp = {
  task: TasksType;
  col: ColumnType;
};

export const Task = ({ task, col }: TaskProp) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const openDialog = useBoardStore((state) => state.setOpenDialog);


  return (
    <Card key={task.id} className="w-auto">
      <CardContent className="break-words whitespace-normal ">
        {task.name}
      </CardContent>
      <CardFooter className="">
        <div className="flex gap-2">
          <Button
            variant={"secondary"}
            className=""
            onClick={() => openDialog({value :col.id , taskId : task.id, EditedContent: task.name})}>
            <FaRegEdit />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => deleteTask(col.id, task.id)}
            className="">
            <MdDeleteOutline />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
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
