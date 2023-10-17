import { database } from "../../../database";
import { IUser, UserDTO } from "../interfaces";

export const getUserById = async (id: string): Promise<IUser> => {
    try {
        const user = await database.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return user[0]

    } catch (error) {
        throw Error(error);
    }
};

export const getUserByEmail = async (email: string): Promise<IUser> => {
    try {
        const user = await database.query('SELECT * FROM users WHERE email = $1', [email]);
        return user[0]

    } catch (error) {
        throw Error(`Error while getting user by email: ${error}`);
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

    }
};