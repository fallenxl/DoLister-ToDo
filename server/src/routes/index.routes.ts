// Importa el enrutador de Express y las rutas relacionadas con la autenticación y las tareas
import { Router } from "express";
import authRoutes from './auth/auth.routes'; // Rutas relacionadas con la autenticación
import tasksRoutes from './task/tasks.routes'; // Rutas relacionadas con las tareas
import { authGuard } from "../modules/auth/middleware"; // Middleware de autenticación

// Crea una instancia de enrutador de Express
const router = Router();

// Define rutas principales y asocia las rutas relacionadas con la autenticación y las tareas

// Rutas relacionadas con la autenticación (por ejemplo, registro e inicio de sesión)
router.use('/auth', authRoutes);

// Rutas relacionadas con las tareas protegidas por el middleware de autenticación (authGuard)
router.use('/tasks', authGuard, tasksRoutes);

// Exporta el enrutador principal para su uso en la aplicación Express
export default router;
