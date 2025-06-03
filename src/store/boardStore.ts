import type { ColumnType } from '@/lib/types';
import { create } from 'zustand'

type BoardState = {
    columns: ColumnType[],
    openDialog: { value: number, taskId?: number, EditedContent?: string },
    setOpenDialog: (newOd: { value: number, taskId?: number, EditedContent?: string }) => void,
    addTask: (columnId: number, taskName: string) => void,
    removeTask: (columnId: number, taskId: number) => void,
    editTask: (columnId: number, taskId: number, editContent: string) => void,
    deleteTask: (columnId: number, taskId: number) => void,
    addColumn: (columnName: string ,added?: boolean) => void,
    createCol: (column : ColumnType , index: number) => void,
    deleteColumn: (columnId: number) => void,
    changeColumnName : (columnId : number, columnTitle : string) => void,

};



export const useBoardStore = create<BoardState>((set) => ({
    openDialog: { value: 0 },
    setOpenDialog: (newOd) => set(state => ({
        openDialog: { ...newOd }
    }),
    ),

    columns: [
        {
            id: 1,
            title: "Waiting",
            tasks: [
                { id: 1, name: "add items section" },
                { id: 2, name: "design login form" },
            ],
        },
        {
            id: 2,
            title: "In Progress",
            tasks: [
                { id: 3, name: "debug project" },
            ],
        },
        {
            id: 3,
            title: "Completed",
            tasks: [
                { id: 4, name: "add auth system" },
            ],
        },
    ],
    
    addTask: (columnId, taskname) =>
        set(state => ({
            columns:
                state.columns.map((col) => col.id == columnId ? { ...col, tasks: [...col.tasks, { name: taskname, id: Date.now() }] } : col)
        })),
    removeTask: (columnId, taskId) =>
        set(state => ({
            columns:
                state.columns.map((col) => col.id == columnId ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) } : col)
        })),
    editTask: (columnId, taskId, editContent) =>
        set(state => ({
            columns: state.columns.map(col => col.id == columnId ? { ...col, tasks: col.tasks.map(task => task.id == taskId ? { ...task, name: editContent } : task) } : col)
        })),
    deleteTask: (columnId, taskId) =>
        set(state => ({
            columns: state.columns.map(col => col.id == columnId ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) } : col)
        })),
    addColumn: (columnName,added) =>
        set(state => ({
            columns: [...state.columns, { id: Date.now(), title: columnName, tasks: [],added: added }]
        })),
    deleteColumn: (columnId) => set(state => ({
        columns: state.columns.filter(col => col.id !== columnId)
    })),
    createCol:(column ,index)=>set((state)=> {
        const newCols = [...state.columns]
        newCols.splice(index , 0 ,column)
        return {columns : newCols}
        
        }),

    changeColumnName:(columnId , newTitle)=>set(state=>({
        columns : state.columns.map(col=> col.id == columnId ? {...col , title: newTitle} : col)
    })) ,


}))
