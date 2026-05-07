const consultationModel = require("../models/consultationModel");

// =============================
// CREATE CONSULTATION
// =============================
const createConsultation = async (req, res) => {
  try {
    const id = await consultationModel.createConsultation(req.body);

    res.status(201).json({
      message: "Consultation créée",
      id
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur création consultation",
      error: error.message
    });
  }
};

// =============================
// GET ALL
// =============================
const getAllConsultations = async (req, res) => {
  try {
    const data = await consultationModel.getAllConsultations();

    res.json({
      message: "Liste des consultations",
      total: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération consultations",
      error: error.message
    });
  }
};

// =============================
// GET BY ID
// =============================
const getConsultationById = async (req, res) => {
  try {
    const data = await consultationModel.getConsultationById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Consultation introuvable"
      });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération consultation",
      error: error.message
    });
  }
};

// =============================
// GET BY EMPLOYE
// =============================
const getByEmploye = async (req, res) => {
  try {
    const data = await consultationModel.getConsultationsByEmploye(req.params.id);

    res.json({
      message: "Consultations de l'employé",
      total: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur",
      error: error.message
    });
  }
};

// =============================
// UPDATE
// =============================
const updateConsultation = async (req, res) => {
  try {
    await consultationModel.updateConsultation(req.params.id, req.body);

    res.json({
      message: "Consultation mise à jour"
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur update",
      error: error.message
    });
  }
};

// =============================
// DELETE
// =============================
const deleteConsultation = async (req, res) => {
  try {
    await consultationModel.deleteConsultation(req.params.id);

    res.json({
      message: "Consultation supprimée"
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur suppression",
      error: error.message
    });
  }
};



// =============================
// TOTAL CONSULTATIONS
// =============================
const getTotalConsultations = async (req, res) => {
  try {
    const stats = await consultationModel.getTotalConsultations();

    res.json({
      message: "Total consultations",
      data: stats
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur statistiques",
      error: error.message
    });
  }
};

// =============================
// CONSULTATIONS DU MEDECIN
// =============================
const getConsultationsByMedecin = async (req, res) => {
  try {
    const id_medecin = req.params.id; // ✅ FIX ICI

    const consultations =
      await consultationModel.getConsultationsByMedecin(id_medecin);

    res.json({
      message: "Consultations du médecin",
      total: consultations.length,
      data: consultations
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur consultations médecin",
      error: error.message
    });
  }
};

// =============================
// PATIENTS DU MEDECIN
// =============================
const getPatientsByMedecin = async (req, res) => {
  try {
    const id_medecin = req.params.id; // ✅ FIX ICI

    const data =
      await consultationModel.getPatientsByMedecin(id_medecin);

    res.json({
      message: "Patients consultés",
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur patients",
      error: error.message
    });
  }
};

// =============================
// CONSULTATIONS PAR MOTIF
// =============================
const getConsultationsByMotif = async (req, res) => {
  try {
    const id_medecin = req.params.id; // ✅ FIX ICI

    const data =
      await consultationModel.getConsultationsByMotif(id_medecin);

    res.json({
      message: "Consultations par motif",
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur statistiques motifs",
      error: error.message
    });
  }
};

// =============================
// CONSULTATIONS PAR DATE
// =============================
const getConsultationsByDate = async (req, res) => {
  try {
    const id_medecin = req.params.id; // ✅ FIX ICI

    const data =
      await consultationModel.getConsultationsByDate(id_medecin);

    res.json({
      message: "Consultations par date",
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur statistiques dates",
      error: error.message
    });
  }
};




module.exports = {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  getByEmploye,
  updateConsultation,
  deleteConsultation,
  getTotalConsultations,
  getConsultationsByMedecin,
  getPatientsByMedecin,
  getConsultationsByMotif,
  getConsultationsByDate
};