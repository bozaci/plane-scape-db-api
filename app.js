require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Flight = require("./models/flight");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/my-flights", async (req, res) => {
  const { uid } = req.body;

  try {
    const flights = await Flight.find({ uid });

    if (flights.length === 0) {
      return res.status(404).json({ message: "No flights found for this user.", status: "error" });
    }

    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve flights", status: "error" });
  }
});

app.post("/book-flight", async (req, res) => {
  const { flightId, uid, takeOff, landing, scheduleDateTime, airlineCompanyCode, price } = req.body;

  if (!flightId || !uid) {
    return res.status(400).json({
      message: "Flight ID and UID are required.",
      status: "error",
    });
  }

  const newFlight = new Flight({
    flightId,
    uid,
    takeOff,
    landing,
    scheduleDateTime,
    airlineCompanyCode,
    price,
  });

  try {
    const existingFlight = await Flight.findOne({ flightId, uid });

    if (existingFlight) {
      return res.status(400).json({
        message: "You've already booked this flight.",
        status: "error",
      });
    }

    const savedFlight = await newFlight.save();

    res
      .status(201)
      .json({ message: "Flight successfully booked.", flight: savedFlight, status: "success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to book flight", status: "error", error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
