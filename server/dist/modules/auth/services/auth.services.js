"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.refreshToken = exports.registerUser = exports.validateUser = void 0;
// Importa las bibliotecas necesarias
require("dotenv/config"); // Variables de entorno
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../../user/services");
// Función para validar un usuario
const validateUser = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = credentials;
        // Busca un usuario por su dirección de correo electrónico
        const user = yield (0, services_1.getUserByEmail)(email);
        // Si no se encuentra un usuario, lanza un error
        if (!user) {
            throw new Error('User not found');
        }
        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        const valid = yield bcrypt_1.default.compare(password, user.password);
        // Si las contraseñas no coinciden, lanza un error
        if (!valid) {
            throw new Error('Invalid password');
        }
        // Genera un token de autenticación para el usuario
        const token = (0, exports.generateToken)(user);
        // Retorna la respuesta de autenticación con los datos del usuario y el token
        return {
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }, token
        };
    }
    catch (error) {
        // Captura y relanza cualquier error que ocurra
        throw new Error(error);
    }
});
exports.validateUser = validateUser;
// Función para registrar un nuevo usuario
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca un usuario por su dirección de correo electrónico para verificar si ya existe
        const userFound = yield (0, services_1.getUserByEmail)(user.email);
        // Si ya existe un usuario con ese correo electrónico, lanza un error
        if (userFound) {
            throw new Error('User already exists');
        }
        // Genera una sal para encriptar la contraseña
        const salt = yield bcrypt_1.default.genSalt(10);
        // Encripta la contraseña del nuevo usuario
        user.password = yield bcrypt_1.default.hash(user.password, salt);
        // Genera una URL para el avatar del usuario (posiblemente usando el nombre de usuario)
        user.avatar = `https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=${user.username}`;
        // Crea el nuevo usuario en la base de datos
        const newUser = yield (0, services_1.createUser)(user);
        // Genera un token de autenticación para el nuevo usuario
        const token = (0, exports.generateToken)(newUser);
        // Retorna la respuesta de autenticación con los datos del nuevo usuario y el token
        return {
            user: {
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar
            }, token
        };
    }
    catch (error) {
        // Captura y relanza cualquier error que ocurra
        throw new Error(error);
    }
});
exports.registerUser = registerUser;
// Función para refrescar el token de un usuario
const refreshToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca un usuario por su identificador
        const user = yield (0, services_1.getUserById)(id);
        // Si no se encuentra un usuario, lanza un error
        if (!user) {
            throw new Error('User not found');
        }
        // Genera un nuevo token de autenticación para el usuario
        const token = (0, exports.generateToken)(user);
        // Retorna la respuesta de autenticación con los datos del usuario y el nuevo token
        return {
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
            token
        };
    }
    catch (error) {
        // Captura y relanza cualquier error que ocurra
        throw new Error(`Error while refreshing token: ${error.message}`);
    }
});
exports.refreshToken = refreshToken;
// Función para generar un token de autenticación
const generateToken = (user) => {
    const payload = {
        sub: user.user_id,
    };
    // Genera un token JWT con el identificador del usuario y una clave secreta (o una clave predeterminada si no está configurada)
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.services.js.map