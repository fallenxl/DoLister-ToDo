import { Router } from "express";  
import authRoutes from './auth/auth.routes';
import tasksRoutes from './task/tasks.routes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', tasksRoutes);



export default router;