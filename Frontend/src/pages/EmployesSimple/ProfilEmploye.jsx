import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarEmploye from "../../composants/SidebarEmploye";
import { getMonProfil } from "../JS/EmployeSimple";
import { Pencil } from "lucide-react";

export default function ProfilEmploye() {
  const [employe, setEmploye] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const data = await getMonProfil();

      if (!data) {
        setEmploye(null);
        setLoading(false);
        return;
      }

      setEmploye(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return <p className="p-4">⏳ Chargement...</p>;
  }

  if (!employe) {
    return <p className="p-4 text-red-500">❌ Profil introuvable</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarEmploye />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          👤 Mon Profil
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Bienvenue{" "}
          <span className="font-semibold text-blue-600">
            {employe.prenom} {employe.nom}
          </span>
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PERSONNEL */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Informations personnelles
            </h2>

            <div className="space-y-3">
              <p><span className="font-semibold">Nom :</span> {employe.nom}</p>
              <p><span className="font-semibold">Prénom :</span> {employe.prenom}</p>
              <p>
                <span className="font-semibold">Date de naissance :</span>{" "}
                {employe.date_naissance
                  ? new Date(employe.date_naissance).toLocaleDateString("fr-FR")
                  : "Non renseignée"}
              </p>
              <p><span className="font-semibold">Téléphone :</span> {employe.telephone || "Non renseigné"}</p>
            </div>
          </div>

          {/* PROFESSIONNEL */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              Informations professionnelles
            </h2>

            <div className="space-y-3">
              <p><span className="font-semibold">Poste :</span> {employe.poste || "Non renseigné"}</p>
              <p><span className="font-semibold">Service :</span> {employe.service || "Non renseigné"}</p>
              <p><span className="font-semibold">Type :</span> {employe.type || "Non renseigné"}</p>
            </div>
          </div>

          {/* MEDICAL */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Informations médicales
            </h2>

            <div className="space-y-3">
              <p><span className="font-semibold">Groupe sanguin :</span> {employe.groupe_sanguin || "Non renseigné"}</p>
              <p><span className="font-semibold">Allergies :</span> {employe.allergies || "Aucune information"}</p>
              <p><span className="font-semibold">Antécédents médicaux :</span> {employe.antecedents_medicaux || "Aucune information"}</p>
              <p><span className="font-semibold">Aptitudes médicales :</span> {employe.aptitudes_medicales || "Aucune information"}</p>
            </div>
          </div>

          {/* COMPTE + ACTION */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
            
            <div>
              <h2 className="text-xl font-semibold text-purple-600 mb-4">
                Informations du compte
              </h2>

              <div className="space-y-3">
                <p><span className="font-semibold">Email :</span> {employe.email}</p>
              </div>
            </div>

            {/* BOUTON MODIFIER BIEN POSITIONNÉ */}
            <div className="mt-6">
              <Link
                to="/employe/profil/modifier"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-medium"
              >
                <Pencil size={18} />
                Modifier le profil
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}