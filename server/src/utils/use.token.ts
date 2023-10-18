// Importa la librería 'jsonwebtoken' y las interfaces relacionadas con el token y su uso
import jwt from 'jsonwebtoken';
import { AuthTokenResult, IUseToken } from '../modules/auth/interfaces';

// Función que verifica y decodifica un token JWT
export const useToken = (token: string): IUseToken | string => {
    try {
        // Decodifica el token JWT y lo almacena en la variable 'decode' como un objeto AuthTokenResult.
        const decode = jwt.decode(token) as AuthTokenResult;

        // Obtiene la fecha actual.
        const currentDate = new Date();

        // Obtiene la fecha de vencimiento del token y multiplica el valor por 1000 para convertirlo en milisegundos.
        const expiresDate = new Date(decode?.exp * 1000);

        // Retorna un objeto que contiene el 'sub' (sujeto) del token y un indicador de si el token ha expirado.
        return {
            sub: decode?.sub,
            isExpired: +expiresDate <= +currentDate / 1000,
        }
    } catch (error) {
        // Si hay un error al decodificar el token, se retorna un mensaje indicando que el token no es válido.
        return 'Token is not valid'
    }
};
