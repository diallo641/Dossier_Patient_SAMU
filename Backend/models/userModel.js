const db = require("../config/db");

// =============================
// USERS
// =============================
exports.getAllUsers = async () => {
  const [rows] = await db.query(`
    SELECT u.id, u.email, r.nom_role, u.created_at, u.updated_at
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
  `);
  return rows;
};

exports.getUserById = async (id) => {
  const [rows] = await db.query(`
    SELECT u.id, u.email, r.nom_role, u.created_at, u.updated_at
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
    WHERE u.id = ?
  `, [id]);

  return rows[0];
};

// =============================
// AUTH
// =============================
exports.getUserByEmail = async (email) => {
  const [rows] = await db.query(`
    SELECT u.id, u.email, u.mot_de_passe, r.nom_role
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
    WHERE u.email = ?
  `, [email]);

  return rows[0];
};

// =============================
// CHECK EMAIL
// =============================
exports.emailExists = async (email) => {
  const [rows] = await db.query(
    "SELECT id FROM utilisateur WHERE email = ?",
    [email]
  );
  return rows.length > 0;
};

exports.emailExistsExceptUser = async (email, id) => {
  const [rows] = await db.query(
    "SELECT id FROM utilisateur WHERE email = ? AND id != ?",
    [email, id]
  );
  return rows.length > 0;
};

// =============================
// CREATE / UPDATE / DELETE
// =============================
exports.createUser = async (email, password, role) => {
  const [result] = await db.query(
    "INSERT INTO utilisateur (email, mot_de_passe, id_role) VALUES (?, ?, ?)",
    [email, password, role]
  );
  return result.insertId;
};

exports.updateUser = async (id, email, role) => {
  await db.query(
    "UPDATE utilisateur SET email = ?, id_role = ? WHERE id = ?",
    [email, role, id]
  );
};

exports.deleteUser = async (id) => {
  await db.query("DELETE FROM utilisateur WHERE id = ?", [id]);
};

// =============================
// PASSWORD
// =============================
exports.updatePassword = async (id, password) => {
  await db.query(
    "UPDATE utilisateur SET mot_de_passe = ? WHERE id = ?",
    [password, id]
  );
};

// =============================
// STATS
// =============================
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