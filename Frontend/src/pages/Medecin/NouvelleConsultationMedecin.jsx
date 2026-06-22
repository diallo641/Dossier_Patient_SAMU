import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SidebarMedecin from "../../composants/SidebarMedecin";

import {
  createConsultation,
  uploadFichiers,
  getAllEmployes,
} from "../JS/Medecin";

export default function NouvelleConsultationMedecin() {
  const navigate = useNavigate();

  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [filesByCategory, setFilesByCategory] = useState({});
  const [typeFichier, setTypeFichier] = useState("analyse");

  const token = localStorage.getItem("token");
  const idMedecin = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  const [form, setForm] = useState({
    date_consultation: "",
    motif: "",
    diagnostic: "",
    traitement: "",
    observation: "",
    id_employe: "",
    id_medecin: idMedecin || "",
  });

  // =====================
  // LOAD EMPLOYÉS
  // =====================
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllEmployes();
        setEmployes(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  // =====================
  // INPUT CHANGE
  // =====================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =====================
  // FILES
  // =====================
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);

    if (!typeFichier) return;

    setFilesByCategory((prev) => ({
      ...prev,
      [typeFichier]: [
        ...(prev[typeFichier] || []),
        ...selected,
      ],
    }));
  };

  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id_employe) {
      alert("Veuillez sélectionner un employé");
      return;
    }

    try {
      setLoading(true);

      const res = await createConsultation(form);
      const idConsultation = res?.id || res?.data?.id;

      const allFiles = Object.entries(filesByCategory || {});

      if (allFiles.length > 0) {
        setUploading(true);

        const formData = new FormData();

        allFiles.forEach(([categorie, files]) => {
          // 🔥 PROTECTION CRITIQUE
          if (!categorie || !files) return;

          files.forEach((file) => {
            if (!file) return;

            formData.append("fichiers", file);
            formData.append("categorie", categorie); // ✅ sans []
          });
        });

        formData.append("description", form.observation || "");
        formData.append("id_consultation", idConsultation);

        await uploadFichiers(formData);

        setUploading(false);
      }

      alert("Consultation créée avec succès");
      navigate(`/medecin/patient/${form.id_employe}`);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarMedecin />

      <div className="ml-64 flex-1 p-6 max-w-3xl">

        <h1 className="text-2xl font-bold mb-6">
          Nouvelle consultation
        </h1>

        {/* SELECT EMPLOYÉ */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <label className="font-bold block mb-2">
            Choisir un employé
          </label>

          <select
            name="id_employe"
            value={form.id_employe}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Sélectionner un employé --</option>

            {employes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom} {p.prenom}
              </option>
            ))}
          </select>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-4">

          <input
            type="date"
            name="date_consultation"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="motif"
            placeholder="Motif"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="diagnostic"
            placeholder="Diagnostic"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="traitement"
            placeholder="Traitement"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="observation"
            placeholder="Observation"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* FILES */}
          <div className="border-t pt-4 space-y-3">

            <h3 className="font-bold">📁 Fichiers médicaux</h3>

            <select
              value={typeFichier}
              onChange={(e) => setTypeFichier(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="analyse">Analyse</option>
              <option value="radio">Radio</option>
              <option value="scanner">Scanner</option>
              <option value="ordonnance">Ordonnance</option>
              <option value="certificat">Certificat</option>
              <option value="autre">Autre</option>
            </select>

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
            />

            {/* PREVIEW */}
            {Object.entries(filesByCategory || {}).map(([cat, files]) => (
              <div key={cat} className="text-sm text-gray-600">
                <b>{cat}</b>
                <ul>
                  {files.map((f, i) => (
                    <li key={i}>📄 {f.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-emerald-600 text-white px-4 py-2 rounded w-full"
          >
            {loading
              ? "Enregistrement..."
              : uploading
              ? "Upload..."
              : "Créer consultation"}
          </button>

        </form>
      </div>
    </div>
  );
}