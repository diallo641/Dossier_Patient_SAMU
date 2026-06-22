const employeModel = require("../models/employeModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");


// tous les employes
const getAllEmployes = async (req, res) => {
  try {

    const data = await employeModel.getAllEmployes();

    res.json({
      message: "Liste des employés",
      total: data.length,
      data
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// un employe par son id
const getEmployeById = async (req, res) => {
  try {

    const data = await employeModel.getEmployeById(req.params.id);
    console.log("USER JWT:", req.user);
    console.log("USER ID:", req.user.id);
    console.log("ID PARAMS:", req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Employé introuvable sur la base de données"
      });
    }

    res.json({
      message: "OK",
      data
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


// creer un employe
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
      id_role,
      groupe_sanguin,
      allergies,
      antecedents_medicaux,
      aptitudes_medicales
    } = req.body;

    console.log("📥 BODY CREATE EMPLOYE:", req.body);

    const typeMap = {
      1: "Admin",
      2: "Medecin",
      3: "Employe",
    };

    const type = typeMap[Number(id_role)];
    console.log("🔐 PASSWORD:", mot_de_passe);
    console.log("📧 EMAIL:", email);
    console.log("🎭 ROLE:", id_role);

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // CREATE USER
    const userId = await userModel.createUser(
      email,
      hashedPassword,
      id_role
    );

    console.log("🧑 USER CREATED ID:", userId);

    // CREATE EMPLOYE
    const employeId = await employeModel.createEmploye(
      {
        nom,
        prenom,
        poste,
        service,
        date_naissance,
        telephone,
        type, // ✅ FIX ICI
        groupe_sanguin,
        allergies,
        antecedents_medicaux,
        aptitudes_medicales
      },
      userId
    );

    console.log("🧑 EMPLOYE CREATED ID:", employeId);

    res.status(201).json({
      message: "Employé créé avec succès",
      employeId,
      userId
    });

  } catch (error) {

    console.log("❌ CREATE EMPLOYE ERROR:", error);

    res.status(500).json({
      error: error.message
    });
  }
};


// modifier un employe
const updateEmploye = async (req, res) => {
  try {

    const idEmploye = req.params.id;
    const data = req.body;
    console.log("BODY REÇU FRONTEND:", data);

    const employe = await employeModel.getEmployeById(idEmploye);

    if (!employe) {
      return res.status(404).json({
        message: "Employé introuvable"
      });
    }
    const idUtilisateur = employe.user_id;

    const typeMap = {
      1: "Admin",
      2: "Medecin",
      3: "Employe",
    };

    const dataEmploye = {
      ...data,
      type: typeMap[Number(data.id_role)],
    };
    await employeModel.updateEmploye(
      idEmploye,
      dataEmploye
    );

   
    //Modifier aussi l'utilisateur lié
    await userModel.updateUser(
      idUtilisateur,
      data.email,
      Number(data.id_role)
    );

   

    res.json({
      message: "Employé et utilisateur mis à jour avec succès"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


//modifier son propre profil
const updateMonProfil = async (req, res) => {
  try {
    const idUtilisateur = req.user.id;

    const data = req.body;
    const employe = await employeModel.getProfilEmployeByUserId(idUtilisateur);

    if (!employe) {
      return res.status(404).json({
        message: "Profil employé introuvable"
      });
    }

    //console.log("🧑 EMPLOYÉ TROUVÉ:", employe);

    await employeModel.updateMonProfilEmploye(employe.id, {
      nom: data.nom,
      prenom: data.prenom,
      date_naissance: data.date_naissance,
      telephone: data.telephone,
      poste: data.poste,
      service: data.service
    });

    //console.log("✅ UPDATE PROFIL EMPLOYÉ OK");

    res.json({
      message: "Profil mis à jour avec succès"
    });

  } catch (error) {
    //console.log("❌ ERREUR UPDATE PROFIL EMPLOYE:", error);

    res.status(500).json({
      error: error.message
    });
  }
};

// supprimer un employe
const deleteEmploye = async (req, res) => {
  try {

    const employe = await employeModel.getEmployeById(req.params.id);

    if (!employe) {
      return res.status(404).json({
        message: "Employé introuvable"
      });
    }

    await employeModel.deleteEmploye(req.params.id);

    res.json({
      message: "Employé supprimé avec succès"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// TOTAL EMPLOYES
const getTotalEmployes = async (req, res) => {
  try {

    const data = await employeModel.getTotalEmployes();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// repartition des employes par service
const getEmployesByService = async (req, res) => {
  try {

    const data = await employeModel.getEmployesByService();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// repartition des employes par role
const getEmployesByRole = async (req, res) => {
  try {

    const data = await employeModel.getEmployesByRole();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// repartition des employes par type (medecin, admin, employe)
const getEmployesByType = async (req, res) => {
  try {

    const data = await employeModel.getEmployesByType();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// repartition des employes par groupe sanguin
const getEmployesByBloodGroup = async (req, res) => {
  try {

    const data = await employeModel.getEmployesByBloodGroup();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// repartition des employes par allégies
const getEmployesByAllergies = async (req, res) => {
  try {

    const data = await employeModel.getEmployesByAllergies();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// repartition des employes par antecedents
const getEmployesByAntecedents = async (req, res) => {
  try {

    const data = await employeModel.getEmployesByAntecedents();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// repartition des employes par aptitudes
const getEmployesByAptitudes = async (req, res) => {
  try {

    const data = await employeModel.getEmployesByAptitudes();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};




// profil de l'employé connecté
const getProfil = async (req, res) => {
  try {
    const id = req.user.id;

    const profil = await employeModel.getProfilEmployeByUserId(id);

    if (!profil) {
      return res.status(404).json({
        message: "Profil employé introuvable"
      });
    }

    res.status(200).json(profil);

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
};

module.exports = {
  getAllEmployes,
  getEmployeById,
  createEmploye,
  updateEmploye,
  deleteEmploye,
  getTotalEmployes,
  getEmployesByService,
  getEmployesByRole,
  getEmployesByType,
  getEmployesByBloodGroup,
  getEmployesByAllergies,
  getEmployesByAntecedents,
  getEmployesByAptitudes,
  getProfil,
  updateMonProfil
};