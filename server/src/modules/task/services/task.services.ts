// Importa la base de datos y las interfaces necesarias
import { database } from "../../../database";
import { TaskDTO, UpdateTaskDTO } from "../interfaces";

// Obtiene todas las tareas asociadas a un usuario
export const getAllTasks = async (userID: string) => {
    try {
        // Construye una consulta SQL para seleccionar todas las tareas del usuario y las ordena por fecha de creación.
        const query = `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ASC;`;

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'tasks'.
        const tasks = await database.query(query, [userID]);

        // Retorna la lista de tareas obtenida.
        return tasks;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while getting all tasks: ${error.message}`);
    }
};

// Obtiene una tarea específica por su ID y el ID del usuario
export const getTaskByID = async (taskID: string, userID: string) => {
    try {
        // Construye una consulta SQL para seleccionar una tarea por su ID y el ID del usuario.
        const query = `SELECT * FROM tasks WHERE task_id = $1 AND user_id = $2;`;

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'task'.
        const task = await database.oneOrNone(query, [taskID, userID]);

        // Si no se encuentra la tarea, devuelve 'null'. De lo contrario, retorna la tarea encontrada.
        return task;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while getting task by ID: ${error.message}`);
    }
};

// Crea una nueva tarea asociada a un usuario
export const createTask = async (task: TaskDTO, userID: string) => {
    try {
        // Construye una consulta SQL para insertar una nueva tarea en la base de datos y retorna la tarea creada.
        const query = `INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *;`;

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'newTask'.
        const newTask = await database.one(query, [task.title, task.description, userID]);

        // Retorna la tarea recién creada.
        return newTask;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while creating task: ${error.message}`);
    }
};

// Actualiza una tarea existente por su ID y el ID del usuario
export const updateTask = async (taskID: string, task: UpdateTaskDTO, userID: string) => {
    try {
        const { title, description, completed } = task;
        
        // Construye una consulta SQL para actualizar los campos de una tarea específica por su ID y el ID del usuario.
        const query = `UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE task_id = $4 AND user_id = $5 RETURNING *;`;

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'taskUpdated'.
        const taskUpdated = await database.one(query, [title, description, completed, taskID, userID]);

        // Retorna la tarea actualizada.
        return taskUpdated;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while updating task: ${error.message}`);
    }
};

// Cambia el estado de completitud de una tarea por su ID y el ID del usuario
export const toggleTaskCompleted = async (taskID: string, userID: string) => {
    try {
        // Construye una consulta SQL para cambiar el estado de completitud de una tarea específica por su ID y el ID del usuario.
        const query = `UPDATE tasks SET completed = NOT completed WHERE task_id = $1 AND user_id = $2 RETURNING *;`;

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'taskUpdated'.
        const taskUpdated = await database.one(query, [taskID, userID]);

        // Retorna la tarea con el estado de completitud actualizado.
        return taskUpdated;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while toggling task completed: ${error.message}`);
    }
};

// Elimina una lista de tareas seleccionadas asociadas a un usuario
export const deleteSelectedTasks = async (taskIDs: string[], userID: string) => {
    try {
        // Construye una consulta SQL para eliminar las tareas seleccionadas por su ID y el ID del usuario.
        const query = `DELETE FROM tasks WHERE task_id IN ($1:csv) AND user_id = $2 RETURNING *;`;

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'tasksDeleted'.
        const tasksDeleted = await database.query(query, [taskIDs, userID]);

        // Retorna la lista de tareas eliminadas.
        return tasksDeleted;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while deleting selected tasks: ${error.message}`);
    }
};

// Elimina todas las tareas asociadas a un usuario
export const deleteAllTasks = async (userID: string) => {
    try {
        // Construye una consulta SQL para eliminar todas las tareas asociadas al usuario por su ID.
        const query = `DELETE FROM tasks WHERE user_id = $1 RETURNING *;`;

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'tasksDeleted'.
        const tasksDeleted = await database.query(query, [userID]);

        // Retorna la lista de tareas eliminadas.
        return tasksDeleted;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while deleting all tasks: ${error.message}`);
    }
};

// Elimina una tarea específica por su ID y el ID del usuario
export const deleteTaskByID = async (taskID: string, userID: string) => {
    try {
        // Construye una consulta SQL para eliminar una tarea específica por su ID y el ID del usuario.
        const query = `DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 RETURNING *;`;

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'taskDeleted'.
        const taskDeleted = await database.one(query, [taskID, userID]);

        // Retorna la tarea eliminada.
        return taskDeleted;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while deleting task: ${error.message}`);
    }
};
