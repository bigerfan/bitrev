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
import { memo, useEffect, useRef, useState } from "react";
import { stateIn, stateOut } from "@/lib/animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ColProp = {
  column: ColumnType;
};

export const Column = memo(({ column }: ColProp) => {
  const {
    undoDeletePendingCol,
    setdeletePendingCol,
    deleteColumn: deleteCol,
    setOpenDialog: openDialog,
    openDialog: Od,
    changeColumnName: changeColName,
  } = useBoardStore();

  const [changeTitle, setChangeTitle] = useState<boolean>(false);
  const titleInput = useRef<HTMLInputElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const columnId = column.id

  useGSAP(() => {
    if (colRef.current)
      gsap.fromTo(colRef.current, { opacity: 0 }, { opacity: 1, delay: 0.4 });
  }, []);

  function handleDeleteCol() {
    if (colRef.current) {
      setdeletePendingCol(column.id);
      stateOut(".column", colRef.current, () => {
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
          },
        });
      });
    } else return;
  }

  useEffect(() => {
    setTimeout(() => titleInput.current?.focus(), 300);
  }, [changeTitle]);

  return (
    <div
      ref={colRef}
      key={column.id}
      className={`w-[25rem] bg-white rounded-md max-h-fit column drag-zone px-4 border-[1px] border-gray-200`}
      id={column.id}
      column-id={column.id}
      onDrop={() => alert(column.id)}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="h-fit py-3 px-3 mx-5 overflow-hidden flex flex-row justify-between border-b-2 border-gray-300 group gap-2 min-w-60 ">
        <div className=" m-auto">
          {changeTitle ? (
            <input
              type="text"
              className="m-auto w-full"
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
            <h2 className="w-fit mx-auto popop text-foreground ">
              {column.title}
            </h2>
          )}
        </div>
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
      <div className={`task-${column.id} bg-transparent rounded-b-md py-3`}>
        {column.tasks.map((task) => (
          <Task task={task} columnId={columnId} key={task.id} />
        ))}
      </div>
    </div>
  );
});
