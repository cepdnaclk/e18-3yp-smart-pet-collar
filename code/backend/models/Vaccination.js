const mongoose = require("mongoose"); // imports mongoose
const Schema = mongoose.Schema; // defines the strcuture of documents inside a collection

const vaccinationSchema = new Schema({
  Name: {
    type: String,
    required: true,
    max: 255,
  },

  Status: {
    type: String,
    required: true,
    max: 255,
  },

  CompleteDate: {
    type: Date,
    required: true,
  },

  ScheduledDate: {
    type: Date,
    required: true,
  },

  Lable: {
    type: String,
    required: true,
  },

  // relationship with the Pet (Has)
  pet: { type: Schema.Types.ObjectId, ref: "Pet" },
});

const VaccinationData = mongoose.model("Vaccination", vaccinationSchema);

module.exports = { VaccinationData };
