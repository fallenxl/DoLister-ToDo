import { Router } from "express";  

const router = Router();

router.use('/auth', require('./auth/auth.routes'));
router.use('/tasks', require('./task/tasks.routes'));

export default router;