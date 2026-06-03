import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SidebarAdmin from "../../composants/SidebarAdmin";
import {
  getEmployeById,
  updateEmploye,
} from "../JS/EmployeAdmin";

export default function ModifierEmploye() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    id_role: "",

    poste: "",
    service: "",
    date_naissance: "",

    groupe_sanguin: "",
    allergies: "",
    antecedents_medicaux: "",
    aptitudes_medicales: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEmploye = async () => {
      try {
        setLoading(true);

        const res = await getEmployeById(id);

        // ⚠️ sécurité API (selon ton backend)
        const data = res?.data || res;

        setForm({
          nom: data.nom || "",
          prenom: data.prenom || "",
          email: data.email || "",
          telephone: data.telephone || "",

          // venant de utilisateur JOIN
          id_role: data.id_role || "",

          poste: data.poste || "",
          service: data.service || "",

          // 🔥 IMPORTANT FORMAT INPUT DATE
          date_naissance: data.date_naissance
            ? data.date_naissance.split("T")[0]
            : "",

          groupe_sanguin: data.groupe_sanguin || "",
          allergies: data.allergies || "",
          antecedents_medicaux: data.antecedents_medicaux || "",
          aptitudes_medicales: data.aptitudes_medicales || "",
        });

      } catch (error) {
        console.error("Erreur load employe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmploye();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateEmploye(id, form);

      navigate("/employes");

    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <SidebarAdmin />
        <div className="p-6">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <SidebarAdmin />

      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">
          Modifier employé
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input name="nom" value={form.nom} onChange={handleChange} className="border p-2 rounded" />
          <input name="prenom" value={form.prenom} onChange={handleChange} className="border p-2 rounded" />
          <input name="email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
          <input name="telephone" value={form.telephone} onChange={handleChange} className="border p-2 rounded" />

          {/* ROLE */}
          <select name="id_role" value={form.id_role} onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Rôle --</option>
            <option value="1">Admin</option>
            <option value="2">Médecin</option>
            <option value="3">Employé</option>
          </select>

          {/* POSTE */}
          <select name="poste" value={form.poste} onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Poste --</option>
            <option>Médecin du travail</option>
            <option>Infirmier(ère)</option>
            <option>Technicien médical</option>
            <option>Secrétaire médical</option>
            <option>Agent administratif</option>
          </select>

          {/* SERVICE */}
          <select name="service" value={form.service} onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Service --</option>
            <option>Médecine du travail</option>
            <option>Cardiologie</option>
            <option>Urgences</option>
            <option>Radiologie</option>
            <option>Laboratoire</option>
            <option>Administration</option>
          </select>

          <input type="date" name="date_naissance" value={form.date_naissance} onChange={handleChange} className="border p-2 rounded" />

          {/* SANTÉ */}
          <select name="groupe_sanguin" value={form.groupe_sanguin} onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Groupe sanguin --</option>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>

          <select name="allergies" value={form.allergies} onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Allergies --</option>
            <option>Aucune</option>
            <option>Pénicilline</option>
            <option>Arachide</option>
            <option>Latex</option>
            <option>Poussière</option>
          </select>

          <select name="antecedents_medicaux" value={form.antecedents_medicaux} onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Antécédents --</option>
            <option>Aucun</option>
            <option>Diabète</option>
            <option>Hypertension</option>
            <option>Asthme</option>
          </select>

          <select name="aptitudes_medicales" value={form.aptitudes_medicales} onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Aptitude --</option>
            <option>Apte</option>
            <option>Apte avec restriction</option>
            <option>Inapte temporaire</option>
            <option>Inapte définitif</option>
          </select>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={() => navigate("/employes")} className="px-4 py-2 bg-gray-400 text-white rounded">
              Annuler
            </button>

            <button type="submit" disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">
              {saving ? "Sauvegarde..." : "Modifier"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}