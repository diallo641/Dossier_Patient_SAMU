import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SidebarAdmin from "../../composants/SidebarAdmin";
import BoutonAjouterEmployer from "../../composants/BoutonAjouterEmployer";

import { getEmployes, deleteEmploye } from "../JS/EmployeAdmin";

import { Trash2, Pencil } from "lucide-react";

export default function EmployesAdmin() {
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getEmployes();
    setEmployes(res.data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet employé ?")) return;
    await deleteEmploye(id);
    setEmployes((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <SidebarAdmin />

      {/* CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des employés
          </h1>

          <BoutonAjouterEmployer />
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">

          {loading ? (
            <p className="p-4 text-gray-500">Chargement...</p>
          ) : (
            <table className="w-full text-sm">

              {/* HEADER TABLE */}
              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="p-3">Nom</th>
                  <th className="p-3">Prénom</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Poste</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Téléphone</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              {/* BODY TABLE */}
              <tbody>
                {employes.map((emp) => {
                  const id = emp.id || emp._id;

                  return (
                    <tr key={id} className="border-t hover:bg-gray-50">

                      <td className="p-3">{emp.nom}</td>
                      <td className="p-3">{emp.prenom}</td>
                      <td className="p-3">{emp.type}</td>
                      <td className="p-3">{emp.poste}</td>
                      <td className="p-3">{emp.service}</td>
                      <td className="p-3">{emp.telephone}</td>

                      {/* ACTIONS */}
                      <td className="p-3 flex justify-center gap-4">

                        {/* MODIFIER */}
                        <Link
                          to={`/modifier-employe/${id}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <Pencil size={18} />
                        </Link>

                        {/* SUPPRIMER */}
                        <button
                          onClick={() => handleDelete(id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          )}

        </div>

      </div>
    </div>
  );
}