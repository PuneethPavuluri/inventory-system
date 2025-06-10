const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

const productRoutes = require('./routes/products');
const transactionRoutes = require('./routes/transactions');

app.use('/api/products', productRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
