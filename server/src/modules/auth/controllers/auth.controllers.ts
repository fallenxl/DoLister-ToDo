import { Response } from "express";
import { registerUser, validateUser } from "../services";
import { IUser, UserDTO } from "../../user/interfaces";

export const login = async (req:any, res: Response) => {
    try {
        const body: UserDTO = req.body;
        const response = await validateUser(body);
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const register = async (req: any, res: Response) => {
    try {
        const body: UserDTO = req.body;
        const response = await registerUser(body);
        return res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
