import axios from "axios";
import { Endpoints } from "../constants/endpoints";
import { TaskDTO } from "../interfaces";


export const createTask = async (task: TaskDTO) => {
    try {
        const { data } = await axios.post(Endpoints.TASKS, task);
        return data.task;
    } catch (error) {

    }
};

export const getAllTasks = async () => {
    try {
        const { data } = await axios.get(Endpoints.TASKS);
        return data.tasks;
    } catch (error) {

    }
};

export const toggleTaskCompleted = async (taskID: string) => {
    try {
        const { data } = await axios.put(Endpoints.TASK_STATUS + taskID);
        return data.task;
    } catch (error) {

    }
};

export const deleteTask = async (taskID: string) => {
    try {
        const { data } = await axios.delete(Endpoints.TASKS + taskID);
        return data.task;
    } catch (error) {

    }
};

export const deleteSelectedTasks = async (tasksSelected: any) => {
    try {
        const { data } = await axios.delete(Endpoints.SELECTED_TASKS, { 
            data: { tasksSelected }
        });
        return data.tasks;
    } catch (error) {

    }
};