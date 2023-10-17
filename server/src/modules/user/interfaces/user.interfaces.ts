export interface IUser {
    user_id: number;
    username: string;
    email: string;
    password: string;
    avatar: string;
    created_at: Date;
}

export interface UserDTO {
    username: string;
    email: string;
    password: string;
    avatar?: string;
}
