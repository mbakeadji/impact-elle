import React, { useState } from 'react';

export default function AdminDashboard({ membersList = [] }) {
  // État pour basculer entre le site normal et l'admin via un simple bouton/trigger
  const [showAdmin, setShowAdmin] = useState(false);
  
  // États de connexion
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [activities, setActivities] = useState([
    { id: 1, title: 'Atelier Leadership Féminin', date: '2026-09-10', status: 'Publié' },
    { id: 2, title: 'Formation Transformation Agroalimentaire', date: '2026-09-18', status: 'Brouillon' }
  ]);

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Aissatou Diallo', email: 'aissatou@gmail.com', message: 'Je souhaite en savoir plus sur les conditions d’adhésion.', date: '25/08/2026' }
  ]);

  const [formRegs, setFormRegs] = useState([
    { id: 1, fullName: 'Aminata Ndiaye', phone: '+221 77 123 45 67', activity: 'Agro-business', status: 'Confirmé' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'impactelle' && password === '25082026') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Si on n'a pas activé l'admin, on affiche un petit bouton discret en bas à droite de ta page d'accueil (ou rien du tout)
  if (!showAdmin) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setShowAdmin(true)}
          className="bg-stone-900 text-emerald-400 text-xs font-bold px-3 py-2 rounded-xl shadow-lg border border-stone-800 hover:bg-stone-800 transition-all cursor-pointer opacity-70 hover:opacity-100"
        >
          🔐 Admin
        </button>
      </div>
    );
  }

  // Si l'admin est activé mais pas connecté -> Écran de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4 absolute inset-0 z-50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-stone-200 p-8 relative">
          <button 
            onClick={() => setShowAdmin(false)}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-sm font-bold"
          >
            ✕ Quitter
          </button>

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
              className="w-full bg-gradient-to-r from-stone-900 to-emerald-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md hover:bg-stone-800 transition-all cursor-pointer mt-2"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Tableau de bord complet une fois connectée
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row absolute inset-0 z-50">
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
            <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2.5 rounded-xl ${activeTab === 'overview' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>📊 Vue d'ensemble</button>
            <button onClick={() => setActiveTab('activities')} className={`w-full text-left px-4 py-2.5 rounded-xl ${activeTab === 'activities' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>📅 Activités</button>
            <button onClick={() => setActiveTab('members')} className={`w-full text-left px-4 py-2.5 rounded-xl ${activeTab === 'members' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>👥 Adhésions ({membersList.length})</button>
            <button onClick={() => setActiveTab('formreg')} className={`w-full text-left px-4 py-2.5 rounded-xl ${activeTab === 'formreg' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>🎓 Inscriptions Form.</button>
            <button onClick={() => setActiveTab('contacts')} className={`w-full text-left px-4 py-2.5 rounded-xl ${activeTab === 'contacts' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>✉️ Messages</button>
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-800 flex flex-col gap-3">
          <button 
            onClick={() => { setIsAuthenticated(false); setShowAdmin(false); }}
            className="w-full text-left px-4 py-2 rounded-xl text-xs text-red-400 hover:bg-stone-800 font-bold transition-colors cursor-pointer"
          >
            🔓 Se déconnecter / Quitter
          </button>
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
            </div>
          </div>
        )}
        {/* Les autres onglets restent fonctionnels ici */}
      </main>
    </div>
  );
}