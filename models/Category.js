// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

module.exports = Category;

exports.getProductCategories = async (req, res) => {
  try {
    const categories = await sequelize.query(
      'SELECT DISTINCT category FROM Products',
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(categories.map(c => c.category));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};