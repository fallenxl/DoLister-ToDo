import axios from "axios";
import { Endpoints } from "../constants/endpoints";

export const getAllTasks = async () => {
    try {
        const { data } = await axios.get(Endpoints.TASKS);
        return data.tasks;
    } catch (error) {

    }
};