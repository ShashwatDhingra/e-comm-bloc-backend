const Router = require('express').Router();
const cartController = require('../controller/cart_controller')


Router.get('/:userId', cartController.getCartForUser);
Router.post('/', cartController.addToCart);
Router.delete('/', cartController.removeFromCart);
Router.put('/', cartController.updateProductQuantity);

module.exports = Router;