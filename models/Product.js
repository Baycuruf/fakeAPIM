// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  category: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  rating: {
    type: DataTypes.JSON,
    defaultValue: { rate: 0, count: 0 }
  }
}, {
  tableName: 'Products', // PostgreSQL'de küçük harf ve çoğul isim kullanın
  timestamps: false
});

module.exports = Product;