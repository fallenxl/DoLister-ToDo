// Importa las dependencias necesarias para la aplicación Express
import 'dotenv/config'; // Variables de entorno
import express from 'express'; // Framework web Express
import morgan from 'morgan'; // Middleware para el registro de solicitudes HTTP
import cors from 'cors'; // Middleware para habilitar solicitudes cruzadas (CORS)
import indexRoutes from './routes/index.routes'; // Rutas principales de la aplicación
import db from './database/database'; // Conexión a la base de datos

// Crea una instancia de la aplicación Express
const app = express();

// Configuración de la aplicación
const PORT = process.env.PORT || 4002; // Puerto de escucha predeterminado

app.use(express.json()); // Permite el uso de JSON en las solicitudes y respuestas
app.use(morgan('dev')); // Registra las solicitudes HTTP en la consola en el modo de desarrollo
app.use(express.urlencoded({ extended: false })); // Analiza datos URL codificados en las solicitudes
app.use(cors()); // Habilita CORS para permitir solicitudes desde otros dominios

// Rutas
app.use('/api', indexRoutes); // Asocia las rutas principales de la aplicación a "/api"

// Ruta para servir archivos estáticos (frontend)
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta "public"
app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: 'public' }); // Enruta todas las demás solicitudes a "index.html"
});

// Conexión a la base de datos
db.connect().then(() => {
    console.log('Database connected.'); // Muestra un mensaje cuando la base de datos se conecta con éxito
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`); // Muestra un mensaje cuando el servidor comienza a escuchar en el puerto
});
