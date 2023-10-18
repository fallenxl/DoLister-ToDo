"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../modules/auth/controllers");
const middleware_1 = require("../../modules/auth/middleware");
const router = (0, express_1.Router)();
router.post("/register", controllers_1.registerController);
router.post("/login", controllers_1.loginController);
router.get("/refresh-token", middleware_1.authGuard, controllers_1.refreshTokenController);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map