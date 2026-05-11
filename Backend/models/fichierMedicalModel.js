const db = require("../config/db");

// ==============================
// CREATE FILE
// ==============================
const createFichierMedical = async (data) => {
  const sql = `
    INSERT INTO fichier_medical (
      nom_fichier,
      chemin,
      type_fichier,
      taille_fichier,
      categorie,
      description,
      extension,
      uploaded_by,
      id_consultation
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.nom_fichier,
    data.chemin,
    data.type_fichier,
    data.taille_fichier,
    data.categorie,
    data.description,
    data.extension,
    data.uploaded_by,
    data.id_consultation,
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// ==============================
// GET ALL FILES
// ==============================
const getAllFichiersMedicaux = async () => {
  const sql = `
    SELECT 
      fm.*,
      u.nom AS uploaded_by_nom
    FROM fichier_medical fm
    LEFT JOIN utilisateur u 
      ON fm.uploaded_by = u.id
    ORDER BY fm.date_upload DESC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

// ==============================
// GET FILE BY ID
// ==============================
const getFichierMedicalById = async (id) => {
  const sql = `
    SELECT 
      fm.*,
      u.nom AS uploaded_by_nom
    FROM fichier_medical fm
    LEFT JOIN utilisateur u 
      ON fm.uploaded_by = u.id
    WHERE fm.id = ?
  `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

// ==============================
// GET FILES BY CONSULTATION
// ==============================
const getFichiersByConsultation = async (id_consultation) => {
  const sql = `
    SELECT *
    FROM fichier_medical
    WHERE id_consultation = ?
    ORDER BY date_upload DESC
  `;

  const [rows] = await db.query(sql, [id_consultation]);

  return rows;
};

// ==============================
// UPDATE FILE
// ==============================
const updateFichierMedical = async (id, data) => {
  const sql = `
    UPDATE fichier_medical
    SET
      nom_fichier = ?,
      chemin = ?,
      type_fichier = ?,
      taille_fichier = ?,
      categorie = ?,
      description = ?,
      extension = ?
    WHERE id = ?
  `;

  const values = [
    data.nom_fichier,
    data.chemin,
    data.type_fichier,
    data.taille_fichier,
    data.categorie,
    data.description,
    data.extension,
    id,
  ];

  const [result] = await db.query(sql, values);

  return result;
};

// ==============================
// DELETE FILE
// ==============================
const deleteFichierMedical = async (id) => {
  const sql = `
    DELETE FROM fichier_medical
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [id]);

  return result;
};

module.exports = {
  createFichierMedical,
  getAllFichiersMedicaux,
  getFichierMedicalById,
  getFichiersByConsultation,
  updateFichierMedical,
  deleteFichierMedical,
};