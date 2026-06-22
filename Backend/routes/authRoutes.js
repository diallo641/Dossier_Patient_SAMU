const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

//inscription
router.post("/register", authController.register);

//connexion
router.post("/login", authController.login);

//mot de passe oublié
router.post("/forgot-password", authController.forgotPassword);

//changer mot de passe
router.post("/reset-password", authController.resetPassword);

module.exports = router;