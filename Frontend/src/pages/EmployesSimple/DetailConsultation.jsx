import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SidebarEmploye from "../../composants/SidebarEmploye";
import {
  getConsultationById,
  getFichiersByConsultation,
} from "../JS/EmployeSimple";

import {
  CalendarDays,
  Activity,
  Stethoscope,
  FileText,
  FileDown,
  ArrowLeft,
} from "lucide-react";

export default function DetailConsultation() {
  const { id } = useParams();

  const [consultation, setConsultation] = useState(null);
  const [fichiers, setFichiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getConsultationById(id);
        const files = await getFichiersByConsultation(id);

        setConsultation(data);
        setFichiers(files || []);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    load();
  }, [id]);

  if (loading) {
    return <p className="p-4">⏳ Chargement...</p>;
  }

  if (!consultation) {
    return <p className="p-4 text-red-500">❌ Consultation introuvable</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarEmploye />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/employe/consultations"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <ArrowLeft size={16} className="text-blue-600" />
            Retour
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          📄 Détail consultation
        </h1>

        {/* CONSULTATION */}
        <div className="bg-white p-6 rounded-lg shadow space-y-3">

          <p className="flex items-center gap-2 font-semibold text-gray-800">
            <CalendarDays size={18} className="text-blue-600" />
            {consultation.date_consultation
              ? new Date(consultation.date_consultation).toLocaleDateString("fr-FR")
              : "Date inconnue"}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <Stethoscope size={16} className="text-green-600" />
            <b>Motif :</b> {consultation.motif || "N/A"}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <Activity size={16} className="text-red-500" />
            <b>Diagnostic :</b> {consultation.diagnostic || "N/A"}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <FileText size={16} className="text-purple-600" />
            <b>Traitement :</b> {consultation.traitement || "N/A"}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <FileText size={16} className="text-gray-600" />
            <b>Observation :</b> {consultation.observation || "N/A"}
          </p>

        </div>

        {/* FICHIERS */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">

          <h2 className="text-lg font-semibold mb-4 text-purple-600 flex items-center gap-2">
            <FileDown size={18} className="text-purple-600" />
            Fichiers associés
          </h2>

          {fichiers.length === 0 ? (
            <p className="text-gray-500">Aucun fichier</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">

              {fichiers.map((f) => (
                <div
                  key={f.id}
                  className="border p-3 rounded bg-gray-50 hover:bg-gray-100 transition"
                >

                  <p className="font-semibold flex items-center gap-2">
                    <FileDown size={16} className="text-purple-600" />
                    {f.nom_fichier}
                  </p>

                  <p className="text-sm text-gray-600">
                    {f.categorie || "Non défini"}
                  </p>

                  <a
                    href={`http://localhost:3000/${f.chemin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Ouvrir
                  </a>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}