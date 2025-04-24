const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Successfully ");
  } catch (error) {
    console.error("MongoDB Connection Error ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
