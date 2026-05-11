const express = require("express");
const router = express.Router();

const controller = require("../controllers/fichierMedicalController");

const authMiddleware = require("../middlewares/authMiddleware");

const upload = require("../middlewares/uploadMiddleware");

// ==============================
// CREATE FILE
// ==============================
router.post(
  "/",
  authMiddleware,
  upload.single("fichier"),
  controller.createFichierMedical
);

// ==============================
// GET ALL FILES
// ==============================
router.get(
  "/",
  authMiddleware,
  controller.getAllFichiersMedicaux
);

// ==============================
// GET FILE BY ID
// ==============================
router.get(
  "/:id",
  authMiddleware,
  controller.getFichierMedicalById
);

// ==============================
// GET FILES BY CONSULTATION
// ==============================
router.get(
  "/consultation/:id_consultation",
  authMiddleware,
  controller.getFichiersByConsultation
);

// ==============================
// UPDATE FILE
// ==============================
router.put(
  "/:id",
  authMiddleware,
  controller.updateFichierMedical
);

// ==============================
// DELETE FILE
// ==============================
router.delete(
  "/:id",
  authMiddleware,
  controller.deleteFichierMedical
);

module.exports = router;