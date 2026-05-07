const employeModel = require("../models/employeModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// =============================
// ROLES
// =============================
const VALID_ROLES = [1, 2, 5];
// 1 = Admin
// 2 = Medecin
// 5 = Employe

// =============================
// GET ALL EMPLOYES
// =============================
const getAllEmployes = async (req, res) => {
  try {
    const employes = await employeModel.getAllEmployes();

    if (!employes.length) {
      return res.status(404).json({
        message: "Aucun employé trouvé",
      });
    }

    res.json({
      message: "Liste des employés",
      total: employes.length,
      data: employes,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération employés",
      error: error.message,
    });
  }
};

// =============================
// GET EMPLOYE BY ID
// =============================
const getEmployeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employe = await employeModel.getEmployeById(id);

    if (!employe) {
      return res.status(404).json({
        message: "Employé introuvable",
      });
    }

    res.json(employe);

  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération employé",
      error: error.message,
    });
  }
};

// =============================
// CREATE EMPLOYE + USER
// =============================
const createEmploye = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      poste,
      service,
      date_naissance,
      telephone,
      email,
      mot_de_passe,
      id_role
    } = req.body;

    if (!email || !mot_de_passe || !nom || !prenom) {
      return res.status(400).json({
        message: "Champs obligatoires manquants",
      });
    }

    // validation role
    if (!VALID_ROLES.includes(id_role)) {
      return res.status(400).json({
        message: "Rôle invalide (1=Admin, 2=Medecin, 5=Employe)",
      });
    }

    // ❌ SUPPRESSION DU BLOCAGE ADMIN

    const exists = await userModel.emailExists(email);

    if (exists) {
      return res.status(400).json({
        message: "Email déjà utilisé",
      });
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // 🔥 TYPE LOGIC PROPRE
    let type = "Employe";

    if (id_role === 2) {
      type = "Medecin";
    }

    if (id_role === 1) {
      type = "Admin";
    }

    // CREATE USER
    const id_user = await userModel.createUser(
      email,
      hashedPassword,
      id_role
    );

    // CREATE EMPLOYE
    const id_employe = await employeModel.createEmploye(
      {
        nom,
        prenom,
        poste,
        service,
        date_naissance,
        telephone,
        type
      },
      id_user
    );

    res.status(201).json({
      message: "Employé + utilisateur créé",
      data: {
        id_employe,
        id_user,
        type
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur création employé",
      error: error.message,
    });
  }
};

// =============================
// UPDATE EMPLOYE + USER
// =============================
const updateEmploye = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nom,
      prenom,
      poste,
      service,
      date_naissance,
      telephone,
      email,
      id_role
    } = req.body;

    const employe = await employeModel.getEmployeById(id);

    if (!employe) {
      return res.status(404).json({
        message: "Employé introuvable",
      });
    }

    if (!VALID_ROLES.includes(id_role)) {
      return res.status(400).json({
        message: "Rôle invalide",
      });
    }

    // ❌ SUPPRESSION DU BLOCAGE ADMIN

    const exists = await userModel.emailExistsExceptUser(
      email,
      employe.user_id
    );

    if (exists) {
      return res.status(400).json({
        message: "Email déjà utilisé",
      });
    }

    // TYPE LOGIC
    let type = "Employe";

    if (id_role === 2) {
      type = "Medecin";
    }

    if (id_role === 1) {
      type = "Admin";
    }

    await employeModel.updateEmploye(id, {
      nom,
      prenom,
      poste,
      service,
      date_naissance,
      telephone,
      type
    });

    await userModel.updateUser(
      employe.user_id,
      email,
      id_role
    );

    res.json({
      message: "Employé et utilisateur mis à jour",
      type
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur mise à jour employé",
      error: error.message,
    });
  }
};

// =============================
// DELETE EMPLOYE + USER
// =============================
const deleteEmploye = async (req, res) => {
  try {
    const { id } = req.params;

    const employe = await employeModel.getEmployeById(id);

    if (!employe) {
      return res.status(404).json({
        message: "Employé introuvable",
      });
    }

    await employeModel.deleteEmploye(id);

    if (employe.user_id) {
      await userModel.deleteUser(employe.user_id);
    }

    res.json({
      message: "Employé et utilisateur supprimés",
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur suppression employé",
      error: error.message,
    });
  }
};

const getEmployeStats = async (req, res) => {
  try {
    const stats = await employeModel.getEmployeStats();

    res.json({
      message: "Statistiques employés",
      data: stats,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur statistiques employés",
      error: error.message,
    });
  }
};

module.exports = {
  getAllEmployes,
  getEmployeById,
  createEmploye,
  updateEmploye,
  deleteEmploye,
  getEmployeStats
};