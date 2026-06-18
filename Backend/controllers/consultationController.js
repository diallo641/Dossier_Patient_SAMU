const consultationModel = require("../models/consultationModel");

// =============================
// CREATE CONSULTATION
// =============================
const createConsultation = async (req, res) => {
  try {
    const id = await consultationModel.createConsultation(req.body);

    res.status(201).json({
      message: "Consultation créée",
      id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur création consultation",
      error: error.message,
    });
  }
};

// =============================
// GET ALL CONSULTATIONS
// =============================
const getAllConsultations = async (req, res) => {
  try {
    const data = await consultationModel.getAllConsultations();

    res.json({
      message: "Liste des consultations",
      total: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération consultations",
      error: error.message,
    });
  }
};

// =============================
// GET CONSULTATION BY ID
// =============================
const getConsultationById = async (req, res) => {
  try {
    const data = await consultationModel.getConsultationById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Consultation introuvable",
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération consultation",
      error: error.message,
    });
  }
};

// =============================
// GET CONSULTATIONS BY EMPLOYE
// =============================
const getByEmploye = async (req, res) => {
  try {
    const data = await consultationModel.getConsultationsByEmploye(
      req.params.id
    );

    res.json({
      message: "Consultations de l'employé",
      total: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur",
      error: error.message,
    });
  }
};

// =============================
// UPDATE CONSULTATION (MEDECIN)
// =============================
const updateConsultation = async (req, res) => {
  try {
    await consultationModel.updateConsultation(req.params.id, req.body);

    res.json({
      message: "Consultation mise à jour",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur update",
      error: error.message,
    });
  }
};

// =============================
// UPDATE CONSULTATION ADMIN
// =============================
const updateConsultationAdmin = async (req, res) => {
  try {
    await consultationModel.updateConsultationAdmin(
      req.params.id,
      req.body
    );

    res.json({
      message: "Consultation modifiée par admin",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur update admin",
      error: error.message,
    });
  }
};

// =============================
// DELETE CONSULTATION
// =============================
const deleteConsultation = async (req, res) => {
  try {
    await consultationModel.deleteConsultation(req.params.id);

    res.json({
      message: "Consultation supprimée",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur suppression",
      error: error.message,
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
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur statistiques",
      error: error.message,
    });
  }
};

// =============================
// CONSULTATIONS DU MEDECIN (IMPORTANT)
// =============================
const getConsultationsByMedecin = async (req, res) => {
  try {
    // 🔥 IMPORTANT: vient du token (pas params)
    const id_medecin = req.user.id;

    const consultations =
      await consultationModel.getConsultationsByMedecin(id_medecin);

    res.json({
      message: "Consultations du médecin",
      total: consultations.length,
      data: consultations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur consultations médecin",
      error: error.message,
    });
  }
};

// =============================
// PATIENTS DU MEDECIN
// =============================
const getPatientsByMedecin = async (req, res) => {
  try {
    console.log("USER =", req.user);
    console.log("ID =", req.user?.id);

    const data = await consultationModel.getPatientsByMedecin(req.user.id);

    res.json({ data });
    console.log("🔥 DATA:", data); // IMPORTANT

  } catch (error) {
  console.log("🔥 FULL ERROR:", error); // IMPORTANT

  return res.status(500).json({
    message: "Erreur",
    error: error.message,
    stack: error.stack
  });
}
};

// =============================
// CONSULTATIONS PAR MOTIF
// =============================
const getConsultationsByMotif = async (req, res) => {
  try {
    const id_medecin = req.user.id;

    const data = await consultationModel.getConsultationsByMotif(id_medecin);

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// CONSULTATIONS PAR DATE
// =============================
const getConsultationsByDate = async (req, res) => {
  try {
    const id_medecin = req.user.id;

    const data = await consultationModel.getConsultationsByDate(id_medecin);

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getConsultationsToday = async (req, res) => {
  try {
    const id_medecin = req.user.id;

    const data = await consultationModel.getConsultationsToday(id_medecin);

    res.json({
      total: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur stats today",
      error: error.message,
    });
  }
};
const getConsultationsWeek = async (req, res) => {
  try {
    const id_medecin = req.user.id;

    const data = await consultationModel.getConsultationsWeek(id_medecin);

    res.json({
      total: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur stats week",
      error: error.message,
    });
  }
};
const getConsultationsMonth = async (req, res) => {
  try {
    const id_medecin = req.user.id;

    const data = await consultationModel.getConsultationsMonth(id_medecin);

    res.json({
      total: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur stats month",
      error: error.message,
    });
  }
};

const getTotalPatientsByMedecin = async (req, res) => {
  try {
    const id_medecin = req.user.id;

    const data = await consultationModel.getTotalPatientsByMedecin(id_medecin);

    res.json({
      total: data.total
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur total patients",
      error: error.message
    });
  }
};

// =============================
// EXPORT
// =============================
module.exports = {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  getByEmploye,
  updateConsultation,
  updateConsultationAdmin,
  deleteConsultation,
  getTotalConsultations,
  getConsultationsByMedecin,
  getPatientsByMedecin,
  getConsultationsByMotif,
  getConsultationsByDate,
  getConsultationsToday,
  getConsultationsWeek,
  getConsultationsMonth,
  getTotalPatientsByMedecin
};