import { database } from "../../../database";
import { TaskDTO, UpdateTaskDTO } from "../interfaces";

export const getAllTasks = async (userID: string) => {
    try {
        const query = `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ASC;`;
        const tasks = await database.query(query, [userID]);
        return tasks;
    } catch (error) {
        throw new Error(`Error while getting all tasks: ${error.message}`);
    }
};

export const getTaskByID = async (taskID: string, userID: string) => {
    try {
        const query = `SELECT * FROM tasks WHERE task_id = $1 AND user_id = $2;`;
        const task = await database.oneOrNone(query, [taskID, userID]);
        return task;
    } catch (error) {
        throw new Error(`Error while getting task by ID: ${error.message}`);
    }
};

export const createTask = async (task: TaskDTO, userID: string) => {
    try {
        const query = `INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *;`;
        const newTask = await database.one(query, [task.title, task.description, userID]);
        return newTask;
    } catch (error) {
        throw new Error(`Error while creating task: ${error.message}`);
    }
};

export const updateTask = async (taskID: string, task: UpdateTaskDTO, userID: string) => {
    try {
        const { title, description, completed } = task;
        
        const query = `UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE task_id = $4 AND user_id = $5 RETURNING *;`;
        const taskUpdated = await database.one(query, [title, description, completed, taskID, userID]);
        return taskUpdated;
    } catch (error) {
        throw new Error(`Error while updating task: ${error.message}`);
    }
};

export const toggleTaskCompleted = async (taskID: string, userID: string) => {
    try {
        const query = `UPDATE tasks SET completed = NOT completed WHERE task_id = $1 AND user_id = $2 RETURNING *;`;
        const taskUpdated = await database.one(query, [taskID, userID]);
        return taskUpdated;
    } catch (error) {
        throw new Error(`Error while toggling task completed: ${error.message}`);
    }
};

export const deleteSelectedTasks = async (taskIDs: string[], userID: string) => {
    try {
        const query = `DELETE FROM tasks WHERE task_id IN ($1:csv) AND user_id = $2 RETURNING *;`;
        const tasksDeleted = await database.query(query, [taskIDs, userID]);
        return tasksDeleted;
    } catch (error) {
        throw new Error(`Error while deleting selected tasks: ${error.message}`);
    }
};

export const deleteAllTasks = async (userID: string) => {
    try {
        const query = `DELETE FROM tasks WHERE user_id = $1 RETURNING *;`;
        const tasksDeleted = await database.query(query, [userID]);
        return tasksDeleted;
    } catch (error) {
        throw new Error(`Error while deleting all tasks: ${error.message}`);
    }
};

export const deleteTaskByID = async (taskID: string, userID: string) => {
    try {
        const query = `DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 RETURNING *;`;
        const taskDeleted = await database.one(query, [taskID, userID]);
        return taskDeleted;
    } catch (error) {
        throw new Error(`Error while deleting task: ${error.message}`);
    }
};

