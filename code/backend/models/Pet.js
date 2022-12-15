const mongoose = require("mongoose"); // imports mongoose
const Schema = mongoose.Schema; // defines the strcuture of documents inside a collection

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  sex: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  breed: {
    type: String,
    required: true,
    max: 255,
  },
  dateofBirth: {
    type: Date,
    required: true,
  },
  colour: {
    type: String,
    required: true,
    max: 255,
  },
  weight: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    enum: ["Dog", "Cat", "Other"], //if this project has more pets than that then, add to this line
    required: true,
  },
  specialCharacteristics: {
    type: String,
    required: true,
  },

  // relationship with the Pet (ConnectsTo)
  device: { type: Schema.Types.ObjectId, ref: "Device" }, // FK | maps the Device of the Pet

  vaccination: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vaccination",
    },
  ],

  vital: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vital",
    },
  ],

  location: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  ],

  sleep: [
    {
      type: Schema.Types.ObjectId,
      ref: "Sleep",
    },
  ],
});

const PetData = mongoose.model("Pet", petSchema);

module.exports = { PetData };
