const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/tmp/database.sqlite', // Render'da geçici depolama kullanın
  logging: false
});

module.exports = sequelize;