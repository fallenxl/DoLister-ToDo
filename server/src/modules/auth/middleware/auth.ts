import { NextFunction, Request, Response } from "express";
import { useToken } from "../../../utils";

declare global {
    namespace Express {
        interface Request {
            userID: string;
        }
    }
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromHeader(req);
    if (!token || Array.isArray(token)) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const manageToken = useToken(token);
    if (typeof manageToken === 'string') {
        return res.status(401).json({ message: manageToken });
    }

    if (manageToken.isExpired) {
        return res.status(401).json({ message: 'Token expired' });
    }

    req.userID = manageToken.sub;

    next();
};

const extractTokenFromHeader = (req: Request):string | undefined => {
    const [type, token] = req.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
}

