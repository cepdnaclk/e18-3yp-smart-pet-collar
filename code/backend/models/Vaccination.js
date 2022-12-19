const mongoose = require("mongoose"); // imports mongoose
const Schema = mongoose.Schema; // defines the strcuture of documents inside a collection

const vaccinationSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },

  status: {
    type: String,
    max: 255,
  },

  completedDate: {
    type: Date,
  },

  scheduledDate: {
    type: Date,
    required: true,
  },

  label: {
    type: String,
  },
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);
