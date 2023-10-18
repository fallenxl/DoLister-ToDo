// Importa el paquete 'dotenv/config' para cargar las variables de entorno desde el archivo .env
import 'dotenv/config';

// Importa la biblioteca 'pg-promise' para interactuar con la base de datos PostgreSQL
import pgp from 'pg-promise';

// Configura la conexión a la base de datos utilizando las variables de entorno
const db = pgp()({
    user: process.env.DB_USER, // Nombre de usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
    host: process.env.DB_HOST, // Host de la base de datos
    port: Number(process.env.DB_PORT), // Puerto de la base de datos (convertido a número)
    database: process.env.DB_NAME, // Nombre de la base de datos
});

// Exporta la conexión a la base de datos para su uso en otros archivos
export default db;
