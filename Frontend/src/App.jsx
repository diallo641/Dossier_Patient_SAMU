import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Connexion from "./pages/authentification/Connexion";
import Register from "./pages/authentification/Register";
import ForgotPassword from "./pages/authentification/ForgotPassword";
import ResetPassword from "./pages/authentification/ResetPassword";
import Home from "./pages/Home";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
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

          {/* fallback (optionnel mais pro) */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}