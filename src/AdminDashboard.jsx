import React, { useState } from 'react';

export default function AdminDashboard({ membersList = [], activities = [], setActivities, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  // États du formulaire d'activité
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Formation & Gestion');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('Publié');
  
  // ID de l'activité en cours de modification (null si c'est un ajout)
  const [editingId, setEditingId] = useState(null);

  // Soumission du formulaire (Ajout ou Modification)
  const handleSubmitActivity = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    if (editingId !== null) {
      // Modification
      setActivities(activities.map(act => 
        act.id === editingId 
          ? { ...act, title, date, category, description, image: imageUrl || act.image, status } 
          : act
      ));
      setEditingId(null);
    } else {
      // Ajout
      const newActivity = {
        id: Date.now(),
        title,
        date,
        category,
        description: description || 'Suivi et impact communautaire sur le terrain.',
        image: imageUrl || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800',
        status
      };
      setActivities([newActivity, ...activities]);
    }

    // Réinitialisation du formulaire
    setTitle('');
    setDate('');
    setDescription('');
    setImageUrl('');
    setStatus('Publié');
  };

  // Charger une activité dans le formulaire pour modification
  const handleEdit = (act) => {
    setEditingId(act.id);
    setTitle(act.title);
    setDate(act.date);
    setCategory(act.category || 'Formation & Gestion');
    setDescription(act.description || '');
    setImageUrl(act.image || '');
    setStatus(act.status || 'Publié');
  };

  // Supprimer une activité
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette activité ?")) {
      setActivities(activities.filter(act => act.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar Admin */}
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
            <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'overview' ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'hover:bg-stone-800'}`}>📊 Vue d'ensemble</button>
            <button onClick={() => setActiveTab('activities')} className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'activities' ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'hover:bg-stone-800'}`}>📅 Activités ({activities.length})</button>
            <button onClick={() => setActiveTab('members')} className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'members' ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'hover:bg-stone-800'}`}>👥 Adhésions ({membersList.length})</button>
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-800">
          <button onClick={onLogout} className="w-full text-left px-4 py-3 rounded-xl text-xs text-red-400 hover:bg-stone-800 font-bold transition-colors cursor-pointer flex items-center gap-2">
            🔓 Se déconnecter / Quitter
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Tableau de Bord</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Total Activités</p>
                <p className="text-3xl font-black text-emerald-800 mt-2">{activities.length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Total Adhésions</p>
                <p className="text-3xl font-black text-stone-900 mt-2">{membersList.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-8">
            <h1 className="text-2xl font-black text-stone-900">Gestion des Activités & Publications</h1>

            {/* Formulaire d'Ajout / Modification */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <h2 className="text-base font-bold text-stone-900 mb-4">
                {editingId !== null ? '✏️ Modifier l\'activité' : '➕ Ajouter une nouvelle activité'}
              </h2>
              <form onSubmit={handleSubmitActivity} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Titre de l'activité</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Ex: Atelier leadership féminin" 
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Catégorie (Badge)</label>
                  <input 
                    type="text" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    placeholder="Ex: Formation & Gestion" 
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Statut</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  >
                    <option value="Publié">Publié (Visible sur le site)</option>
                    <option value="Brouillon">Brouillon (Masqué)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Lien de l'image (URL)</label>
                  <input 
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Description / Résumé</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Détails de l'activité..." 
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
                  />
                </div>
                <div className="sm:col-span-2 flex gap-3 pt-2">
                  <button 
                    type="submit" 
                    className="bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md hover:bg-emerald-900 transition-all cursor-pointer"
                  >
                    {editingId !== null ? 'Enregistrer les modifications' : 'Publier l\'activité'}
                  </button>
                  {editingId !== null && (
                    <button 
                      type="button" 
                      onClick={() => { setEditingId(null); setTitle(''); setDate(''); setDescription(''); setImageUrl(''); }}
                      className="bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl hover:bg-stone-300 transition-all cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Liste des activités existantes avec options Modifier / Supprimer */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-4">
              <h2 className="text-base font-bold text-stone-900 mb-2">Activités enregistrées ({activities.length})</h2>
              {activities.map(act => (
                <div key={act.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-stone-100 bg-stone-50/50 gap-4">
                  <div className="flex items-center space-x-4">
                    <img src={act.image || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=200'} alt="" className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                    <div>
                      <h3 className="font-bold text-stone-800 text-base">{act.title}</h3>
                      <p className="text-xs text-stone-500 mt-0.5">Date : {act.date} | Catégorie : {act.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${act.status === 'Publié' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {act.status}
                    </span>
                    <button 
                      onClick={() => handleEdit(act)} 
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Modifier
                    </button>
                    <button 
                      onClick={() => handleDelete(act.id)} 
                      className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
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
      </main>
    </div>
  );
}