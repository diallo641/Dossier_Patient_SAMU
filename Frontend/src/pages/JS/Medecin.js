import axios from "axios";

const API = "http://localhost:3000/api";

// =====================
// TOKEN CONFIG
// =====================
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =====================
// CONSULTATIONS DU MÉDECIN
// =====================
export const getConsultationsMedecin = async () => {
  const res = await axios.get(`${API}/consultations/stats/medecin`, getConfig());
  return res.data.data || [];
};

// =====================
// CONSULTATIONS JOUR
// =====================
export const getConsultationsToday = async () => {
  const res = await axios.get(`${API}/consultations/stats/today`, getConfig());
  return res.data.data || [];
};

// =====================
// CONSULTATIONS SEMAINE
// =====================
export const getConsultationsWeek = async () => {
  const res = await axios.get(`${API}/consultations/stats/week`, getConfig());
  return res.data.data || [];
};

// =====================
// CONSULTATIONS MOIS
// =====================
export const getConsultationsMonth = async () => {
  const res = await axios.get(`${API}/consultations/stats/month`, getConfig());
  return res.data.data || [];
};

// =====================
// MOTIFS
// =====================
export const getMotifsMedecin = async () => {
  const res = await axios.get(`${API}/consultations/stats/motifs`, getConfig());
  return res.data.data || [];
};

// =====================
// DATES
// =====================
export const getDatesMedecin = async () => {
  const res = await axios.get(`${API}/consultations/stats/dates`, getConfig());
  return res.data.data || [];
};

// =====================
// PATIENTS LISTE
// =====================
export const getPatientsMedecin = async () => {
  const res = await axios.get(`${API}/consultations/stats/patients`, getConfig());
  return res.data.data || [];
};

// =====================
// TOTAL PATIENTS UNIQUES
// =====================
export const getTotalPatientsMedecin = async () => {
  const res = await axios.get(`${API}/consultations/stats/patients/total`, getConfig());
  return res.data.data.total || 0;
};

// =====================
// DETAIL PATIENT (EMPLOYE)
// =====================
export const getPatientById = async (id) => {
  const res = await axios.get(`${API}/consultations/employes/${id}`, getConfig());
  return res.data.data || null;
};

// =====================
// CONSULTATIONS D'UN PATIENT
// =====================
export const getConsultationsByEmploye = async (id) => {
  const res = await axios.get(
    `${API}/consultations/employe/${id}`,
    getConfig()
  );
  return res.data.data || [];
};

// =====================
// CREATE CONSULTATION
// =====================
export const createConsultation = async (data) => {
  const res = await axios.post(
    `${API}/consultations`,
    data,
    getConfig()
  );

  return res.data;
};

// =====================
// UPLOAD FICHIERS (MULTI)
// =====================
export const uploadFichiers = async (formData) => {
  const res = await axios.post(
    `${API}/fichiers`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
export const getFichiersByConsultation = async (id) => {
  const res = await axios.get(
    `http://localhost:3000/api/fichiers/consultation/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data.data || [];
};

// =====================
// DETAIL CONSULTATION
// =====================
export const getConsultationById = async (id) => {
  const res = await axios.get(
    `${API}/consultations/${id}`,
    getConfig()
  );

  return res.data || null;
};

export const getEmployeById = async (id) => {
  const res = await axios.get(`${API}/employes/${id}`, getConfig());
  return res.data.data || null;
};

// =====================
// UPDATE CONSULTATION
// =====================
export const updateConsultation = async (id, data) => {
  const res = await axios.put(
    `${API}/consultations/${id}`,
    data,
    getConfig()
  );

  return res.data;
};

export const getAllConsultations = async () => {
  const res = await axios.get(
    `${API}/consultations`,
    getConfig()
  );

  return res.data.data || [];
};

// =====================
// UPLOAD FICHIERS (AJOUT SUR CONSULTATION EXISTANTE)
// =====================
export const uploadFichiersToConsultation = async (formData) => {
  const res = await axios.post(
    `${API}/fichiers`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

// =====================
// TOUS LES EMPLOYÉS (ADMIN / MÉDECIN)
// =====================
export const getAllEmployes = async () => {
  const res = await axios.get(`${API}/employes`, getConfig());
  return res.data.data || [];
};
