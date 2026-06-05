import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SidebarAdmin from "../../composants/SidebarAdmin";

import {
  getConsultationById,
  updateConsultationAdmin,
} from "../JS/Consultations";

export default function ModifierConsultation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    date_consultation: "",
    motif: "",
    diagnostic: "",
    traitement: "",
    observation: "",
  });

  // =====================
  // FORMAT DATE
  // =====================
  const formatDate = (date) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  // =====================
  // LOAD DATA
  // =====================
  useEffect(() => {
    getConsultationById(id)
      .then((res) => {
        setForm({
          date_consultation: formatDate(res.date_consultation),
          motif: res.motif || "",
          diagnostic: res.diagnostic || "",
          traitement: res.traitement || "",
          observation: res.observation || "",
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // =====================
  // INPUT CHANGE
  // =====================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =====================
  // SUBMIT ADMIN SAFE
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateConsultationAdmin(id, {
        date_consultation: form.date_consultation,
        motif: form.motif,
      });

      alert("Consultation modifiée avec succès");
      navigate("/consultations");

    } catch (err) {
      console.error(err);
      alert("Erreur modification");
    }
  };

  if (loading) return <p className="p-6">Chargement...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">

      <SidebarAdmin />

      <div className="flex-1 p-6 max-w-3xl">

        <h1 className="text-2xl font-bold mb-6">
          Modifier consultation
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow rounded space-y-6"
        >

          {/* ADMIN */}
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date_consultation"
              value={form.date_consultation || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />

            <label>Motif</label>
            <input
              type="text"
              name="motif"
              value={form.motif || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* MÉDICAL READ ONLY */}
          <div>
            <label>Diagnostic</label>
            <textarea
              value={form.diagnostic || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100 mb-3"
            />

            <label>Traitement</label>
            <textarea
              value={form.traitement || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100 mb-3"
            />

            <label>Observation</label>
            <textarea
              value={form.observation || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded flex-1"
            >
              Modifier
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-400 text-white px-4 py-2 rounded flex-1"
            >
              Annuler
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}