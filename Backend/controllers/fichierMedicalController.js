const path = require("path");
const fs = require("fs");

const fichierMedicalModel = require("../models/fichierMedicalModel");

// ==============================
// TYPES AUTORISÉS
// ==============================
const allowedMimeTypes = [
  "application/pdf",

  "image/jpeg",
  "image/jpg",
  "image/png",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// ==============================
// CREATE FILE
// ==============================
const createFichierMedical = async (req, res) => {
  try {
    // Vérification fichier
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    if (!req.file) {
      return res.status(400).json({
        message: "Aucun fichier uploadé",
      });
    }

    // Validation type fichier
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      // Supprimer fichier invalide
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "Type de fichier non autorisé",
      });
    }

    const {
      categorie,
      description,
      uploaded_by,
      id_consultation,
    } = req.body;

    // Données à enregistrer
    const data = {
      nom_fichier: req.file.originalname,

      chemin: req.file.path,

      type_fichier: req.file.mimetype,

      taille_fichier: req.file.size,

      categorie,

      description,

      extension: path.extname(req.file.originalname),

      uploaded_by,

      id_consultation,
    };

    const result = await fichierMedicalModel.createFichierMedical(
      data
    );

    res.status(201).json({
      message: "Fichier médical uploadé avec succès",
      data: result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// ==============================
// GET ALL FILES
// ==============================
const getAllFichiersMedicaux = async (req, res) => {
  try {
    const fichiers =
      await fichierMedicalModel.getAllFichiersMedicaux();

    if (!fichiers.length) {
      return res.status(404).json({
        message: "Aucun fichier trouvé",
      });
    }

    res.status(200).json({
      data: fichiers,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// ==============================
// GET FILE BY ID
// ==============================
const getFichierMedicalById = async (req, res) => {
  try {
    const { id } = req.params;

    const fichier =
      await fichierMedicalModel.getFichierMedicalById(id);

    if (!fichier) {
      return res.status(404).json({
        message: "Fichier introuvable",
      });
    }

    res.status(200).json({
      data: fichier,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// ==============================
// GET FILES BY CONSULTATION
// ==============================
const getFichiersByConsultation = async (req, res) => {
  try {
    const { id_consultation } = req.params;

    const fichiers =
      await fichierMedicalModel.getFichiersByConsultation(
        id_consultation
      );

    res.status(200).json({
      data: fichiers,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE FILE
// ==============================
const updateFichierMedical = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nom_fichier,
      chemin,
      type_fichier,
      taille_fichier,
      categorie,
      description,
      extension,
    } = req.body;

    const data = {
      nom_fichier,
      chemin,
      type_fichier,
      taille_fichier,
      categorie,
      description,
      extension,
    };

    const result =
      await fichierMedicalModel.updateFichierMedical(
        id,
        data
      );

    res.status(200).json({
      message: "Fichier mis à jour avec succès",
      data: result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// ==============================
// DELETE FILE
// ==============================
const deleteFichierMedical = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer fichier
    const fichier =
      await fichierMedicalModel.getFichierMedicalById(id);

    if (!fichier) {
      return res.status(404).json({
        message: "Fichier introuvable",
      });
    }

    // Supprimer fichier physique
    if (fs.existsSync(fichier.chemin)) {
      fs.unlinkSync(fichier.chemin);
    }

    // Supprimer DB
    await fichierMedicalModel.deleteFichierMedical(id);

    res.status(200).json({
      message: "Fichier supprimé avec succès",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

module.exports = {
  createFichierMedical,
  getAllFichiersMedicaux,
  getFichierMedicalById,
  getFichiersByConsultation,
  updateFichierMedical,
  deleteFichierMedical,
};