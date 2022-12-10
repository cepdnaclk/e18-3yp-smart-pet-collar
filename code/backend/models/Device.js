const mongoose = require('mongoose');   // imports mongoose
const Schema = mongoose.Schema;         // defines the strcuture of documents inside a collection

const deviceSchema = new Schema({
    Pin: {
        type: String,
        required: true

    },

    Status: {
        type: String,
        required: true,
        max: 32768
    },

    // relationship with the Pet (own)
    User: String  // FK | maps the Pet of the Device
}, { collection: 'Device' })

module.exports = mongoose.model(deviceSchema, 'DeviceModel');