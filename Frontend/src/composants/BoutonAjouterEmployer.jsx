import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function BoutonAjouterEmployer({
  label = "Ajouter employé",
  to = "/register",
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`
        inline-flex items-center gap-2
        bg-green-600 hover:bg-green-700
        text-white
        px-4 py-2
        rounded-lg
        shadow-sm hover:shadow-md
        transition-all duration-200
        active:scale-95
        text-sm font-medium
        ${className}
      `}
    >
      <Plus size={18} />
      {label}
    </Link>
  );
}