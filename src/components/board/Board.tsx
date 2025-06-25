import { Table } from "./taskTable/Table";
import { AddTaskDialog } from "./AddTaskDialog";
import { AddColumn } from "./AddColumn";

export const Board = () => {
  return (
    <div className="flex ">
        <Table />
        <AddTaskDialog />
        <AddColumn />
    </div>
  );
};
