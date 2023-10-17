import { Router } from "express";
import { registerController, loginController,refreshTokenController } from "../../modules/auth/controllers"
import { authGuard } from "../../modules/auth/middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/refresh-token", authGuard,refreshTokenController);

export default router;