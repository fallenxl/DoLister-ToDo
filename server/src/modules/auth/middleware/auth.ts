// Importa las bibliotecas y utilidades necesarias
import { NextFunction, Request, Response } from "express";
import { useToken } from "../../../utils";

// Declara un espacio de nombres global para Express para extender la interfaz Request
declare global {
    namespace Express {
        interface Request {
            userID: string;
        }
    }
}

// Función de middleware para la autenticación y autorización
export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    // Extrae el token de autenticación del encabezado de la solicitud
    const token = extractTokenFromHeader(req);

    // Si no se proporciona un token o es un token no válido, devuelve un error de no autorizado (código 401)
    if (!token || Array.isArray(token)) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Utiliza una función (useToken) para gestionar y verificar el token
    const manageToken = useToken(token);

    // Si la función devuelve un mensaje de error en lugar de un objeto de token, devuelve un error de no autorizado
    if (typeof manageToken === 'string') {
        return res.status(401).json({ message: manageToken });
    }

    // Si el token ha expirado, devuelve un error de no autorizado
    if (manageToken.isExpired) {
        return res.status(401).json({ message: 'Token expired' });
    }

    // Almacena el identificador del usuario (extraído del token) en la solicitud para su posterior uso
    req.userID = manageToken.sub;

    // Llama a la siguiente función de middleware
    next();
};

// Función para extraer el token de autenticación del encabezado de la solicitud
const extractTokenFromHeader = (req: Request): string | undefined => {
    const [type, token] = req.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
}
