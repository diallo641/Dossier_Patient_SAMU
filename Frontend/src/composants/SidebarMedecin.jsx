import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  FileText,
  Activity,
  Calendar,
  LogOut,
  Menu,
} from "lucide-react";

import BoutonDeconnexion from "./BoutonDeconnexion";

export default function SidebarMedecin() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-emerald-700 text-white flex flex-col z-50">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-emerald-500">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Stethoscope size={18} />
          Médecin
        </h1>

        {/* MENU MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded bg-emerald-600"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* MENU */}
      <nav
        className={`flex-1 p-3 space-y-2 ${
          open ? "block" : "hidden"
        } md:block`}
      >
        <Link
          to="/medecin"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/mes-patients"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          <Users size={18} />
          Mes patients
        </Link>

        <Link
          to="/consultations-medecin"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          <Stethoscope size={18} />
          Consultations
        </Link>

        <Link
          to="/dossiers-medicaux"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          <FileText size={18} />
          Dossiers médicaux
        </Link>

        <Link
          to="/activites-medecin"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          <Activity size={18} />
          Activité
        </Link>
        {/* 
         <Link
          to="/planning-medecin"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          <Calendar size={18} />
          Planning
        </Link>
        */}
       

        {/* DÉCONNEXION */}
        <div className="border-t border-emerald-500 mt-4 pt-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded text-red-200 hover:bg-red-500 hover:text-white transition cursor-pointer">
            <LogOut size={18} />
            <BoutonDeconnexion />
          </div>
        </div>
      </nav>
    </div>
  );
}