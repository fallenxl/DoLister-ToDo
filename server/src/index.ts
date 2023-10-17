import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index.routes';
import db from './database/database';


const app = express();
const PORT = process.env.PORT || 4001;

// Config
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api', indexRoutes);

// frontend
app.use(express.static('public'));
app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// connect to db
db.connect().then(() => {
    console.log('Database connected.');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});