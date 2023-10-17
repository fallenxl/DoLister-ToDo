import { database } from "../../../database";
import { IUser, UserDTO } from "../interfaces";

export const getUserById = async (id: string): Promise<IUser > => {
    try {
        const query = 'SELECT * FROM users WHERE user_id = $1;';
        // console.log('query', query);
        const user = await database.oneOrNone(query, [id]);
        return user;
    } catch (error) {
        throw new Error(`Error while getting user by ID: ${error.message}`);
    }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        const user = await database.query('SELECT * FROM users WHERE email = $1', [email]);
        return user[0] || null;
    } catch (error) {
        throw new Error(`Error while getting user by email: ${error.message}`);
    }
};

export const createUser = async (user: UserDTO): Promise<IUser> => {
    try {
        const { username, email, password, avatar } = user;
        const newUser = await database.query(
            'INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, password, avatar]
        );
        return newUser[0];
    } catch (error) {
        throw new Error(`Error while creating a user: ${error.message}`);
    }
};
