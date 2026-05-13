const express = require("express");
const router = express.Router();

const employeController = require("../controllers/employeController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// =============================
// STATS
// =============================

// TOTAL EMPLOYES
router.get(
  "/stats/total",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getTotalEmployes
);

// EMPLOYES PAR SERVICE
router.get(
  "/stats/service",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByService
);

// EMPLOYES PAR ROLE
router.get(
  "/stats/role",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByRole
);

// EMPLOYES PAR TYPE
router.get(
  "/stats/type",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByType
);

// EMPLOYES PAR GROUPE SANGUIN
router.get(
  "/stats/groupe-sanguin",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByBloodGroup
);

// EMPLOYES PAR ALLERGIES
router.get(
  "/stats/allergies",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByAllergies
);

// EMPLOYES PAR ANTECEDENTS
router.get(
  "/stats/antecedents",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByAntecedents
);

// EMPLOYES PAR APTITUDES
router.get(
  "/stats/aptitudes",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByAptitudes
);

// =============================
// EMPLOYES
// =============================

// GET ALL
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getAllEmployes
);

// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployeById
);

// CREATE
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.createEmploye
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.updateEmploye
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.deleteEmploye
);

module.exports = router;