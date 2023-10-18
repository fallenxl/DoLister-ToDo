// Importa la base de datos y las interfaces necesarias
import { database } from "../../../database";
import { IUser, UserDTO } from "../interfaces";

// Obtiene un usuario por su ID
export const getUserById = async (id: string): Promise<IUser> => {
    try {
        // Construye una consulta SQL para seleccionar un usuario por su ID.
        const query = 'SELECT * FROM users WHERE user_id = $1;';

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'user'.
        const user = await database.oneOrNone(query, [id]);

        // Retorna el usuario encontrado o 'null' si no se encuentra.
        return user;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while getting user by ID: ${error.message}`);
    }
};

// Obtiene un usuario por su dirección de correo electrónico
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        // Construye una consulta SQL para seleccionar un usuario por su dirección de correo electrónico.
        const query = 'SELECT * FROM users WHERE email = $1;';

        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'user'.
        const user = await database.oneOrNone(query, [email]);

        // Retorna el usuario encontrado o 'null' si no se encuentra.
        return user;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while getting user by email: ${error.message}`);
    }
};

// Crea un nuevo usuario en la base de datos
export const createUser = async (user: UserDTO): Promise<IUser> => {
    try {
        // Extrae las propiedades del usuario (username, email, password y avatar).
        const { username, email, password, avatar } = user;

        // Construye una consulta SQL para insertar un nuevo usuario en la base de datos y retorna el usuario creado.
        const newUser = await database.one(
            'INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *;',
            [username, email, password, avatar]
        );

        // Retorna el nuevo usuario creado.
        return newUser;
    } catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while creating a user: ${error.message}`);
    }
};
