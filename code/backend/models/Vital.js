const mongoose = require('mongoose');   // imports mongoose
const Schema = mongoose.Schema;         // defines the strcuture of documents inside a collection

const vitalSchema = new Schema({

    Type: {
        type: Number,
        enum: ['Temperature', 'Heart Rate'],
        required: true
    },

    Value: {
        type: Number,
        required: true
    },

    DateTime: {
        type: Date,
        required: true
    },

    // relationship with the Pet (Has)
    Pet: String  // FK | maps the Pet of the Vital

}, { collection: 'Vital' })

module.exports = mongoose.model(vitalSchema, 'VitalModel');