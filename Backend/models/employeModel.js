const db = require("../config/db");

// =============================
// GET ALL EMPLOYES (JOIN USER)
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
      u.id AS user_id,
      u.email,
      u.id_role,
      e.created_at,
      e.updated_at
    FROM employe e
    JOIN utilisateur u ON e.id_utilisateur = u.id
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
JOIN utilisateur u ON e.id_utilisateur = u.id
WHERE e.id = ?
  `, [id]);

  return rows[0];
};

// =============================
// CREATE EMPLOYE
// =============================
exports.createEmploye = async (data, id_utilisateur) => {
  const [result] = await db.query(`
    INSERT INTO employe
    (nom, prenom, poste, service, date_naissance, telephone, type, id_utilisateur)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    data.nom,
    data.prenom,
    data.poste,
    data.service,
    data.date_naissance,
    data.telephone,
    data.type || "Employe",
    id_utilisateur
  ]);

  return result.insertId;
};

// =============================
// UPDATE EMPLOYE
// =============================
exports.updateEmploye = async (id, data) => {
  await db.query(`
    UPDATE employe
    SET nom = ?, prenom = ?, poste = ?, service = ?, date_naissance = ?, telephone = ?
    WHERE id = ?
  `, [
    data.nom,
    data.prenom,
    data.poste,
    data.service,
    data.date_naissance,
    data.telephone,
    id
  ]);
};

// =============================
// DELETE EMPLOYE
// =============================
exports.deleteEmploye = async (id) => {
  await db.query(`DELETE FROM employe WHERE id = ?`, [id]);
};

exports.getEmployeStats = async () => {
  const [total] = await db.query(
    "SELECT COUNT(*) AS total FROM employe"
  );

  const [byService] = await db.query(`
    SELECT service, COUNT(*) AS total
    FROM employe
    GROUP BY service
  `);

  const [byRole] = await db.query(`
    SELECT u.id_role, COUNT(e.id) AS total
    FROM employe e
    JOIN utilisateur u ON e.id_utilisateur = u.id
    GROUP BY u.id_role
  `);

  return {
    total_employes: total[0].total,
    par_service: byService,
    par_role: byRole
  };
};