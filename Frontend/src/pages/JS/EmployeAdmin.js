import axios from "axios";

const API = "http://localhost:3000/api";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =====================
// GET ALL
// =====================
export const getEmployes = async () => {
  const res = await axios.get(`${API}/employes`, getConfig());
  return res.data;
};

// =====================
// DELETE
// =====================
export const deleteEmploye = async (id) => {
  const res = await axios.delete(`${API}/employes/${id}`, getConfig());
  return res.data;
};

// =====================
// GET BY ID (important pour edit)
// =====================
export const getEmployeById = async (id) => {
  const res = await axios.get(`${API}/employes/${id}`, getConfig());
  return res.data;
};

// =====================
// UPDATE EMPLOYE
// =====================
export const updateEmploye = async (id, data) => {
  const res = await axios.put(
    `${API}/employes/${id}`,
    data,
    getConfig()
  );
  return res.data;
};