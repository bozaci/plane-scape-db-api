const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  flightId: { type: String, required: true },
  takeOff: {
    airport: { type: String, required: true },
    time: { type: String, required: true },
  },
  landing: {
    airport: { type: String, required: true },
    time: { type: String, required: true },
  },
  scheduleDateTime: { type: String, required: true },
  airlineCompanyCode: { type: String, required: true },
  price: { type: String, required: true },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
