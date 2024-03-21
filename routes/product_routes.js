const Router = require('express').Router();
const productController = require('../controller/product_controller');

Router.post('/', productController.createProduct);
Router.get('/', productController.fetchAllProducts);
Router.get('/category/:id', productController.fetchCategoryProducts)

module.exports = Router;