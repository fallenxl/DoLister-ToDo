// Importa las bibliotecas y servicios necesarios
import { Response } from "express";
import {
    createTask,
    deleteAllTasks,
    deleteSelectedTasks,
    deleteTaskByID,
    getAllTasks,
    getTaskByID,
    toggleTaskCompleted,
    updateTask,
} from "../services";
import { TaskDTO, UpdateTaskDTO } from "../interfaces";

// Controlador para obtener todas las tareas del usuario
export const getAllTasksController = async (req: any, res: Response) => {
    try {
        // Obtiene todas las tareas asociadas al usuario
        const tasks = await getAllTasks(req.userID);

        // Retorna una respuesta exitosa (código 200) con un mensaje y las tareas
        res.status(200).json({
            msg: 'All tasks retrieved successfully',
            tasks,
        });
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener una tarea específica por su ID
export const getTaskByIDController = async (req: any, res: Response) => {
    try {
        // Obtiene una tarea por su ID
        const task = await getTaskByID(req.params.id, req.userID);

        // Si no se encuentra la tarea, devuelve una respuesta de recurso no encontrado (código 404)
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Retorna una respuesta exitosa (código 200) con un mensaje y la tarea
        res.status(200).json({
            msg: 'Task retrieved successfully',
            task,
        });
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para crear una nueva tarea
export const createTaskController = async (req: any, res: Response) => {
    try {
        // Obtiene los datos de la nueva tarea del cuerpo de la solicitud
        const taskDto: TaskDTO = req.body;

        // Crea la tarea y asocia la tarea al usuario actual
        const task = await createTask(taskDto, req.userID);

        // Retorna una respuesta de creación exitosa (código 201) con un mensaje y la tarea creada
        res.status(201).json({
            msg: 'Task created successfully',
            task,
        });
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar una tarea existente
export const updateTaskController = async (req: any, res: Response) => {
    try {
        // Obtiene los datos actualizados de la tarea del cuerpo de la solicitud
        const updateTaskDto: UpdateTaskDTO = req.body;

        // Actualiza la tarea con el ID especificado
        const task = await updateTask(req.params.id, updateTaskDto, req.userID);

        // Retorna una respuesta exitosa (código 200) con un mensaje y la tarea actualizada
        res.status(200).json({
            msg: 'Task updated successfully',
            task,
        });
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para marcar o desmarcar una tarea como completada
export const toggleTaskCompletedController = async (req: any, res: Response) => {
    try {
        // Marca o desmarca la tarea con el ID especificado como completada
        const task = await toggleTaskCompleted(req.params.id, req.userID);

        // Retorna una respuesta exitosa (código 200) con un mensaje y la tarea actualizada
        res.status(200).json({
            msg: 'Task updated successfully',
            task,
        });
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar una lista de tareas seleccionadas
export const deleteSelectedTasksController = async (req: any, res: Response) => {
    try {
        // Obtiene la lista de IDs de tareas a eliminar del cuerpo de la solicitud
        const { tasksSelected } = req.body;

        // Elimina las tareas seleccionadas asociadas al usuario actual
        const tasksDeleted = await deleteSelectedTasks(tasksSelected, req.userID);

        // Retorna una respuesta exitosa (código 200) con un mensaje y la lista de tareas eliminadas
        res.status(200).json({
            msg: 'Tasks deleted successfully',
            tasksDeleted,
        });
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar todas las tareas del usuario
export const deleteAllTasksController = async (req: any, res: Response) => {
    try {
        // Elimina todas las tareas asociadas al usuario actual
        const tasksDeleted = await deleteAllTasks(req.userID);

        // Retorna una respuesta exitosa (código 200) con un mensaje y la lista de tareas eliminadas
        res.status(200).json({
            msg: 'All tasks deleted successfully',
            tasksDeleted,
        });
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar una tarea específica por su ID
export const deleteTaskByIDController = async (req: any, res: Response) => {
    try {
        // Obtiene el ID de la tarea a eliminar de los parámetros de la solicitud
        const { id } = req.params;

        // Elimina la tarea con el ID especificado asociada al usuario actual
        const tasksDeleted = await deleteTaskByID(id, req.userID);

        // Retorna una respuesta exitosa (código 200) con un mensaje y la lista de tareas eliminadas
        res.status(200).json({
            msg: 'Task deleted successfully',
            tasksDeleted,
        });
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
};
