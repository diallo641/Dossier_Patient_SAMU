import { useEffect, useState } from "react";
import SidebarMedecin from "../../composants/SidebarMedecin";
import { Link } from "react-router-dom";
import BoutonAjouterEmployeMedecin from "../../composants/BoutonAjouterEmployeMedecin";

import {
  getPatientsMedecin,
  getConsultationsMedecin,
} from "../JS/Medecin";

export default function ListePatientsMedecin() {
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const patientsRes = await getPatientsMedecin();
      const consultRes = await getConsultationsMedecin();

      setPatients(patientsRes || []);
      setConsultations(consultRes || []);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarMedecin />

      <div className="ml-64 flex-1 p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-bold">
            Mes patients
          </h1>

          <BoutonAjouterEmployeMedecin />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* PATIENTS */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <p className="text-gray-500">Patients suivis</p>
            <p className="text-3xl font-bold text-blue-600">
              {patients.length}
            </p>
          </div>

          {/* CONSULTATIONS */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <p className="text-gray-500">Consultations totales</p>
            <p className="text-3xl font-bold text-emerald-600">
              {consultations.length}
            </p>
          </div>

        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">Chargement...</p>
        )}

        {/* EMPTY */}
        {!loading && patients.length === 0 && (
          <p className="text-gray-500">
            Aucun patient trouvé
          </p>
        )}

        {/* GRID PATIENTS */}
        {!loading && patients.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {patients.map((e) => (
              <div
                key={e.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border"
              >
                <h2 className="font-bold text-lg">
                  {e.nom} {e.prenom}
                </h2>

                <p className="text-sm text-gray-600">
                  🏷️ {e.poste || "Employé"}
                </p>

                <p className="text-sm text-gray-600">
                  🏢 {e.service || "Non défini"}
                </p>

                <p className="text-sm text-gray-600">
                  📞 {e.telephone || "Non renseigné"}
                </p>

                <div className="flex gap-2 mt-4">
                  <Link
  to={`/medecin/patient/${e.id}`}
  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
>
  Voir
</Link>
                  

                  <Link
  to={`/medecin/consultation/nouvelle/${e.id}`}
  className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700"
>
  Consultation
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