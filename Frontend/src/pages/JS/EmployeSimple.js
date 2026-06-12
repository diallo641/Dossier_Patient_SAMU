import axios from "axios";

const API = "http://localhost:3000/api";

// ==============================
// 🔐 TOKEN
// ==============================
const getToken = () => localStorage.getItem("token");

// ==============================
// 🧾 CONFIG AXIOS
// ==============================
const config = () => {
  const token = getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};



// ==============================
// 👤 PROFIL CONNECTÉ
// ==============================
export const getMonProfil = async () => {
  try {
    const res = await axios.get(`${API}/employes/profil`, config());

    return res.data;
  } catch (error) {
    console.error("Erreur getMonProfil:", error.response?.data || error.message);
    throw error;
  }
};

// ==============================
// 👤 EMPLOYÉ PAR USER ID
// ==============================
export const getEmployeByUserId = async (userId) => {
  try {
    const res = await axios.get(`${API}/employes/${userId}`, config());

    return res.data?.data || res.data || null;
  } catch (error) {
    console.error("Erreur getEmployeByUserId:", error.response?.data || error.message);
    throw error;
  }
};

// ==============================
// 📅 CONSULTATIONS EMPLOYÉ
// ==============================
export const getConsultationsByEmploye = async (id_employe) => {
  try {
    const res = await axios.get(
      `${API}/consultations/employe/${id_employe}`,
      config()
    );

    return res.data?.data || [];
  } catch (error) {
    console.error("Erreur consultations:", error.response?.data || error.message);
    return [];
  }
};

// ==============================
// 📄 CONSULTATION BY ID
// ==============================
export const getConsultationById = async (id) => {
  try {
    const res = await axios.get(`${API}/consultations/${id}`, config());

    return res.data?.data || res.data || null;
  } catch (error) {
    console.error("Erreur consultation:", error.response?.data || error.message);
    return null;
  }
};

// ==============================
// 📁 FICHIERS MÉDICAUX
// ==============================
export const getFichiersByConsultation = async (id_consultation) => {
  try {
    const res = await axios.get(
      `${API}/fichiers/consultation/${id_consultation}`,
      config()
    );

    return res.data?.data || [];
  } catch (error) {
    console.error("Erreur fichiers:", error.response?.data || error.message);
    return [];
  }
};



// ==============================
// ✏️ UPDATE PROFIL EMPLOYE
// ==============================
export const updateMonProfilEmploye = async (data) => {
  try {
    const res = await axios.put(
      `${API}/employes/profil`,
      data,
      config()
    );

    return res.data;
  } catch (error) {
    console.error(
      "Erreur updateMonProfilEmploye:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ==============================
// 📁 FICHIERS MÉDICAUX (EMPLOYÉ)
// ==============================
export const getFichiersMedicauxByEmploye = async (id_employe) => {
  try {
    // 1. récupérer consultations
    const consultations = await getConsultationsByEmploye(id_employe);

    // 2. récupérer fichiers pour chaque consultation
    const allFiles = [];

    for (const c of consultations) {
      try {
        const res = await getFichiersByConsultation(c.id);
        allFiles.push(
          ...res.map((f) => ({
            ...f,
            consultation_id: c.id,
          }))
        );
      } catch (err) {
        console.error("Erreur fichiers consultation:", err);
      }
    }

    return allFiles;
  } catch (error) {
    console.error("Erreur getFichiersMedicauxByEmploye:", error.message);
    return [];
  }
};

export const getDossierMedical = async (id_employe) => {
  try {
    const profil = await getEmployeByUserId(id_employe);

    const consultations = await getConsultationsByEmploye(id_employe);

    const fichiers = await getFichiersMedicauxByEmploye(id_employe);

    return {
      profil,
      consultations,
      fichiers,
    };
  } catch (error) {
    console.error("Erreur getDossierMedical:", error.message);

    return {
      profil: null,
      consultations: [],
      fichiers: [],
    };
  }
};

// ==============================
// 📄 DETAIL CONSULTATION
// ==============================
export const getDetailConsultation = async (id) => {
  try {
    const consultation = await getConsultationById(id);
    const fichiers = await getFichiersByConsultation(id);

    return {
      consultation,
      fichiers,
    };
  } catch (error) {
    console.error("Erreur getDetailConsultation:", error.message);

    return {
      consultation: null,
      fichiers: [],
    };
  }
};


// ==============================
// 📊 DASHBOARD EMPLOYÉ
// ==============================
export const loadDashboardEmploye = async (id_employe) => {
  try {
    const profil = await getEmployeByUserId(id_employe);

    const consultations = await getConsultationsByEmploye(id_employe);

    const fichiers = await getFichiersMedicauxByEmploye(id_employe);

    // 🔥 IMPORTANT : trier par date décroissante
    const sorted = consultations.sort(
      (a, b) =>
        new Date(b.date_consultation) - new Date(a.date_consultation)
    );

    return {
      profil,

      totalConsultations: consultations.length,
      totalFichiers: fichiers.length,

      // ✅ UNE SEULE dernière consultation
      derniereConsultation: sorted[0] || null,
    };
  } catch (error) {
    console.error("Erreur dashboard:", error.message);

    return {
      profil: null,
      totalConsultations: 0,
      totalFichiers: 0,
      derniereConsultation: null,
    };
  }
};