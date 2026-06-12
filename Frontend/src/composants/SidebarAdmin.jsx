import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Stethoscope,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";

import BoutonDeconnexion from "./BoutonDeconnexion";

export default function SidebarAdmin() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full md:w-64 bg-blue-700 text-white md:min-h-screen flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-blue-500">
        <h1 className="text-lg font-bold">Administrateur</h1>

        {/* menu mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded bg-blue-600"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* MENU */}
      <nav className={`flex-1 p-3 space-y-2 ${open ? "block" : "hidden"} md:block`}>

        <Link to="/dashboard-admin"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-600"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link to="/employes"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-600"
        >
          <Users size={18} />
          Employés
        </Link>

      

        <Link to="/consultations"
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-600"
        >
          <Stethoscope size={18} />
          Consultations
        </Link>

        
      </nav>

      {/* FOOTER / LOGOUT */}
      <div className="border-t border-blue-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-200 hover:text-red-400 cursor-pointer">
          <LogOut size={18} />
          <BoutonDeconnexion />
        </div>
      </div>
    </div>
  );
}