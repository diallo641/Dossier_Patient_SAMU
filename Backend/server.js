require("dotenv").config();

const app = require("./app");
const db = require("./config/db");

// =============================
// 🔌 TEST BASE DE DONNÉES
// =============================
async function testDB() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("✅ Base de données connectée :", rows[0].result);
  } catch (err) {
    console.log("❌ Erreur connexion DB :", err);
  }
}

testDB();

// =============================
// 🚀 PORT DU SERVEUR
// =============================
const PORT = process.env.PORT || 3000;

// =============================
// 🟢 LANCEMENT SERVEUR
// =============================
app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 Serveur démarré avec succès");
  console.log(`🌐 URL : http://localhost:${PORT}`);
  console.log("=================================");
});