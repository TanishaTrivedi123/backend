const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// ✅ Updated and detailed CORS config for frontend
const allowedOrigins = ["https://frontend1-beige.vercel.app"];

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("CORS not allowed by this server"), false); // Block the request
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If you use cookies or sessions
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
