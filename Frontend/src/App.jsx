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
import DashboardEmploye from "./pages/EmployesSimple/DashboardEmploye";
import MesConsultations from "./pages/EmployesSimple/MesConsultations";
import DetailConsultation from "./pages/EmployesSimple/DetailConsultation";
import DossierMedical from "./pages/EmployesSimple/DossierMedical";
import MesDocuments from "./pages/EmployesSimple/MesDocuments";
import ProfilEmploye from "./pages/EmployesSimple/ProfilEmploye";
import ModifierProfil from "./pages/EmployesSimple/ModifierProfil";
import DashboardMedecin from "./pages/Medecin/DashboardMedecin";
import ListeEmployesMedecin from "./pages/Medecin/ListeEmployesMedecin";
import AjouterConsultationMedecin from "./pages/Medecin/AjouterConsultationMedecin";
import DetailConsultationMedecin from "./pages/Medecin/DetailConsultationMedecin";
import DetailUneConsultation from "./pages/Medecin/DetailUneConsultation";
import ModifierConsultationMedecin from "./pages/Medecin/ModifierConsultationMedecin";
import ConsultationsMedecin from "./pages/Medecin/ConsultationsMedecin";
import ListeDossierMedicaux from "./pages/Medecin/ListeDossierMedicaux";
import DetailDossierMedical from "./pages/Medecin/DetailDossierMedical";
import ActivitesMedecin from "./pages/Medecin/ActivitesMedecin";
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
          <Route path="/employe" element={<DashboardEmploye />} />
          <Route path="/employe/consultations" element={<MesConsultations />} />
          <Route path="/employe/consultations/:id" element={<DetailConsultation />}/>
          <Route path="/employe/dossier" element={<DossierMedical />} />
          <Route path="/employe/documents" element={<MesDocuments />} />
          <Route path="/employe/profil" element={<ProfilEmploye />} />
          <Route path="/employe/profil/modifier" element={<ModifierProfil />} />
          <Route path="/medecin" element={<DashboardMedecin />} />
          <Route path="/mes-patients" element={<ListeEmployesMedecin />} />
          <Route path="/medecin/consultation/nouvelle/:idPatient" element={<AjouterConsultationMedecin />}/>
          <Route path="/medecin/consultations/:id" element={<DetailConsultationMedecin />}/>
          <Route path="/medecin/patient/:id" element={<DetailConsultationMedecin />} />
          <Route path="/medecin/consultation/:id" element={<DetailUneConsultation />} />
          <Route path="/medecin/consultation/modifier/:id" element={<ModifierConsultationMedecin />} />
          <Route path="/consultations-medecin" element={<ConsultationsMedecin />} />
          <Route path="/dossiers-medicaux" element={<ListeDossierMedicaux />} />
          <Route path="/dossier-medical/:id" element={<DetailDossierMedical />} />
          <Route path="/activites-medecin" element={<ActivitesMedecin />} />
          {/* fallback (optionnel mais pro) */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}