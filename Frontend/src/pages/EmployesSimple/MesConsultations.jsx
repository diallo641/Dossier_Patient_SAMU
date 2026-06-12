import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarEmploye from "../../composants/SidebarEmploye";
import { getMonProfil, getConsultationsByEmploye } from "../JS/EmployeSimple";

import { CalendarDays, Activity, ArrowRight } from "lucide-react";

export default function MesConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const profil = await getMonProfil();

        if (!profil?.id) return;

        const data = await getConsultationsByEmploye(profil.id);

        // 🔥 TRI : dernière consultation en premier
        const sorted = (data || []).sort(
          (a, b) =>
            new Date(b.date_consultation) - new Date(a.date_consultation)
        );

        setConsultations(sorted);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return <p className="p-4">⏳ Chargement...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarEmploye />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          📅 Mes consultations
          
        </h1>

        {/* EMPTY STATE */}
        {consultations.length === 0 ? (
          <p className="text-gray-500">Aucune consultation</p>
        ) : (
          <div className="space-y-4">

            {consultations.map((c) => (
              <div
                key={c.id}
                className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition"
              >

                {/* DATE */}
                <p className="flex items-center gap-2 font-semibold text-gray-700">
                  <CalendarDays size={16} className="text-blue-600" />
                  {c.date_consultation
                    ? new Date(c.date_consultation).toLocaleDateString("fr-FR")
                    : "Date inconnue"}
                </p>

                {/* MOTIF */}
                <p className="flex items-center gap-2 mt-2 text-gray-700">
                  <Activity size={16} className="text-red-500" />
                  <span>
                    <b>Motif :</b> {c.motif || "N/A"}
                  </span>
                </p>

                {/* DIAGNOSTIC */}
                <p className="mt-1 text-gray-700">
                  <b>Diagnostic :</b> {c.diagnostic || "N/A"}
                </p>

                {/* BOUTON DETAIL */}
                <div className="mt-3">
                  <Link
                    to={`/employe/consultations/${c.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Voir détail
                    <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}