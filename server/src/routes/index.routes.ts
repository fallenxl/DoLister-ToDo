import { Router } from "express";
import authRoutes from './auth/auth.routes';
import tasksRoutes from './task/tasks.routes';
import { authGuard } from "../modules/auth/middleware";
const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', authGuard, tasksRoutes);



export default router;