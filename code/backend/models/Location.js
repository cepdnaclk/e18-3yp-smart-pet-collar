const mongoose = require("mongoose"); // imports mongoose
const Schema = mongoose.Schema; // defines the strcuture of documents inside a collection

const locationSchema = new Schema({
  datetTime: { type: Date, required: true, default: Date.now },

  longitude: {
    type: int,
    required: true,
  },

  latitude: {
    type: int,
    required: true,
  },

  // relationship with the Pet (Has)
  pet: { type: Schema.Types.ObjectId, ref: "Pet" },
});

const LocationData = mongoose.model("Location", locationSchema);

module.exports = { LocationData };
