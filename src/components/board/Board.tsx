import { Table } from "./taskTable/Table";
import { TaskDialog } from "./TaskDialog";
import { AddColumn } from "./AddColumn";

export const Board = () => {
  return (
    <div className="flex overflow-x-auto min-w-full min-h-screen px-5 py-3 colTable custom-scrollbar ">
        <Table />
        <TaskDialog />
        <AddColumn />
    </div>
  );
};
