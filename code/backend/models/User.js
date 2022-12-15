const mongoose = require("mongoose"); // imports mongoose
const Schema = mongoose.Schema; // defines the strcuture of documents inside a collection

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 255,
  },

  lastName: {
    type: String,
    required: true,
    max: 255,
  },

  longitude: {
    type: Number,
  },

  latitude: {
    type: Number,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
  },

  phone: {
    type: String,
    required: true,
    max: 10,
  },

  password: {
    type: String,
    required: true,
  },

  device: { type: Schema.Types.ObjectId, ref: "Device" },
});

module.exports = mongoose.model("User", userSchema);
