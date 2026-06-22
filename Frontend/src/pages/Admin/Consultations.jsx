import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SidebarAdmin from "../../composants/SidebarAdmin";
import BoutonAjouterConsultation from "../../composants/BoutonAjouterConsultation";

import {
  getConsultations,
  getTotalConsultations,
  deleteConsultation,
} from "../JS/Consultations";

import { Trash2, Pencil } from "lucide-react";

export default function Consultations() {
  const [consultations, setConsultations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const res = await getConsultations();
    setConsultations(res.data || []);

    const stats = await getTotalConsultations();
    setTotal(stats.data?.total || 0);

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette consultation ?")) return;

    await deleteConsultation(id);
    setConsultations((prev) => prev.filter((c) => c.id !== id));
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* SIDEBAR FIXE */}
      <SidebarAdmin />

      {/* CONTENT avec décalage */}
      <div className="ml-0 md:ml-64 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des consultations
          </h1>

          
        </div>

        {/* TOTAL CARD */}
        <div className="mb-6 bg-white shadow rounded p-4 w-fit">
          <p className="text-gray-500">Total consultations</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">

          {loading ? (
            <p className="p-4 text-gray-500">Chargement...</p>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Employé</th>
                  <th className="p-3">Médecin</th>
                  <th className="p-3">Motif</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {consultations.map((c) => {
                  const id = c.id;

                  return (
                    <tr key={id} className="border-t hover:bg-gray-50">

                      <td className="p-3">
                        {formatDate(c.date_consultation)}
                      </td>

                      <td className="p-3">
                        {c.employe_nom} {c.employe_prenom}
                      </td>

                      <td className="p-3">
                        {c.medecin_nom} {c.medecin_prenom}
                      </td>

                      <td className="p-3">{c.motif}</td>

                      <td className="p-3 flex justify-center gap-4">

                        <Link
                          to={`/modifier-consultation/${id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(id)}
                          className="text-red-600 hover:text-red-800"
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