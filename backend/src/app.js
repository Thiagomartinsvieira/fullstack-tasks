const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        process.env.FRONT_END_URL , 
        'https://fullstack-tasks.vercel.app', 
        'https://fullstack-tasks.onrender.com', 
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/tasks', taskRoutes);

sequelize.sync().catch(error => {
    console.log('Unable to connect to the database: ', error);
});

// sequelize.sync({ alter: true }) 
//     .then(() => {
//         console.log('Banco de dados sincronizado com sucesso!');
//     })
//     .catch((error) => {
//         console.error('Erro ao sincronizar o banco de dados:', error);
//     });

module.exports = app;
