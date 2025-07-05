import type { ColumnType, TasksType } from '@/lib/types';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

type BoardState = {
    columns: ColumnType[],
    deletePendingCols: string[],
    openDialog: { value: string, task ?: TasksType},
    setdeletePendingCol: (colId: string) => void,
    undoDeletePendingCol: (colId: string) => void,
    setOpenDialog: (newOd: { value: string,task? : TasksType}) => void,
    addTask: (columnId: string, taskName: string ,status:string,date? : Date) => void,
    editTask: (columnId: string, taskId: string, editContent: string ,status: string, date?: Date ) => void,
    deleteTask: (columnId: string, taskId: string) => void,
    moveTask: (toColumn: string, taskId: string) => void,
    addColumn: (columnName: string, added?: boolean) => void,
    createCol: (column: ColumnType, index: number) => void,
    deleteColumn: (columnId: string) => void,
    changeColumnName: (columnId: string, columnTitle: string) => void,

};



export const useBoardStore = create<BoardState>()(
    persist((set,get) => ({
        openDialog: { value: '' },
        setOpenDialog: (newOd) => set({
            openDialog: { ...newOd }
        }),
        deletePendingCols: [],
        setdeletePendingCol: (colId) => set(state => ({
            deletePendingCols: [...state.deletePendingCols, colId]
        })),
        undoDeletePendingCol: (colId) => set(state => ({
            deletePendingCols: state.deletePendingCols.filter(col => col !== colId)
        })),
        columns: [],

        addTask: (columnId, taskname ,status, date?) =>
            {
                set(state => {
                return {columns:
                    state.columns.map((col) => col.id == columnId ? { ...col, tasks: [...col.tasks, { name: taskname, id: `task-${nanoid(6)}`, deadLine: date,status: status }] } : col)}
            })

        },
        editTask: (columnId, taskId, editContent ,status, date?) =>
            set(state => ({
                columns: state.columns.map(col => col.id == columnId ? { ...col, tasks: col.tasks.map(task => task.id == taskId ? { ...task, name: editContent , deadLine: date,status: status } : task) } : col)
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
            set(state => ({
                columns: [...state.columns, { id: `col-${nanoid(6)}`, title: columnName, tasks: [], added: added }]
            }))

        },
        deleteColumn: (columnId) => set({
            columns: get().columns.filter(col => col.id !== columnId)
        }),
        createCol: (column, index) => set((state) => {
            const newCols = [...state.columns]
            newCols.splice(index, 0, column)
            return { columns: newCols }

        }),

        changeColumnName: (columnId, newTitle) => set(state => ({
            columns: state.columns.map(col => col.id == columnId ? { ...col, title: newTitle } : col)
        })),
    }), { name: 'board-store', partialize: (state) => ({ columns: state.columns }), })



)


