import type { ColumnType } from '@/lib/types';
import { create } from 'zustand'

type BoardState = {
    columns: ColumnType[],
    deletePendingCols: number[],
    openDialog: { value: number, taskId?: number, EditedContent?: string },
    setdeletePendingCol: (colId: number) => void,
    undoDeletePendingCol: (colId: number) => void,
    setOpenDialog: (newOd: { value: number, taskId?: number, EditedContent?: string }) => void,
    addTask: (columnId: number, taskName: string) => void,
    editTask: (columnId: number, taskId: number, editContent: string) => void,
    deleteTask: (columnId: number, taskId: number) => void,
    moveTask: (toColumn: number, taskId: number) => void,
    addColumn: (columnName: string, added?: boolean) => void,
    createCol: (column: ColumnType, index: number) => void,
    deleteColumn: (columnId: number) => void,
    changeColumnName: (columnId: number, columnTitle: string) => void,

};



export const useBoardStore = create<BoardState>((set) => ({
    openDialog: { value: 0 },
    setOpenDialog: (newOd) => set(state => ({
        openDialog: { ...newOd }
    }),
    ),
    deletePendingCols: [],
    setdeletePendingCol: (colId) => set(state => ({
        deletePendingCols: [...state.deletePendingCols, colId]
    })),
    undoDeletePendingCol: (colId) => set(state => ({
        deletePendingCols: state.deletePendingCols.filter(col => col !== colId)
    })),
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
    editTask: (columnId, taskId, editContent) =>
        set(state => ({
            columns: state.columns.map(col => col.id == columnId ? { ...col, tasks: col.tasks.map(task => task.id == taskId ? { ...task, name: editContent } : task) } : col)
        })),
    deleteTask: (columnId, taskId) =>
        set(state => ({
            columns: state.columns.map(col => col.id == columnId ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) } : col)
        })),
    moveTask: (toColumn, taskId) =>
        set(state => {
            const fromCol = state.columns.find(col => col.tasks.find(task => task.id == taskId))
            const task = fromCol?.tasks.find(task => task.id == taskId)

            if (!task || !fromCol) return { columns: state.columns }

            const newCols = state.columns.map(col => {
                if (col.id == toColumn)
                    col = { ...col, tasks: [...col.tasks, task] }
                else if (col.id == fromCol.id) {
                    col = { ...col, tasks: col.tasks.filter(t => t.id !== task.id) }
                }
                return col
            })
            return { columns: newCols }

        })
    ,
    addColumn: (columnName, added) => {
        const colId = Date.now()

        set(state => ({
            columns: [...state.columns, { id: colId, title: columnName, tasks: [], added: added }]
        }))

    },
    deleteColumn: (columnId) => set(state => ({
        columns: state.columns.filter(col => col.id !== columnId)
    })),
    createCol: (column, index) => set((state) => {
        const newCols = [...state.columns]
        newCols.splice(index, 0, column)
        return { columns: newCols }

    }),

    changeColumnName: (columnId, newTitle) => set(state => ({
        columns: state.columns.map(col => col.id == columnId ? { ...col, title: newTitle } : col)
    })),


}))
