import { database } from '../../../database';
import { UserCredentials } from '../interfaces';

export const validateUser = async (credentials: UserCredentials) => {
 try {
    const { email, password } = credentials;
    const user = await database.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    if (!user) {
        throw new Error('User not found');
    }
    const valid = await user.comparePassword(password);
    if (!valid) {
        throw new Error('Invalid password');
    }
    return user;
 } catch (error) {
    throw new Error(error);
 }
};
