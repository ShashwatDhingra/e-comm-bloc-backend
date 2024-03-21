const mongoose = require('mongoose');
const db = require('../config/db');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    images: { type: Array, default: [] },
    updateOn: { type: Date },
    createdOn: { type: Date }
});

productSchema.pre('save', async function (next) {

    this.updateOn = new Date();
    this.createdOn = new Date();

    next();

});

productSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function (next) {
    const update = this.getUpdate();
    delete update._id;

    this.updateOn = new Date();
    next();
})

const productModel = db.model('products', productSchema)

module.exports = productModel;