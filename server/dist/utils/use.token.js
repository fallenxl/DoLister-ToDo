"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const useToken = (token) => {
    try {
        const decode = jsonwebtoken_1.default.decode(token);
        const currentDate = new Date();
        const expiresDate = new Date((decode === null || decode === void 0 ? void 0 : decode.exp) * 1000);
        return {
            sub: decode === null || decode === void 0 ? void 0 : decode.sub,
            isExpired: +expiresDate <= +currentDate / 1000,
        };
    }
    catch (error) {
        return 'Token is not valid';
    }
};
exports.useToken = useToken;
//# sourceMappingURL=use.token.js.map