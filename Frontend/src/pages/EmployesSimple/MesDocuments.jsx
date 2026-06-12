import { useEffect, useState } from "react";
import SidebarEmploye from "../../composants/SidebarEmploye";
import { getMonProfil, getFichiersMedicauxByEmploye } from "../JS/EmployeSimple";

export default function MesDocuments() {
  const [fichiers, setFichiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employe, setEmploye] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const profil = await getMonProfil();
        setEmploye(profil);

        const data = await getFichiersMedicauxByEmploye(profil.id);
        setFichiers(data);
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarEmploye />

      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📁 Fichiers médicaux de : <span className="font-semibold text-blue-600">
            {employe.prenom} {employe.nom}
          </span>
        </h1>


        {fichiers.length === 0 ? (
          <p className="text-gray-500">Aucun fichier médical disponible.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {fichiers.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >

                <h2 className="font-semibold text-gray-800 mb-2">
                  {file.nom_fichier}
                </h2>

                <p className="text-sm text-gray-600">
                  📂 Catégorie : {file.categorie || "Non définie"}
                </p>

                <p className="text-sm text-gray-600">
                  🧾 Type : {file.type_fichier}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  📅 Upload :{" "}
                  {new Date(file.date_upload).toLocaleDateString()}
                </p>

                {/* ACTION */}
                <a
                  href={`http://localhost:3000/${file.chemin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  📄 Ouvrir
                </a>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}