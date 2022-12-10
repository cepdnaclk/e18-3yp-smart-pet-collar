const mongoose = require('mongoose');   // imports mongoose
const Schema = mongoose.Schema;         // defines the strcuture of documents inside a collection

const locationSchema = new Schema({
    DatetTime: { type: Date, required: true, default: Date.now },
    longitude: {
        type: int,
        required: true
    },

    latitude: {
        type: int,
        required: true
    },

    // relationship with the Pet (Has)
    Pet: String  // FK | maps the Pet of the Location

}, { collection: 'Location' })

module.exports = mongoose.model(locationSchema, 'LocationModel');