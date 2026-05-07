const express = require("express");
const router = express.Router();

const employeController = require("../controllers/employeController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// =============================
// EMPLOYES
// =============================
router.get("/", authMiddleware, roleMiddleware(["Admin", "Medecin"]), employeController.getAllEmployes);

router.get("UnEmploye/:id", authMiddleware, roleMiddleware(["Admin", "Medecin"]), employeController.getEmployeById);

router.post("/", authMiddleware, roleMiddleware(["Admin", "Medecin"]), employeController.createEmploye);

router.put("/:id", authMiddleware, roleMiddleware(["Admin", "Medecin"]), employeController.updateEmploye);

router.delete("/:id", authMiddleware, roleMiddleware(["Admin", "Medecin"]), employeController.deleteEmploye);

router.get("/stats", employeController.getEmployeStats);

module.exports = router;