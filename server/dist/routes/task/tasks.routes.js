"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../modules/task/controller");
const router = (0, express_1.Router)();
// Read routes
router.get("/", controller_1.getAllTasksController);
router.get("/:id", controller_1.getTaskByIDController);
// Create routes
router.post("/", controller_1.createTaskController);
// Update routes
router.put("/:id", controller_1.updateTaskController);
router.put("/status/:id", controller_1.toggleTaskCompletedController);
// Delete routes
router.delete("/", controller_1.deleteAllTasksController);
router.delete("/selected", controller_1.deleteSelectedTasksController);
router.delete("/:id", controller_1.deleteTaskByIDController);
exports.default = router;
//# sourceMappingURL=tasks.routes.js.map