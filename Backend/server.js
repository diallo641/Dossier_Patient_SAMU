require("dotenv").config();

const app = require("./app");
const db = require("./config/db");


//TEST BASE DE DONNÉES

db.query("SELECT 1 + 1 AS result", (err, data) => {
  if (err) {
    console.log("❌ Erreur connexion DB :", err);
  } else {
    console.log("✅ Base de données connectée :", data[0].result);
  }
});

//PORT DU SERVEUR
const PORT = process.env.PORT || 3000;

// 🟢 LANCEMENT DU SERVEUR
app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 Serveur démarré avec succès");
  console.log(`🌐 URL : http://localhost:${PORT}`);
  console.log("=================================");
});