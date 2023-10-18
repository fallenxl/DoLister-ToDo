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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByEmail = exports.getUserById = void 0;
// Importa la base de datos y las interfaces necesarias
const database_1 = require("../../../database");
// Obtiene un usuario por su ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Construye una consulta SQL para seleccionar un usuario por su ID.
        const query = 'SELECT * FROM users WHERE user_id = $1;';
        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'user'.
        const user = yield database_1.database.oneOrNone(query, [id]);
        // Retorna el usuario encontrado o 'null' si no se encuentra.
        return user;
    }
    catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while getting user by ID: ${error.message}`);
    }
});
exports.getUserById = getUserById;
// Obtiene un usuario por su dirección de correo electrónico
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Construye una consulta SQL para seleccionar un usuario por su dirección de correo electrónico.
        const query = 'SELECT * FROM users WHERE email = $1;';
        // Ejecuta la consulta en la base de datos y almacena el resultado en la variable 'user'.
        const user = yield database_1.database.oneOrNone(query, [email]);
        // Retorna el usuario encontrado o 'null' si no se encuentra.
        return user;
    }
    catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while getting user by email: ${error.message}`);
    }
});
exports.getUserByEmail = getUserByEmail;
// Crea un nuevo usuario en la base de datos
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extrae las propiedades del usuario (username, email, password y avatar).
        const { username, email, password, avatar } = user;
        // Construye una consulta SQL para insertar un nuevo usuario en la base de datos y retorna el usuario creado.
        const newUser = yield database_1.database.one('INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *;', [username, email, password, avatar]);
        // Retorna el nuevo usuario creado.
        return newUser;
    }
    catch (error) {
        // En caso de error, lanza una excepción con un mensaje descriptivo.
        throw new Error(`Error while creating a user: ${error.message}`);
    }
});
exports.createUser = createUser;
//# sourceMappingURL=user.services.js.map