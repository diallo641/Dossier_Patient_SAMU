import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import SidebarMedecin from "../../composants/SidebarMedecin";
import {
  getConsultationById,
  getFichiersByConsultation,
  getEmployeById,
} from "../JS/Medecin";

import {
  CalendarDays,
  Activity,
  FileDown,
  ArrowLeft,
  User,
  Stethoscope,
  FileText,
  Phone,
  Mail,
  Briefcase,
  HeartPulse,
  AlertTriangle,
  Droplets,
  Edit,
} from "lucide-react";

export default function DetailConsultationMedecin() {
  const { id } = useParams();

  const [consultation, setConsultation] = useState(null);
  const [patient, setPatient] = useState(null);
  const [fichiers, setFichiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getConsultationById(id);
        const files = await getFichiersByConsultation(id);

        setConsultation(data);
        setFichiers(files || []);

        const employeId = data?.id_employe;

        if (employeId) {
          const employeData = await getEmployeById(employeId);
          setPatient(employeData);
        }
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

  if (!consultation) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <SidebarMedecin />
        <div className="flex-1 ml-64 p-6 text-red-500">
          ❌ Consultation introuvable
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarMedecin />

      <div className="flex-1 ml-64 p-6 max-w-6xl">

        {/* BACK */}
        <Link
          onClick={() => window.history.back()}
          className="text-blue-600 flex items-center gap-2 mb-6 hover:underline"
        >
          <ArrowLeft size={16} />
          Retour
        </Link>

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          📄 Dossier de consultation
        </h1>

        {/* ================= EMPLOYÉ ================= */}
        {patient && (
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500 mb-6 space-y-3">

            <h2 className="font-bold text-green-600 flex items-center gap-2 text-lg">
              <User size={18} className="text-green-600" />
              Informations de l'employé
            </h2>

            <div className="grid grid-cols-2 gap-3 text-gray-700">

              <p><User size={14} className="inline mr-1 text-blue-500" />
                <b>Nom :</b> {patient.prenom} {patient.nom}
              </p>

              <p><Phone size={14} className="inline mr-1 text-green-500" />
                <b>Téléphone :</b> {patient.telephone || "N/A"}
              </p>

              <p><Mail size={14} className="inline mr-1 text-red-500" />
                <b>Email :</b> {patient.email || "N/A"}
              </p>

              <p><Briefcase size={14} className="inline mr-1 text-purple-500" />
                <b>Service :</b> {patient.service || "N/A"}
              </p>

              <p><Briefcase size={14} className="inline mr-1 text-indigo-500" />
                <b>Poste :</b> {patient.poste || "N/A"}
              </p>

              <p><AlertTriangle size={14} className="inline mr-1 text-orange-500" />
                <b>Allergies :</b> {patient.allergies || "N/A"}
              </p>

              <p><HeartPulse size={14} className="inline mr-1 text-pink-500" />
                <b>Aptitudes :</b> {patient.aptitudes_medicales || "N/A"}
              </p>

              <p><Activity size={14} className="inline mr-1 text-gray-500" />
                <b>Antécédents :</b> {patient.antecedents_medicaux || "N/A"}
              </p>

              <p><Droplets size={14} className="inline mr-1 text-cyan-500" />
                <b>Groupe sanguin :</b> {patient.groupe_sanguin || "N/A"}
              </p>

            </div>
          </div>
        )}

        {/* ================= CONSULTATION ================= */}
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500 space-y-3">

          {/* HEADER + BOUTON MODIFIER */}
          <div className="flex justify-between items-center mb-2">

            <h2 className="font-bold text-blue-600 flex items-center gap-2 text-lg">
              <Stethoscope size={18} className="text-blue-600" />
              Détails de la consultation
            </h2>

            <Link
              to={`/medecin/consultation/modifier/${id}`}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
            >
              <Edit size={16} />
              Modifier
            </Link>

          </div>

          <p className="flex items-center gap-2 text-gray-700">
            <CalendarDays size={16} className="text-blue-500" />
            <b>Date :</b>{" "}
            {new Date(consultation.date_consultation).toLocaleDateString("fr-FR")}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <User size={16} className="text-green-600" />
            <b>Médecin :</b>{" "}
            {consultation.medecin_prenom} {consultation.medecin_nom}
          </p>

          <p className="flex items-center gap-2">
            <Stethoscope size={16} className="text-purple-600" />
            <b>Motif :</b> {consultation.motif}
          </p>

          <p className="flex items-center gap-2">
            <Activity size={16} className="text-red-500" />
            <b>Diagnostic :</b> {consultation.diagnostic}
          </p>

          <p className="flex items-center gap-2">
            <FileText size={16} className="text-orange-500" />
            <b>Traitement :</b> {consultation.traitement}
          </p>

          <p className="flex items-center gap-2">
            <FileText size={16} className="text-gray-500" />
            <b>Observation :</b> {consultation.observation}
          </p>

        </div>

        {/* ================= FICHIERS ================= */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow">

          <h2 className="font-bold mb-4 flex items-center gap-2 text-purple-600">
            <FileDown size={18} />
            Fichiers médicaux associés
          </h2>

          {fichiers.length === 0 ? (
            <p className="text-gray-500">Aucun fichier disponible</p>
          ) : (
            <div className="flex flex-col gap-2">

              {fichiers.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between border rounded px-3 py-2 bg-gray-50 hover:bg-gray-100"
                >
                  <span>
                    📎 <b>{f.nom_fichier}</b> - {f.categorie}
                  </span>

                  <a
                    href={`http://localhost:3000/${f.chemin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm hover:underline"
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