import React, { useState, useEffect } from 'react';

  // État de l'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // État pour naviguer entre les sous-onglets de l'admin
  const [activeTab, setActiveTab] = useState('overview');

  // Données de l'admin
  const [activities, setActivities] = useState([
    { id: 1, title: 'Atelier Leadership Féminin', date: '2026-09-10', status: 'Publié' },
    { id: 2, title: 'Formation Transformation Agroalimentaire', date: '2026-09-18', status: 'Brouillon' }
  ]);

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Aissatou Diallo', email: 'aissatou@gmail.com', message: 'Je souhaite en savoir plus sur les conditions d’adhésion.', date: '25/08/2026' },
    { id: 2, name: 'Mariama Ba', email: 'mariama@yahoo.fr', message: 'Proposez-vous des formations en entrepreneuriat numérique ?', date: '24/08/2026' }
  ]);

  const [formRegs, setFormRegs] = useState([
    { id: 1, fullName: 'Aminata Ndiaye', phone: '+221 77 123 45 67', activity: 'Agro-business', status: 'Confirmé' }
  ]);

  // Si on n'est PAS sur l'URL /admin, ce composant ne s'affiche pas du tout (la page d'accueil reste intacte)
  if (!isAdminRoute) {
    return null;
  }

  // Connexion Admin
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'impactelle' && password === '25082026') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Si l'admin n'est pas connecté -> Écran de Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-stone-200 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-emerald-800 text-white flex items-center justify-center font-black text-xl rounded-2xl mx-auto mb-3 shadow-md">
              I
            </div>
            <h1 className="text-2xl font-black text-stone-900">Administration</h1>
            <p className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">Impact'Elle - Connexion sécurisée</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
              Identifiant ou mot de passe incorrect.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Identifiant</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="impactelle"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-sm"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Mot de passe</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-sm"
                required 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-stone-900 to-emerald-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md hover:from-stone-800 hover:to-emerald-700 transition-all cursor-pointer mt-2"
            >
              Se connecter
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-stone-500 hover:underline">← Retourner sur le site</a>
          </div>
        </div>
      </div>
    );
  }

  // Tableau de bord complet une fois connecté
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col justify-between p-6 shadow-md">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-9 h-9 bg-emerald-600 text-white flex items-center justify-center font-bold rounded-xl">
              A
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Admin Impact'Elle</h2>
              <span className="text-xs text-emerald-400 font-medium">Gestion Centrale</span>
            </div>
          </div>

          <nav className="space-y-1.5 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}
            >
              📊 Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${activeTab === 'activities' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}
            >
              📅 Activités ({activities.length})
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${activeTab === 'members' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}
            >
              👥 Adhésions ({membersList.length})
            </button>
            <button
              onClick={() => setActiveTab('formreg')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${activeTab === 'formreg' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}
            >
              🎓 Inscriptions Form. ({formRegs.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${activeTab === 'contacts' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}
            >
              ✉️ Messages Contact ({contacts.length})
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-800 flex flex-col gap-3">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full text-left px-4 py-2 rounded-xl text-xs text-red-400 hover:bg-stone-800 font-bold transition-colors cursor-pointer"
          >
            🔓 Se déconnecter
          </button>
          <a href="/" className="text-xs text-stone-500 hover:text-stone-300 text-center">
            ← Aller sur le site public
          </a>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Tableau de Bord</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Adhésions</p>
                <p className="text-3xl font-black text-emerald-800 mt-2">{membersList.length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Activités</p>
                <p className="text-3xl font-black text-stone-900 mt-2">{activities.length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Inscrits Formreg</p>
                <p className="text-3xl font-black text-stone-900 mt-2">{formRegs.length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Messages</p>
                <p className="text-3xl font-black text-stone-900 mt-2">{contacts.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Gestion des Activités</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-stone-400 text-xs uppercase tracking-wider border-b border-stone-200">
                    <th className="p-4 font-bold">Titre</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm text-stone-700">
                  {activities.map((act) => (
                    <tr key={act.id}>
                      <td className="p-4 font-semibold text-stone-900">{act.title}</td>
                      <td className="p-4">{act.date}</td>
                      <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-bold">{act.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Gestion des Adhésions</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              {membersList.length === 0 ? (
                <p className="p-8 text-center text-stone-500 text-sm">Aucune adhésion enregistrée.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 text-stone-400 text-xs uppercase tracking-wider border-b border-stone-200">
                      <th className="p-4 font-bold">Nom & Prénom</th>
                      <th className="p-4 font-bold">Email</th>
                      <th className="p-4 font-bold">Téléphone</th>
                      <th className="p-4 font-bold">Profession</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-sm text-stone-700">
                    {membersList.map((m, i) => (
                      <tr key={i}>
                        <td className="p-4 font-semibold text-stone-900">{m.nom} {m.prenom}</td>
                        <td className="p-4">{m.email}</td>
                        <td className="p-4">{m.telephone}</td>
                        <td className="p-4">{m.profession}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'formreg' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Inscriptions Formreg</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-stone-400 text-xs uppercase tracking-wider border-b border-stone-200">
                    <th className="p-4 font-bold">Nom</th>
                    <th className="p-4 font-bold">Téléphone</th>
                    <th className="p-4 font-bold">Activité</th>
                    <th className="p-4 font-bold">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm text-stone-700">
                  {formRegs.map((r) => (
                    <tr key={r.id}>
                      <td className="p-4 font-semibold text-stone-900">{r.fullName}</td>
                      <td className="p-4">{r.phone}</td>
                      <td className="p-4">{r.activity}</td>
                      <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-bold">{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Messages de Contact</h1>
            <div className="space-y-4">
              {contacts.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-stone-900">{c.name} <span className="text-xs text-stone-500">({c.email})</span></h3>
                    <span className="text-xs text-stone-400">{c.date}</span>
                  </div>
                  <p className="text-sm text-stone-600">{c.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}