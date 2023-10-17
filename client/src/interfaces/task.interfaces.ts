export interface Task {
    task_id : string;
    title : string;
    description : string;
    completed : boolean;
    user_id : string;
    created_at : Date;
}

export interface TaskDTO {
    title : string;
    description : string;
}