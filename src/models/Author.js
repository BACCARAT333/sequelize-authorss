const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Модель "Авторы" (authors)
const Author = sequelize.define('Author', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Author;
