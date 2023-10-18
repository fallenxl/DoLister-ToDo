// Importa las bibliotecas necesarias
import 'dotenv/config' // Variables de entorno
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthResponse, UserCredentials } from '../interfaces';
import { createUser, getUserByEmail, getUserById } from '../../user/services';
import { IUser, UserDTO } from '../../user/interfaces';

// Función para validar un usuario
export const validateUser = async (credentials: UserCredentials): Promise<AuthResponse> => {
    try {
        const { email, password } = credentials;

        // Busca un usuario por su dirección de correo electrónico
        const user = await getUserByEmail(email);

        // Si no se encuentra un usuario, lanza un error
        if (!user) {
            throw new Error('User not found');
        }

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        const valid = await bcrypt.compare(password, user.password);

        // Si las contraseñas no coinciden, lanza un error
        if (!valid) {
            throw new Error('Invalid password');
        }

        // Genera un token de autenticación para el usuario
        const token = generateToken(user);

        // Retorna la respuesta de autenticación con los datos del usuario y el token
        return {
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }, token
        };
    } catch (error) {
        // Captura y relanza cualquier error que ocurra
        throw new Error(error);
    }
};

// Función para registrar un nuevo usuario
export const registerUser = async (user: UserDTO): Promise<AuthResponse> => {
    try {
        // Busca un usuario por su dirección de correo electrónico para verificar si ya existe
        const userFound = await getUserByEmail(user.email);

        // Si ya existe un usuario con ese correo electrónico, lanza un error
        if (userFound) {
            throw new Error('User already exists');
        }

        // Genera una sal para encriptar la contraseña
        const salt = await bcrypt.genSalt(10);

        // Encripta la contraseña del nuevo usuario
        user.password = await bcrypt.hash(user.password, salt);

        // Genera una URL para el avatar del usuario (posiblemente usando el nombre de usuario)
        user.avatar = `https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=${user.username}`;
        
        // Crea el nuevo usuario en la base de datos
        const newUser = await createUser(user);

        // Genera un token de autenticación para el nuevo usuario
        const token = generateToken(newUser);

        // Retorna la respuesta de autenticación con los datos del nuevo usuario y el token
        return {
            user: {
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar
            }, token
        };

    } catch (error) {
        // Captura y relanza cualquier error que ocurra
        throw new Error(error);
    }
};

// Función para refrescar el token de un usuario
export const refreshToken = async (id: string): Promise<AuthResponse> => {
    try {
        // Busca un usuario por su identificador
        const user = await getUserById(id);

        // Si no se encuentra un usuario, lanza un error
        if (!user) {
            throw new Error('User not found');
        }

        // Genera un nuevo token de autenticación para el usuario
        const token = generateToken(user);

        // Retorna la respuesta de autenticación con los datos del usuario y el nuevo token
        return {
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
            , token
        };
    } catch (error) {
        // Captura y relanza cualquier error que ocurra
        throw new Error(`Error while refreshing token: ${error.message}`);
    }
};

// Función para generar un token de autenticación
export const generateToken = (user: IUser) => {
    const payload = {
        sub: user.user_id,
    };

    // Genera un token JWT con el identificador del usuario y una clave secreta (o una clave predeterminada si no está configurada)
    return jwt.sign(payload, process.env.SECRET_KEY , { expiresIn: '1h' });
};
