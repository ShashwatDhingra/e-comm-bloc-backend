const db = require('../config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid')

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, default: '' },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    address: { type: String, default: "" },
    profileProgress: { type: Number, default: 0 },  // account created => 0, address entered => 1
    updateOn: { type: Date },
    createdOn: { type: Date }
})

// To make some action before model save

userSchema.pre('save', async function (next) {
    try {
        var user = this;

        user.id = uuid.v1();
        user.updateOn = new Date();
        user.createdOn = new Date();

        try {
            const salt = await (bcrypt.genSalt(10));

            const hashpass = await bcrypt.hash(user.password, salt);

            user.password = hashpass;
        } catch (e) {
            console.log(`Error while encrypting - ${e}`);
            return next(e);
        }

    } catch (e) {
        // Handel Error
    }
})

userSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next){
    const update = this.getUpdate();

    delete update._id;
    delete update.id;
    
    this.updateOn = new Date();

    next();
})

const userModel = db.model('users', userSchema);

module.exports = userModel;