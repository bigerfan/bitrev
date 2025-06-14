export type ColumnType = {
    id: number,
    title: string,
    tasks: TasksType[]
}

export type TasksType = {
    id: number,
    name: string,
}