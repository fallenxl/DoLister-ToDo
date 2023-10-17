import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthResponse, UserCredentials } from '../interfaces';
import { createUser, getUserByEmail, getUserById } from '../../user/services';
import { IUser, UserDTO } from '../../user/interfaces';

export const validateUser = async (credentials: UserCredentials): Promise<AuthResponse> => {
    try {
        const { email, password } = credentials;
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        const token = generateToken(user);
        return { msg: 'Login successfull', token };
    } catch (error) {
        throw new Error(error);
    }
};

export const registerUser = async (user: UserDTO): Promise<AuthResponse> => {
    try {
        const userFound = await getUserByEmail(user.email);
        if (userFound) {
            throw new Error('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const newUser = await createUser(user);
        const token = generateToken(newUser);
        return { msg: 'User created successfully', token };

    } catch (error) {
        throw new Error(error);
    }
};

export const refreshToken = async (id: string): Promise<AuthResponse> => {
    try {
        const user = await getUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        const token = generateToken(user);;
        return { msg: 'Token refreshed', token };
    } catch (error) {
        throw new Error(`Error while refreshing token: ${error.message}`);
    }
};

export const generateToken = (user: IUser) => {
    const payload = {
        sub: user.user_id,

    };
    return jwt.sign(payload, process.env.SECRET_KEY || 'secret', { expiresIn: '1h' });
};

