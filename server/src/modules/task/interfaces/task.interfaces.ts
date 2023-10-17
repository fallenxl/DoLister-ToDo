export interface ITask {
    task_id: number;
    title: string;
    description: string;
    completed: boolean;
    user_id: number;
    created_at: Date;
}

export interface TaskDTO{
    title: string;
    description: string;
}

export interface UpdateTaskDTO{
    title?: string;
    description?: string;
    completed?: boolean;
}