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
exports.deleteTaskByIDController = exports.deleteAllTasksController = exports.deleteSelectedTasksController = exports.toggleTaskCompletedController = exports.updateTaskController = exports.createTaskController = exports.getTaskByIDController = exports.getAllTasksController = void 0;
const services_1 = require("../services");
// Controlador para obtener todas las tareas del usuario
const getAllTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene todas las tareas asociadas al usuario
        const tasks = yield (0, services_1.getAllTasks)(req.userID);
        // Retorna una respuesta exitosa (código 200) con un mensaje y las tareas
        res.status(200).json({
            msg: 'All tasks retrieved successfully',
            tasks,
        });
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
});
exports.getAllTasksController = getAllTasksController;
// Controlador para obtener una tarea específica por su ID
const getTaskByIDController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene una tarea por su ID
        const task = yield (0, services_1.getTaskByID)(req.params.id, req.userID);
        // Si no se encuentra la tarea, devuelve una respuesta de recurso no encontrado (código 404)
        if (!task)
            return res.status(404).json({ message: 'Task not found' });
        // Retorna una respuesta exitosa (código 200) con un mensaje y la tarea
        res.status(200).json({
            msg: 'Task retrieved successfully',
            task,
        });
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
});
exports.getTaskByIDController = getTaskByIDController;
// Controlador para crear una nueva tarea
const createTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene los datos de la nueva tarea del cuerpo de la solicitud
        const taskDto = req.body;
        // Crea la tarea y asocia la tarea al usuario actual
        const task = yield (0, services_1.createTask)(taskDto, req.userID);
        // Retorna una respuesta de creación exitosa (código 201) con un mensaje y la tarea creada
        res.status(201).json({
            msg: 'Task created successfully',
            task,
        });
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
});
exports.createTaskController = createTaskController;
// Controlador para actualizar una tarea existente
const updateTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene los datos actualizados de la tarea del cuerpo de la solicitud
        const updateTaskDto = req.body;
        // Actualiza la tarea con el ID especificado
        const task = yield (0, services_1.updateTask)(req.params.id, updateTaskDto, req.userID);
        // Retorna una respuesta exitosa (código 200) con un mensaje y la tarea actualizada
        res.status(200).json({
            msg: 'Task updated successfully',
            task,
        });
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
});
exports.updateTaskController = updateTaskController;
// Controlador para marcar o desmarcar una tarea como completada
const toggleTaskCompletedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Marca o desmarca la tarea con el ID especificado como completada
        const task = yield (0, services_1.toggleTaskCompleted)(req.params.id, req.userID);
        // Retorna una respuesta exitosa (código 200) con un mensaje y la tarea actualizada
        res.status(200).json({
            msg: 'Task updated successfully',
            task,
        });
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
});
exports.toggleTaskCompletedController = toggleTaskCompletedController;
// Controlador para eliminar una lista de tareas seleccionadas
const deleteSelectedTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene la lista de IDs de tareas a eliminar del cuerpo de la solicitud
        const { tasksSelected } = req.body;
        // Elimina las tareas seleccionadas asociadas al usuario actual
        const tasksDeleted = yield (0, services_1.deleteSelectedTasks)(tasksSelected, req.userID);
        // Retorna una respuesta exitosa (código 200) con un mensaje y la lista de tareas eliminadas
        res.status(200).json({
            msg: 'Tasks deleted successfully',
            tasksDeleted,
        });
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteSelectedTasksController = deleteSelectedTasksController;
// Controlador para eliminar todas las tareas del usuario
const deleteAllTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Elimina todas las tareas asociadas al usuario actual
        const tasksDeleted = yield (0, services_1.deleteAllTasks)(req.userID);
        // Retorna una respuesta exitosa (código 200) con un mensaje y la lista de tareas eliminadas
        res.status(200).json({
            msg: 'All tasks deleted successfully',
            tasksDeleted,
        });
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
});
exports.deleteAllTasksController = deleteAllTasksController;
// Controlador para eliminar una tarea específica por su ID
const deleteTaskByIDController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene el ID de la tarea a eliminar de los parámetros de la solicitud
        const { id } = req.params;
        // Elimina la tarea con el ID especificado asociada al usuario actual
        const tasksDeleted = yield (0, services_1.deleteTaskByID)(id, req.userID);
        // Retorna una respuesta exitosa (código 200) con un mensaje y la lista de tareas eliminadas
        res.status(200).json({
            msg: 'Task deleted successfully',
            tasksDeleted,
        });
    }
    catch (error) {
        // En caso de un error, devuelve una respuesta de error interno del servidor (código 500) con el mensaje de error
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTaskByIDController = deleteTaskByIDController;
//# sourceMappingURL=task.controller.js.map