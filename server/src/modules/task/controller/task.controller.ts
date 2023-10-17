import { Response } from "express";
import { createTask, deleteAllTasks, deleteSelectedTasks, deleteTaskByID, getAllTasks, getTaskByID, toggleTaskCompleted, updateTask } from "../services";
import { TaskDTO, UpdateTaskDTO } from "../interfaces";

export const getAllTasksController = async (req: any, res: Response) => {
    try {
        const tasks = await getAllTasks(req.userID);

        res.status(200).json({
            msg: 'All tasks retrieved successfully',
            tasks,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskByIDController = async (req: any, res: Response) => {
    try {
        const task = await getTaskByID(req.params.id, req.userID);

        if(!task) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({
            msg: 'Task retrieved successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTaskController = async (req: any, res: Response) => {
    try {
        const taskDto: TaskDTO = req.body;
        const task = await createTask(taskDto, req.userID);
        res.status(201).json({
            msg: 'Task created successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskController = async (req: any, res: Response) => {
    try {
        const updateTaskDto: UpdateTaskDTO = req.body;
        const task = await updateTask(req.params.id, updateTaskDto, req.userID);
        res.status(200).json({
            msg: 'Task updated successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleTaskCompletedController = async (req: any, res: Response) => {
    try {
        const task = await toggleTaskCompleted(req.params.id, req.userID);
        res.status(200).json({
            msg: 'Task updated successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSelectedTasksController = async (req: any, res: Response) => {
    try {
        const { tasksSelected } = req.body;
        const tasksDeleted = await deleteSelectedTasks(tasksSelected, req.userID);
        res.status(200).json({
            msg: 'Tasks deleted successfully',
            tasksDeleted,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllTasksController = async (req: any, res: Response) => {
    try {
        const tasksDeleted = await deleteAllTasks(req.userID);
        res.status(200).json({
            msg: 'All tasks deleted successfully',
            tasksDeleted,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTaskByIDController = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const tasksDeleted = await deleteTaskByID(id, req.userID);
        res.status(200).json({
            msg: 'Task deleted successfully',
            tasksDeleted,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};