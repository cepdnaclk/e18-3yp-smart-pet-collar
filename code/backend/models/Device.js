const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for device
const deviceSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  status: String,

  user: { type: Schema.Types.ObjectId, ref: "User" },

  pet: { type: Schema.Types.ObjectId, ref: "Pet" },
});

// export model
// here the first argument is the singular name of the collection

const DeviceData = mongoose.model("Device", deviceSchema);

module.exports = { DeviceData };
