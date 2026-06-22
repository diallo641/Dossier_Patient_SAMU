const db = require("../config/db");


// ajouter un nouveau fichier
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


// tous les fichiers
const getAllFichiersMedicaux = async () => {
  const sql = `
    SELECT 
      fm.*,
      e.nom AS uploaded_by_nom,
      e.prenom AS uploaded_by_prenom
    FROM fichier_medical fm
    LEFT JOIN employe e 
      ON fm.uploaded_by = e.id
    ORDER BY fm.date_upload DESC
  `;

  const [rows] = await db.query(sql);
  return rows;
};


// un seul fichier
const getFichierMedicalById = async (id) => {
  const sql = `
    SELECT
      fm.*,
      e.nom AS uploaded_by_nom,
      e.prenom AS uploaded_by_prenom
    FROM fichier_medical fm
    LEFT JOIN employe e
      ON fm.uploaded_by = e.id
    WHERE fm.id = ?
  `;

  const [rows] = await db.query(sql, [id]);
  return rows[0];
};


// les fichiers d'une consultation
const getFichiersByConsultation = async (id_consultation) => {
  const sql = `
    SELECT 
      fm.*,
      e.nom AS uploaded_by_nom,
      e.prenom AS uploaded_by_prenom
    FROM fichier_medical fm
    LEFT JOIN employe e 
      ON fm.uploaded_by = e.id
    WHERE fm.id_consultation = ?
    ORDER BY fm.date_upload DESC
  `;

  const [rows] = await db.query(sql, [id_consultation]);
  return rows;
};


//modifier le fichier (pas trop important)
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


// supprimer un fichier
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