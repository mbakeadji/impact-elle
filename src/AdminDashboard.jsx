import React, { useState } from 'react';

export default function AdminDashboard({ membersList = [] }) {
  // État pour naviguer entre les sous-onglets de l'admin
  const [activeTab, setActiveTab] = useState('overview');

  // Données fictives ou dynamiques pour les autres modules
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

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR ADMIN */}
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

        <div className="pt-6 border-t border-stone-800 text-xs text-stone-500 text-center">
          Impact'Elle Dashboard &copy; 2026
        </div>
      </aside>

      {/* CONTENU PRINCIPAL DE L'ADMIN */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* ONGLET 1 : VUE D'ENSEMBLE */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Tableau de Bord</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Adhésions Totales</p>
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
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Messages reçus</p>
                <p className="text-3xl font-black text-stone-900 mt-2">{contacts.length}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 mt-6">
              <h2 className="text-lg font-bold text-stone-800 mb-4">Activité récente</h2>
              <p className="text-sm text-stone-600">Bienvenue dans votre espace d'administration unifié. Utilisez le menu latéral pour naviguer entre la gestion des adhésions, des formulaires et des activités.</p>
            </div>
          </div>
        )}

        {/* ONGLET 2 : ACTIVITÉS */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-black text-stone-900">Gestion des Activités</h1>
              <button onClick={() => alert("Fonctionnalité d'ajout d'activité à brancher")} className="bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider hover:bg-emerald-700">
                + Ajouter une activité
              </button>
            </div>
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
                    <tr key={act.id} className="hover:bg-stone-50">
                      <td className="p-4 font-semibold text-stone-900">{act.title}</td>
                      <td className="p-4">{act.date}</td>
                      <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-bold">{act.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ONGLET 3 : ADHÉSIONS (MEMBERSLIST) */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Gestion des Adhésions</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              {membersList.length === 0 ? (
                <p className="p-8 text-center text-stone-500 text-sm">Aucune adhésion enregistrée pour le moment.</p>
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
                    {membersList.map((member, index) => (
                      <tr key={index} className="hover:bg-stone-50">
                        <td className="p-4 font-semibold text-stone-900">{member.nom} {member.prenom}</td>
                        <td className="p-4">{member.email}</td>
                        <td className="p-4">{member.telephone}</td>
                        <td className="p-4">{member.profession}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ONGLET 4 : FORMATIONS (FORMREG) */}
        {activeTab === 'formreg' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Inscriptions Formations (FormReg)</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-stone-400 text-xs uppercase tracking-wider border-b border-stone-200">
                    <th className="p-4 font-bold">Nom complet</th>
                    <th className="p-4 font-bold">Téléphone</th>
                    <th className="p-4 font-bold">Activité</th>
                    <th className="p-4 font-bold">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm text-stone-700">
                  {formRegs.map((reg) => (
                    <tr key={reg.id} className="hover:bg-stone-50">
                      <td className="p-4 font-semibold text-stone-900">{reg.fullName}</td>
                      <td className="p-4">{reg.phone}</td>
                      <td className="p-4">{reg.activity}</td>
                      <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-bold">{reg.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ONGLET 5 : MESSAGES CONTACT */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Messages de Contact</h1>
            <div className="space-y-4">
              {contacts.map((msg) => (
                <div key={msg.id} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-stone-900">{msg.name} <span className="text-xs font-normal text-stone-500">({msg.email})</span></h3>
                    <span className="text-xs text-stone-400">{msg.date}</span>
                  </div>
                  <p className="text-sm text-stone-600">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}