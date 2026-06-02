import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { envoyerEmailReset } from "../JS/ReinitialiserPassword";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErreur("");
    setMessage("");

    try {
      await envoyerEmailReset(email);

      setMessage("Email envoyé avec succès");

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
          Mot de passe oublié
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
            type="email"
            placeholder="Votre email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;