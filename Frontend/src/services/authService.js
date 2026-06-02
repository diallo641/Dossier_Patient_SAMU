import api from "../utils/api";

// LOGIN
export const login = async (email, mot_de_passe) => {
  const res = await api.post("/auth/login", {
    email,
    mot_de_passe,
  });

  return res.data;
};

// REGISTER
export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (token, newPassword) => {
  const res = await api.post("/auth/reset-password", {
    token,
    newPassword,
  });

  return res.data;
};