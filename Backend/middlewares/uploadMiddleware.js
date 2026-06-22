const multer = require("multer");
const path = require("path");


// configuration du stockage des fichiers téléchargés
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


// configuration de multer pour gérer les téléchargements de fichiers
const upload = multer({
  storage,
});

module.exports = upload;