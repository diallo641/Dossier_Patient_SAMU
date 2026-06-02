import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { reinitialiserMotDePasse } from "../JS/ReinitialiserPassword";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setErreur("Les mots de passe ne correspondent pas");
    }

    setLoading(true);
    setErreur("");
    setMessage("");

    try {
      await reinitialiserMotDePasse(token, newPassword);

      setMessage("Mot de passe mis à jour avec succès");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setErreur(err.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-emerald-600">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Nouveau mot de passe
        </h2>

        {erreur && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
            {erreur}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="w-full border p-3 rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirmer mot de passe"
            className="w-full border p-3 rounded mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded"
          >
            {loading ? "Chargement..." : "Réinitialiser"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;