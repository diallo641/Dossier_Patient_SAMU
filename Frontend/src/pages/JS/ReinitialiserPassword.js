import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

/**
 * Demander un email de réinitialisation
 */
export const envoyerEmailReset = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/forgot-password`,
      { email }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Erreur lors de l'envoi de l'email",
    };
  }
};

/**
 * Réinitialiser le mot de passe
 */
export const reinitialiserMotDePasse = async (
  token,
  newPassword
) => {
  try {
    const response = await axios.post(
      `${API_URL}/reset-password`,
      {
        token,
        newPassword,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Erreur lors de la réinitialisation",
    };
  }
};