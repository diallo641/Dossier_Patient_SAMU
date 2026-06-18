import { useNavigate } from "react-router-dom";

export default function BoutonAjouterEmploye() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/inscription")}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow-md transition"
    >
      + Ajouter employé
    </button>
  );
}