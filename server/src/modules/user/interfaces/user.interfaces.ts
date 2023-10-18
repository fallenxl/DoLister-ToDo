// Define la interfaz 'IUser' que representa un usuario en la base de datos
export interface IUser {
    user_id: number;     // Identificador único del usuario
    username: string;   // Nombre de usuario
    email: string;      // Dirección de correo electrónico del usuario
    password: string;   // Contraseña del usuario
    avatar: string;     // URL del avatar del usuario
    created_at: Date;   // Fecha de creación del usuario
}

// Define la interfaz 'UserDTO' que representa los datos necesarios para crear o actualizar un usuario
export interface UserDTO {
    username: string;   // Nombre de usuario
    email: string;      // Dirección de correo electrónico del usuario
    password: string;   // Contraseña del usuario
    avatar?: string;    // URL opcional del avatar del usuario
}
