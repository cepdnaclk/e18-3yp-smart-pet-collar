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
});

// export model
// here the first argument is the singular name of the collection
module.exports = mongoose.model("Device", deviceSchema);
