const db = require("../config/db");

// =============================
// 🔎 GET ALL USERS (avec nom du rôle)
// =============================
exports.getAllUsers = async () => {
  const [rows] = await db.query(`
    SELECT 
      u.id,
      u.email,
      r.id AS id_role,
      r.nom_role,
      u.created_at,
      u.updated_at
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
  `);
  return rows;
};

// =============================
// 🔎 GET USER BY ID (avec nom du rôle)
// =============================
exports.getUserById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT 
      u.id,
      u.email,
      r.id AS id_role,
      r.nom_role,
      u.created_at,
      u.updated_at
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
    WHERE u.id = ?
    `,
    [id]
  );
  return rows[0];
};

// =============================
// 🔎 GET USER BY EMAIL (POUR AUTH)
// =============================
exports.getUserByEmail = async (email) => {
  const [rows] = await db.query(
    `
    SELECT 
      u.id,
      u.email,
      u.mot_de_passe,
      r.id AS id_role,
      r.nom_role
    FROM utilisateur u
    JOIN role r ON u.id_role = r.id
    WHERE u.email = ?
    `,
    [email]
  );
  return rows[0];
};

// =============================
// 🔐 VERIFIER SI EMAIL EXISTE
// =============================
exports.emailExists = async (email) => {
  const [rows] = await db.query(
    "SELECT id FROM utilisateur WHERE email = ?",
    [email]
  );
  return rows.length > 0;
};

// =============================
// 🔐 VERIFIER EMAIL (SAUF USER)
// =============================
exports.emailExistsExceptUser = async (email, id) => {
  const [rows] = await db.query(
    "SELECT id FROM utilisateur WHERE email = ? AND id != ?",
    [email, id]
  );
  return rows.length > 0;
};

// =============================
// ➕ CREATE USER
// =============================
exports.createUser = async (email, mot_de_passe, id_role) => {
  const [result] = await db.query(
    `
    INSERT INTO utilisateur (email, mot_de_passe, id_role)
    VALUES (?, ?, ?)
    `,
    [email, mot_de_passe, id_role]
  );
  return result.insertId;
};

// =============================
// ✏️ UPDATE USER
// =============================
exports.updateUser = async (id, email, id_role) => {
  await db.query(
    `
    UPDATE utilisateur 
    SET email = ?, id_role = ?
    WHERE id = ?
    `,
    [email, id_role, id]
  );
};

// =============================
// ❌ DELETE USER
// =============================
exports.deleteUser = async (id) => {
  await db.query(
    `DELETE FROM utilisateur WHERE id = ?`,
    [id]
  );
};