"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const utils_1 = require("../../../utils");
const authGuard = (req, res, next) => {
    const token = extractTokenFromHeader(req);
    if (!token || Array.isArray(token)) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const manageToken = (0, utils_1.useToken)(token);
    if (typeof manageToken === 'string') {
        return res.status(401).json({ message: manageToken });
    }
    if (manageToken.isExpired) {
        return res.status(401).json({ message: 'Token expired' });
    }
    req.userID = manageToken.sub;
    next();
};
exports.authGuard = authGuard;
const extractTokenFromHeader = (req) => {
    var _a;
    const [type, token] = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) || [];
    return type === 'Bearer' ? token : undefined;
};
//# sourceMappingURL=auth.js.map