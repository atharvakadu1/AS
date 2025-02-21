require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON data

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 📌 Create Schema & Model
const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    location: String,
    sport: String,
    participants: Number,
    description: String
});

const Event = mongoose.model("Event", eventSchema);

// 📌 API: Create an Event
app.post("/api/events", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create event." });
    }
});

// 📌 API: Get All Events
app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events." });
    }
});

// 🔥 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
