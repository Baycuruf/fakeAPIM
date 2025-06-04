// server.js (güncellenmiş hali)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsRouter = require('./routes/products');
const sequelize = require('./db');

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