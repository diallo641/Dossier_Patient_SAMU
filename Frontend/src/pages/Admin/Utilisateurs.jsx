import { useEffect, useState } from "react";
import SidebarAdmin from "../../composants/SidebarAdmin";
import BoutonAjouterEmployer from "../../composants/BoutonAjouterEmployer";

import { getEmployes, deleteEmploye } from "../JS/EmployeAdmin";

import { Trash2, Eye } from "lucide-react";

export default function EmployesAdmin() {
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getEmployes();
      setEmployes(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet employé ?")) return;

    try {
      await deleteEmploye(id);
      setEmployes(employes.filter((e) => e.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <SidebarAdmin />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des employés
          </h1>

          <BoutonAjouterEmployer />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">

          {loading ? (
            <p className="p-4">Chargement...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Nom</th>
                  <th className="p-3">Prénom</th>
                  <th className="p-3">Poste</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Téléphone</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employes.map((emp) => (
                  <tr key={emp.id} className="border-t hover:bg-gray-50">

                    <td className="p-3">{emp.nom}</td>
                    <td className="p-3">{emp.prenom}</td>
                    <td className="p-3">{emp.poste}</td>
                    <td className="p-3">{emp.service}</td>
                    <td className="p-3">{emp.telephone}</td>

                    <td className="p-3 flex justify-center gap-3">

                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

      </div>
    </div>
  );
}