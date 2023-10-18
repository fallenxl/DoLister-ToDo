// Importa el enrutador de Express y los controladores relacionados con las operaciones de tareas
import { Router } from "express";
import {
    createTaskController,
    deleteAllTasksController,
    deleteSelectedTasksController,
    deleteTaskByIDController,
    getAllTasksController,
    getTaskByIDController,
    toggleTaskCompletedController,
    updateTaskController,
} from "../../modules/task/controller";

// Crea una instancia de enrutador de Express
const router = Router();

// Define rutas y asocia las funciones controladoras correspondientes para operaciones relacionadas con tareas

// Rutas para leer tareas
router.get("/", getAllTasksController); // Obtiene todas las tareas
router.get("/:id", getTaskByIDController); // Obtiene una tarea específica por su ID

// Ruta para crear una nueva tarea (POST /)
router.post("/", createTaskController);

// Rutas para actualizar tareas
router.put("/:id", updateTaskController); // Actualiza una tarea por su ID
router.put("/status/:id", toggleTaskCompletedController); // Cambia el estado de completitud de una tarea por su ID

// Rutas para eliminar tareas
router.delete("/", deleteAllTasksController); // Elimina todas las tareas
router.delete("/selected", deleteSelectedTasksController); // Elimina tareas seleccionadas
router.delete("/:id", deleteTaskByIDController); // Elimina una tarea específica por su ID

// Exporta el enrutador para su uso en la aplicación Express
export default router;
