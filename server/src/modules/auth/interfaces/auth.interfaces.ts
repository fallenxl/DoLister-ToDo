import exp from "constants";

export interface UserCredentials {
    email: string;
    password: string;
}

export interface AuthTokenResult  {
    sub: string;
    iat: number;
    exp: number;
}

export interface AuthResponse{
    msg: string;
    token: string;
}

export interface IUseToken {
    sub: string;
    isExpired: boolean;
}