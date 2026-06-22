import { useEffect, useState } from "react";
import SidebarAdmin from "../../composants/SidebarAdmin";

import {
  getFichiersMedicaux,
  deleteFichierMedical,
} from "../JS/FichierMedicauxAdmin";

import { Trash2, FileDown } from "lucide-react";

export default function FichiersMedicauxAdmin() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    radio: 0,
    scanner: 0,
    analyse: 0,
    ordonnance: 0,
    certificat: 0,
    echographie: 0,
    autre: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getFichiersMedicaux();
      const data = res.data?.data || [];

      setFiles(data);

      const newStats = {
        total: data.length,
        radio: 0,
        scanner: 0,
        analyse: 0,
        ordonnance: 0,
        certificat: 0,
        echographie: 0,
        autre: 0,
      };

      data.forEach((f) => {
        if (Object.prototype.hasOwnProperty.call(newStats, f.categorie)) {
          newStats[f.categorie]++;
        } else {
          newStats.autre++;
        }
      });

      setStats(newStats);
    } catch (err) {
      console.error("Erreur fichiers médicaux:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce fichier ?")) return;

    try {
      await deleteFichierMedical(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR FIXE */}
      <div className="hidden md:block w-64 fixed h-full">
        <SidebarAdmin />
      </div>

      {/* CONTENT */}
      <div className="flex-1 md:ml-64 p-6">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Fichiers médicaux
        </h1>

        {/* ======================
            STATS CARDS
        ====================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <Card title="Total fichiers" value={stats.total} />

          <Card title="Radio" value={stats.radio} />
          <Card title="Scanner" value={stats.scanner} />
          <Card title="Analyse" value={stats.analyse} />
          <Card title="Ordonnances" value={stats.ordonnance} />
          <Card title="Certificats" value={stats.certificat} />
          <Card title="Échographies" value={stats.echographie} />
          <Card title="Autres" value={stats.autre} />
        </div>

        {/* ======================
            TABLE
        ====================== */}
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Nom fichier</th>
                  <th className="p-3 text-left">Catégorie</th>
                  <th className="p-3 text-left">Taille</th>
                  <th className="p-3 text-left">Prénom</th>
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {files.map((f) => (
                  <tr key={f.id} className="border-t hover:bg-gray-50">

                    <td className="p-3">{f.nom_fichier}</td>
                    <td className="p-3 capitalize">{f.categorie}</td>
                    <td className="p-3">
                      {(f.taille_fichier / 1024).toFixed(1)} KB
                    </td>
                    <td className="p-3">{f.uploaded_by_prenom}</td>
                    <td className="p-3">{f.uploaded_by_nom}</td>

                    <td className="p-3 flex justify-center gap-4">

                      <a
                        href={`http://localhost:3000/${f.chemin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FileDown size={18} />
                      </a>

                      <button
                        onClick={() => handleDelete(f.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}

/* ====================== */
/* SMALL CARD COMPONENT   */
/* ====================== */
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
}