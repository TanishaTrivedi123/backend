// middleware/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Cloudinary");

// storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events", // Cloudinary folder where images will be stored
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }], // optional
  },
});

const upload = multer({ storage });

module.exports = upload;
