"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const utils_1 = require("../../../utils");
// Función de middleware para la autenticación y autorización
const authGuard = (req, res, next) => {
    // Extrae el token de autenticación del encabezado de la solicitud
    const token = extractTokenFromHeader(req);
    // Si no se proporciona un token o es un token no válido, devuelve un error de no autorizado (código 401)
    if (!token || Array.isArray(token)) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    // Utiliza una función (useToken) para gestionar y verificar el token
    const manageToken = (0, utils_1.useToken)(token);
    // Si la función devuelve un mensaje de error en lugar de un objeto de token, devuelve un error de no autorizado
    if (typeof manageToken === 'string') {
        return res.status(401).json({ message: manageToken });
    }
    // Si el token ha expirado, devuelve un error de no autorizado
    if (manageToken.isExpired) {
        return res.status(401).json({ message: 'Token expired' });
    }
    // Almacena el identificador del usuario (extraído del token) en la solicitud para su posterior uso
    req.userID = manageToken.sub;
    // Llama a la siguiente función de middleware
    next();
};
exports.authGuard = authGuard;
// Función para extraer el token de autenticación del encabezado de la solicitud
const extractTokenFromHeader = (req) => {
    var _a;
    const [type, token] = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) || [];
    return type === 'Bearer' ? token : undefined;
};
//# sourceMappingURL=auth.js.map