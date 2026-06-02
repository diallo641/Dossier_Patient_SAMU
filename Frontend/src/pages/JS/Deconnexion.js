import { useNavigate } from "react-router-dom";

export function useDeconnexion() {
  const navigate = useNavigate();

  const deconnecterUtilisateur = () => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment vous déconnecter ?"
    );

    if (!confirmation) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return { deconnecterUtilisateur };
}