const mongoose = require('mongoose');   // imports mongoose
const Schema = mongoose.Schema;         // defines the strcuture of documents inside a collection

const userSchema = new Schema({

    FName: {
        type: String,
        required: true,
        max: 255
    },

    LName: {
        type: String,
        required: true,
        max: 255
    },

    longitude: {
        type: int,
        required: true
    },

    latitude: {
        type: int,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },

    Phone: {
        type: String,
        required: true,
        max: 10
    }
    //password: {type: String, default: '', select: false},
    //

}, { collection: 'User' })

module.exports = mongoose.model(userSchema, 'UserModel');