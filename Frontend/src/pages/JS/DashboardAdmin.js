const API = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// =============================
// FETCH GENERIQUE
// =============================
const fetchWithAuth = async (url) => {
  const res = await fetch(API + url, {
    method: "GET",
    headers: headers(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
};

// =============================
// USERS
// =============================
export const getAllUsers = () => fetchWithAuth("/users");

// ⚠️ CORRECTION ICI (route backend = /stats/overview)
export const getUserStats = () =>
  fetchWithAuth("/users/stats/overview");

// =============================
// EMPLOYES
// =============================
export const getEmployes = () => fetchWithAuth("/employes");

export const getEmployesByService = () =>
  fetchWithAuth("/employes/service");

export const getEmployesByRole = () =>
  fetchWithAuth("/employes/role");

// =============================
// CONSULTATIONS
// =============================
export const getConsultations = () =>
  fetchWithAuth("/consultations");

export const getTotalConsultations = () =>
  fetchWithAuth("/consultations/stats");

export const getConsultationsByMotif = () =>
  fetchWithAuth("/consultations/motif");

export const getConsultationsByDate = () =>
  fetchWithAuth("/consultations/date");

// =============================
// FICHIERS
// =============================
export const getFichiers = () =>
  fetchWithAuth("/fichiers");

// =============================
// ROLES
// =============================
export const getRoles = () =>
  fetchWithAuth("/roles");