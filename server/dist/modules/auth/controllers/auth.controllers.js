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
exports.refreshTokenController = exports.registerController = exports.loginController = void 0;
const services_1 = require("../services");
// Controlador para autenticar a un usuario
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene el cuerpo de la solicitud que debe contener las credenciales del usuario
        const body = req.body;
        // Llama a la función 'validateUser' para validar al usuario
        const response = yield (0, services_1.validateUser)(body);
        // Retorna una respuesta exitosa (código 200) con la respuesta generada por 'validateUser'
        return res.status(200).json(response);
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error (código 400) con el mensaje de error
        res.status(400).json({ error: error.message });
    }
});
exports.loginController = loginController;
// Controlador para registrar a un nuevo usuario
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene el cuerpo de la solicitud que debe contener los datos del nuevo usuario
        const body = req.body;
        // Llama a la función 'registerUser' para registrar al nuevo usuario
        const response = yield (0, services_1.registerUser)(body);
        // Retorna una respuesta de creación exitosa (código 201) con la respuesta generada por 'registerUser'
        return res.status(201).json(response);
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error (código 400) con el mensaje de error
        res.status(400).json({ error: error.message });
    }
});
exports.registerController = registerController;
// Controlador para renovar el token de un usuario autenticado
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene el identificador de usuario almacenado en la solicitud (previamente establecido por el middleware)
        const { userID } = req;
        // Llama a la función 'refreshToken' para renovar el token del usuario
        const response = yield (0, services_1.refreshToken)(userID);
        // Retorna una respuesta exitosa (código 200) con la respuesta generada por 'refreshToken'
        return res.status(200).json(response);
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error (código 400) con el mensaje de error
        res.status(400).json({ error: error.message });
    }
});
exports.refreshTokenController = refreshTokenController;
//# sourceMappingURL=auth.controllers.js.map