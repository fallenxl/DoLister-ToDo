// Define una interfaz 'UserCredentials' que representa las credenciales de un usuario
export interface UserCredentials {
    email: string;     // Dirección de correo electrónico del usuario
    password: string;  // Contraseña del usuario
}

// Define una interfaz 'AuthTokenResult' que representa los detalles de un token de autenticación
export interface AuthTokenResult  {
    sub: string;    // Identificador del sujeto (por lo general, el identificador del usuario)
    iat: number;    // Marca de tiempo de emisión del token (cuándo se emitió el token)
    exp: number;    // Marca de tiempo de expiración del token (cuándo expirará el token)
}

// Define una interfaz 'AuthResponse' que representa la respuesta de autenticación
export interface AuthResponse {
    user: {
        username: string; // Nombre de usuario del usuario autenticado
        email: string;    // Dirección de correo electrónico del usuario autenticado
        avatar: string;   // URL del avatar del usuario autenticado
    }
    token: string;        // Token de autenticación generado
}

// Define una interfaz 'IUseToken' que representa la información de un token de autenticación
export interface IUseToken {
    sub: string;         // Identificador del sujeto (por lo general, el identificador del usuario)
    isExpired: boolean; // Indica si el token ha expirado (verdadero o falso)
}
