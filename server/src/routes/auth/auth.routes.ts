// Importa el enrutador de Express y los controladores y middleware relacionados con la autenticación
import { Router } from "express";
import { registerController, loginController, refreshTokenController } from "../../modules/auth/controllers";
import { authGuard } from "../../modules/auth/middleware";

// Crea una instancia de enrutador de Express
const router = Router();

// Define rutas y asocia las funciones controladoras correspondientes

// Ruta para el registro de usuarios (POST /register)
router.post("/register", registerController);

// Ruta para el inicio de sesión de usuarios (POST /login)
router.post("/login", loginController);

// Ruta para la renovación de token (GET /refresh-token) protegida por el middleware de autenticación
router.get("/refresh-token", authGuard, refreshTokenController);

// Exporta el enrutador para su uso en la aplicación Express
export default router;
