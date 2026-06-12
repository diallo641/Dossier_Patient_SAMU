import { useEffect, useState } from "react";
import SidebarEmploye from "../../composants/SidebarEmploye";

import {
  getMonProfil,
  loadDashboardEmploye,
} from "../JS/EmployeSimple";

import {
  CalendarDays,
  FileText,
  User,
  Stethoscope,
  Activity,
} from "lucide-react";

export default function DashboardEmploye() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const profil = await getMonProfil();

        const data = await loadDashboardEmploye(profil.id);

        setDashboard(data);
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

  const d = dashboard || {};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarEmploye />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tableau de bord
        </h1>

        <p className="text-gray-600 mb-8">
          Bienvenue{" "}
          <strong>
            {d?.profil?.prenom} {d?.profil?.nom}
          </strong>
        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center gap-3">
              <CalendarDays size={30} className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Consultations</p>
                <h2 className="text-2xl font-bold">
                  {d.totalConsultations || 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center gap-3">
              <FileText size={30} className="text-purple-600" />
              <div>
                <p className="text-gray-500 text-sm">Fichiers médicaux</p>
                <h2 className="text-2xl font-bold">
                  {d.totalFichiers || 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center gap-3">
              <User size={30} className="text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">Profil</p>
                <h2 className="font-bold">
                  {d?.profil?.poste || "Employé"}
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* DERNIERE CONSULTATION */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Dernière consultation
          </h2>

          {!d.derniereConsultation ? (
            <p className="text-gray-500">
              Aucune consultation trouvée
            </p>
          ) : (
            <div className="space-y-3">

              <p className="flex items-center gap-2">
                <CalendarDays size={18} className="text-blue-600" />
                {new Date(
                  d.derniereConsultation.date_consultation
                ).toLocaleDateString("fr-FR")}
              </p>

              <p className="flex items-center gap-2">
                <Stethoscope size={18} className="text-green-600" />
                Dr {d.derniereConsultation.medecin_prenom}{" "}
                {d.derniereConsultation.medecin_nom}
              </p>

              <p className="flex items-center gap-2">
                <Activity size={18} className="text-red-500" />
                <strong>Motif :</strong>{" "}
                {d.derniereConsultation.motif || "N/A"}
              </p>

              <p>
                <strong>Diagnostic :</strong>{" "}
                {d.derniereConsultation.diagnostic || "N/A"}
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}