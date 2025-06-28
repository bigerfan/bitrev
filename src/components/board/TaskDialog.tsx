import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useBoardStore } from "@/store/boardStore";
import { Textarea } from "../ui/textarea";
import { Flip } from "gsap/Flip";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  DMCProtalOff,
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const TaskDialog = () => {
  const openDialog = useBoardStore((state) => state.setOpenDialog);
  const Od = useBoardStore((state) => state.openDialog);
  const addTask = useBoardStore((state) => state.addTask);
  const editTask = useBoardStore((state) => state.editTask);
  const [open, setOpen] = useState<boolean>(false);
  const [deadLine, setDeadLine] = useState<Date | undefined>();
  const [status, setStatus] = useState<string>("To Do");

  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setInput(Od.task?.name || "");
    setDeadLine(Od.task?.deadLine ? new Date(Od.task.deadLine) : undefined);
    setStatus(Od.task?.status ? Od.task.status : "To Do");
  }, [Od.task?.name, Od.task?.deadLine]);

  function handleAddTask() {
    const state = Flip.getState(`.task-${Od.value}`);

    if (Od.task?.id && Od.task.name)
      editTask(
        Od.value,
        Od.task.id,
        input,
        status,
        deadLine && new Date(deadLine?.toISOString())
      );
    else {
      addTask(
        Od.value,
        input,
        status,
        deadLine && new Date(deadLine?.toISOString())
      );

      requestAnimationFrame(() =>
        Flip.from(state, {
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.2,
        })
      );
    }

    setInput("");
    openDialog({ value: "" });
    setDeadLine(undefined)
  }


  return (
    <Dialog
      open={Od.value.trim() !== ""}
      onOpenChange={(openD) => !openD && !open && openDialog({ value: "" })}
    >
      <DialogContent key={Od.value}>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>describe your new task</DialogDescription>
        </DialogHeader>
        <div className="px-4 py-5 ">
          <Textarea
            placeholder="Task..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <div className="my-4 flex gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button>set DeadLine</Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0 z-50"
                align="start"
              >
                <Calendar
                  className=" z-50"
                  mode="single"
                  captionLayout="dropdown"
                  selected={deadLine}
                  onSelect={(date) => {
                    setOpen(false);
                    setDeadLine(date);
                  }}
                />
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Status</Button>
              </DropdownMenuTrigger>
              <DMCProtalOff>
                <DropdownMenuRadioGroup
                  value={status}
                  onValueChange={setStatus}
                >
                  <DropdownMenuRadioItem value="To Do">
                    To Do
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="InProgress">
                    InProgress
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Done">
                    Done
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DMCProtalOff>
            </DropdownMenu>
          </div>
          <Button variant="outline" className="my-4" onClick={handleAddTask}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
