const { Sequelize } = require('sequelize');
const path = require('path');

// Экземпляр Sequelize с диалектом sqlite.
// Файл базы данных хранится в корне проекта как database.sqlite.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false,
});

module.exports = sequelize;
