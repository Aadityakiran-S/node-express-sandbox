const express = require('express');
const app = express();
const { getAllProducts, getAllProductsStatic } = require('../controllers/products.js');

app.route('/').get(getAllProducts);
app.route('/static').get(getAllProductsStatic);

module.exports = app;