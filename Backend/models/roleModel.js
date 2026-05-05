const db = require("../config/db");

//GET ALL
exports.getAllRoles = async () => {
  const [rows] = await db.query("SELECT * FROM role");
  return rows;
};

//GET BY ID
exports.getRoleById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM role WHERE id = ?",
    [id]
  );
  return rows[0];
};

//CREATE
exports.createRole = async (nom_role) => {
  const [result] = await db.query(
    "INSERT INTO role (nom_role) VALUES (?)",
    [nom_role]
  );
  return result.insertId;
};

//UPDATE
exports.updateRole = async (id, nom_role) => {
  await db.query(
    "UPDATE role SET nom_role = ? WHERE id = ?",
    [nom_role, id]
  );
};

//DELETE
exports.deleteRole = async (id) => {
  await db.query("DELETE FROM role WHERE id = ?", [id]);
};