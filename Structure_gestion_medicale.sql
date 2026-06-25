
--
-- Table `consultation`
--

DROP TABLE IF EXISTS `consultation`;
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
 
) 


--
-- Table `employe`
--

DROP TABLE IF EXISTS `employe`;
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
  
) 


--
-- Table `fichier_medical`
--

DROP TABLE IF EXISTS `fichier_medical`;
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
 
)

--
-- Table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text,
  `date_notification` datetime DEFAULT NULL,
  `statut` enum('non_lu','lu') DEFAULT 'non_lu',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_utilisateur` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  
) 

--
-- Table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_role` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom_role` (`nom_role`)
) 

--
-- Table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
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
  
) 


