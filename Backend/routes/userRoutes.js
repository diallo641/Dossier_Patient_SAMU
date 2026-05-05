const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


//LISTER TOUS LES UTILISATEURS
router.get("/users", userController.getAllUsers);


//OBTENIR UN UTILISATEUR PAR ID
router.get("/users/:id", userController.getUserById);


//CRÉER UN UTILISATEUR
router.post("/users", userController.createUser);


//MODIFIER UN UTILISATEUR
router.put("/users/:id", userController.updateUser);


//SUPPRIMER UN UTILISATEUR
router.delete("/users/:id", userController.deleteUser);

module.exports = router;