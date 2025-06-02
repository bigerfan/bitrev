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

export const AddTaskDialog = () => {
  const openDialog = useBoardStore((state) => state.setOpenDialog);
  const Od = useBoardStore((state) => state.openDialog);
  const addTask = useBoardStore((state) => state.addTask);
  const editTask = useBoardStore((state) => state.editTask);

  const [input, setInput] = useState<string>( "");

  useEffect(()=> setInput(Od.EditedContent || '') , [Od.EditedContent])



  function handleAddTask() {
    if (Od.taskId && Od.EditedContent) editTask(Od.value, Od.taskId, input);
    else addTask(Od.value, input);

    setInput("");
    openDialog({ value: 0 });
  }

  return (
    <Dialog
      open={Od.value !== 0}
      onOpenChange={(open) => !open && openDialog({ value: 0 })}
    >
      <div>
        <div>
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
              <Button
                variant="outline"
                className="my-4"
                onClick={handleAddTask}
              >
                Add
              </Button>
            </div>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};
