"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa el enrutador de Express y las rutas relacionadas con la autenticación y las tareas
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth/auth.routes")); // Rutas relacionadas con la autenticación
const tasks_routes_1 = __importDefault(require("./task/tasks.routes")); // Rutas relacionadas con las tareas
const middleware_1 = require("../modules/auth/middleware"); // Middleware de autenticación
// Crea una instancia de enrutador de Express
const router = (0, express_1.Router)();
// Define rutas principales y asocia las rutas relacionadas con la autenticación y las tareas
// Rutas relacionadas con la autenticación (por ejemplo, registro e inicio de sesión)
router.use('/auth', auth_routes_1.default);
// Rutas relacionadas con las tareas protegidas por el middleware de autenticación (authGuard)
router.use('/tasks', middleware_1.authGuard, tasks_routes_1.default);
// Exporta el enrutador principal para su uso en la aplicación Express
exports.default = router;
//# sourceMappingURL=index.routes.js.map