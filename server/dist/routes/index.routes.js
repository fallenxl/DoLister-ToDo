"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const tasks_routes_1 = __importDefault(require("./task/tasks.routes"));
const middleware_1 = require("../modules/auth/middleware");
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/tasks', middleware_1.authGuard, tasks_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map