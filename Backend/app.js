const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import des routes (exemples)
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const employeRoutes = require("./routes/employeRoutes");
const medecinRoutes = require("./routes/medecinRoutes");

const app = express();


//MIDDLEWARES
app.use(cors());
app.use(express.json()); // pour lire JSON


//ROUTES
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", require("./routes/testRoutes"));


//ROUTE pour tester
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API Gestion Médicale fonctionnelle",
  });
});

module.exports = app;