import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import SidebarMedecin from "../../composants/SidebarMedecin";
import {
  getEmployeById,
  getConsultationsByEmploye,
  getFichiersByConsultation,
} from "../JS/Medecin";

import {
  User,
  CalendarDays,
  Activity,
  FlaskConical,
  Pill,
  ArrowRight,
  Briefcase,
  Building2,
  Droplets,
  AlertTriangle,
  ClipboardList,
  HeartPulse,
  ShieldAlert,
} from "lucide-react";

export default function DetailDossierMedical() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [filesByConsultation, setFilesByConsultation] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const emp = await getEmployeById(id);
        setPatient(emp);

        const data = await getConsultationsByEmploye(id);

        const sorted = (data || []).sort(
          (a, b) =>
            new Date(b.date_consultation) -
            new Date(a.date_consultation)
        );

        setConsultations(sorted);

        const map = {};

        for (const c of sorted) {
          const files = await getFichiersByConsultation(c.id);
          map[c.id] = files;
        }

        setFilesByConsultation(map);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <SidebarMedecin />
        <div className="flex-1 ml-64 p-6">⏳ Chargement...</div>
      </div>
    );
  }

  const lastConsultation =
    consultations.length > 0
      ? consultations[0].date_consultation
      : null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarMedecin />

      <div className="flex-1 ml-64 p-6">

        {/* ===================== */}
        {/* HEADER PATIENT */}
        {/* ===================== */}
        <div className="bg-white p-6 rounded-xl shadow mb-6 flex justify-between items-start">

          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full">
              <User size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {patient?.nom} {patient?.prenom}
              </h1>

              <p className="text-gray-500 text-sm">
                <span className="font-semibold">Matricule: </span> EMP{id}
              </p>
            </div>
          </div>

          <div className="text-right text-sm text-gray-600">
            <p>
              <span className="font-semibold text-blue-600">
                {consultations.length}
              </span>{" "}
              consultations
            </p>
            <p>
              Dernière :{" "}
              <span className="font-semibold text-gray-800">
                {lastConsultation
                  ? new Date(lastConsultation).toLocaleDateString("fr-FR")
                  : "Aucune"}
              </span>
            </p>
          </div>
        </div>

        {/* ===================== */}
        {/* INFOS PATIENT */}
        {/* ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
            <div className="flex items-center gap-2 text-blue-600">
              <Briefcase size={16} />
              <p className="text-sm font-semibold">Poste</p>
            </div>
            <p className="font-bold mt-1">{patient?.poste || "—"}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-emerald-500">
            <div className="flex items-center gap-2 text-emerald-600">
              <Building2 size={16} />
              <p className="text-sm font-semibold">Service</p>
            </div>
            <p className="font-bold mt-1">{patient?.service || "—"}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-500">
            <div className="flex items-center gap-2 text-red-600">
              <Droplets size={16} />
              <p className="text-sm font-semibold">Groupe sanguin</p>
            </div>
            <p className="font-bold mt-1">{patient?.groupe_sanguin || "—"}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-500">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle size={16} />
              <p className="text-sm font-semibold">Allergies</p>
            </div>
            <p className="font-bold mt-1">{patient?.allergies || "Aucune"}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
            <div className="flex items-center gap-2 text-purple-600">
              <ShieldAlert size={16} />
              <p className="text-sm font-semibold">Antécédents</p>
            </div>
            <p className="font-bold mt-1">{patient?.antecedents_medicaux || "—"}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-indigo-500">
            <div className="flex items-center gap-2 text-indigo-600">
              <HeartPulse size={16} />
              <p className="text-sm font-semibold">Aptitudes</p>
            </div>
            <p className="font-bold mt-1">
              {patient?.aptitudes_medicales || "—"}
            </p>
          </div>

        </div>

        {/* ===================== */}
        {/* CONSULTATIONS */}
        {/* ===================== */}
        <div className="space-y-5">

          {consultations.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-gray-500">
              Aucune consultation
            </div>
          ) : (
            consultations.map((c) => (
              <div
                key={c.id}
                className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition"
              >

                {/* DATE */}
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <CalendarDays size={16} className="text-blue-600" />
                  <span className="font-medium">
                    {new Date(c.date_consultation).toLocaleDateString("fr-FR")}
                  </span>
                </div>

                {/* MOTIF */}
                <p className="flex items-center gap-2 text-gray-800">
                  <Activity size={16} className="text-red-500" />
                  <b>Motif :</b> {c.motif}
                </p>

                {/* DIAGNOSTIC */}
                <p className="mt-2 flex items-center gap-2 text-gray-700">
                  <FlaskConical size={16} className="text-indigo-600" />
                  <b>Diagnostic :</b> {c.diagnostic}
                </p>

                {/* TRAITEMENT */}
                {c.traitement && (
                  <p className="mt-2 flex items-center gap-2 text-gray-600">
                    <Pill size={16} className="text-green-600" />
                    <b>Traitement :</b> {c.traitement}
                  </p>
                )}

                {/* OBSERVATION */}
                {c.observation && (
                  <p className="mt-2 text-gray-600">
                    <b>Observation :</b> {c.observation}
                  </p>
                )}

                {/* FILES */}
                <div className="mt-4 border-t pt-3 text-sm">
                  <p className="font-semibold text-gray-700 mb-2">
                    📁 Fichiers médicaux
                  </p>

                  {(filesByConsultation[c.id] || []).length === 0 ? (
                    <p className="text-gray-400">Aucun fichier</p>
                  ) : (
                    <ul className="ml-4 list-disc text-gray-600">
                      {filesByConsultation[c.id].map((f) => (
                        <li key={f.id}>📎 {f.nom_fichier}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* ACTION */}
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/medecin/consultation/${c.id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                  >
                    Voir consultation
                    <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}