import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Connexion from "./pages/authentification/Connexion";
import Register from "./pages/authentification/Register";
import ForgotPassword from "./pages/authentification/ForgotPassword";
import ResetPassword from "./pages/authentification/ResetPassword";
import Home from "./pages/Home";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import Consultations from "./pages/Admin/Consultations";
import Employes from "./pages/Admin/Employes";
import FichierMedicaux from "./pages/Admin/FichiersMedicaux";
import Utilisateurs from "./pages/Admin/Utilisateurs";
import ModifierEmploye from "./pages/Admin/ModifierEmploye";
import ModifierConsultation from "./pages/Admin/ModifierConsultation";
import AjouterConsultation from "./pages/Consultations/AjouterConsultation";
import Inscription from "./pages/Autres/Inscription";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* AUTH */}
          <Route path="/login" element={<Connexion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/employes" element={<Employes />} />
          <Route path="/fichiers-medicaux" element={<FichierMedicaux />} />
          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/modifier-employe/:id" element={<ModifierEmploye />} />
          <Route path="/modifier-consultation/:id" element={<ModifierConsultation />} />
          <Route path="/ajouter-consultation" element={<AjouterConsultation />} />
          {/* fallback (optionnel mais pro) */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}