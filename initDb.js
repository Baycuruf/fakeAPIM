// initDb.js
const sequelize = require('./db');
const Product = require('./models/Product');
const productsData = require('./data/productsData');

async function initializeDatabase() {
  try {
    await sequelize.sync({ force: true }); // force: true tabloyu her seferinde silip yeniden oluşturur
    console.log('Database synchronized');
    
    // Mevcut ürün verilerini ekleyelim
    await Product.bulkCreate(productsData);
    console.log('Sample products added');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

initializeDatabase();