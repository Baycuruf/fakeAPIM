// controllers/productsController.js
const Product = require('../models/Product');
const sequelize = require('../db'); // db.js dosyanızın yolunu doğru verdiğinizden emin olun


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Kategori seçeneği için 
exports.getProductCategories = async (req, res) => {
  try {
    const products = await Product.findAll();
    
    // Tüm ürünlerden kategorileri çıkarıp tekilleştirme
    const categories = [...new Set(products.map(product => product.category))];
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      return res.json(updatedProduct);
    }
    throw new Error('Ürün bulunamadı');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Ürün silindi' });
    }
    throw new Error('Ürün bulunamadı');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProductCategoriesWithCount = async (req, res) => {
  try {
    const result = await Product.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['category']
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};