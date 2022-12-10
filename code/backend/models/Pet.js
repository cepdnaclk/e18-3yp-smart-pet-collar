const mongoose = require('mongoose');   // imports mongoose
const Schema = mongoose.Schema;         // defines the strcuture of documents inside a collection

const petSchema = new Schema({

    Name: {
        type: String,
        required: true,
        max: 255
    },
    Sex: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    Breed: {
        type: String,
        required: true,
        max: 255
    },
    DateofBirth: {
        type: Date,
        required: true
    },
    Colour: {
        type: String,
        required: true,
        max: 255
    },
    Weight: {
        type: String,
        required: true
    },
    Species: {
        type: String,
        enum: ['Dog', 'Cat', 'Other'],         //if this project has more pets than that then, add to this line
        required: true
    },
    SpecialCharacteristics: {
        type: String,
        required: true,
        max: 255
    },

    // relationship with the Pet (ConnectsTo)
    Device: String  // FK | maps the Device of the Pet


}, { collection: 'Pet' })

module.exports = mongoose.model(petSchema, 'PetModel');