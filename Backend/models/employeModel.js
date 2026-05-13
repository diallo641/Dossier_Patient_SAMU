const db = require("../config/db");

// =============================
// GET ALL EMPLOYES
// =============================
exports.getAllEmployes = async () => {

  const [rows] = await db.query(`
    SELECT 
      e.id,
      e.nom,
      e.prenom,
      e.poste,
      e.service,
      e.date_naissance,
      e.telephone,
      e.type,
      e.groupe_sanguin,
      e.allergies,
      e.antecedents_medicaux,
      e.aptitudes_medicales,
      u.id AS user_id,
      u.email,
      u.id_role,
      e.created_at,
      e.updated_at
    FROM employe e
    JOIN utilisateur u 
      ON e.id_utilisateur = u.id
    ORDER BY e.id DESC
  `);

  return rows;
};

// =============================
// GET EMPLOYE BY ID
// =============================
exports.getEmployeById = async (id) => {

  const [rows] = await db.query(`
    SELECT 
      e.*,
      u.id AS user_id,
      u.email,
      u.id_role
    FROM employe e
    JOIN utilisateur u 
      ON e.id_utilisateur = u.id
    WHERE e.id = ?
  `, [id]);

  return rows[0];
};

// =============================
// CREATE EMPLOYE
// =============================
exports.createEmploye = async (data, id_utilisateur) => {

  const [result] = await db.query(`
    INSERT INTO employe (
      nom,
      prenom,
      poste,
      service,
      date_naissance,
      telephone,
      type,
      id_utilisateur,
      groupe_sanguin,
      allergies,
      antecedents_medicaux,
      aptitudes_medicales
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    data.nom,
    data.prenom,
    data.poste,
    data.service,
    data.date_naissance,
    data.telephone,
    data.type || "Employe",
    id_utilisateur,
    data.groupe_sanguin,
    data.allergies,
    data.antecedents_medicaux,
    data.aptitudes_medicales
  ]);

  return result.insertId;
};

// =============================
// UPDATE EMPLOYE
// =============================
exports.updateEmploye = async (id, data) => {

  await db.query(`
    UPDATE employe
    SET 
      nom = ?,
      prenom = ?,
      poste = ?,
      service = ?,
      date_naissance = ?,
      telephone = ?,
      type = ?,
      groupe_sanguin = ?,
      allergies = ?,
      antecedents_medicaux = ?,
      aptitudes_medicales = ?
    WHERE id = ?
  `, [
    data.nom,
    data.prenom,
    data.poste,
    data.service,
    data.date_naissance,
    data.telephone,
    data.type,
    data.groupe_sanguin,
    data.allergies,
    data.antecedents_medicaux,
    data.aptitudes_medicales,
    id
  ]);
};

// =============================
// DELETE EMPLOYE
// =============================
exports.deleteEmploye = async (id) => {

  await db.query(`
    DELETE FROM employe
    WHERE id = ?
  `, [id]);
};

// =============================
// TOTAL EMPLOYES
// =============================
exports.getTotalEmployes = async () => {

  const [rows] = await db.query(`
    SELECT COUNT(*) AS total
    FROM employe
  `);

  return rows[0];
};

// =============================
// EMPLOYES PAR SERVICE
// =============================
exports.getEmployesByService = async () => {

  const [rows] = await db.query(`
    SELECT 
      service,
      COUNT(*) AS total
    FROM employe
    GROUP BY service
  `);

  return rows;
};

// =============================
// EMPLOYES PAR ROLE
// =============================
exports.getEmployesByRole = async () => {

  const [rows] = await db.query(`
    SELECT 
      u.id_role,
      COUNT(e.id) AS total
    FROM employe e
    JOIN utilisateur u
      ON e.id_utilisateur = u.id
    GROUP BY u.id_role
  `);

  return rows;
};

// =============================
// EMPLOYES PAR TYPE
// =============================
exports.getEmployesByType = async () => {

  const [rows] = await db.query(`
    SELECT 
      type,
      COUNT(*) AS total
    FROM employe
    GROUP BY type
  `);

  return rows;
};

// =============================
// EMPLOYES PAR GROUPE SANGUIN
// =============================
exports.getEmployesByBloodGroup = async () => {

  const [rows] = await db.query(`
    SELECT 
      groupe_sanguin,
      COUNT(*) AS total
    FROM employe
    WHERE groupe_sanguin IS NOT NULL
    AND groupe_sanguin != ''
    GROUP BY groupe_sanguin
  `);

  return rows;
};

// =============================
// EMPLOYES PAR ALLERGIES
// =============================
exports.getEmployesByAllergies = async () => {

  const [rows] = await db.query(`
    SELECT 
      allergies,
      COUNT(*) AS total
    FROM employe
    WHERE allergies IS NOT NULL
    AND allergies != ''
    GROUP BY allergies
  `);

  return rows;
};

// =============================
// EMPLOYES PAR ANTECEDENTS
// =============================
exports.getEmployesByAntecedents = async () => {

  const [rows] = await db.query(`
    SELECT 
      antecedents_medicaux,
      COUNT(*) AS total
    FROM employe
    WHERE antecedents_medicaux IS NOT NULL
    AND antecedents_medicaux != ''
    GROUP BY antecedents_medicaux
  `);

  return rows;
};

// =============================
// EMPLOYES PAR APTITUDES
// =============================
exports.getEmployesByAptitudes = async () => {

  const [rows] = await db.query(`
    SELECT 
      aptitudes_medicales,
      COUNT(*) AS total
    FROM employe
    WHERE aptitudes_medicales IS NOT NULL
    AND aptitudes_medicales != ''
    GROUP BY aptitudes_medicales
  `);

  return rows;
};