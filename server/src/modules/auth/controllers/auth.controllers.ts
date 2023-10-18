// Importa las bibliotecas y servicios necesarios
import { Response } from "express";
import { refreshToken, registerUser, validateUser } from "../services";
import { IUser, UserDTO } from "../../user/interfaces";

// Controlador para autenticar a un usuario
export const loginController = async (req: any, res: Response) => {
    try {
        // Obtiene el cuerpo de la solicitud que debe contener las credenciales del usuario
        const body: UserDTO = req.body;
        
        // Llama a la función 'validateUser' para validar al usuario
        const response = await validateUser(body);
        
        // Retorna una respuesta exitosa (código 200) con la respuesta generada por 'validateUser'
        return res.status(200).json(response);
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error (código 400) con el mensaje de error
        res.status(400).json({ error: error.message });
    }
};

// Controlador para registrar a un nuevo usuario
export const registerController = async (req: any, res: Response) => {
    try {
        // Obtiene el cuerpo de la solicitud que debe contener los datos del nuevo usuario
        const body: UserDTO = req.body;
        
        // Llama a la función 'registerUser' para registrar al nuevo usuario
        const response = await registerUser(body);
        
        // Retorna una respuesta de creación exitosa (código 201) con la respuesta generada por 'registerUser'
        return res.status(201).json(response);
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error (código 400) con el mensaje de error
        res.status(400).json({ error: error.message });
    }
};

// Controlador para renovar el token de un usuario autenticado
export const refreshTokenController = async (req: any, res: Response) => {
    try {
        // Obtiene el identificador de usuario almacenado en la solicitud (previamente establecido por el middleware)
        const { userID } = req;
        
        // Llama a la función 'refreshToken' para renovar el token del usuario
        const response = await refreshToken(userID);
        
        // Retorna una respuesta exitosa (código 200) con la respuesta generada por 'refreshToken'
        return res.status(200).json(response);
    } catch (error) {
        // En caso de un error, devuelve una respuesta de error (código 400) con el mensaje de error
        res.status(400).json({ error: error.message });
    }
};
