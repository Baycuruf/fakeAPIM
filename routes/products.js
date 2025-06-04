// routes/products.js
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
  getProductCategoriesWithCount
} = require('../controllers/productsController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/categories', getProductCategories); // Yeni route
router.get('/categories/:category/products', async (req, res) => {
  // Belirli bir kategorideki ürünleri getir
});


router.get('/categories/with-count', getProductCategoriesWithCount);

module.exports = router;