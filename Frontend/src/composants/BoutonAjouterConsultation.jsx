import { useNavigate } from "react-router-dom";

export default function BoutonAjouterConsultation() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/medecin/consultation/nouvelle")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition"
    >
      + Ajouter consultation
    </button>
  );
}