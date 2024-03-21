const Router = require('express').Router();
const orderController = require('../controller/order_controller')

Router.post('/', orderController.createOrder);
Router.get('/:userId', orderController.fetchOrdersForUser);
Router.put('/updateStatus', orderController.updateOrderStatus);

module.exports = Router;