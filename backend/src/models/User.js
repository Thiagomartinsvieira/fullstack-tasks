// User model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^[0-9]+$/i,
        }
    },
});

module.exports = User;