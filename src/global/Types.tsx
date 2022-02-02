export type TaskType = {
    id: number,
    name: string,
    isChecked: boolean,
    checkTask?: () => void,
    editTask?: () => void,
    removeTask?: () => void
}

export type ListType = {
    id: number,
    name: string,
    tasks: TaskType[]
}