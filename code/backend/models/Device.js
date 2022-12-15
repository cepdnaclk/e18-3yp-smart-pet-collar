const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for device
const deviceSchema = new Schema({
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
module.exports = mongoose.model("Device", deviceSchema);
