import jwt from 'jsonwebtoken';
import { AuthTokenResult, IUseToken } from '../modules/auth/interfaces';
export const useToken = (token: string): IUseToken | string => {
    try {
        const decode = jwt.decode(token) as AuthTokenResult;
        const currentDate = new Date();
        const expiresDate = new Date(decode?.exp * 1000);
        return {
            sub: decode?.sub,
            isExpired: +expiresDate <= +currentDate / 1000,
        }
    } catch (error) {
        return 'Token is not valid'
    }
};