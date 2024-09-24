require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Flight = require("./models/flight");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/my-flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve flights", status: "error" });
  }
});

app.post("/book-flight", async (req, res) => {
  const { flightId, uid } = req.body;
  const newFlight = new Flight({ flightId, uid });

  try {
    const savedFlight = await newFlight.save();
    res
      .status(201)
      .json({ message: "Flight successfully booked.", flight: savedFlight, status: "success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to book flight", status: "error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
