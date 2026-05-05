require("dotenv").config();

const mysql = require("mysql2/promise");


//CONFIGURATION POOL MYSQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // 🔥 gestion des connexions (important pour API)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;