import axios from "axios";

const API_URL = "http://localhost:3000/api/employes";

export const creerUtilisateur = async (data, token) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    throw error.response?.data || {
      message: "Erreur lors de la création de l'utilisateur",
    };
  }
};