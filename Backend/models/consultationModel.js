const db = require("../config/db");


// creer une consultation
exports.createConsultation = async (data) => {
  const {
    date_consultation,
    motif,
    diagnostic,
    traitement,
    observation,
    id_employe,
    id_medecin
  } = data;

  const [result] = await db.query(
    `INSERT INTO consultation 
    (date_consultation, motif, diagnostic, traitement, observation, id_employe, id_medecin)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      date_consultation,
      motif,
      diagnostic,
      traitement,
      observation,
      id_employe,
      id_medecin
    ]
  );

  return result.insertId;
};


// avoir toutes les consultations
exports.getAllConsultations = async () => {
  const [rows] = await db.query(`
    SELECT c.*, 
           e.nom AS employe_nom, e.prenom AS employe_prenom,
           m.nom AS medecin_nom, m.prenom AS medecin_prenom
    FROM consultation c
    LEFT JOIN employe e ON c.id_employe = e.id
    LEFT JOIN employe m ON c.id_medecin = m.id
    ORDER BY c.created_at ASC
  `);

  return rows;
};


// avoir un seule consultation par son id
exports.getConsultationById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT
      c.*,
      m.nom AS medecin_nom,
      m.prenom AS medecin_prenom
    FROM consultation c
    LEFT JOIN employe m
      ON c.id_medecin = m.id
    WHERE c.id = ?
    `,
    [id]
  );

  return rows[0];
};


// avoir les consultations par employe
exports.getConsultationsByEmploye = async (id_employe) => {
  const [rows] = await db.query(
    `
    SELECT
      c.*,
      m.nom AS medecin_nom,
      m.prenom AS medecin_prenom
    FROM consultation c
    LEFT JOIN employe m
      ON c.id_medecin = m.id
    WHERE c.id_employe = ?
    ORDER BY c.date_consultation DESC
    `,
    [id_employe]
  );

  return rows;
};


// modifier une consultation en general
exports.updateConsultation = async (id, data) => {
  const {
    motif,
    diagnostic,
    traitement,
    observation
  } = data;

  await db.query(
    `UPDATE consultation 
     SET motif = ?, diagnostic = ?, traitement = ?, observation = ?
     WHERE id = ?`,
    [motif, diagnostic, traitement, observation, id]
  );
};

// modifier une consultation par l'admin (date et motif)
exports.updateConsultationAdmin = async (id, data) => {
  const { date_consultation, motif } = data;

  await db.query(
    `UPDATE consultation 
     SET date_consultation = ?, motif = ?
     WHERE id = ?`,
    [date_consultation, motif, id]
  );
};


//supprimer une consultation
exports.deleteConsultation = async (id) => {
  await db.query(
    `DELETE FROM consultation WHERE id = ?`,
    [id]
  );
};


// total des consultations
exports.getTotalConsultations = async () => {
  const [rows] = await db.query(`
    SELECT COUNT(*) AS total
    FROM consultation 
  `);

  return rows[0];
};


// avoir les patients uniques du medecin
exports.getPatientsByMedecin = async (id_medecin) => {
  const [rows] = await db.query(`
    SELECT DISTINCT 
      e.id,
      e.nom,
      e.prenom,
      e.poste,
      e.service,
      e.telephone,
      e.type
    FROM consultation c
    JOIN employe e ON e.id = c.id_employe
    WHERE c.id_medecin = ?
  `, [id_medecin]);

  return rows;
};


// consultations d'un medecin avec les details de l'employe
exports.getConsultationsByMedecin = async (id_medecin) => {
  const [rows] = await db.query(`
    SELECT 
      c.id,
      c.date_consultation,
      c.motif,
      c.diagnostic,
      c.traitement,
      c.observation,
      e.nom AS employe_nom,
      e.prenom AS employe_prenom
    FROM consultation c
    INNER JOIN employe e ON c.id_employe = e.id
    WHERE c.id_medecin = ?
    ORDER BY c.date_consultation DESC
  `, [id_medecin]);

  return rows;
};



// consultations par motif
exports.getConsultationsByMotif = async (id_medecin) => {
  const [rows] = await db.query(`
    SELECT 
      c.motif,
      COUNT(*) AS total
    FROM consultation c
    WHERE c.id_medecin = ?
    GROUP BY c.motif
    ORDER BY total DESC
  `, [id_medecin]);

  return rows;
};


// consultations par date
exports.getConsultationsByDate = async (id_medecin) => {
  const [rows] = await db.query(`
    SELECT 
      c.date_consultation,
      COUNT(*) AS total
    FROM consultation c
    WHERE c.id_medecin = ?
    GROUP BY c.date_consultation
    ORDER BY c.date_consultation DESC
  `, [id_medecin]);

  return rows;
};


// total patients uniques du medecins
exports.getTotalPatientsByMedecin = async (id_medecin) => {
  const [rows] = await db.query(`
    SELECT COUNT(DISTINCT id_employe) AS total
    FROM consultation
    WHERE id_medecin = ?
  `, [id_medecin]);

  return rows[0];
};

//avoir le nombre de ocnsultationn en journée
exports.getConsultationsToday = async (id_medecin) => {
  const [rows] = await db.query(`
    SELECT *
FROM consultation
WHERE id_medecin = ?
AND DATE(date_consultation) = DATE(NOW())
  `, [id_medecin]);

  return rows;
};

//avoir le nombre de consultation dans la semaine
exports.getConsultationsWeek = async (id_medecin) => {
  const [rows] = await db.query(`
    SELECT *
FROM consultation
WHERE id_medecin = ?
AND DATE(date_consultation) >= DATE_SUB(DATE(NOW()), INTERVAL 7 DAY)
  `, [id_medecin]);

  return rows;
};

//avoir le nombre de consultation dans le mois
exports.getConsultationsMonth = async (id_medecin) => {
  const [rows] = await db.query(`
    SELECT *
FROM consultation
WHERE id_medecin = ?
AND DATE(date_consultation) >= DATE_SUB(DATE(NOW()), INTERVAL 1 MONTH)
  `, [id_medecin]);

  return rows;
};