const mongoose = require('mongoose');
const db = require('../config/db');

const orderItemSchema = new mongoose.Schema({
    product: {type: Map, required: true},
    quantity: { type: Number, default: 1 }
})

const orderSchema = new mongoose.Schema({
    user: { type: Map, required: true},
    products: {
        type: [orderItemSchema], default: []
    },
    status: {type: String, default: "ORDER-PLACED"},
    updatedOn: { type: Date },
    createdOn: { type: Date }

});

orderSchema.pre('save', async function (next) {
    this.updateOne = new Date();
    this.createdOn = new Date();

    return next();
});

orderSchema.pre(['update', 'findOneAndUpdate', 'updateOn'], function (next) {
    const update = this.getUpdate();
    delete update._id;

    this.updateOn = new Date();
    next();
});

const orderModel = db.model('order', orderSchema);

module.exports = orderModel;