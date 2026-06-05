import axios from "axios";

const API = "http://localhost:3000/api";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


// =====================
// CREATE CONSULTATION
// =====================
export const createConsultation = async (data) => {
  const payload = {
    date_consultation: data.date_consultation,
    motif: data.motif,
    diagnostic: data.diagnostic,
    traitement: data.traitement,
    observation: data.observation,
    id_employe: data.id_employe,
    id_medecin: data.id_medecin,
  };

  const res = await axios.post(
    `${API}/consultations`,
    payload,
    getConfig()
  );

  return res.data;
};


// =====================
// GET ALL CONSULTATIONS
// =====================
export const getConsultations = async () => {
  const res = await axios.get(
    `${API}/consultations`,
    getConfig()
  );

  // IMPORTANT: ton backend retourne { data: [...] }
  return res.data;
};


// =====================
// GET CONSULTATION BY ID
// =====================
export const getConsultationById = async (id) => {
  const res = await axios.get(
    `${API}/consultations/${id}`,
    getConfig()
  );

  // ton backend retourne directement l'objet
  return res.data;
};


// =====================
// STATS TOTAL
// =====================
export const getTotalConsultations = async () => {
  const res = await axios.get(
    `${API}/consultations/stats/total`,
    getConfig()
  );

  return res.data;
};


// =====================
// UPDATE ADMIN (SAFE)
// =====================
export const updateConsultationAdmin = async (id, data) => {
  const payload = {
    date_consultation: data.date_consultation,
    motif: data.motif,
  };

  const res = await axios.put(
    `${API}/consultations/admin/${id}`,
    payload,
    getConfig()
  );

  return res.data;
};


// =====================
// UPDATE MEDECIN (FULL ACCESS)
// =====================
export const updateConsultationMedecin = async (id, data) => {
  const payload = {
    date_consultation: data.date_consultation,
    motif: data.motif,
    diagnostic: data.diagnostic,
    traitement: data.traitement,
    observation: data.observation,
  };

  const res = await axios.put(
    `${API}/consultations/medecin/${id}`,
    payload,
    getConfig()
  );

  return res.data;
};


// =====================
// DELETE CONSULTATION
// =====================
export const deleteConsultation = async (id) => {
  const res = await axios.delete(
    `${API}/consultations/${id}`,
    getConfig()
  );

  return res.data;
};


// =====================
// GET EMPLOYES (pour form)
// =====================
export const getEmployes = async () => {
  const res = await axios.get(
    `${API}/employes`,
    getConfig()
  );

  return res.data;
};