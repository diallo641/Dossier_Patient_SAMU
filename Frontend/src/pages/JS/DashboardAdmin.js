import axios from "axios";

const API = "http://localhost:3000/api";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =====================
// BASE STATS
// =====================
export const getTotalEmployes = async () => {
  const res = await axios.get(`${API}/employes/stats/total`, getConfig());
  return res.data?.total || 0;
};

export const getTotalConsultations = async () => {
  const res = await axios.get(`${API}/consultations/stats/total`, getConfig());
  return res.data?.data?.total || 0;
};

export const getUserStats = async () => {
  const res = await axios.get(`${API}/users/stats/overview`, getConfig());
  return res.data?.data?.total_users || 0;
};

// =====================
// 🔥 STATS AVANCÉES
// =====================

// Employés par service
export const getEmployesByService = async () => {
  const res = await axios.get(`${API}/employes/stats/service`, getConfig());
  return res.data;
};

// Employés par rôle
export const getEmployesByRole = async () => {
  const res = await axios.get(`${API}/employes/stats/role`, getConfig());
  return res.data;
};

// Consultations par motif
export const getConsultationsByMotif = async () => {
  const res = await axios.get(`${API}/consultations/stats/motifs/1`, getConfig());
  return res.data.data || [];
};