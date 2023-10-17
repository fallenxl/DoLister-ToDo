export interface UserCredentials {
    email: string;
    password: string;
}

export interface AuthTokenResult  {
    sub: string;
    iat: number;
    exp: number;
}

export interface IUseToken {
    sub: string;
    isExpired: boolean;
}