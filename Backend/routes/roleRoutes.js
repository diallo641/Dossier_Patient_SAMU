const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const roleController = require("../controllers/roleController");


// LISTER TOUS LES ROLES
router.get("/roles", authMiddleware, roleMiddleware(["Admin"]), roleController.getAllRoles);


// OBTENIR UN ROLE PAR ID
router.get("/roles/:id", authMiddleware, roleMiddleware(["Admin"]), roleController.getRoleById);


// CREER UN ROLE
router.post("/roles", authMiddleware, roleMiddleware(["Admin"]), roleController.createRole);


// MODIFIER UN ROLE
router.put("/roles/:id", authMiddleware, roleMiddleware(["Admin"]), roleController.updateRole);


// SUPPRIMER UN ROLE
router.delete("/roles/:id", authMiddleware, roleMiddleware(["Admin"]), roleController.deleteRole);

module.exports = router;