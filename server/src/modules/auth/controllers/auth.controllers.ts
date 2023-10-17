import { Response } from "express";
import { refreshToken, registerUser, validateUser } from "../services";
import { IUser, UserDTO } from "../../user/interfaces";

export const loginController = async (req: any, res: Response) => {
    try {
        const body: UserDTO = req.body;
        const response = await validateUser(body);
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const registerController = async (req: any, res: Response) => {
    try {
        const body: UserDTO = req.body;
        const response = await registerUser(body);
        return res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const refreshTokenController = async (req: any, res: Response) => {
    try {
        const { userID } = req
        const response = await refreshToken(userID);
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};