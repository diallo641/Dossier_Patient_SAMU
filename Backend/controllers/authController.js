const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");

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

module.exports = {
  register,
  login,
};