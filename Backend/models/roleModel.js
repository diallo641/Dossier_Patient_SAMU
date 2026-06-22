const db = require("../config/db");

//tous le sroles
exports.getAllRoles = async () => {
  const [rows] = await db.query("SELECT * FROM role");
  return rows;
};

//un seul role
exports.getRoleById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM role WHERE id = ?",
    [id]
  );
  return rows[0];
};

//ajouter un role
exports.createRole = async (nom_role) => {
  const [result] = await db.query(
    "INSERT INTO role (nom_role) VALUES (?)",
    [nom_role]
  );
  return result.insertId;
};

//modifier un role
exports.updateRole = async (id, nom_role) => {
  await db.query(
    "UPDATE role SET nom_role = ? WHERE id = ?",
    [nom_role, id]
  );
};

//supprimer un role 
exports.deleteRole = async (id) => {
  await db.query("DELETE FROM role WHERE id = ?", [id]);
};