# 🏥 Gestion Médicale

## 📌 Présentation du projet

Gestion Médicale est une application web permettant la gestion du suivi médical des employés d'une entreprise.

Elle permet de centraliser les informations médicales et de gérer les consultations, dossiers médicaux et documents associés selon les rôles des utilisateurs.

---

## 🎯 Objectifs

- Digitaliser la gestion médicale des employés
- Faciliter le suivi des consultations médicales
- Sécuriser les données médicales
- Gérer les accès selon les rôles (Admin, Médecin, Employé)

---

## ⚙️ Fonctionnalités

### 👨‍💼 Administrateur

- Gestion des employés (CRUD)
- Gestion des consultations
- Gestion des utilisateurs
- Attribution des rôles

### 👨‍⚕️ Médecin

- Consultation des patients
- Création et modification des consultations
- Gestion des dossiers médicaux
- Upload et gestion des fichiers médicaux
- Accès à l’historique médical des patients

### 🧑‍💻 Employé

- Consultation de son profil
- Consultation de ses consultations
- Accès à son dossier médical
- Téléchargement de documents autorisés

---

## 🛠️ Technologies utilisées

### Frontend

- React 
- Tailwind CSS


### Backend

- Node.js
- MySQL2
- JWT (JSON Web Token)
- Bcrypt.js
- Multer
- Nodemailer (pour la réinitialisation mot de passe)

---

## 📦 Prérequis

Avant de lancer le projet, installer :

- Node.js (>= 18)
- MySQL2
- JWT (JSON Web Token)
- Bcrypt.js
- Multer (pour uploader les fichiers medicaux)
- Nodemailer (pour la réinitialisation mot de passe)

### Vérification

```bash
node -v
npm -v
mysql --version
```

---

## 🚀 Installation du projet

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/votre-compte/Dossier_Patient_SAMU.git
cd gestion-medicale
```

---

## 🧠 Configuration de la base de données

Créer la base de données MySQL :

```sql
CREATE DATABASE gestion_medicale;
```

Importer ensuite le fichier SQL fourni dans le projet :

```bash
gestion_medicale.sql
```

---

## 🔧 Configuration Backend

### Installer les dépendances

```bash
cd backend
npm install
```

### Dépendances principales

```bash
express mysql2 cors dotenv jsonwebtoken bcryptjs multer nodemailer
```

### Dépendance de développement

```bash
npm install --save-dev nodemon
```

---

### Fichier `.env`

Créer un fichier `.env` :

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=gestion_medicale

JWT_SECRET=mon_secret_jwt(exemple code2026)

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

### 📧 Configuration email (réinitialisation mot de passe)

L'application utilise **Nodemailer** pour envoyer les emails de réinitialisation.

Pour Gmail :

1. Activer la validation en 2 étapes
2. Générer un mot de passe d'application
3. Utiliser ce mot de passe dans `EMAIL_PASSWORD`

---

### ▶️ Lancer le backend

```bash
npm run dev
```

ou

```bash
nodemon server.js
```

---

## Configuration Frontend

### Installer les dépendances

```bash
cd frontend
npm install
```

### Dépendances principales

```bash
react react-router-dom axios tailwindcss lucide-react
```

---

### ▶️ Lancer le frontend

```bash
npm run dev
```



---

## Sécurité

- Authentification JWT
- Gestion des rôles (Admin, Médecin, Employé)
- Protection des routes
- Réinitialisation du mot de passe par email
- Validation des données côté serveur
- Upload sécurisé des fichiers médicaux

---

## Structure du projet

```
gestion-medicale/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── utils/
│   ├── uploads/
│   └── server.js
│   ├── app.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── gestion_medicale.sql
└── Readme.md
```

---

##  Rôles des utilisateurs

### Admin
- Gère toute l’application

### Médecin
- Gère les consultations et dossiers médicaux

### Employé
- Consulte ses données médicales

---

## Fonctionnalités supplémentaires

- Réinitialisation du mot de passe par email (Nodemailer)
- Upload de fichiers médicaux (Multer)
- API REST sécurisée

---

##  Auteur

Développé par **Thierno Boubacar Diallo**

---

