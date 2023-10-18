"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const database_1 = __importDefault(require("./database/database"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4002;
// Config
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Routes
app.use('/api', index_routes_1.default);
// frontend
app.use(express_1.default.static('public'));
app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
// connect to db
database_1.default.connect().then(() => {
    console.log('Database connected.');
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
//# sourceMappingURL=index.js.map