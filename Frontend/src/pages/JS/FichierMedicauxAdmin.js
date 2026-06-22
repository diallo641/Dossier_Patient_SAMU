import axios from "axios";

const API = "http://localhost:3000/api/fichiers";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// GET ALL FILES
export const getFichiersMedicaux = async () => {
  return await axios.get(API, getConfig());
};

// DELETE FILE
export const deleteFichierMedical = async (id) => {
  return await axios.delete(`${API}/${id}`, getConfig());
};