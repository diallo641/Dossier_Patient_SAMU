const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const roleController = require("../controllers/roleController");

// =============================
// ROLES ROUTES
// =============================

// LISTER TOUS LES ROLES
router.get("/", authMiddleware, roleMiddleware(["Admin"]), roleController.getAllRoles);

// OBTENIR UN ROLE PAR ID
router.get("/:id", authMiddleware, roleMiddleware(["Admin"]), roleController.getRoleById);

// CREER UN ROLE
router.post("/", authMiddleware, roleMiddleware(["Admin"]), roleController.createRole);

// MODIFIER UN ROLE
router.put("/:id", authMiddleware, roleMiddleware(["Admin"]), roleController.updateRole);

// SUPPRIMER UN ROLE
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), roleController.deleteRole);

module.exports = router;