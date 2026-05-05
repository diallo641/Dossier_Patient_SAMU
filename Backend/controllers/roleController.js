const roleModel = require("../models/roleModel");


//TOUS LES ROLES
const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.getAllRoles();
    if(roles.length === 0) {
      return res.status(404).json({ message: "Aucun rôle trouvé" });
    }
    else
    {
      return res.status(200).json({ message: "Rôles récupérés avec succès", 
                                    roles: roles,
                                    taille: roles.length });
    }


  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération rôles",
      error: error.message,
    });
  }
};


//ROLE PAR ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await roleModel.getRoleById(id);

    if (!role) {
      return res.status(404).json({ message: "Rôle introuvable" });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération rôle",
      error: error.message,
    });
  }
};

//AJOUT ROLE
const createRole = async (req, res) => {
  try {
    const { nom_role } = req.body;

    const id = await roleModel.createRole(nom_role);

    res.status(201).json({
      message: "Rôle créé",
      id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur création rôle",
      error: error.message,
    });
  }
};


//MODIFIER ROLE
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_role } = req.body;

    await roleModel.updateRole(id, nom_role);

    res.json({ message: "Rôle modifié" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur modification rôle",
      error: error.message,
    });
  }
};


//SUPPRIMER ROLE
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await roleModel.deleteRole(id);

    res.json({ message: "Rôle supprimé" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur suppression rôle",
      error: error.message,
    });
  }
};

// EXPORT
module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};