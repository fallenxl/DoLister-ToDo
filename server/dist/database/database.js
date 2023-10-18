"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa el paquete 'dotenv/config' para cargar las variables de entorno desde el archivo .env
require("dotenv/config");
// Importa la biblioteca 'pg-promise' para interactuar con la base de datos PostgreSQL
const pg_promise_1 = __importDefault(require("pg-promise"));
// Configura la conexión a la base de datos utilizando las variables de entorno
const db = (0, pg_promise_1.default)()({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME, // Nombre de la base de datos
});
// Exporta la conexión a la base de datos para su uso en otros archivos
exports.default = db;
//# sourceMappingURL=database.js.map