const orderModel = require('../model/order_model');
const cartModel = require('../model/cart_model');
const razorpay = require('../utils/razorpay');
const mongoose = require('mongoose');
const utils = require('../utils/utils');

const orderService = {
    createOrder: async function (user, products, status, totalAmount) {
        try {

            // Create Order in RazorPay
            const razorPayOrder = await razorpay.orders.create({
                "amount": totalAmount * 100,
                "currency": "INR"
            });

            const newOrder = new orderModel({
                user,
                products,
                status,
                totalAmount,
                razorPayOrderId: razorPayOrder.id
            });

            await newOrder.save();

            await cartModel.findOneAndUpdate(
                {user: user._id},
                {products: []}
            );

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
            }).sort({createdOn : -1});

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