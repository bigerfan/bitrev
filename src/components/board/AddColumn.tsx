import { useState } from "react";
import { useBoardStore } from "@/store/boardStore";

export const AddColumn = () => {
    const [inputValue , setIV] = useState<string>('')
    const AddColumn = useBoardStore(state=> state.addColumn)
    const columns = useBoardStore(state => state.columns)

    function handleColumnAdd(){
        if(inputValue == '' || !inputValue)
            return
        AddColumn(inputValue)

        console.log(columns)
    }
  return (
    <div className="flex gap-2 items-start my-2 mx-3 ">
      <input placeholder="Add Column..." className="columnInput" value={inputValue} onChange={(e)=>setIV(e.target.value)}  />
      <button className="AddCButton" onClick={handleColumnAdd}>Add</button>
    </div>
  );
};
