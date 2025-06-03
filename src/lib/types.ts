export type ColumnType = {
    id: number,
    title: string,
    added?:boolean,
    tasks: TasksType[]
}

export type TasksType = {
    id: number,
    name: string,
}