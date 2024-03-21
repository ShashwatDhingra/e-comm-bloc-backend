const mongoose = require('mongoose');
const db = require('../config/db');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, default: 1 }
})

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    products: {
        type: [cartItemSchema], default: []
    },
    totalAmount: { type: Number, default: 0 },
    updatedOn: { type: Date },
    createdOn: { type: Date }

});

cartSchema.pre('save', async function (next) {
    this.updateOne = new Date();
    this.createdOn = new Date();

    return next();
});

cartSchema.pre(['update', 'findOneAndUpdate', 'updateOn'], function (next) {
    const update = this.getUpdate();
    delete update._id;

    this.updateOn = new Date();
    next();
});

const cartModel = db.model('cart', cartSchema);

module.exports = cartModel;