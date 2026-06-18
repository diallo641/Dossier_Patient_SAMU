import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import SidebarMedecin from "../../composants/SidebarMedecin";
import { getConsultationsByEmploye } from "../JS/EmployeSimple";
import { getFichiersByConsultation } from "../JS/Medecin";

import {
  CalendarDays,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function DetailConsultationMedecin() {
  const { id } = useParams();

  const [consultations, setConsultations] = useState([]);
  const [filesByConsultation, setFilesByConsultation] = useState({});
  const [loading, setLoading] = useState(true);

  // 👉 affichage progressif
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getConsultationsByEmploye(id);

        const sorted = (data || []).sort(
          (a, b) =>
            new Date(b.date_consultation) -
            new Date(a.date_consultation)
        );

        setConsultations(sorted);

        const filesMap = {};

        for (const c of sorted) {
          const files = await getFichiersByConsultation(c.id);
          filesMap[c.id] = files;
        }

        setFilesByConsultation(filesMap);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const derniereConsultation =
    consultations.length > 0
      ? consultations[0].date_consultation
      : null;

  const consultationsToShow = consultations.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <SidebarMedecin />
        <div className="flex-1 ml-64 p-6">
          <p>⏳ Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarMedecin />

      <div className="flex-1 ml-64 p-6">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Historique des consultations du patient
            </h1>
            <p className="text-gray-500 text-sm">
              Dossier médical complet
            </p>
          </div>

          <Link
            to={`/medecin/consultation/nouvelle/${id}`}
            className="bg-emerald-600 text-white px-3 py-2 rounded hover:bg-emerald-700"
          >
            + Ajouter consultation
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Total consultations</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {consultations.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Dernière consultation</p>
            <h2 className="text-lg font-bold text-gray-800">
              {derniereConsultation
                ? new Date(derniereConsultation).toLocaleDateString("fr-FR")
                : "Aucune"}
            </h2>
          </div>

        </div>

        {/* CONSULTATIONS */}
        {consultations.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-gray-500">
            Aucune consultation enregistrée pour ce patient
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {consultationsToShow.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-xl shadow p-5 border"
                >

                  {/* DATE */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="flex items-center gap-2 font-semibold text-gray-700">
                      <CalendarDays size={16} className="text-blue-600" />
                      {new Date(c.date_consultation).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  {/* CONTENT */}
                  <div className="space-y-2 text-gray-700">

                    <p className="flex items-center gap-2">
                      <Activity size={16} className="text-red-500" />
                      <b>Motif :</b> {c.motif}
                    </p>

                    <p><b>Diagnostic :</b> {c.diagnostic}</p>

                    {c.traitement && (
                      <p className="text-sm text-gray-600">
                        💊 {c.traitement}
                      </p>
                    )}

                    {c.observation && (
                      <p className="text-sm text-gray-600">
                        📝 {c.observation}
                      </p>
                    )}

                  </div>

                  {/* FILES */}
                  <div className="mt-4 border-t pt-3">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      📁 Fichiers médicaux
                    </p>

                    {(filesByConsultation[c.id] || []).length === 0 ? (
                      <p className="text-xs text-gray-400">
                        Aucun fichier
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {filesByConsultation[c.id].map((f) => (
                          <li key={f.id} className="text-sm text-blue-600">
                            📎 {f.nom_fichier} ({f.categorie})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* ACTION */}
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/medecin/consultation/${c.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Voir détail
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                </div>
              ))}

            </div>

            {/* BOUTONS */}
            <div className="mt-6 flex justify-center gap-3">

              {visibleCount < consultations.length && (
                <button
                  onClick={() =>
                    setVisibleCount((prev) => prev + 4)
                  }
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Voir plus
                </button>
              )}

              {visibleCount > 4 && (
                <button
                  onClick={() => setVisibleCount(4)}
                  className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Voir moins
                </button>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
}