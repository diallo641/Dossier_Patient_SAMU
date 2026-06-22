import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SidebarMedecin from "../../composants/SidebarMedecin";

import {
  getConsultationById,
  updateConsultation,
  uploadFichiersToConsultation,
} from "../JS/Medecin";

import {
  Stethoscope,
  Activity,
  FileText,
  ClipboardList,
  Upload,
} from "lucide-react";

export default function ModifierConsultationMedecin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    motif: "",
    diagnostic: "",
    traitement: "",
    observation: "",
  });

  const [filesByCategory, setFilesByCategory] = useState({});
  const [typeFichier, setTypeFichier] = useState("analyse");

  // LOAD
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getConsultationById(id);

        setForm({
          motif: data?.motif ?? "",
          diagnostic: data?.diagnostic ?? "",
          traitement: data?.traitement ?? "",
          observation: data?.observation ?? "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [id]);

  // CHANGE TEXT
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ?? "",
    }));
  };

  // FILES
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    const categorie = typeFichier || "autre";

    setFilesByCategory((prev) => ({
      ...prev,
      [categorie]: [...(prev[categorie] || []), ...selected],
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const consultationPayload = {
        ...form,
        description: form.observation || "",
      };

      await updateConsultation(id, consultationPayload);

      const hasFiles = Object.values(filesByCategory || {})
        .some((files) => files?.length > 0);

      if (hasFiles) {
        setUploading(true);

        const formData = new FormData();

        Object.entries(filesByCategory).forEach(([categorie, files]) => {
          if (!files?.length) return;

          files.forEach((file) => {
            formData.append("fichiers", file);
            formData.append("categorie", categorie || "autre");
            formData.append("description", form.observation || "");
          });
        });

        formData.append("id_consultation", id);

        await uploadFichiersToConsultation(formData);

        setUploading(false);
      }

      alert("Consultation mise à jour avec succès");
      navigate(-1);

    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour");
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
          ✏️ Modifier la consultation
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-5">

          {/* MOTIF */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
              <ClipboardList size={16} className="text-blue-600" />
              Motif de consultation
            </label>

            <input
              type="text"
              name="motif"
              value={form.motif}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Ex: douleur abdominale, contrôle..."
            />
          </div>

          {/* DIAGNOSTIC */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
              <Stethoscope size={16} className="text-purple-600" />
              Diagnostic
            </label>

            <textarea
              name="diagnostic"
              value={form.diagnostic}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Entrez le diagnostic..."
            />
          </div>

          {/* TRAITEMENT */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
              <Activity size={16} className="text-red-500" />
              Traitement prescrit
            </label>

            <textarea
              name="traitement"
              value={form.traitement}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Traitement recommandé..."
            />
          </div>

          {/* OBSERVATION */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
              <FileText size={16} className="text-orange-500" />
              Observation médicale
            </label>

            <textarea
              name="observation"
              value={form.observation}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Notes et observations..."
            />
          </div>

          {/* FILES */}
          <div className="border-t pt-4 space-y-3">

            <label className="flex items-center gap-2 font-bold text-gray-800">
              <Upload size={16} className="text-green-600" />
              Ajouter des fichiers (optionnel)
            </label>

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
                <b>📁 {cat}</b>
                <ul className="ml-4 list-disc">
                  {(files || []).map((f, i) => (
                    <li key={i}>{f?.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold"
          >
            {loading
              ? "Mise à jour..."
              : uploading
              ? "Upload fichiers..."
              : "Valider la modification"}
          </button>

        </form>
      </div>
    </div>
  );
}