const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");


//LISTER TOUS LES ROLES
router.get("/roles", roleController.getAllRoles);


//OBTENIR UN ROLE PAR ID
router.get("/roles/:id", roleController.getRoleById);


//CREER UN ROLE
router.post("/roles", roleController.createRole);


//MODIFIER UN ROLE
router.put("/roles/:id", roleController.updateRole);


//SUPPRIMER UN ROLE
router.delete("/roles/:id", roleController.deleteRole);

module.exports = router;