import { useState } from "react";
import { creerEmploye } from "../JS/Inscription";
import { useNavigate } from "react-router-dom";

function Inscription() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    poste: "",
    service: "",
    date_naissance: "",
    telephone: "",
    email: "",
    mot_de_passe: "",
    id_role: 3,
    groupe_sanguin: "",
    allergies: "",
    antecedents_medicaux: "",
    antecedents_autre: "",
    aptitudes_medicales: "",
  });

  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErreur("");
    setMessage("");

    try {
      const res = await creerEmploye(form, token);

      setMessage(res.message || "Employé créé avec succès");

      setForm({
        nom: "",
        prenom: "",
        poste: "",
        service: "",
        date_naissance: "",
        telephone: "",
        email: "",
        mot_de_passe: "",
        id_role: 3,
        groupe_sanguin: "",
        allergies: "",
        antecedents_medicaux: "",
        antecedents_autre: "",
        aptitudes_medicales: "",
      });

      setTimeout(() => navigate("/login"), 1200);

    } catch (err) {
      setErreur(err.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-emerald-600 p-6">

      <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-xl">

        <h2 className="text-2xl font-bold mb-6">Inscription Employé</h2>

        {erreur && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{erreur}</div>}
        {message && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{message}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input name="nom" placeholder="Nom" onChange={handleChange} className="border p-2 rounded" required />
          <input name="prenom" placeholder="Prénom" onChange={handleChange} className="border p-2 rounded" required />

          <select name="poste" onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Poste --</option>
            <option>Médecin du travail</option>
            <option>Infirmier(ère)</option>
            <option>Technicien médical</option>
            <option>Secrétaire médical</option>
            <option>Agent administratif</option>
            <option>Stagiaire</option>
          </select>

          <input name="telephone" placeholder="Téléphone" onChange={handleChange} className="border p-2 rounded" />

          <input type="date" name="date_naissance" onChange={handleChange} className="border p-2 rounded" />

          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" required />

          <input type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} className="border p-2 rounded" required />

          <select name="service" onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Service --</option>
            <option>Médecine du travail</option>
            <option>Cardiologie</option>
            <option>Urgences</option>
            <option>Radiologie</option>
            <option>Laboratoire</option>
            <option>Administration</option>
          </select>

          <select name="groupe_sanguin" onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Groupe sanguin --</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <select name="allergies" onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Allergies --</option>
            <option>Aucune</option>
            <option>Pénicilline</option>
            <option>Arachide</option>
            <option>Latex</option>
            <option>Poussière</option>
            <option>Autre</option>
          </select>

          <select name="aptitudes_medicales" onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Aptitude médicale --</option>
            <option>Apte</option>
            <option>Apte avec restriction</option>
            <option>Inapte temporaire</option>
            <option>Inapte définitif</option>
          </select>

          <select name="antecedents_medicaux" onChange={handleChange} className="border p-2 rounded">
            <option value="">-- Antécédents médicaux --</option>
            <option>Aucun</option>
            <option>Diabète</option>
            <option>Hypertension</option>
            <option>Asthme</option>
            <option>Maladie cardiaque</option>
            <option>Chirurgie passée</option>
            <option>Autre</option>
          </select>

          {form.antecedents_medicaux === "Autre" && (
            <input
              name="antecedents_autre"
              placeholder="Préciser"
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-600 text-white py-3 rounded"
          >
            {loading ? "Création..." : "Créer l'employé"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Inscription;