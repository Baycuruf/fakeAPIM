// server.js (güncellenmiş hali)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsRouter = require('./routes/products');
const sequelize = require('./db');
const Product = require('./models/Product');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware'ler
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// CSP Header (isteğe bağlı)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://vercel.live; style-src 'self' https://www.gstatic.com"
  );
  next();
});

// Routes
app.use('/api/products', productsRouter);

// Test Endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API çalışıyor!' });
});

// Veritabanı bağlantısını test et
app.get('/test-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'Veritabanı bağlantısı başarılı' });
  } catch (error) {
    res.status(500).json({ status: 'Veritabanı bağlantı hatası', error: error.message });
  }
});

// Veritabanı bağlantısını ve tabloyu kontrol et
sequelize.authenticate()
  .then(() => {
    console.log('SQLite bağlantısı başarılı.');
    return sequelize.sync(); // Tabloyu senkronize et (force: true kullanmadan)
  })
  .then(() => {
    console.log('Tablo kontrol edildi:', Product.tableName);
  })
  .catch(err => {
    console.error('Veritabanı hatası:', err);
  });

  // Geçici bir route ekleyin (server.js içinde)
app.get('/check-db', async (req, res) => {
  try {
    const tables = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table'");
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Sunucuyu başlat
if (require.main === module) {
  app.listen(PORT, async () => {
    try {
      await sequelize.authenticate();
      console.log('Veritabanına bağlantı başarılı');
      console.log(`API http://localhost:${PORT} adresinde çalışıyor`);
    } catch (error) {
      console.error('Veritabanı bağlantı hatası:', error);
    }
  });
}

module.exports = app;