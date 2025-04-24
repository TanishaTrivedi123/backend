const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    // required: true,
  },
});

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
