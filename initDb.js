/* initDb.js
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

initializeDatabase();*/
// initDb.js
const sequelize = require('./db');
const Product = require('./models/Product');
const productsData = require('./data/productsData');

async function initializeDatabase() {
  try {
    // Tabloyu silip yeniden oluştur (force: true)
    await sequelize.sync({ force: true }); 
    console.log('Veritabanı tablosu oluşturuldu!');
    
    // Örnek verileri ekle
    await Product.bulkCreate(productsData);
    console.log('Örnek ürünler eklendi!');
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    process.exit(); // Betiği sonlandır
  }
}

initializeDatabase();