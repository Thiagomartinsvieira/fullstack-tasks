// app.js (arquivo com configuração e rotas, sem inicialização do servidor)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/tasks', taskRoutes);

sequelize.sync().catch(error => {
    console.log('Unable to connect to the database: ', error);
});


module.exports = app;
