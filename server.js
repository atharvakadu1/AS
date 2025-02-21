const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/active-sphere", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  title: String,
  sport: String,
  date: String,
  time: String,
  location: String,
  participants: String,
  contact: String,
  description: String,
});

const Event = mongoose.model("Event", eventSchema);

// Routes
app.post("/api/events", async (req, res) => {
  const {
    title,
    sport,
    date,
    time,
    location,
    participants,
    contact,
    description,
  } = req.body;
  const newEvent = new Event({
    title,
    sport,
    date,
    time,
    location,
    participants,
    contact,
    description,
  });
  await newEvent.save();
  res.status(201).json(newEvent);
});

app.get("/api/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.delete("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.status(204).send();
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
