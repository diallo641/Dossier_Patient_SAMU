import { useDeconnexion } from "../pages/JS/Deconnexion";

function BoutonDeconnexion() {
  const { deconnecterUtilisateur } = useDeconnexion();

  return (
    <button
      onClick={deconnecterUtilisateur}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
    >
      🚪 Déconnexion
    </button>
  );
}

export default BoutonDeconnexion;