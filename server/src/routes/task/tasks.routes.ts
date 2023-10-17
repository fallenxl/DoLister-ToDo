import { Router } from "express";
import { createTaskController, deleteAllTasksController, deleteSelectedTasksController, deleteTaskByIDController, getAllTasksController, getTaskByIDController, updateTaskController } from "../../modules/task/controller";

const router = Router();

// Read routes
router.get("/", getAllTasksController);
router.get("/:id", getTaskByIDController);

// Create routes
router.post("/", createTaskController);

// Update routes
router.put("/:id", updateTaskController);

// Delete routes
router.delete("/", deleteAllTasksController);
router.delete("/:id", deleteTaskByIDController);
router.delete("/selected", deleteSelectedTasksController);


export default router;
