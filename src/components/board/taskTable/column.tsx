import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useBoardStore } from "@/store/boardStore";
import { IoIosMore } from "react-icons/io";
import { Task } from "./Task";
import type { ColumnType } from "@/lib/types";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { stateIn, stateOut } from "@/lib/animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ColProp = {
  column: ColumnType;
};

export const Column = ({ column }: ColProp) => {

  gsap.registerPlugin(useGSAP);

  const {
    undoDeletePendingCol,
    setdeletePendingCol,
    columns,
    deleteColumn: deleteCol,
    setOpenDialog: openDialog,
    openDialog: Od,
    changeColumnName: changeColName,
  } = useBoardStore();

  const [changeTitle, setChangeTitle] = useState<boolean>(false);
  const titleInput = useRef<HTMLInputElement>(null);
  const colRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (colRef.current)
      gsap.fromTo(colRef.current, { opacity: 0 }, { opacity: 1, delay: 0.4 });
  });

  function handleDeleteCol() {
    if (colRef.current) {
      setdeletePendingCol(column.id);
      stateOut(".column", colRef.current);

      toast.success("Column has Been deleted", {
        action: {
          label: "Undo",
          onClick: () => {
            undoDeletePendingCol(column.id);
            stateIn(".column", colRef.current);
          },
        },
        onAutoClose: () => {
          const isStillPending = useBoardStore
            .getState()
            .deletePendingCols.includes(column.id);
          if (isStillPending) deleteCol(column.id);
          console.log(columns);
        },
      });
    }
  }

  useEffect(() => {
    setTimeout(() => titleInput.current?.focus(), 300);
  }, [changeTitle]);

  return (
    <div
      ref={colRef}
      key={column.id}
      className={`w-[22rem] bg-gray-300 rounded-md max-h-fit column px-4`}
      id={`col${column.id}`}
    >
      <div className="h-fit py-3 px-3 mx-5 overflow-hidden flex flex-row justify-between border-b-2 border-gray-500 group gap-2 min-w-60 ">
        {changeTitle ? (
          <input
            type="text"
            defaultValue={column.title}
            ref={titleInput}
            onBlur={() => {
              changeColName(
                column.id,
                titleInput.current?.value ?? column.title
              );
              setChangeTitle(false);
            }}
          />
        ) : (
          <h2 className="w-fit mx-auto popop ">{column.title}</h2>
        )}
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
            <DropdownMenuItem onClick={() => openDialog({ value: column.id })}>
              Add New Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setChangeTitle(true);
              }}
            >
              Rename Column
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteCol}>
              Delete Column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" task bg-transparent  rounded-b-md py-3" >
        {column.tasks.map((task) => (
          <Task task={task} col={column} key={task.id} />
        ))}
      </div>
    </div>
  );
};
