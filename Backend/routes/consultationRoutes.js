const express = require("express");
const router = express.Router();

const controller = require("../controllers/consultationController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// =============================
// STATS
// ⚠️ TOUJOURS AVANT /:id
// =============================

// TOTAL CONSULTATIONS
router.get(
  "/stats/total",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.getTotalConsultations
);

// CONSULTATIONS DU MEDECIN
router.get(
  "/stats/medecin/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.getConsultationsByMedecin
);

// PATIENTS CONSULTÉS PAR LE MEDECIN
router.get(
  "/stats/patients/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.getPatientsByMedecin
);

// CONSULTATIONS PAR MOTIF
router.get(
  "/stats/motifs/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.getConsultationsByMotif
);

// CONSULTATIONS PAR DATE
router.get(
  "/stats/dates/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.getConsultationsByDate
);

// =============================
// GET CONSULTATIONS BY EMPLOYE
// =============================
router.get(
  "/employe/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin", "Employe"]),
  controller.getByEmploye
);

// =============================
// GET ALL CONSULTATIONS
// =============================
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.getAllConsultations
);

// =============================
// GET CONSULTATION BY ID
// ⚠️ TOUJOURS APRÈS LES ROUTES FIXES
// =============================
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.getConsultationById
);

// =============================
// CREATE CONSULTATION
// =============================
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.createConsultation
);

// =============================
// UPDATE CONSULTATION
// =============================
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  controller.updateConsultation
);

// =============================
// DELETE CONSULTATION
// =============================
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  controller.deleteConsultation
);

module.exports = router;