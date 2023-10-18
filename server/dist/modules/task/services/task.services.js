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
exports.deleteTaskByID = exports.deleteAllTasks = exports.deleteSelectedTasks = exports.toggleTaskCompleted = exports.updateTask = exports.createTask = exports.getTaskByID = exports.getAllTasks = void 0;
const database_1 = require("../../../database");
const getAllTasks = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ASC;`;
        const tasks = yield database_1.database.query(query, [userID]);
        return tasks;
    }
    catch (error) {
        throw new Error(`Error while getting all tasks: ${error.message}`);
    }
});
exports.getAllTasks = getAllTasks;
const getTaskByID = (taskID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM tasks WHERE task_id = $1 AND user_id = $2;`;
        const task = yield database_1.database.oneOrNone(query, [taskID, userID]);
        return task;
    }
    catch (error) {
        throw new Error(`Error while getting task by ID: ${error.message}`);
    }
});
exports.getTaskByID = getTaskByID;
const createTask = (task, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *;`;
        const newTask = yield database_1.database.one(query, [task.title, task.description, userID]);
        return newTask;
    }
    catch (error) {
        throw new Error(`Error while creating task: ${error.message}`);
    }
});
exports.createTask = createTask;
const updateTask = (taskID, task, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, completed } = task;
        const query = `UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE task_id = $4 AND user_id = $5 RETURNING *;`;
        const taskUpdated = yield database_1.database.one(query, [title, description, completed, taskID, userID]);
        return taskUpdated;
    }
    catch (error) {
        throw new Error(`Error while updating task: ${error.message}`);
    }
});
exports.updateTask = updateTask;
const toggleTaskCompleted = (taskID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `UPDATE tasks SET completed = NOT completed WHERE task_id = $1 AND user_id = $2 RETURNING *;`;
        const taskUpdated = yield database_1.database.one(query, [taskID, userID]);
        return taskUpdated;
    }
    catch (error) {
        throw new Error(`Error while toggling task completed: ${error.message}`);
    }
});
exports.toggleTaskCompleted = toggleTaskCompleted;
const deleteSelectedTasks = (taskIDs, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `DELETE FROM tasks WHERE task_id IN ($1:csv) AND user_id = $2 RETURNING *;`;
        const tasksDeleted = yield database_1.database.query(query, [taskIDs, userID]);
        return tasksDeleted;
    }
    catch (error) {
        throw new Error(`Error while deleting selected tasks: ${error.message}`);
    }
});
exports.deleteSelectedTasks = deleteSelectedTasks;
const deleteAllTasks = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `DELETE FROM tasks WHERE user_id = $1 RETURNING *;`;
        const tasksDeleted = yield database_1.database.query(query, [userID]);
        return tasksDeleted;
    }
    catch (error) {
        throw new Error(`Error while deleting all tasks: ${error.message}`);
    }
});
exports.deleteAllTasks = deleteAllTasks;
const deleteTaskByID = (taskID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 RETURNING *;`;
        const taskDeleted = yield database_1.database.one(query, [taskID, userID]);
        return taskDeleted;
    }
    catch (error) {
        throw new Error(`Error while deleting task: ${error.message}`);
    }
});
exports.deleteTaskByID = deleteTaskByID;
//# sourceMappingURL=task.services.js.map