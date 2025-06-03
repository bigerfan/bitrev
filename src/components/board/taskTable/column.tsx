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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type ColProp = {
  column: ColumnType;
};

export const Column = ({ column }: ColProp) => {
  const index = useBoardStore
    .getState()
    .columns.findIndex((col) => col.id == column.id);
  const Od = useBoardStore((state) => state.openDialog);
  const openDialog = useBoardStore((state) => state.setOpenDialog);
  const deleteCol = useBoardStore((state) => state.deleteColumn);
  const undoCol = useBoardStore((state) => state.createCol);
  const changeColName = useBoardStore((state) => state.changeColumnName);

  const [changeTitle, setChangeTitle] = useState<boolean>(false);
  const titleInput = useRef<HTMLInputElement>(null);

  const colSelector = `#col${column.id}`;

  gsap.registerPlugin(useGSAP)

  function handleDeleteCol() {
    gsap.to(`${colSelector} .task`, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.3,
      ease: "power1.inOut",
    });
    setTimeout(
      () =>
        gsap.to(colSelector, {
          opacity: 0,
          scale: 0.95,
          height: 0,
          marginBottom: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            deleteCol(column.id);
            toast("Column has Been deleted", {
              action: {
                label: "Undo",
                onClick: () => undoCol(column, index),
              },
            });
          },
        }),
      300
    );
  }

  useGSAP(()=>(column.added?
    gsap.from(colSelector,{
      width:0,
      opacity:0,
      duration:.3
    }):false
  ))


  useEffect(() => {
    setTimeout(() => titleInput.current?.focus(), 300);
  }, [changeTitle]);

  return (
    <div
      key={column.id}
      className={`w-[22rem] bg-gray-300 px-4 h-fit rounded-md max-h-fit column`}
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
      <div>
        {column.tasks.map((task) => (
          <Task task={task} col={column} key={task.id} />
        ))}
      </div>
    </div>
  );
};
