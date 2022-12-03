const mongoose = require("mongoose"); // imports mongoose
const Schema = mongoose.Schema; // defines the strcuture of documents inside a collection

const sleepSchema = new Schema(
    {
        StartTime: { type: Date, required: true, default: Date.now }, // it is a must that a sleep has a start time
        Duration: String,

        // relationship with the Pet (Has)
        Pet: String, // FK | maps the Pet of the sleep
    },
    { collection: "Sleep" }
);

module.exports = mongoose.model(sleepSchema, "SleepModel");
