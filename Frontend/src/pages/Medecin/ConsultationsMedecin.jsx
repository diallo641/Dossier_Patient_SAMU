import { useEffect, useState } from "react";
import SidebarMedecin from "../../composants/SidebarMedecin";
import { getAllConsultations, getEmployeById } from "../JS/Medecin";

import {
  CalendarDays,
  Search,
  User,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ConsultationsMedecin() {
  const [consultations, setConsultations] = useState([]);
  const [patientsMap, setPatientsMap] = useState({});
  const [loading, setLoading] = useState(true);

  // ======================
  // FILTRES MULTI-CHAMPS
  // ======================
  const [filters, setFilters] = useState({
    name: "",
    motif: "",
    diagnostic: "",
    id: "",
    date: "",
  });

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

        const uniqueIds = [
          ...new Set(sorted.map((c) => c.id_employe)),
        ];

        const map = {};

        for (const id of uniqueIds) {
          try {
            const emp = await getEmployeById(id);
            if (emp) map[id] = emp;
          } catch (err) {
            console.error("Erreur patient:", err);
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

  // ======================
  // FILTRE MULTICRITÈRES
  // ======================
  const filtered = consultations.filter((c) => {
    const patient = patientsMap[c.id_employe];

    const fullName = patient
      ? `${patient.nom} ${patient.prenom}`
      : "";

    const searchDate = new Date(c.date_consultation)
      .toISOString()
      .split("T")[0];

    return (
      fullName
        .toLowerCase()
        .includes(filters.name.toLowerCase()) &&
      (c.motif || "")
        .toLowerCase()
        .includes(filters.motif.toLowerCase()) &&
      (c.diagnostic || "")
        .toLowerCase()
        .includes(filters.diagnostic.toLowerCase()) &&
      String(c.id_employe).includes(filters.id) &&
      (filters.date === "" || searchDate === filters.date)
    );
  });

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
          <h1 className="text-2xl font-bold text-gray-800">
            Toutes les consultations du médecin 
          </h1>
          <p className="text-gray-500 text-sm">
            Vue globale des consultations médicales du médecin. Vous pouvez filtrer par nom, motif, diagnostic, ID patient ou date.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">Total consultations</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {consultations.length}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-emerald-500">
            <p className="text-gray-500 text-sm">Patients uniques</p>
            <h2 className="text-2xl font-bold text-emerald-600">
              {Object.keys(patientsMap).length}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
            <p className="text-gray-500 text-sm">Consultations récentes</p>
            <h2 className="text-2xl font-bold text-purple-600">
              {consultations.slice(0, 5).length}
            </h2>
          </div>

        </div>

        {/* FILTRES UI */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">

          <input
            className="p-2 border rounded"
            placeholder="Nom / Prénom"
            value={filters.name}
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />

          <input
            className="p-2 border rounded"
            placeholder="Motif"
            value={filters.motif}
            onChange={(e) =>
              setFilters({ ...filters, motif: e.target.value })
            }
          />

          <input
            className="p-2 border rounded"
            placeholder="Diagnostic"
            value={filters.diagnostic}
            onChange={(e) =>
              setFilters({ ...filters, diagnostic: e.target.value })
            }
          />

          <input
            className="p-2 border rounded"
            placeholder="ID patient"
            value={filters.id}
            onChange={(e) =>
              setFilters({ ...filters, id: e.target.value })
            }
          />

          <input
            type="date"
            className="p-2 border rounded"
            value={filters.date}
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value })
            }
          />

        </div>

        {/* LIST */}
        {filtered.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-gray-500">
            Aucune consultation trouvée
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {filtered.map((c) => {
              const patient = patientsMap[c.id_employe];

              return (
                <div
                  key={c.id}
                  className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition"
                >

                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-3">

                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-100 text-emerald-700 p-2 rounded-full">
                        <User size={16} />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {patient
                            ? `${patient.nom} ${patient.prenom}`
                            : "Patient inconnu"}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID: {c.id_employe}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <CalendarDays size={14} />
                      {new Date(c.date_consultation).toLocaleDateString("fr-FR")}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="flex items-center gap-2 text-gray-700">
                      <Activity size={16} className="text-red-500" />
                      <b>Motif :</b> {c.motif}
                    </p>

                    <p className="text-sm text-gray-700 mt-2 flex items-start gap-2">
                      <span className="text-indigo-600 mt-0.5">🧪</span>
                      <span>
                        <b>Diagnostic :</b> {c.diagnostic}
                      </span>
                    </p>
                  </div>

                  {/* ACTION */}
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/medecin/consultation/${c.id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      Voir détail
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}