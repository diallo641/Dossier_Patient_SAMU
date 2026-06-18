import { useNavigate } from "react-router-dom";

export function useConnexion() {
  const navigation = useNavigate();

  const connexionUtilisateur = async (e, setChargement, setErreur) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const email = form.get("email");
    const mot_de_passe = form.get("mot_de_passe");

    setChargement(true);
    setErreur("");

    try {
      const reponse = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          mot_de_passe,
        }),
      });

      const donnees = await reponse.json();

      console.log("📦 REPONSE BACKEND:", donnees);

      if (!reponse.ok) {
        setErreur(donnees.message);
        return;
      }

      // =============================
      // SAUVEGARDE LOCALSTORAGE
      // =============================
      localStorage.setItem("token", donnees.token);
      localStorage.setItem("utilisateur", JSON.stringify(donnees.user));

      // =============================
      // ROLE (SANS MODIFICATION)
      // =============================
      const role = donnees.user.role?.trim();

      console.log("👤 ROLE:", role);

      // =============================
      // REDIRECTION
      // =============================
      if (role === "Medecin") {
        navigation("/medecin");
      } 
      else if (role === "Admin") {
        navigation("/dashboard-admin");
      } 
      else {
        navigation("/employe");
      }

    } catch (err) {
      console.log("💥 ERREUR:", err);
      setErreur("Erreur serveur");
    } finally {
      setChargement(false);
    }
  };

  return { connexionUtilisateur };
}