const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  flightId: { type: String, required: true },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
