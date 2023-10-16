import pgp from 'pg-promise';

const db = pgp()({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'challenge'
});

export default db;

