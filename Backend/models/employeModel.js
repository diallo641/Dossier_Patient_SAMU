const db = require("../config/db");


// tous les employes
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


// un seul employe
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


// ajouter un employe
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
    data.nom || null,
    data.prenom || null,
    data.poste || null,
    data.service || null,
    data.date_naissance || null,
    data.telephone || null,
    data.type || "Employe",
    id_utilisateur || null,
    data.groupe_sanguin || null,
    data.allergies || null,
    data.antecedents_medicaux || null,
    data.aptitudes_medicales || null
  ]);

  return result.insertId;
};


// modifier les informations d'un employe
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


// modifier le profil d'un employe
exports.updateMonProfilEmploye = async (id, data) => {
  await db.query(`
    UPDATE employe
    SET 
      nom = ?,
      prenom = ?,
      date_naissance = ?,
      telephone = ?,
      poste = ?,
      service = ?
    WHERE id = ?
  `, [
    data.nom,
    data.prenom,
    data.date_naissance,
    data.telephone,
    data.poste,
    data.service,
    id
  ]);
};


// supprimer un employe
exports.deleteEmploye = async (id) => {

  await db.query(`
    DELETE FROM employe
    WHERE id = ?
  `, [id]);
};


// le nombre total des employes
exports.getTotalEmployes = async () => {

  const [rows] = await db.query(`
    SELECT COUNT(*) AS total
    FROM employe
  `);

  return rows[0];
};


// le nombre d'employe par service
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


// employes par role
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


// employes par type
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


// employes par groupe sanguin
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


// employes par allergies
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


// employes par antecedents
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


// employes par aptitudes
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


// profil d'un employe par son id
exports.getProfilEmployeByUserId = async (id_utilisateur) => {
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
      e.created_at,
      e.updated_at,
      u.id AS user_id,
      u.email,
      u.mot_de_passe,
      u.id_role
    FROM employe e
    INNER JOIN utilisateur u 
      ON e.id_utilisateur = u.id
    WHERE e.id_utilisateur = ?
  `, [id_utilisateur]);

  

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0];
};