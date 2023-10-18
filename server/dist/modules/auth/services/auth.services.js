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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.refreshToken = exports.registerUser = exports.validateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../../user/services");
const validateUser = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = credentials;
        const user = yield (0, services_1.getUserByEmail)(email);
        if (!user) {
            throw new Error('User not found');
        }
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        const token = (0, exports.generateToken)(user);
        return {
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }, token
        };
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.validateUser = validateUser;
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield (0, services_1.getUserByEmail)(user.email);
        if (userFound) {
            throw new Error('User already exists');
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(user.password, salt);
        user.avatar = `https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=${user.username}`;
        const newUser = yield (0, services_1.createUser)(user);
        const token = (0, exports.generateToken)(newUser);
        return {
            user: {
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar
            }, token
        };
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.registerUser = registerUser;
const refreshToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, services_1.getUserById)(id);
        if (!user) {
            throw new Error('User not found');
        }
        const token = (0, exports.generateToken)(user);
        ;
        return {
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
            token
        };
    }
    catch (error) {
        throw new Error(`Error while refreshing token: ${error.message}`);
    }
});
exports.refreshToken = refreshToken;
const generateToken = (user) => {
    const payload = {
        sub: user.user_id,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || 'secret', { expiresIn: '1h' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.services.js.map