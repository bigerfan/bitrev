import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useBoardStore } from "@/store/boardStore";
import { IoIosMore } from "react-icons/io";
import { Task } from "./Task";
import type { ColumnType } from "@/lib/types";


type ColProp = {
  column: ColumnType;
};

export const Column = ({ column }: ColProp) => {
  const Od = useBoardStore((state) => state.openDialog);
  const openDialog = useBoardStore((state) => state.setOpenDialog);

  return (
    <div
      key={column.id}
      className="w-[22rem] bg-gray-300 px-4 py-8 h-fit rounded-md"
    >
      <div className="h-fit py-3 px-3 my-6 mx-5 overflow-hidden flex flex-row justify-between border-b-2 border-gray-500 group gap-2 min-w-60 ">
        <h2 className="w-fit mx-auto popop ">{column.title}</h2>
        <DropdownMenu key={column.id === Od.value ? Od.value : undefined}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="opacity-0 group-hover:opacity-100 transition-all  "
            >
              <IoIosMore />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel
              className="cursor-pointer"
              onClick={() => openDialog({value:column.id})}
            >
              Add New Task
            </DropdownMenuLabel>
            <DropdownMenuLabel className="cursor-pointer">
              Delete Column
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" flex flex-col gap-3">
        {column.tasks.map((task) => (
          <Task task={task} col={column} />
        ))}
      </div>
    </div>
  );
};
