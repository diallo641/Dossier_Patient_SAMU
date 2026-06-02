import { useEffect, useState } from "react";
import {
  getEmployes,
  getConsultations,
  getRoles,
  getUserStats,
} from "../JS/DashboardAdmin";

function DashboardAdmin() {
  const [employes, setEmployes] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const e = await getEmployes();
        const c = await getConsultations();
        const r = await getRoles();
        const s = await getUserStats();

        console.log("EMPLOYES API:", e);

        setEmployes(Array.isArray(e) ? e : e.data || []);
        setConsultations(Array.isArray(c) ? c : c.data || []);
        setRoles(Array.isArray(r) ? r : r.data || []);
        setStats(s || {});

      } catch (error) {
        console.error("Erreur Dashboard :", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Tableau de bord Administrateur
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Employés</h2>
          <p className="text-3xl font-bold">{employes.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Consultations</h2>
          <p className="text-3xl font-bold">{consultations.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Rôles</h2>
          <p className="text-3xl font-bold">{roles.length}</p>
        </div>

      </div>

      {/* TABLE EMPLOYES */}
      {/* TABLE EMPLOYES */}
<div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
  <h2 className="text-xl font-bold mb-4">
    Liste des employés
  </h2>

  <table className="w-full min-w-[900px] border-collapse">
    <thead>
      <tr className="border-b bg-gray-50 text-left">
        <th className="py-3 px-3">ID</th>
        <th className="py-3 px-3">Nom</th>
        <th className="py-3 px-3">Prénom</th>
        <th className="py-3 px-3">Poste</th>
        <th className="py-3 px-3">Service</th>
        <th className="py-3 px-3">Téléphone</th>
        <th className="py-3 px-3">Groupe sanguin</th>
      </tr>
    </thead>

    <tbody>
      {employes.length > 0 ? (
        employes.map((emp) => (
          <tr key={emp.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-3">{emp.id}</td>
            <td className="py-2 px-3">{emp.nom || "-"}</td>
            <td className="py-2 px-3">{emp.prenom || "-"}</td>
            <td className="py-2 px-3">{emp.poste || "-"}</td>
            <td className="py-2 px-3">{emp.service || "-"}</td>
            <td className="py-2 px-3">{emp.telephone || "-"}</td>
            <td className="py-2 px-3">{emp.groupe_sanguin || "-"}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="text-center py-6 text-gray-500">
            Aucun employé trouvé
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default DashboardAdmin;