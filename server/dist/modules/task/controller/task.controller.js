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
const getAllTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, services_1.getAllTasks)(req.userID);
        res.status(200).json({
            msg: 'All tasks retrieved successfully',
            tasks,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllTasksController = getAllTasksController;
const getTaskByIDController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield (0, services_1.getTaskByID)(req.params.id, req.userID);
        if (!task)
            return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({
            msg: 'Task retrieved successfully',
            task,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTaskByIDController = getTaskByIDController;
const createTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskDto = req.body;
        const task = yield (0, services_1.createTask)(taskDto, req.userID);
        res.status(201).json({
            msg: 'Task created successfully',
            task,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createTaskController = createTaskController;
const updateTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateTaskDto = req.body;
        const task = yield (0, services_1.updateTask)(req.params.id, updateTaskDto, req.userID);
        res.status(200).json({
            msg: 'Task updated successfully',
            task,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateTaskController = updateTaskController;
const toggleTaskCompletedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield (0, services_1.toggleTaskCompleted)(req.params.id, req.userID);
        res.status(200).json({
            msg: 'Task updated successfully',
            task,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.toggleTaskCompletedController = toggleTaskCompletedController;
const deleteSelectedTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tasksSelected } = req.body;
        const tasksDeleted = yield (0, services_1.deleteSelectedTasks)(tasksSelected, req.userID);
        res.status(200).json({
            msg: 'Tasks deleted successfully',
            tasksDeleted,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteSelectedTasksController = deleteSelectedTasksController;
const deleteAllTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasksDeleted = yield (0, services_1.deleteAllTasks)(req.userID);
        res.status(200).json({
            msg: 'All tasks deleted successfully',
            tasksDeleted,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteAllTasksController = deleteAllTasksController;
const deleteTaskByIDController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasksDeleted = yield (0, services_1.deleteTaskByID)(id, req.userID);
        res.status(200).json({
            msg: 'Task deleted successfully',
            tasksDeleted,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTaskByIDController = deleteTaskByIDController;
//# sourceMappingURL=task.controller.js.map