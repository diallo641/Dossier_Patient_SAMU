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
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Aucun fichier uploadé",
      });
    }

    const {
      categorie,
      description,
      id_consultation,
    } = req.body;

    const uploadedFiles = [];

    for (const file of req.files) {

      // validation type
      if (!allowedMimeTypes.includes(file.mimetype)) {
        fs.unlinkSync(file.path);
        continue;
      }

      const data = {
        nom_fichier: file.originalname,
        chemin: file.path,
        type_fichier: file.mimetype,
        taille_fichier: file.size,
        categorie,
        description,
        extension: path.extname(file.originalname),
        uploaded_by: req.user.id,
        id_consultation,
      };

      const result =
        await fichierMedicalModel.createFichierMedical(data);

      uploadedFiles.push(result);
    }
     console.log("req.files =", req.files);
     console.log("length =", req.files?.length);
     console.log("BODY =", req.body);

    res.status(201).json({
      message: "Fichiers uploadés avec succès",
      data: uploadedFiles,
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