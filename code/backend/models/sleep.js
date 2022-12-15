const mongoose = require("mongoose"); // imports mongoose
const Schema = mongoose.Schema; // defines the strcuture of documents inside a collection

const sleepSchema = new Schema({
  startTime: { type: Date, required: true, default: Date.now }, // it is a must that a sleep has a start time
  duration: String,

  // relationship with the Pet (Has)
  pet: { type: Schema.Types.ObjectId, ref: "Pet" },
});

const SleepData = mongoose.model("Sleep", sleepSchema);

module.exports = { SleepData };
