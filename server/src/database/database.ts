// Importa el paquete 'dotenv/config' para cargar las variables de entorno desde el archivo .env
import 'dotenv/config';

// Importa la biblioteca 'pg-promise' para interactuar con la base de datos PostgreSQL
import pgp from 'pg-promise';

// Configura la conexión a la base de datos utilizando las variables de entorno
const db = pgp()(process.env.DB_URL as string);

// Exporta la conexión a la base de datos para su uso en otros archivos
export default db;
