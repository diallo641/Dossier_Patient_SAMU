import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { creerUtilisateur } from "../JS/Register";

function Register() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    poste: "",
    service: "",
    date_naissance: "",
    telephone: "",
    email: "",
    mot_de_passe: "",
    id_role: "",
    groupe_sanguin: "",
    allergies: "",
    antecedents_medicaux: "",
    aptitudes_medicales: "",
  });

  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
      await creerUtilisateur(form, token);

      setMessage("Utilisateur créé avec succès");

      setForm({
        nom: "",
        prenom: "",
        poste: "",
        service: "",
        date_naissance: "",
        telephone: "",
        email: "",
        mot_de_passe: "",
        id_role: "",
        groupe_sanguin: "",
        allergies: "",
        antecedents_medicaux: "",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-emerald-600 p-4 sm:p-6">

      <div className="bg-white w-full max-w-5xl p-4 sm:p-6 md:p-8 rounded-xl shadow-xl">

        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center md:text-left">
          Création utilisateur (Admin)
        </h2>

        {erreur && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm sm:text-base">
            {erreur}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-sm sm:text-base">
            {message}
          </div>
        )}

        {/* FORM RESPONSIVE */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
        >

          {/* IDENTITE */}
          <input name="nom" placeholder="Nom" onChange={handleChange} className="border p-2 sm:p-3 rounded" required />
          <input name="prenom" placeholder="Prénom" onChange={handleChange} className="border p-2 sm:p-3 rounded" required />

          {/* CONTACT */}
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 sm:p-3 rounded" required />
          <input name="telephone" placeholder="Téléphone" onChange={handleChange} className="border p-2 sm:p-3 rounded" />

          {/* AUTH */}
          <input type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} className="border p-2 sm:p-3 rounded" required />

          {/* ROLE */}
          <select name="id_role" onChange={handleChange} className="border p-2 sm:p-3 rounded" required>
            <option value="">-- Choisir rôle --</option>
            <option value="1">Admin</option>
            <option value="2">Médecin</option>
            <option value="3">Employé</option>
          </select>

          {/* POSTE */}
          <select name="poste" onChange={handleChange} className="border p-2 sm:p-3 rounded">
            <option value="">-- Poste --</option>
            <option>Médecin du travail</option>
            <option>Infirmier(ère)</option>
            <option>Technicien médical</option>
            <option>Secrétaire médical</option>
            <option>Agent administratif</option>
          </select>

          {/* SERVICE */}
          <select name="service" onChange={handleChange} className="border p-2 sm:p-3 rounded">
            <option value="">-- Service --</option>
            <option>Médecine du travail</option>
            <option>Cardiologie</option>
            <option>Urgences</option>
            <option>Radiologie</option>
            <option>Laboratoire</option>
            <option>Administration</option>
          </select>

          {/* DATE NAISSANCE */}
          <input type="date" name="date_naissance" onChange={handleChange} className="border p-2 sm:p-3 rounded" />

          {/* GROUPE SANGUIN */}
          <select name="groupe_sanguin" onChange={handleChange} className="border p-2 sm:p-3 rounded">
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

          {/* ALLERGIES */}
          <select name="allergies" onChange={handleChange} className="border p-2 sm:p-3 rounded">
            <option value="">-- Allergies --</option>
            <option>Aucune</option>
            <option>Pénicilline</option>
            <option>Arachide</option>
            <option>Latex</option>
            <option>Poussière</option>
            <option>Autre</option>
          </select>

          {/* ANTECEDENTS */}
          <select name="antecedents_medicaux" onChange={handleChange} className="border p-2 sm:p-3 rounded">
            <option value="">-- Antécédents médicaux --</option>
            <option>Aucun</option>
            <option>Diabète</option>
            <option>Hypertension</option>
            <option>Asthme</option>
            <option>Maladie cardiaque</option>
            <option>Chirurgie passée</option>
            <option>Autre</option>
          </select>

          {/* APTITUDES */}
          <select name="aptitudes_medicales" onChange={handleChange} className="border p-2 sm:p-3 rounded">
            <option value="">-- Aptitude médicale --</option>
            <option>Apte</option>
            <option>Apte avec restriction</option>
            <option>Inapte temporaire</option>
            <option>Inapte définitif</option>
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-1 md:col-span-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Création..." : "Créer utilisateur/Employé"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;