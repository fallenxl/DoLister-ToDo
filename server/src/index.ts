import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index.routes';

const app = express();
const PORT = process.env.PORT || 4001;

// Config
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api', indexRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});