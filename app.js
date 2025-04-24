const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db");
connectDB();
dotenv.config();
const cors = require("cors");

app.use(cors());

// ✅ Set size limits properly — and only use express built-ins
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("Jai Shree Krishn");
});

const EventRoute = require("./routes/EventRoute");
const adminRoute = require("./routes/AdminRoute");
const ContactRoute = require("./routes/ContactRoute");
const registerRoute = require("./routes/RegisterRoute");
app.use("/", EventRoute);
app.use("/", adminRoute);
app.use("/", ContactRoute);
app.use("/", registerRoute);

app.listen(PORT, () => {
  console.log(`App is successfully running on port ${PORT}`);
});
