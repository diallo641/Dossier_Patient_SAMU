const multer = require("multer");
const path = require("path");

// ==============================
// STORAGE CONFIG
// ==============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ==============================
// MULTER CONFIG
// ==============================
const upload = multer({
  storage,
});

module.exports = upload;