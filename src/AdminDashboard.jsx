import React, { useState } from 'react';

export default function AdminDashboard({ membersList = [], onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  const [activities] = useState([
    { id: 1, title: 'Atelier Leadership Féminin', date: '2026-09-10', status: 'Publié' },
    { id: 2, title: 'Formation Transformation Agroalimentaire', date: '2026-09-18', status: 'Brouillon' }
  ]);

  const [contacts] = useState([
    { id: 1, name: 'Aissatou Diallo', email: 'aissatou@gmail.com', message: 'Je souhaite en savoir plus sur les conditions d’adhésion.', date: '25/08/2026' }
  ]);

  const [formRegs] = useState([
    { id: 1, fullName: 'Aminata Ndiaye', phone: '+221 77 123 45 67', activity: 'Agro-business', status: 'Confirmé' }
  ]);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar de navigation Admin */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col justify-between p-6 shadow-md">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-9 h-9 bg-emerald-600 text-white flex items-center justify-center font-bold rounded-xl shadow-md">
              I
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Admin Impact'Elle</h2>
              <span className="text-xs text-emerald-400 font-medium">Gestion Centrale</span>
            </div>
          </div>

          <nav className="space-y-1.5 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'overview' ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'hover:bg-stone-800'}`}
            >
              📊 Vue d'ensemble
            </button>
            <button 
              onClick={() => setActiveTab('activities')} 
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'activities' ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'hover:bg-stone-800'}`}
            >
              📅 Activités ({activities.length})
            </button>
            <button 
              onClick={() => setActiveTab('members')} 
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'members' ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'hover:bg-stone-800'}`}
            >
              👥 Adhésions ({membersList.length})
            </button>
            <button 
              onClick={() => setActiveTab('formreg')} 
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'formreg' ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'hover:bg-stone-800'}`}
            >
              🎓 Inscriptions Form. ({formRegs.length})
            </button>
            <button 
              onClick={() => setActiveTab('contacts')} 
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'contacts' ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'hover:bg-stone-800'}`}
            >
              ✉️ Messages ({contacts.length})
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-800">
          <button 
            onClick={onLogout}
            className="w-full text-left px-4 py-3 rounded-xl text-xs text-red-400 hover:bg-stone-800 font-bold transition-colors cursor-pointer flex items-center gap-2"
          >
            🔓 Se déconnecter / Quitter
          </button>
        </div>
      </aside>

      {/* Contenu principal du Dashboard */}
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
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Inscriptions Form.</p>
                <p className="text-3xl font-black text-stone-900 mt-2">{formRegs.length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Messages</p>
                <p className="text-3xl font-black text-stone-900 mt-2">{contacts.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Gestion des Adhésions</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              {membersList.length === 0 ? (
                <p className="text-stone-500 text-sm py-8 text-center">Aucun membre inscrit pour le moment.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">
                        <th className="py-3 px-4">Nom / Prénom</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Téléphone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membersList.map((member, index) => (
                        <tr key={index} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="py-3 px-4 font-semibold text-stone-800">{member.name || '-'}</td>
                          <td className="py-3 px-4 text-stone-600">{member.email || '-'}</td>
                          <td className="py-3 px-4 text-stone-600">{member.phone || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Gestion des Activités</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-4">
              {activities.map(act => (
                <div key={act.id} className="flex justify-between items-center p-4 rounded-xl border border-stone-100 bg-stone-50/50">
                  <div>
                    <h3 className="font-bold text-stone-800">{act.title}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Date : {act.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'formreg' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Inscriptions aux Formations</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-4">
              {formRegs.map(reg => (
                <div key={reg.id} className="flex justify-between items-center p-4 rounded-xl border border-stone-100 bg-stone-50/50">
                  <div>
                    <h3 className="font-bold text-stone-800">{reg.fullName}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Tél : {reg.phone} | Activité : {reg.activity}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                    {reg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Messages de Contact</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-4">
              {contacts.map(c => (
                <div key={c.id} className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-stone-800">{c.name} <span className="text-xs font-normal text-stone-500">({c.email})</span></h3>
                    <span className="text-xs text-stone-400">{c.date}</span>
                  </div>
                  <p className="text-sm text-stone-600 pt-1">{c.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}