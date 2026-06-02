import { Link } from "react-router-dom";
import { useState } from "react";
import { useConnexion } from "../JS/Connexion";

function Connexion() {
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const { connexionUtilisateur } = useConnexion();

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* FOND */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-emerald-600"></div>

      {/* FORMES */}
      <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -top-40 -left-40"></div>
      <div className="absolute w-[400px] h-[400px] bg-emerald-300/20 rounded-full blur-3xl bottom-0 right-0"></div>

      {/* PARTIE GAUCHE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center text-white relative z-10">
        <div className="text-center space-y-6">
          <div className="text-7xl">🏥</div>

          <h1 className="text-4xl font-bold">
            Plateforme Médicale
          </h1>

          <p className="text-blue-100 text-sm max-w-md">
            Gestion des employés, consultations, dossiers médicaux
            et suivi de la santé au travail dans un environnement
            sécurisé et moderne.
          </p>
        </div>
      </div>

      {/* PARTIE DROITE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          {/* TITRE */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Connexion
            </h2>

            <p className="text-gray-500">
              Accédez à votre espace sécurisé
            </p>
          </div>

          {/* MESSAGE D'ERREUR */}
          {erreur && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {erreur}
            </div>
          )}

          {/* FORMULAIRE */}
          <form
            onSubmit={(e) =>
              connexionUtilisateur(
                e,
                setChargement,
                setErreur
              )
            }
          >
            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* MOT DE PASSE */}
            <input
              type="password"
              name="mot_de_passe"
              placeholder="Mot de passe"
              required
              className="w-full border rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* MOT DE PASSE OUBLIÉ */}
            <div className="flex justify-end mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* BOUTON */}
            <button
              type="submit"
              disabled={chargement}
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-emerald-500 hover:opacity-90 transition"
            >
              {chargement
                ? "Connexion..."
                : "Se connecter"}
            </button>
          </form>

          {/* INSCRIPTION */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Pas de compte ?{" "}
            <Link
              to="/inscription"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Connexion;