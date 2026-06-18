const express = require("express");
const router = express.Router();

const employeController = require("../controllers/employeController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// =============================
// STATS
// =============================

router.get(
  "/stats/total",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getTotalEmployes
);

router.get(
  "/stats/service",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByService
);

router.get(
  "/stats/role",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByRole
);

router.get(
  "/stats/type",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByType
);

router.get(
  "/stats/groupe-sanguin",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByBloodGroup
);

router.get(
  "/stats/allergies",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByAllergies
);

router.get(
  "/stats/antecedents",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByAntecedents
);

router.get(
  "/stats/aptitudes",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getEmployesByAptitudes
);

// =============================
// PROFIL EMPLOYE CONNECTE
// =============================

router.get(
  "/profil",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin", "Employe"]),
  employeController.getProfil
);

router.put(
  "/profil",
  authMiddleware,
  roleMiddleware(["Employe", "Medecin", "Admin"]),
  employeController.updateMonProfil
);

// =============================
// EMPLOYES
// =============================

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.getAllEmployes
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin", "Employe"]),
  employeController.getEmployeById
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.createEmploye
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin", "Employe"]),
  employeController.updateEmploye
);


router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Medecin"]),
  employeController.deleteEmploye
);

module.exports = router;