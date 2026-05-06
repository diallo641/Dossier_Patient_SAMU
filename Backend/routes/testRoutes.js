const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.get("/mail", async (req, res) => {
  try {
    await sendEmail(
      "tonemail@gmail.com",
      "Test Node Backend",
      "Email de test depuis ton backend Node.js 🚀"
    );

    res.json({ message: "Email envoyé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur envoi email",
      error: error.message,
    });
  }
});

module.exports = router;