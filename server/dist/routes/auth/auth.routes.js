"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importa el enrutador de Express y los controladores y middleware relacionados con la autenticación
const express_1 = require("express");
const controllers_1 = require("../../modules/auth/controllers");
const middleware_1 = require("../../modules/auth/middleware");
// Crea una instancia de enrutador de Express
const router = (0, express_1.Router)();
// Define rutas y asocia las funciones controladoras correspondientes
// Ruta para el registro de usuarios (POST /register)
router.post("/register", controllers_1.registerController);
// Ruta para el inicio de sesión de usuarios (POST /login)
router.post("/login", controllers_1.loginController);
// Ruta para la renovación de token (GET /refresh-token) protegida por el middleware de autenticación
router.get("/refresh-token", middleware_1.authGuard, controllers_1.refreshTokenController);
// Exporta el enrutador para su uso en la aplicación Express
exports.default = router;
//# sourceMappingURL=auth.routes.js.map