const userModel = require("../models/userModel");

// =============================
// GET ALL USERS
// =============================
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    if (!users.length) {
      return res.status(404).json({
        message: "Aucun utilisateur trouvé",
      });
    }

    res.json({
      message: "Liste des utilisateurs",
      total: users.length,
      data: users,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération utilisateurs",
      error: error.message,
    });
  }
};

// =============================
// GET USER BY ID
// =============================
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération utilisateur",
      error: error.message,
    });
  }
};

// =============================
// CREATE USER
// =============================
const createUser = async (req, res) => {
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

    const id = await userModel.createUser(email, mot_de_passe, id_role);

    res.status(201).json({
      message: "Utilisateur créé",
      id,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur création utilisateur",
      error: error.message,
    });
  }
};

// =============================
// UPDATE USER
// =============================
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, id_role } = req.body;

    if (!email || !id_role) {
      return res.status(400).json({
        message: "Email et rôle obligatoires",
      });
    }

    const exists = await userModel.emailExistsExceptUser(email, id);

    if (exists) {
      return res.status(400).json({
        message: "Email déjà utilisé",
      });
    }

    await userModel.updateUser(id, email, id_role);

    res.json({
      message: "Utilisateur mis à jour",
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur mise à jour utilisateur",
      error: error.message,
    });
  }
};

// =============================
// DELETE USER
// =============================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await userModel.deleteUser(id);

    res.json({
      message: "Utilisateur supprimé",
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur suppression utilisateur",
      error: error.message,
    });
  }
};

// =============================
// STATISTIQUES
// =============================
const getUserStats = async (req, res) => {
  try {
    const stats = await userModel.getUserStats();

    res.json({
      message: "Statistiques utilisateurs",
      data: stats,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur statistiques",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
};