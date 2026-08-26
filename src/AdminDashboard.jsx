import React, { useState } from 'react';

export default function AdminDashboard({ membersList = [], activitiesList = [], setActivitiesList, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  // États locaux pour le formulaire d'ajout d'une nouvelle activité
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState('Formation');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');

  // États fictifs pour les contacts et inscriptions (tu pourras les passer en props plus tard si besoin)
  const [contacts] = useState([
    { id: 1, name: 'Aissatou Diallo', email: 'aissatou@gmail.com', message: 'Je souhaite en savoir plus sur les conditions d’adhésion.', date: '25/08/2026' }
  ]);

  const [formRegs] = useState([
    { id: 1, fullName: 'Aminata Ndiaye', phone: '+221 77 123 45 67', activity: 'Agro-business', status: 'Confirmé' }
  ]);

  // Fonction pour ajouter une activité
  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    const newActivityObj = {
      id: Date.now(),
      title: newTitle,
      date: newDate,
      category: newCategory,
      status: 'Publié',
      description: newDescription || 'Aucune description fournie.',
      image: newImage || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=400'
    };

    setActivitiesList([newActivityObj, ...activitiesList]);

    // Réinitialiser le formulaire
    setNewTitle('');
    setNewDate('');
    setNewDescription('');
    setNewImage('');
    alert('Activité ajoutée et publiée avec succès !');
  };

  // Fonction pour supprimer une activité
  const handleDeleteActivity = (id) => {
    if (confirm('Voulez-vous vraiment supprimer cette activité ?')) {
      setActivitiesList(activitiesList.filter(act => act.id !== id));
    }
  };

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
              📅 Activités ({activitiesList.length})
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
                <p className="text-3xl font-black text-stone-900 mt-2">{activitiesList.length}</p>
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
            
            {/* Formulaire d'ajout d'une activité */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <h3 className="font-bold text-stone-800 text-base mb-4">Ajouter une nouvelle activité</h3>
              <form onSubmit={handleAddActivity} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Titre de l'activité</label>
                    <input 
                      type="text" 
                      value={newTitle} 
                      onChange={(e) => setNewTitle(e.target.value)} 
                      placeholder="Ex: Conférence sur l'Agro-business"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Date</label>
                    <input 
                      type="date" 
                      value={newDate} 
                      onChange={(e) => setNewDate(e.target.value)} 
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Catégorie</label>
                    <input 
                      type="text" 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)} 
                      placeholder="Ex: Formation, Atelier, Conférence"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Lien de l'image (URL)</label>
                    <input 
                      type="text" 
                      value={newImage} 
                      onChange={(e) => setNewImage(e.target.value)} 
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Description</label>
                  <textarea 
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)} 
                    placeholder="Détails de l'activité..."
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-stone-900 text-emerald-400 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md hover:bg-stone-800 transition-all cursor-pointer"
                >
                  Publier l'activité
                </button>
              </form>
            </div>

            {/* Liste des activités existantes */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-4">
              <h3 className="font-bold text-stone-800 text-base mb-2">Activités enregistrées</h3>
              {activitiesList.length === 0 ? (
                <p className="text-stone-500 text-sm py-4">Aucune activité enregistrée.</p>
              ) : (
                activitiesList.map(act => (
                  <div key={act.id} className="flex justify-between items-center p-4 rounded-xl border border-stone-100 bg-stone-50/50">
                    <div>
                      <h4 className="font-bold text-stone-800">{act.title}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">Date : {act.date} | Catégorie : {act.category || 'Général'}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {act.status}
                      </span>
                      <button 
                        onClick={() => handleDeleteActivity(act.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold px-2.5 py-1 bg-red-50 rounded-lg cursor-pointer"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
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