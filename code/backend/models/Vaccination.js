const mongoose = require('mongoose');   // imports mongoose
const Schema = mongoose.Schema;         // defines the strcuture of documents inside a collection

const vaccinationSchema = new Schema({

    Name: {
        type: String,
        required: true,
        max: 255
    },

    Status: {
        type: String,
        required: true,
        max: 255
    },

    CompleteDate: {
        type: Date,
        required: true
    },

    ScheduledDate: {
        type: Date,
        required: true
    },

    Lable: {
        type: String,
        required: true,
        max: 255
    },

    // relationship with the Pet (Has)
    Pet: String  // FK | maps the Pet of the Vaccination

}, { collection: 'Vaccination' })

module.exports = mongoose.model(vaccinationSchema, 'VaccinationModel');