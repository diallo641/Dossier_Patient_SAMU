const employeModel = require("../models/employeModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// =============================
// GET ALL EMPLOYES
// =============================
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

// =============================
// GET EMPLOYE BY ID
// =============================
const getEmployeById = async (req, res) => {
  try {

    const data = await employeModel.getEmployeById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Employé introuvable"
      });
    }

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// =============================
// CREATE EMPLOYE
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
      id_role,
      groupe_sanguin,
      allergies,
      antecedents_medicaux,
      aptitudes_medicales
    } = req.body;

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // CREATE USER
    const userId = await userModel.createUser(
      email,
      hashedPassword,
      id_role
    );

    // CREATE EMPLOYE
    const employeId = await employeModel.createEmploye(
      {
        nom,
        prenom,
        poste,
        service,
        date_naissance,
        telephone,
        type: "Employe",
        groupe_sanguin,
        allergies,
        antecedents_medicaux,
        aptitudes_medicales
      },
      userId
    );

    res.status(201).json({
      message: "Employé créé avec succès",
      employeId,
      userId
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// =============================
// UPDATE EMPLOYE
// =============================
const updateEmploye = async (req, res) => {
  try {

    const employe = await employeModel.getEmployeById(req.params.id);

    if (!employe) {
      return res.status(404).json({
        message: "Employé introuvable"
      });
    }

    await employeModel.updateEmploye(
      req.params.id,
      req.body
    );

    res.json({
      message: "Employé mis à jour avec succès"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// =============================
// DELETE EMPLOYE
// =============================
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

// =============================
// TOTAL EMPLOYES
// =============================
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

// =============================
// EMPLOYES PAR SERVICE
// =============================
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

// =============================
// EMPLOYES PAR ROLE
// =============================
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

// =============================
// EMPLOYES PAR TYPE
// =============================
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

// =============================
// EMPLOYES PAR GROUPE SANGUIN
// =============================
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

// =============================
// EMPLOYES PAR ALLERGIES
// =============================
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

// =============================
// EMPLOYES PAR ANTECEDENTS
// =============================
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

// =============================
// EMPLOYES PAR APTITUDES
// =============================
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
  getEmployesByAptitudes
};