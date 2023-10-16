import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 4001;

// Config
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});