const mongoose = require("mongoose");

const registerScehma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
});

const registerModel = mongoose.model("registerModel", registerScehma);

module.exports = registerModel;
