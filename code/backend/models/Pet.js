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
  dateOfBirth: {
    type: Date,
    required: true,
  },
  color: {
    type: String,
    max: 255,
  },
  weight: {
    type: Number,
    required: true,
  },
  species: {
    type: String,
    enum: ["Dog", "Cat", "Other"], //if this project has more pets than that then, add to this line
    required: true,
  },
  specialCharacteristics: {
    type: String,
  },

  // relationship with the Pet (ConnectsTo)
  device: { type: Schema.Types.ObjectId, ref: "Device" }, // FK | maps the Device of the Pet

  // relationship with the User (ConnectsTo)
  user: { type: Schema.Types.ObjectId, ref: "User" }, // FK | maps the User of the Pet

  vaccinations: [
    {
      name: {
        type: String,
        required: true,
        max: 255,
      },

      status: {
        type: String,
        required: true,
        max: 255,
      },

      completeDate: {
        type: Date,
        required: true,
      },

      scheduledDate: {
        type: Date,
        required: true,
      },

      label: {
        type: String,
        required: true,
      },
    },
  ],

  vitals: [
    {
      temperature: {
        type: Number,
        required: true,
      },

      heartRate: {
        type: Number,
        required: true,
      },

      dateTime: {
        type: Date,
        required: true,
      },
    },
  ],

  locations: [
    {
      dateTime: { type: Date, required: true, default: Date.now },

      longitude: {
        type: Number,
        required: true,
      },

      latitude: {
        type: Number,
        required: true,
      },
    },
  ],

  sleeps: [
    {
      startTime: { type: Date, required: true, default: Date.now },
      duration: Number,
    },
  ],
});

module.exports = mongoose.model("Pet", petSchema);
