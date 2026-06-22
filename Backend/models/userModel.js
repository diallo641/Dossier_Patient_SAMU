const db = require("../config/db");


//tous les utilisateurs
exports.getAllUsers = async () => {
  const [rows] = await db.query(`
    SELECT u.id, u.email, r.nom_role, u.created_at, u.updated_at
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
  `);
  return rows;
};

//avoir un utilisateur par son id
exports.getUserById = async (id) => {
  const [rows] = await db.query(`
    SELECT u.id, u.email, r.nom_role, u.created_at, u.updated_at
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
    WHERE u.id = ?
  `, [id]);

  return rows[0];
};


//email
exports.getUserByEmail = async (email) => {
  const [rows] = await db.query(`
    SELECT u.id, u.email, u.mot_de_passe, r.nom_role
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
    WHERE u.email = ?
  `, [email]);

  return rows[0];
};


//verifier l'existence de l'adresse mail
exports.emailExists = async (email) => {
  const [rows] = await db.query(
    "SELECT id FROM utilisateur WHERE email = ?",
    [email]
  );
  return rows.length > 0;
};

//Verifier le mail à l'exception de l'utilisateur actuel
exports.emailExistsExceptUser = async (email, id) => {
  const [rows] = await db.query(
    "SELECT id FROM utilisateur WHERE email = ? AND id != ?",
    [email, id]
  );
  return rows.length > 0;
};


//ajouter un utilisateur
exports.createUser = async (email, password, role) => {
  const [result] = await db.query(
    "INSERT INTO utilisateur (email, mot_de_passe, id_role) VALUES (?, ?, ?)",
    [email, password, role]
  );
  return result.insertId;
};

//modifier un utilisateur
exports.updateUser = async (id, email, role) => {
  await db.query(
    "UPDATE utilisateur SET email = ?, id_role = ? WHERE id = ?",
    [email, role, id]
  );
};


//supprimer un utilisateur
exports.deleteUser = async (id) => {
  await db.query("DELETE FROM utilisateur WHERE id = ?", [id]);
};


// modifier son mot de passe
exports.updatePassword = async (id, password) => {
  await db.query(
    "UPDATE utilisateur SET mot_de_passe = ? WHERE id = ?",
    [password, id]
  );
};


//statistiques
exports.getUserStats = async () => {
  const [total] = await db.query(
    "SELECT COUNT(*) AS total FROM utilisateur"
  );

  const [byRole] = await db.query(`
    SELECT r.nom_role, COUNT(u.id) AS total
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
    GROUP BY r.nom_role
  `);

  return {
    total_users: total[0].total,
    par_role: byRole
  };
};



//token d ereinitialisation
exports.saveResetToken = async (email, token, expires) => {
  await db.query(
    `UPDATE utilisateur 
     SET reset_token = ?, reset_expires = ?
     WHERE email = ?`,
    [token, expires, email]
  );
};


//utilisateur du token
exports.getUserByResetToken = async (token) => {
  const [rows] = await db.query(
    `SELECT * FROM utilisateur 
     WHERE reset_token = ? AND reset_expires > NOW()`,
    [token]
  );
  return rows[0];
};


//effacer le token
exports.clearResetToken = async (id) => {
  await db.query(
    `UPDATE utilisateur 
     SET reset_token = NULL, reset_expires = NULL
     WHERE id = ?`,
    [id]
  );
};