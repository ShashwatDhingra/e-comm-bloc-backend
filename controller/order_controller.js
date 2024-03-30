const orderService = require('../services/order_services')

const orderController = {
    createOrder: async function(req, res){

            const {user, products, status, totalAmount} = req.body;

            const result = await orderService.createOrder(user, products, status, totalAmount);

            res.status(result.statusCode).json(result);
    },
    fetchOrdersForUser: async function(req, res){
        const userId = req.params.userId;

        const result = await orderService.fetchOrdersForUser(userId);

        res.status(result.statusCode).json(result);
    },

    updateOrderStatus: async function(req, res){
        const {orderId, orderStatus} = req.body;

        const result = await orderService.updateOrderStatus(orderId, orderStatus);

        res.status(result.statusCode).json(result);
    }
}

module.exports = orderController;