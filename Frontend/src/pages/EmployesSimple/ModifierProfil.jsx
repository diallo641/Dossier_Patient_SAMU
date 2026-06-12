import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarEmploye from "../../composants/SidebarEmploye";
import { getMonProfil, updateMonProfilEmploye } from "../JS/EmployeSimple";

export default function ModifierProfil() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    telephone: "",
    poste: "",
    service: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  // =====================
  // LOAD PROFIL
  // =====================
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const data = await getMonProfil();

        if (data) {
          setFormData({
            nom: data.nom || "",
            prenom: data.prenom || "",
            date_naissance: data.date_naissance
              ? data.date_naissance.split("T")[0]
              : "",
            telephone: data.telephone || "",
            poste: data.poste || "",
            service: data.service || "",
          });
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    load();
  }, []);

  // =====================
  // HANDLES
  // =====================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await updateMonProfilEmploye(formData);

      alert("Profil mis à jour avec succès ✅");

      navigate("/employe/profil");
    } catch (error) {
      alert("Erreur lors de la mise à jour ❌");
    }

    setSaving(false);
  };

  if (loading) {
    return <p className="p-4">⏳ Chargement...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarEmploye />

      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          ✏️ Modifier mon profil
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 space-y-4"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            {/* ===================== POSTE (SELECT) ===================== */}
            <select
              name="poste"
              value={formData.poste}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">-- Choisir un poste --</option>
              <option value="Chef comptable">Chef comptable</option>
              <option value="Comptable">Comptable</option>
              <option value="Assistant administratif">Assistant administratif</option>
              <option value="Secrétaire">Secrétaire</option>
              <option value="Directeur">Directeur</option>
            </select>

            {/* ===================== SERVICE (SELECT) ===================== */}
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">-- Choisir un service --</option>
              <option value="Administration">Administration</option>
              <option value="Finance">Finance</option>
              <option value="Comptabilité">Comptabilité</option>
              <option value="Ressources Humaines">Ressources Humaines</option>
              <option value="Informatique">Informatique</option>
            </select>

          </div>

          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {saving ? "Enregistrement..." : "💾 Enregistrer"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/employe/profil")}
              className="text-red-600 hover:underline"
            >
              Annuler
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}