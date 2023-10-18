"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importa el enrutador de Express y los controladores relacionados con las operaciones de tareas
const express_1 = require("express");
const controller_1 = require("../../modules/task/controller");
// Crea una instancia de enrutador de Express
const router = (0, express_1.Router)();
// Define rutas y asocia las funciones controladoras correspondientes para operaciones relacionadas con tareas
// Rutas para leer tareas
router.get("/", controller_1.getAllTasksController); // Obtiene todas las tareas
router.get("/:id", controller_1.getTaskByIDController); // Obtiene una tarea específica por su ID
// Ruta para crear una nueva tarea (POST /)
router.post("/", controller_1.createTaskController);
// Rutas para actualizar tareas
router.put("/:id", controller_1.updateTaskController); // Actualiza una tarea por su ID
router.put("/status/:id", controller_1.toggleTaskCompletedController); // Cambia el estado de completitud de una tarea por su ID
// Rutas para eliminar tareas
router.delete("/", controller_1.deleteAllTasksController); // Elimina todas las tareas
router.delete("/selected", controller_1.deleteSelectedTasksController); // Elimina tareas seleccionadas
router.delete("/:id", controller_1.deleteTaskByIDController); // Elimina una tarea específica por su ID
// Exporta el enrutador para su uso en la aplicación Express
exports.default = router;
//# sourceMappingURL=tasks.routes.js.map