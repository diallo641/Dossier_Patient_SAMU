import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FolderOpen,
  User,
  Menu,
} from "lucide-react";

import BoutonDeconnexion from "./BoutonDeconnexion";

export default function SidebarEmploye() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full md:w-64 bg-green-700 text-white md:min-h-screen flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-green-500">
        <h1 className="text-lg font-bold">Espace Employé</h1>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded bg-green-600"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* MENU */}
      <nav className={`flex-1 p-3 space-y-2 ${open ? "block" : "hidden"} md:block`}>

        <Link
          to="/employe"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-green-600"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/employe/consultations"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-green-600"
        >
          <Calendar size={18} />
          Consultations
        </Link>

        <Link
          to="/employe/dossier"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-green-600"
        >
          <FileText size={18} />
          Dossier médical
        </Link>

        <Link
          to="/employe/documents"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-green-600"
        >
          <FolderOpen size={18} />
          Fichiers médicaux
        </Link>

        <Link
          to="/employe/profil"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-green-600"
        >
          <User size={18} />
          Profil
        </Link>
      </nav>

      {/* FOOTER / LOGOUT */}
      <div className="border-t border-green-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-200 hover:text-red-300 cursor-pointer">
          <BoutonDeconnexion />
        </div>
      </div>
    </div>
  );
}