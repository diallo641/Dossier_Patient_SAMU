const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const db = require("../config/db");
const sendEmail = require("../utils/sendEmail");




// =============================
// REGISTER
// =============================
const register = async (req, res) => {
  try {
    const { email, mot_de_passe, id_role } = req.body;

    if (!email || !mot_de_passe || !id_role) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const exists = await userModel.emailExists(email);

    if (exists) {
      return res.status(400).json({
        message: "Email déjà utilisé",
      });
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const id = await userModel.createUser(
      email,
      hashedPassword,
      id_role
    );

    res.status(201).json({
      message: "Utilisateur créé",
      id,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur register",
      error: error.message,
    });
  }
};

// =============================
// LOGIN
// =============================
const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
      return res.status(400).json({
        message: "Email et mot de passe requis",
      });
    }

    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "Utilisateur introuvable",
      });
    }

    const isMatch = await bcrypt.compare(
      mot_de_passe,
      user.mot_de_passe
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Mot de passe incorrect",
      });
    }

    const token = generateToken(user);

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.nom_role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur login",
      error: error.message,
    });
  }
};




const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "Email introuvable",
      });
    }

    // 🔐 token sécurisé
    const token = crypto.randomBytes(32).toString("hex");

    // ⏰ expiration 15 min
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    // 💾 sauvegarde en DB
    await userModel.saveResetToken(email, token, expires);

    // 🔗 lien reset
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // 📩 envoi email
    await sendEmail(
      email,
      "Réinitialisation de mot de passe",
      `Clique ici pour réinitialiser ton mot de passe : ${resetLink}`
    );

    res.json({
      message: "Email de réinitialisation envoyé",
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur forgot password",
      error: error.message,
    });
  }
};





const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await userModel.getUserByResetToken(token);

    if (!user) {
      return res.status(400).json({
        message: "Token invalide ou expiré",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.updatePassword(user.id, hashedPassword);

    res.json({
      message: "Mot de passe mis à jour avec succès",
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur reset password",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};