const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// =============================
// USERS
// =============================
router.get("/", authMiddleware, roleMiddleware(["Admin", "Medecin"]), userController.getAllUsers);          
router.get("/:id", authMiddleware, roleMiddleware(["Admin", "Medecin"]), userController.getUserById);       
router.post("/", authMiddleware, roleMiddleware(["Admin", "Medecin"]), userController.createUser);          
router.put("/:id", authMiddleware, roleMiddleware(["Admin", "Medecin"]), userController.updateUser);        
router.delete("/:id", authMiddleware, roleMiddleware(["Admin", "Medecin"]), userController.deleteUser);     

// =============================
// STATS
// =============================
router.get("/stats/overview", authMiddleware, roleMiddleware(["Admin", "Medecin"]), userController.getUserStats);

module.exports = router;