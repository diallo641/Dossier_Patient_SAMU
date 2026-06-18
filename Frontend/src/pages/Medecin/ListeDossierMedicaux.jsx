import { useEffect, useState } from "react";
import SidebarMedecin from "../../composants/SidebarMedecin";
import { getAllConsultations, getEmployeById } from "../JS/Medecin";

import {
  FileText,
  User,
  Search,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DossierMedicaux() {
  const [consultations, setConsultations] = useState([]);
  const [patientsMap, setPatientsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllConsultations();

        const sorted = (data || []).sort(
          (a, b) =>
            new Date(b.date_consultation) -
            new Date(a.date_consultation)
        );

        setConsultations(sorted);

        // 🔥 patients uniques
        const uniqueIds = [
          ...new Set(sorted.map((c) => c.id_employe)),
        ];

        const map = {};

        for (const id of uniqueIds) {
          try {
            const emp = await getEmployeById(id);
            if (emp) map[id] = emp;
          } catch (err) {
            console.error(err);
          }
        }

        setPatientsMap(map);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 🔎 filtre
  const filteredPatients = Object.entries(patientsMap).filter(
    ([id, p]) => {
      const fullName = `${p.nom} ${p.prenom}`.toLowerCase();

      return (
        fullName.includes(search.toLowerCase()) ||
        String(id).includes(search)
      );
    }
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <SidebarMedecin />
        <div className="flex-1 ml-64 p-6">
          ⏳ Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarMedecin />

      <div className="flex-1 ml-64 p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-emerald-600" />
            Dossiers médicaux
          </h1>

          <p className="text-gray-500 text-sm">
            Gestion complète des dossiers patients
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm font-medium">
              Patients enregistrés
            </p>
            <h2 className="text-2xl font-bold text-blue-600">
              {Object.keys(patientsMap).length}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-emerald-500">
            <p className="text-gray-500 text-sm font-medium">
              Consultations totales
            </p>
            <h2 className="text-2xl font-bold text-emerald-600">
              {consultations.length}
            </h2>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-6 flex items-center gap-2 bg-white p-3 rounded shadow">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un patient..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LIST PATIENTS */}
        {filteredPatients.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-gray-500">
            Aucun patient trouvé
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {filteredPatients.map(([id, p]) => (
              <div
                key={id}
                className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition"
              >

                {/* HEADER PATIENT */}
                <div className="flex items-center gap-3 mb-4">

                  <div className="bg-emerald-100 text-emerald-700 p-2 rounded-full">
                    <User size={16} />
                  </div>

                  <div>
                    <p className="text-gray-900">
                      <span className="font-bold">{p.nom}</span>{" "}
                      <span className="font-medium">{p.prenom}</span>
                    </p>

                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">ID :</span> {id}
                    </p>
                  </div>

                </div>

                {/* INFO CONSULTATIONS */}
                <div className="bg-gray-50 p-3 rounded mb-4">

                  <p className="flex items-center gap-2 text-gray-700">
                    <Activity size={14} className="text-blue-500" />

                    <span>
                      <span className="font-bold text-gray-900">
                        {consultations.filter(
                          (c) => c.id_employe == id
                        ).length}
                      </span>{" "}
                      consultations enregistrées
                    </span>
                  </p>

                </div>

                {/* ACTION */}
                <div className="flex justify-end">
                  <Link
                    to={`/dossier-medical/${id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                  >
                    Voir dossier
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