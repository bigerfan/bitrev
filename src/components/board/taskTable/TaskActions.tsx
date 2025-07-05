import { Button } from "@/components/ui/button";
import { stateOut } from "@/lib/animation";
import { useBoardStore } from "@/store/boardStore";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

type props = {
  taskref: React.RefObject<null>;
  columnId: string;
  taskId: string;
  editAction: () => void;
};

export const TaskActions = ({
  taskref,
  columnId,
  editAction,
  taskId,
}: props) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  return (
    <div className="flex gap-2 ">
      <Button
      variant={'outline'}
      onClick={editAction}>
        <FaRegEdit />
      </Button>
      <Button
        variant={"outlineDestructive"}
        onClick={() => {
          if (taskref.current)
            stateOut(`.task-${columnId}`, taskref.current, () =>
              deleteTask(columnId, taskId)
            );
        }}
      >
        <MdDeleteOutline />
      </Button>
    </div>
  );
};
