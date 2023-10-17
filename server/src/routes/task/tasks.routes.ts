import { Router } from "express";
import { createTaskController, deleteAllTasksController, deleteSelectedTasksController, deleteTaskByIDController, getAllTasksController, getTaskByIDController, toggleTaskCompletedController, updateTaskController } from "../../modules/task/controller";

const router = Router();

// Read routes
router.get("/", getAllTasksController);
router.get("/:id", getTaskByIDController);

// Create routes
router.post("/", createTaskController);

// Update routes
router.put("/:id", updateTaskController);
router.put("/status/:id", toggleTaskCompletedController);

// Delete routes
router.delete("/", deleteAllTasksController);
router.delete("/selected", deleteSelectedTasksController);
router.delete("/:id", deleteTaskByIDController);


export default router;
