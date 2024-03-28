const orderModel = require('../model/order_model');
const utils = require('../utils/utils');

const orderService = {
    createOrder: async function (user, products) {
        try {
            const newOrder = new orderModel({
                user,
                products
            });

            await newOrder.save();

            return {
                status: true,
                statusCode: 200,
                data: newOrder,
                message: "Order Created",
                error: null
            };
        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    },

    fetchOrdersForUser: async function (userId) {
        try {
            const order = await orderModel.find({
                    "user._id": userId
                })

            if (!order) {
                return {
                    status: true,
                    statusCode: 404,
                    message: "Order not found",
                    error: null
                }
            }

            return {
                status: true,
                statusCode: 200,
                data: order,
                message: "Order fetched and returned",
                error: null
            }
        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    },
    updateOrderStatus: async function (orderId, orderStatus) {
        try {
            const order = await orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: orderStatus },
                { new: true }
            )

            if (!order) {
                return {
                    status: true,
                    statusCode: 404,
                    message: "Order not found",
                    error: null
                }
            }

            return {
                status: true,
                statusCode: 200,
                message: "Order status updated",
                error: null
            }
        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    }
}

module.exports = orderService;