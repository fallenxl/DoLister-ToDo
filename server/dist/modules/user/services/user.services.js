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
exports.createUser = exports.getUserByEmail = exports.getUserById = void 0;
const database_1 = require("../../../database");
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM users WHERE user_id = $1;';
        const user = yield database_1.database.oneOrNone(query, [id]);
        return user;
    }
    catch (error) {
        throw new Error(`Error while getting user by ID: ${error.message}`);
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM users WHERE email = $1;';
        const user = yield database_1.database.oneOrNone(query, [email]);
        return user;
    }
    catch (error) {
        throw new Error(`Error while getting user by email: ${error.message}`);
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, avatar } = user;
        const newUser = yield database_1.database.query('INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *;', [username, email, password, avatar]);
        return newUser[0];
    }
    catch (error) {
        throw new Error(`Error while creating a user: ${error.message}`);
    }
});
exports.createUser = createUser;
//# sourceMappingURL=user.services.js.map