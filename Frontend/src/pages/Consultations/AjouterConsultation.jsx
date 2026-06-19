import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SidebarAdmin from "../../composants/SidebarAdmin";

import {
  createConsultation,
  getEmployes,
} from "../JS/Consultations";

export default function AjouterConsultation() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [employes, setEmployes] = useState([]);

  const [form, setForm] = useState({
    date_consultation: "",
    motif: "",
    diagnostic: "",
    traitement: "",
    observation: "",
    id_employe: "",
    id_medecin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEmployes();
        setEmployes(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createConsultation(form);

      alert("Consultation créée avec succès");

      navigate("/consultations");

    } catch (err) {
      console.error(err);
      alert("Erreur création consultation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* SIDEBAR FIXE */}
      <SidebarAdmin />

      {/* CONTENT décalé */}
      <div className="ml-0 md:ml-64 p-6 max-w-3xl">

        <h1 className="text-2xl font-bold mb-6">
          Ajouter une consultation
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow rounded space-y-4"
        >

          {/* DATE */}
          <input
            type="date"
            name="date_consultation"
            value={form.date_consultation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* MOTIF */}
          <input
            type="text"
            name="motif"
            placeholder="Motif"
            value={form.motif}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* EMPLOYÉ */}
          <select
            name="id_employe"
            value={form.id_employe}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Choisir employé --</option>
            {employes.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nom} {e.prenom}
              </option>
            ))}
          </select>

          {/* MÉDECIN */}
          <select
            name="id_medecin"
            value={form.id_medecin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Choisir médecin --</option>
            {employes
              .filter((e) => e.type === "Medecin")
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom} {m.prenom}
                </option>
              ))}
          </select>

          {/* DIAGNOSTIC */}
          <textarea
            name="diagnostic"
            placeholder="Diagnostic"
            value={form.diagnostic}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* TRAITEMENT */}
          <textarea
            name="traitement"
            placeholder="Traitement"
            value={form.traitement}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* OBSERVATION */}
          <textarea
            name="observation"
            placeholder="Observation"
            value={form.observation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            {loading ? "Création..." : "Créer consultation"}
          </button>

        </form>

      </div>
    </div>
  );
}