export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends AuthCredentials {
    username: string;
}

export interface AuthResponse {
    token: string;
}