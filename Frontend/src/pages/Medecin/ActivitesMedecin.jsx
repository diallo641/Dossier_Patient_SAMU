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

export default function ActiviteMedecin() {
  const [consultations, setConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [motifs, setMotifs] = useState([]);
  const [dates, setDates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [consultRes, patientRes, motifRes, dateRes] =
          await Promise.all([
            getConsultationsMedecin(),
            getPatientsMedecin(),
            getMotifsMedecin(),
            getDatesMedecin(),
          ]);

        setConsultations(Array.isArray(consultRes) ? consultRes : []);
        setPatients(Array.isArray(patientRes) ? patientRes : []);
        setMotifs(Array.isArray(motifRes) ? motifRes : []);
        setDates(Array.isArray(dateRes) ? dateRes : []);
      } catch (err) {
        console.error(err);
        setError("Erreur chargement activité médicale");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("fr-FR") : "";

  // =========================
  // STATS
  // =========================
  const today = new Date().toISOString().split("T")[0];

  const todayCount = consultations.filter((c) =>
    c.date_consultation?.startsWith(today)
  ).length;

  const weekCount = consultations.filter((c) => {
    const diff =
      (new Date() - new Date(c.date_consultation)) /
      (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const monthCount = consultations.filter((c) => {
    const d = new Date(c.date_consultation);
    const now = new Date();
    return d.getMonth() === now.getMonth();
  }).length;

  // =========================
  // TRI DATES (IMPORTANT)
  // =========================
  const sortedDates = [...dates].sort(
    (a, b) =>
      new Date(b.date_consultation) - new Date(a.date_consultation)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarMedecin />

      <div className="ml-64 p-6 w-full">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="text-emerald-600" />
            Activité médicale
          </h1>
          <p className="text-gray-500 text-sm">
            Suivi des consultations et patients
          </p>
        </div>

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && (
          <>
            {/* ================= STATS CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

              <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
                <div className="flex items-center gap-2 text-blue-600">
                  <CalendarDays size={18} />
                  Aujourd’hui
                </div>
                <p className="text-3xl font-bold">{todayCount}</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
                <div className="flex items-center gap-2 text-purple-600">
                  <TrendingUp size={18} />
                  Semaine
                </div>
                <p className="text-3xl font-bold">{weekCount}</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-500">
                <div className="flex items-center gap-2 text-orange-600">
                  <Clock size={18} />
                  Mois
                </div>
                <p className="text-3xl font-bold">{monthCount}</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow border-l-4 border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FileText size={18} />
                  Total
                </div>
                <p className="text-3xl font-bold">
                  {consultations.length}
                </p>
              </div>
            </div>

            {/* ================= PATIENTS ================= */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
              <div className="flex items-center gap-2 text-blue-600">
                <Users size={18} />
                <h2 className="font-semibold">Patients suivis</h2>
              </div>

              <p className="text-3xl font-bold mt-2 text-blue-600">
                {patients.length}
              </p>
            </div>

            

           

           
          </>
        )}
      </div>
    </div>
  );
}