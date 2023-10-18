"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToken = void 0;
// Importa la librería 'jsonwebtoken' y las interfaces relacionadas con el token y su uso
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Función que verifica y decodifica un token JWT
const useToken = (token) => {
    try {
        // Decodifica el token JWT y lo almacena en la variable 'decode' como un objeto AuthTokenResult.
        const decode = jsonwebtoken_1.default.decode(token);
        // Obtiene la fecha actual.
        const currentDate = new Date();
        // Obtiene la fecha de vencimiento del token y multiplica el valor por 1000 para convertirlo en milisegundos.
        const expiresDate = new Date((decode === null || decode === void 0 ? void 0 : decode.exp) * 1000);
        // Retorna un objeto que contiene el 'sub' (sujeto) del token y un indicador de si el token ha expirado.
        return {
            sub: decode === null || decode === void 0 ? void 0 : decode.sub,
            isExpired: +expiresDate <= +currentDate / 1000,
        };
    }
    catch (error) {
        // Si hay un error al decodificar el token, se retorna un mensaje indicando que el token no es válido.
        return 'Token is not valid';
    }
};
exports.useToken = useToken;
//# sourceMappingURL=use.token.js.map