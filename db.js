// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false // Gerektiğinde true yapabilirsiniz
});

module.exports = sequelize;