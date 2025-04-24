const multer = require("multer");
const path = require("path");

// storage setup for local uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //Images 'upload' folder me save hongi
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
//file type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new error("Only JPEG , JPG & PNG files are allowed!"), false);
  }
};

// multer middleware

const upload = multer({ storage, fileFilter });
module.exports = upload;
