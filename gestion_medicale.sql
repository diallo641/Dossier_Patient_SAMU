-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: gestion_medicale
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consultation`
--

DROP TABLE IF EXISTS `consultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_consultation` date NOT NULL,
  `motif` text,
  `diagnostic` text,
  `traitement` text,
  `observation` text,
  `id_employe` int NOT NULL,
  `id_medecin` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_employe` (`id_employe`),
  KEY `id_medecin` (`id_medecin`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation`
--

LOCK TABLES `consultation` WRITE;
/*!40000 ALTER TABLE `consultation` DISABLE KEYS */;
INSERT INTO `consultation` VALUES (1,'2026-06-01','Visite médicale annuelle','Etat de santé satisfaisant',NULL,NULL,3,2,'2026-06-10 15:35:27','2026-06-10 15:35:27'),(2,'2026-06-05','Douleurs lombaires','Lombalgie légère',NULL,NULL,3,2,'2026-06-10 15:35:46','2026-06-10 15:35:46'),(3,'2026-06-10','Contrôle médical','Evolution favorable',NULL,NULL,3,2,'2026-06-10 15:35:58','2026-06-10 15:35:58'),(4,'2026-06-11','Contrôle médical Annuelle','Evolution favorable',NULL,NULL,3,2,'2026-06-10 15:37:46','2026-06-10 15:37:46'),(5,'2026-05-11','Contrôle Annuelle','Evolution favorable',NULL,NULL,3,2,'2026-06-10 15:38:34','2026-06-10 15:38:34'),(6,'2026-06-13','Teste','teste','teste','teste',3,2,'2026-06-12 11:01:18','2026-06-12 11:01:18'),(7,'2026-06-15','Visite des employes','Traitement','Doliprane, Parcacetamol','Visite reguliere pour 15j',3,4,'2026-06-15 12:15:40','2026-06-15 12:15:40'),(8,'2026-06-16','Douleur Thoraxcique','Tester apres','Tester','Rendez vous dans 20 jours',1,4,'2026-06-15 13:20:00','2026-06-18 11:26:58'),(9,'2026-06-17','Teste de palu','Teste confirme','Cetamil et Dolipranne C1OOO','A revoir dans 15j',5,4,'2026-06-16 14:29:59','2026-06-16 14:29:59'),(10,'2026-06-18','Tester Patient','Teste','Teste','teste',5,4,'2026-06-16 14:58:26','2026-06-16 14:58:26'),(11,'2026-06-15','Tester Patient','Tester','Tester','Reste en observation',1,4,'2026-06-16 15:45:30','2026-06-16 15:45:30'),(12,'2026-06-18','Tester fichier','Teste','Teste','Teste',3,4,'2026-06-17 10:52:33','2026-06-17 10:52:33'),(13,'2026-06-19','dxcfgvhbj','ftgyhujik','fgvhbjnk,','dcfgvhbjnk,l',3,4,'2026-06-17 10:58:06','2026-06-17 10:58:06'),(14,'2026-06-20','tester fichier','tester','tester','tester',3,4,'2026-06-17 11:08:19','2026-06-17 11:08:19'),(15,'2026-06-18','sdftgyhujk','fgvbhnjkl','tgyhujikolpm','ghyujilpm^ù',3,4,'2026-06-17 11:18:35','2026-06-17 11:18:35'),(16,'2026-06-21','fvtgyhjiko','derfgiko','ftgyhukolp','ftgyhujikolp',3,4,'2026-06-17 11:21:22','2026-06-17 11:21:22'),(17,'2026-06-22','vgbhnjk,;l','drftgyhujiko','frtgyhujikolp','rftgyhujikolpm',3,4,'2026-06-17 11:22:58','2026-06-17 11:22:58'),(18,'2026-06-26','Teste Modification Consultation Admin','dfrtgyhujikol','derftgyhujikol','Tester modification',3,4,'2026-06-17 11:23:53','2026-06-17 16:32:23'),(19,'2026-06-21','derftghiko','derftgyhujikol','drftgyhujikol','rftgolp',3,4,'2026-06-17 11:35:31','2026-06-17 11:35:31'),(20,'2026-06-01','dxrfgkol','fgthjkl;','dfrtgyhujk,l;','drftgyhujikol',3,4,'2026-06-17 11:37:18','2026-06-17 11:37:18'),(24,'2026-06-22','fgvhbjnk,;l:','fgvhbjnk,l;:','ftgyhujikolpm^ù','rendez vous',6,4,'2026-06-22 09:42:40','2026-06-22 10:02:29'),(25,'2026-06-23','drftgyhujk','fgyhujikl','vgbhjnk,l;m:','tester',5,4,'2026-06-22 13:51:03','2026-06-22 13:54:19');
/*!40000 ALTER TABLE `consultation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employe`
--

DROP TABLE IF EXISTS `employe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `poste` varchar(100) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(50) DEFAULT NULL,
  `id_utilisateur` int DEFAULT NULL,
  `groupe_sanguin` varchar(5) DEFAULT NULL,
  `allergies` text,
  `antecedents_medicaux` text,
  `aptitudes_medicales` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employe`
--

LOCK TABLES `employe` WRITE;
/*!40000 ALTER TABLE `employe` DISABLE KEYS */;
INSERT INTO `employe` VALUES (1,'Diallo','Amadou','Administrateur Systeme','Informatique','1985-06-15','770000001','2026-06-10 15:25:13','2026-06-10 15:25:13','Admin',1,'O+','Aucune','Aucun','Apte'),(2,'Bah','Fatou','Medecin du Travail','Medical','1988-03-20','770000002','2026-06-10 15:25:58','2026-06-10 15:25:58','Medecin',2,'A+','Penicilline','Aucun','Apte'),(3,'Sow','Moussa Adama','Assistant administratif','Comptabilité','1995-11-12','770000001','2026-06-10 15:26:14','2026-06-12 16:21:07','Employe',3,'B+','Aucune','Asthme leger','Apte'),(4,'NDIAYE','Ndeye Saphia','Médecin du travail','Cardiologie','2026-01-01','778761321','2026-06-15 11:29:31','2026-06-15 11:29:31','Medecin',4,'AB-','Pénicilline','Diabète','Apte'),(5,'SENE','Amy','Agent administratif','Laboratoire','2025-01-01','700987613','2026-06-16 14:28:51','2026-06-16 14:28:51','Employe',5,'B+','Arachide','Asthme','Apte avec restriction'),(6,'SY','Awa Kebe','Stagiaire','Administration','2020-01-01',NULL,'2026-06-22 08:57:10','2026-06-22 08:57:10','Employe',6,'B+','Pénicilline','Asthme','Apte');
/*!40000 ALTER TABLE `employe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichier_medical`
--

DROP TABLE IF EXISTS `fichier_medical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichier_medical` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_fichier` varchar(255) DEFAULT NULL,
  `chemin` varchar(255) DEFAULT NULL,
  `type_fichier` varchar(50) DEFAULT NULL,
  `taille_fichier` bigint DEFAULT NULL,
  `categorie` enum('radio','scanner','analyse','ordonnance','certificat','echographie','autre') DEFAULT 'autre',
  `description` text,
  `extension` varchar(20) DEFAULT NULL,
  `uploaded_by` int DEFAULT NULL,
  `date_upload` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_consultation` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_consultation` (`id_consultation`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichier_medical`
--

LOCK TABLES `fichier_medical` WRITE;
/*!40000 ALTER TABLE `fichier_medical` DISABLE KEYS */;
INSERT INTO `fichier_medical` VALUES (42,'version_finale.pdf','uploads\\1782140093986.pdf','application/pdf',5062430,'analyse',NULL,'.pdf',4,'2026-06-22 14:54:54','2026-06-22 14:54:54',24),(43,'APPORT DU DOLUTEGLAVIR DANS LA PRISE EN CHARGE DES PV.docx','uploads\\1782140129512.docx','application/vnd.openxmlformats-officedocument.word',18859,'analyse',NULL,'.docx',4,'2026-06-22 14:55:29','2026-06-22 14:55:29',24),(44,'INTRODUCTION VIH.docx','uploads\\1782140517760.docx','application/vnd.openxmlformats-officedocument.word',13188304,'analyse','rendez vous','.docx',4,'2026-06-22 15:01:58','2026-06-22 15:01:58',24);
/*!40000 ALTER TABLE `fichier_medical` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text,
  `date_notification` datetime DEFAULT NULL,
  `statut` enum('non_lu','lu') DEFAULT 'non_lu',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_utilisateur` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_role` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom_role` (`nom_role`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin','2026-06-10 10:41:19','2026-06-10 10:41:19'),(2,'Medecin','2026-06-10 10:41:19','2026-06-10 10:41:19'),(3,'Employe','2026-06-10 10:41:19','2026-06-10 10:41:19');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `id_role` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `id_role` (`id_role`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'admin@test.com','$2b$10$ae3xk8kXqdwQ5mPpntlrA.vBTfNsu/8W/ompH/mJAcVpVwNkm2Iji',1,'2026-06-10 15:25:13','2026-06-10 15:25:13',NULL,NULL),(2,'medecin@test.com','$2b$10$qONfh98VKBPFJBq3YzkrNeqHGy7uP5/mRt0WfcblO9L7IBEhXgxvm',2,'2026-06-10 15:25:58','2026-06-10 15:25:58',NULL,NULL),(3,'employe@test.com','$2b$10$jQsfGBgMKUdFEiawj46.5uL2f5klfNyQ9XYaZPaR21UsNOHdnU.eO',3,'2026-06-10 15:26:14','2026-06-10 15:26:14',NULL,NULL),(4,'safietou1998@gmail.com','$2b$10$M7SdwFwcClmeuU4cuFzj9eXHHrnV7.3QdlM/ZxOdf2blOMnRnWqRW',2,'2026-06-15 11:29:31','2026-06-15 11:29:31',NULL,NULL),(5,'amysene@outlook.fr','$2b$10$7XarpN.c5VVcwYigMca9kelwHuWFVfS.f1vWi7j42bg/i20o/tWQ.',3,'2026-06-16 14:28:51','2026-06-16 14:28:51',NULL,NULL),(6,'awasy@gmail.com','$2b$10$Y.N9VHr9E/zLfXbV71hwveomm/fSLg0Y1.nRneA66YWHSmCYH6hOC',3,'2026-06-22 08:57:10','2026-06-22 08:57:10',NULL,NULL);
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-25 10:03:16
