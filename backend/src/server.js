const app = require('./app');
const express = require('express');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    });
}).catch(error => {
    console.log('Unable to connect to the database: ', error);
});