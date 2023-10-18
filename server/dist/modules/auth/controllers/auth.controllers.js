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
exports.refreshTokenController = exports.registerController = exports.loginController = void 0;
const services_1 = require("../services");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const response = yield (0, services_1.validateUser)(body);
        return res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginController = loginController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const response = yield (0, services_1.registerUser)(body);
        return res.status(201).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.registerController = registerController;
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req;
        const response = yield (0, services_1.refreshToken)(userID);
        return res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.refreshTokenController = refreshTokenController;
//# sourceMappingURL=auth.controllers.js.map