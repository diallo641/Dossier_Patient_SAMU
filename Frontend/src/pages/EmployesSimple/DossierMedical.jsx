import { useEffect, useState } from "react";
import SidebarEmploye from "../../composants/SidebarEmploye";
import { getMonProfil, getDossierMedical } from "../JS/EmployeSimple";

import {
  Activity,
  AlertTriangle,
  Droplets,
  FlaskConical,
  HeartPulse,
  FileText,
  CalendarDays,
  User,
  ClipboardList,
  FileDown,
} from "lucide-react";

export default function DossierMedical() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const profil = await getMonProfil();
        const dossier = await getDossierMedical(profil.id);

        setData(dossier);
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

  if (!data) {
    return <p className="p-4 text-red-500">❌ Dossier introuvable</p>;
  }

  const { profil, consultations, fichiers } = data;

  const consultationsTriees = [...(consultations || [])].sort(
    (a, b) =>
      new Date(b.date_consultation) - new Date(a.date_consultation)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarEmploye />

      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🏥 Dossier médical
        </h1>

        <p className="text-gray-600 mb-6">
          {profil?.prenom} {profil?.nom}
        </p>

        {/* INFOS PATIENT */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Informations médicales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <p className="flex items-center gap-2">
              <Droplets size={18} className="text-red-500" />
              <span>
                <span className="font-semibold text-blue-600">Groupe sanguin:</span> {profil?.groupe_sanguin || "N/A"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-yellow-500" />
              <span>
                <span className="font-semibold text-blue-600">Allergies:</span> {profil?.allergies || "Aucune"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FlaskConical size={18} className="text-blue-500" />
              <span>
                <span className="font-semibold text-blue-600">Antécédents:</span> {profil?.antecedents_medicaux || "Aucun"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <HeartPulse size={18} className="text-green-500" />
              <span>
                <span className="font-semibold text-blue-600">Aptitudes:</span> {profil?.aptitudes_medicales || "N/A"}
              </span>
            </p>

          </div>
        </div>

        {/* CONSULTATIONS */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Historique des consultations
          </h2>

          {consultationsTriees.length === 0 ? (
            <p className="text-gray-500">Aucune consultation</p>
          ) : (
            <div className="space-y-3">

              {consultationsTriees.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg p-4 bg-gray-50 space-y-2"
                >

                  <p className="flex items-center gap-2 font-semibold text-gray-800">
                    <CalendarDays size={18} className="text-blue-600" />
                    {c.date_consultation
                      ? new Date(c.date_consultation).toLocaleDateString("fr-FR")
                      : "Date inconnue"}
                  </p>

                  <p className="flex items-center gap-2">
                    <User size={16} className="text-gray-600" />
                    <span><strong>Medecin : Dr</strong> {c.medecin_prenom} {c.medecin_nom}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <ClipboardList size={16} className="text-gray-600" />
                    <span><strong>Motif :</strong> {c.motif || "Aucun motif"}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Activity size={16} className="text-red-500" />
                    <span><strong>Diagnostic :</strong> {c.diagnostic || "N/A"}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <FileText size={16} className="text-green-600" />
                    <span><strong>Traitement :</strong> {c.traitement || "N/A"}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <FileText size={16} className="text-purple-600" />
                    <span><strong>Observation :</strong> {c.observation || "N/A"}</span>
                  </p>

                </div>
              ))}

            </div>
          )}
        </div>

        {/* FICHIERS */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-semibold text-purple-600 mb-4">
            Fichiers médicaux
          </h2>

          {fichiers.length === 0 ? (
            <p className="text-gray-500">Aucun fichier</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {fichiers.map((f) => (
                <div
                  key={f.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >

                  <p className="font-semibold flex items-center gap-2">
                    <FileDown size={18} className="text-purple-600" />
                    {f.nom_fichier}
                  </p>

                  <p className="text-sm text-gray-600">
                    📂 {f.categorie || "Non défini"}
                  </p>

                  <a
                    href={`http://localhost:3000/${f.chemin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-blue-600 hover:underline"
                  >
                    <FileText size={16} />
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