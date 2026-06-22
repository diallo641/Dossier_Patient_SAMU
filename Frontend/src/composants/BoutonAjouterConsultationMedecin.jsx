import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";

export default function BoutonAjouterConsultationMedecin() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/medecin/consultation/nouvelle")}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow-md transition flex items-center gap-2"
    >
      <Stethoscope size={18} />
      Ajouter consultation
    </button>
  );
}