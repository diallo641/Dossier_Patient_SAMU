import { useEffect, useState } from "react";
import SidebarAdmin from "../../composants/SidebarAdmin";
import CarteStat from "../../composants/CarteStat";

import {
  getTotalEmployes,
  getTotalConsultations,
  getUserStats,
  getEmployesByService,
  getEmployesByRole,
} from "../JS/DashboardAdmin";

export default function DashboardAdmin() {

  const [stats, setStats] = useState({
    employes: 0,
    consultations: 0,
    users: 0,
  });

  const [serviceData, setServiceData] = useState([]);
  const [roleData, setRoleData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          emp,
          cons,
          usr,
          service,
          role,
        ] = await Promise.all([
          getTotalEmployes(),
          getTotalConsultations(),
          getUserStats(),
          getEmployesByService(),
          getEmployesByRole(),
        ]);

        setStats({
          employes: emp || 0,
          consultations: cons || 0,
          users: usr || 0,
        });

        setServiceData(service || []);
        setRoleData(role || []);

      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <SidebarAdmin />

      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Dashboard Administrateur
        </h1>

        {/* LOADING */}
        {loading ? (
          <div className="text-gray-600">
            Chargement des statistiques...
          </div>
        ) : (
          <>
            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              <CarteStat titre="Employés" valeur={stats.employes} />
              <CarteStat titre="Consultations" valeur={stats.consultations} />
              <CarteStat titre="Utilisateurs" valeur={stats.users} />

            </div>

            {/* STATS AVANCÉES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* EMPLOYÉS PAR SERVICE */}
              <div className="bg-white p-4 rounded shadow">
                <h2 className="font-bold mb-3">Employés par service</h2>

                {serviceData.length === 0 ? (
                  <p className="text-gray-500">Aucune donnée</p>
                ) : (
                  serviceData.map((item, index) => (
                    <div key={index} className="flex justify-between border-b py-1">
                      <span>{item.service}</span>
                      <span className="font-bold">{item.total}</span>
                    </div>
                  ))
                )}
              </div>

              {/* EMPLOYÉS PAR RÔLE */}
              <div className="bg-white p-4 rounded shadow">
                <h2 className="font-bold mb-3">Employés par rôle</h2>

                {roleData.length === 0 ? (
                  <p className="text-gray-500">Aucune donnée</p>
                ) : (
                  roleData.map((item, index) => (
                    <div key={index} className="flex justify-between border-b py-1">
                      <span>Rôle {item.id_role}</span>
                      <span className="font-bold">{item.total}</span>
                    </div>
                  ))
                )}
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}