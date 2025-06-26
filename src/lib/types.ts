export type ColumnType = {
    id: string,
    title: string,
    tasks: TasksType[]
}

export type TasksType = {
    id: string,
    name: string,
    status?: string,
    deadLine?:string| Date 
}