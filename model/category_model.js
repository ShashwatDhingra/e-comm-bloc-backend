const db = require('../config/db');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { type: String, required: [true, 'title is required!'] },
    description: { type: String, default: "" },
    updatedOn: { type: Date },
    createdOn: { type: Date }
})

categorySchema.pre('save', async function (next) {
    this.updateOne = new Date();
    this.createdOn = new Date();

    return next();
});

categorySchema.pre(['update', 'findOneAndUpdate', 'updateOn'], function (next) {
    const update = this.getUpdate();
    delete update._id;

    this.updateOn = new Date();
    next();
});

const categoryModel = db.model('category', categorySchema);

module.exports = categoryModel;