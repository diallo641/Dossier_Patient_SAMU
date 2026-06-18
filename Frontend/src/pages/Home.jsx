import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">

      {/* NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>

            <h1 className="font-bold text-blue-900 text-lg">
              Médecine du Travail/SAMU National
            </h1>
          </div>

          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 shadow">
              Connexion
            </Link>

            <Link to="/inscription" className="px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-700 hover:bg-blue-50">
              Inscription
            </Link>

           
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            🩺 Plateforme médicale professionnelle
          </div>

          <h1 className="text-4xl font-bold text-blue-900 leading-tight">
            Gestion complète de la médecine du travail
          </h1>

          <p className="text-blue-800">
            Suivi médical des employés, consultations, bilans de santé et prévention des risques professionnels dans une plateforme moderne et sécurisée.
          </p>

          {/* ROLE */}
          <div className="bg-white/70 backdrop-blur-sm border border-blue-200 p-4 rounded-xl text-sm text-blue-900">
            <p className="font-semibold mb-1">🩺 Rôle du médecin du travail</p>
            <p>
              Le médecin du travail surveille la santé des employés, réalise les visites médicales,
              détecte les risques professionnels et assure la prévention des maladies liées au travail.
            </p>
          </div>

          {/* BADGES */}
          <div className="flex gap-2 flex-wrap">
            <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              Sécurité
            </span>
            <span className="bg-blue-300 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              Suivi médical
            </span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Disponible 24h/24
            </span>
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-2">
            <Link
              to="/login"
              className="bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-800 transition"
            >
              Accéder à la plateforme
            </Link>

            <Link
              to="/inscription"
              className="border-2 border-blue-700 text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Créer un compte
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 pt-4">

            <div className="bg-white shadow-md rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-blue-700">+1200</h3>
              <p className="text-xs text-blue-800">Consultations</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-blue-700">98%</h3>
              <p className="text-xs text-blue-800">Satisfaction</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-blue-700">24/7</h3>
              <p className="text-xs text-blue-800">Disponibilité</p>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          {/* IMAGE */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-200 group">
            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
              alt="Consultation médicale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
          </div>

          {/* DOCTOR CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-700">

            <div className="flex items-center gap-4">

              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80"
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-600"
                alt="Médecin"
              />

              <div>
                <h3 className="font-semibold text-blue-900">
                  Dr Mame Alassane DIA
                </h3>
                <p className="text-sm text-blue-700">
                  Médecin du travail
                </p>
              </div>

            </div>

            <div className="mt-4 text-sm text-blue-800 space-y-2">
              <p>📍 Structure : SAMU National</p>
              <p>📞 Téléphone : +221 77 000 00 00</p>
              <p>📧 Email : dr.dia@samu.sn</p>
              <p>🩺 Activités : consultations, bilans, suivi des employés</p>
              <p>⏱ Expérience : Urgentiste, Médecine du travail</p>
            </div>

            <div className="mt-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                ✔ Disponible
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="bg-blue-50 py-16 mt-10 border-t-4 border-blue-700">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600 hover:-translate-y-2 hover:shadow-xl transition duration-300">
            <h3 className="font-semibold text-blue-900 mb-2">📁 Dossiers médicaux</h3>
            <p className="text-blue-700 text-sm">
              Centralisation sécurisée des données médicales des employés.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600 hover:-translate-y-2 hover:shadow-xl transition duration-300">
            <h3 className="font-semibold text-blue-900 mb-2">🩺 Consultations</h3>
            <p className="text-blue-700 text-sm">
              Suivi complet des visites médicales et bilans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600 hover:-translate-y-2 hover:shadow-xl transition duration-300">
            <h3 className="font-semibold text-blue-900 mb-2">⚡ Sécurité & rapidité</h3>
            <p className="text-blue-700 text-sm">
              Accès rapide et protection des données sensibles.
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white mt-20">

        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-bold text-lg mb-3">
              Médecine du Travail
            </h3>
            <p className="text-blue-100 text-sm">
              Plateforme moderne de gestion médicale pour le suivi des employés et la prévention des risques professionnels.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>Accueil</li>
              <li>Consultations</li>
              <li>Dossiers médicaux</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>📍 Dakar, Sénégal</li>
              <li>📞 +221 77 000 00 00</li>
              <li>📧 contact@medtravail.sn</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-blue-800 text-center py-4 text-sm text-blue-200">
          © 2026 Médecine du Travail — Tous droits réservés
        </div>

      </footer>

    </div>
  );
}