const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Important: use a leading slash '/api/products'
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
