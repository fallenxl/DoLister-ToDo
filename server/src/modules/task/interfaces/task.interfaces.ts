// Define la interfaz 'ITask' que representa una tarea en la base de datos
export interface ITask {
    task_id: number;      // Identificador único de la tarea
    title: string;        // Título de la tarea
    description: string;  // Descripción de la tarea
    completed: boolean;   // Indica si la tarea está completada o no
    user_id: number;      // Identificador del usuario al que está asociada la tarea
    created_at: Date;     // Fecha de creación de la tarea
}

// Define la interfaz 'TaskDTO' que representa los datos necesarios para crear una nueva tarea
export interface TaskDTO {
    title: string;        // Título de la tarea
    description: string;  // Descripción de la tarea
}

// Define la interfaz 'UpdateTaskDTO' que representa los datos necesarios para actualizar una tarea existente
export interface UpdateTaskDTO {
    title?: string;        // Nuevo título de la tarea (opcional)
    description?: string;  // Nueva descripción de la tarea (opcional)
    completed?: boolean;   // Nuevo estado de completitud de la tarea (opcional)
}
