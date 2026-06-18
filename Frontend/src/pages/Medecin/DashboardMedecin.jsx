import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarMedecin from "../../composants/SidebarMedecin";

import {
  ArrowRight,
  CalendarDays,
  Users,
  Activity,
  TrendingUp,
  Clock,
  FileText,
  BarChart3,
} from "lucide-react";

import {
  getConsultationsMedecin,
  getPatientsMedecin,
  getMotifsMedecin,
  getDatesMedecin,
} from "../JS/Medecin";

export default function DashboardMedecin() {
  const [consultations, setConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [motifs, setMotifs] = useState([]);
  const [dates, setDates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const consultRes = await getConsultationsMedecin();
      setConsultations(consultRes);

      const patientRes = await getPatientsMedecin();
      setPatients(patientRes);

      const motifRes = await getMotifsMedecin();
      setMotifs(motifRes);

      const dateRes = await getDatesMedecin();
      setDates(dateRes);

    } catch (err) {
      console.error(err);
      setError("Erreur chargement dashboard médecin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("fr-FR") : "";

  const today = new Date().toISOString().split("T")[0];

  const consultationsToday = consultations.filter((c) =>
    c.date_consultation?.startsWith(today)
  );

  const consultationsWeek = consultations.filter((c) => {
    const diff =
      (new Date() - new Date(c.date_consultation)) /
      (1000 * 60 * 60 * 24);
    return diff <= 7;
  });

  const consultationsMonth = consultations.filter((c) => {
    const d = new Date(c.date_consultation);
    const now = new Date();
    return d.getMonth() === now.getMonth();
  });

  // TRI DATES (important)
  const sortedDates = [...dates].sort(
    (a, b) => new Date(b.date_consultation) - new Date(a.date_consultation)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarMedecin />

      <div className="ml-64 p-6 w-full">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="text-emerald-600" />
            Dashboard Médecin
          </h1>
          
        </div>

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && (
          <>
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

              <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
                <div className="flex items-center gap-2 text-blue-600">
                  <CalendarDays />
                  Aujourd’hui
                </div>
                <p className="text-3xl font-bold mt-2">
                  {consultationsToday.length}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
                <div className="flex items-center gap-2 text-purple-600">
                  <TrendingUp />
                  Semaine
                </div>
                <p className="text-3xl font-bold mt-2">
                  {consultationsWeek.length}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-500">
                <div className="flex items-center gap-2 text-orange-600">
                  <Clock />
                  Mois
                </div>
                <p className="text-3xl font-bold mt-2">
                  {consultationsMonth.length}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow border-l-4 border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FileText />
                  Total
                </div>
                <p className="text-3xl font-bold mt-2">
                  {consultations.length}
                </p>
              </div>
            </div>

            {/* PATIENTS */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
              <div className="flex items-center gap-2 text-blue-600">
                <Users />
                <h2 className="font-semibold">Patients suivis</h2>
              </div>

              <p className="text-3xl font-bold mt-2 text-blue-600">
                {patients.length}
              </p>
            </div>

            {/* DERNIERES CONSULTATIONS */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="text-indigo-600" />
                Dernières consultations
              </h2>

              <div className="grid gap-3">
                {consultations.slice(0, 3).map((c) => (
                  <div key={c.id} className="bg-gray-50 p-4 rounded-lg border">
                    <p className="font-semibold">
                      {c.employe_nom} {c.employe_prenom}
                    </p>

                    <p>Motif : {c.motif}</p>

                    <p className="text-sm text-gray-500">
                      📅 {formatDate(c.date_consultation)}
                    </p>

                   <Link
                      to={`/medecin/consultation/${c.id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      Voir détail
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* MOTIFS */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="text-purple-600" />
                Répartition des motifs
              </h2>

              {motifs.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between p-2 bg-gray-50 mb-2 rounded"
                >
                  <span>{m.motif}</span>
                  <span className="font-bold text-purple-600">
                    {m.total}
                  </span>
                </div>
              ))}
            </div>

            {/* ACTIVITE PAR DATE (RESTAURÉ + TRIÉ) */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <CalendarDays className="text-emerald-600" />
                Activité par date
              </h2>

              {sortedDates.map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between p-2 bg-gray-50 mb-2 rounded"
                >
                  <span>📅 {formatDate(d.date_consultation)}</span>
                  <span className="font-bold text-emerald-600">
                    {d.total}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}