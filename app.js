const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// ✅ Simple and clean CORS config for frontend
app.use(
  cors({
    origin: "https://frontend1-beige.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Handle JSON and URL-encoded payloads with size limits
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Jai Shree Krishn");
});

// ✅ Import and use routes
const EventRoute = require("./routes/EventRoute");
const adminRoute = require("./routes/AdminRoute");
const ContactRoute = require("./routes/ContactRoute");
const registerRoute = require("./routes/RegisterRoute");

app.use("/", EventRoute);
app.use("/", adminRoute);
app.use("/", ContactRoute);
app.use("/", registerRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is successfully running on port ${PORT}`);
});
