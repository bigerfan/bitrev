import { MdOutlineDateRange } from "react-icons/md";

type props = {
    deadLine: string | undefined | Date,
    status: string
}

export const TaskInfo = ({deadLine,status}:props) => {
  return (
    <div className="flex items-end gap-3 h-10">
      {deadLine && (
        <span className="flex items-center gap-1">
          <MdOutlineDateRange />

          {new Date(deadLine).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      )}
      <div
        className={`${
          status == "ToDo"
            ? "bg-purple-500"
            : status == "InProgress"
            ? "bg-orange-500 active"
            : "bg-green-500"
        } rounded-full w-3 h-3`}
      ></div>
    </div>
  );
};
