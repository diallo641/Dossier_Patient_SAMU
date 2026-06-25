-- =========================
-- TABLE ROLE
-- =========================

DROP TABLE IF EXISTS role;

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  nom_role VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;


-- =========================
-- TABLE UTILISATEUR
-- =========================

DROP TABLE IF EXISTS utilisateur;

CREATE TABLE utilisateur (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  id_role INT NOT NULL,

  reset_token VARCHAR(255),
  reset_expires DATETIME,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  CONSTRAINT fk_utilisateur_role
    FOREIGN KEY (id_role) REFERENCES role(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;


-- =========================
-- TABLE EMPLOYE
-- =========================

DROP TABLE IF EXISTS employe;

CREATE TABLE employe (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  poste VARCHAR(100),
  service VARCHAR(100),
  date_naissance DATE,
  telephone VARCHAR(20),

  type VARCHAR(50),
  id_utilisateur INT,

  groupe_sanguin VARCHAR(5),
  allergies TEXT,
  antecedents_medicaux TEXT,
  aptitudes_medicales TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  CONSTRAINT fk_employe_utilisateur
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;


-- =========================
-- TABLE CONSULTATION
-- =========================

DROP TABLE IF EXISTS consultation;

CREATE TABLE consultation (
  id INT NOT NULL AUTO_INCREMENT,
  date_consultation DATE NOT NULL,
  motif TEXT,
  diagnostic TEXT,
  traitement TEXT,
  observation TEXT,

  id_employe INT NOT NULL,
  id_medecin INT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  CONSTRAINT fk_consultation_employe
    FOREIGN KEY (id_employe) REFERENCES employe(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_consultation_medecin
    FOREIGN KEY (id_medecin) REFERENCES employe(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;


-- =========================
-- TABLE FICHIER_MEDICAL
-- =========================

DROP TABLE IF EXISTS fichier_medical;

CREATE TABLE fichier_medical (
  id INT NOT NULL AUTO_INCREMENT,
  nom_fichier VARCHAR(255),
  chemin VARCHAR(255),
  type_fichier VARCHAR(50),
  taille_fichier BIGINT,

  categorie ENUM('radio','scanner','analyse','ordonnance','certificat','echographie','autre') DEFAULT 'autre',

  description TEXT,
  extension VARCHAR(20),
  uploaded_by INT,

  date_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  id_consultation INT NOT NULL,

  PRIMARY KEY (id),

  CONSTRAINT fk_fichier_consultation
    FOREIGN KEY (id_consultation) REFERENCES consultation(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;


-- =========================
-- TABLE NOTIFICATION
-- =========================

DROP TABLE IF EXISTS notification;

CREATE TABLE notification (
  id INT NOT NULL AUTO_INCREMENT,
  message TEXT,
  date_notification DATETIME,
  statut ENUM('non_lu','lu') DEFAULT 'non_lu',

  id_utilisateur INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  CONSTRAINT fk_notification_utilisateur
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;