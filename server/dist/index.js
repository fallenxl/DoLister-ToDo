"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa las dependencias necesarias para la aplicación Express
require("dotenv/config"); // Variables de entorno
const express_1 = __importDefault(require("express")); // Framework web Express
const morgan_1 = __importDefault(require("morgan")); // Middleware para el registro de solicitudes HTTP
const cors_1 = __importDefault(require("cors")); // Middleware para habilitar solicitudes cruzadas (CORS)
const index_routes_1 = __importDefault(require("./routes/index.routes")); // Rutas principales de la aplicación
const database_1 = __importDefault(require("./database/database")); // Conexión a la base de datos
// Crea una instancia de la aplicación Express
const app = (0, express_1.default)();
// Configuración de la aplicación
const PORT = process.env.PORT || 4002; // Puerto de escucha predeterminado
app.use(express_1.default.json()); // Permite el uso de JSON en las solicitudes y respuestas
app.use((0, morgan_1.default)('dev')); // Registra las solicitudes HTTP en la consola en el modo de desarrollo
app.use(express_1.default.urlencoded({ extended: false })); // Analiza datos URL codificados en las solicitudes
app.use((0, cors_1.default)()); // Habilita CORS para permitir solicitudes desde otros dominios
// Rutas
app.use('/api', index_routes_1.default); // Asocia las rutas principales de la aplicación a "/api"
// Ruta para servir archivos estáticos (frontend)
app.use(express_1.default.static('public')); // Sirve archivos estáticos desde la carpeta "public"
app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: 'public' }); // Enruta todas las demás solicitudes a "index.html"
});
// Conexión a la base de datos
database_1.default.connect().then(() => {
    console.log('Database connected.'); // Muestra un mensaje cuando la base de datos se conecta con éxito
});
// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`); // Muestra un mensaje cuando el servidor comienza a escuchar en el puerto
});
//# sourceMappingURL=index.js.map