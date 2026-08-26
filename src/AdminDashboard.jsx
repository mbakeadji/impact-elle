import React, { useState } from 'react';

export default function AdminDashboard({ membersList = [], onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  // État des activités avec CRUD complet et support d'image
  const [activities, setActivities] = useState([
    { id: 1, title: 'Atelier Leadership Féminin', date: '2026-09-10', category: 'Formation', status: 'Publié', image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=200' },
    { id: 2, title: 'Formation Transformation Agroalimentaire', date: '2026-09-18', category: 'Agro', status: 'Brouillon', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200' }
  ]);

  // États du formulaire d'activité
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Formation & Gestion');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('Publié');
  const [editingId, setEditingId] = useState(null);

  // Gestion de l'upload d'image locale
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Soumission du formulaire Activité (Ajout ou Modification)
  const handleSubmitActivity = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    if (editingId !== null) {
      setActivities(activities.map(act => 
        act.id === editingId 
          ? { ...act, title, date, category, description, image: image || act.image, status } 
          : act
      ));
      setEditingId(null);
    } else {
      const newActivity = {
        id: Date.now(),
        title,
        date,
        category,
        description: description || 'Suivi et impact communautaire sur le terrain.',
        image: image || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=200',
        status
      };
      setActivities([newActivity, ...activities]);
    }

    setTitle('');
    setDate('');
    setDescription('');
    setImage('');
    setStatus('Publié');
  };

  const handleEdit = (act) => {
    setEditingId(act.id);
    setTitle(act.title);
    setDate(act.date);
    setCategory(act.category || 'Formation');
    setDescription(act.description || '');
    setImage(act.image || '');
    setStatus(act.status || 'Publié');
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette activité ?")) {
      setActivities(activities.filter(act => act.id !== id));
    }
  };

  // Données mockées pour Messages et Inscriptions Formations
  const [contacts] = useState([
    { id: 1, name: 'Aissatou Diallo', email: 'aissatou@gmail.com', message: 'Je souhaite en savoir plus sur les conditions d’adhésion et participer à vos programmes.', date: '25/08/2026' }
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

        {/* GESTION DES ACTIVITÉS (CRUD TABLE + IMAGE) */}
        {activeTab === 'activities' && (
          <div className="space-y-8">
            <h1 className="text-2xl font-black text-stone-900">Gestion des Activités & Publications</h1>

            {/* Formulaire Ajout / Modification */}
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Catégorie</label>
                  <input 
                    type="text" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    placeholder="Ex: Formation" 
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
                    <option value="Publié">Publié</option>
                    <option value="Brouillon">Brouillon</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Image de l'activité</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer" 
                    />
                    {image && (
                      <img src={image} alt="Aperçu" className="w-12 h-12 object-cover rounded-lg border border-stone-200 shadow-sm flex-shrink-0" />
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Description</label>
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
                      onClick={() => { setEditingId(null); setTitle(''); setDate(''); setDescription(''); setImage(''); }}
                      className="bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl hover:bg-stone-300 transition-all cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Tableau CRUD Activités */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <h2 className="text-base font-bold text-stone-900 mb-4">Liste des activités ({activities.length})</h2>
              {activities.length === 0 ? (
                <p className="text-stone-500 text-sm py-8 text-center">Aucune activité enregistrée.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500 bg-stone-50/50">
                        <th className="py-3 px-4">Image</th>
                        <th className="py-3 px-4">Titre</th>
                        <th className="py-3 px-4">Catégorie</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Statut</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map(act => (
                        <tr key={act.id} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="py-3 px-4">
                            <img src={act.image} alt="" className="w-12 h-12 object-cover rounded-xl shadow-sm border border-stone-100" />
                          </td>
                          <td className="py-3 px-4 font-bold text-stone-800">{act.title}</td>
                          <td className="py-3 px-4 text-stone-600 text-xs">
                            <span className="px-2.5 py-1 bg-stone-100 rounded-md text-stone-700 font-medium">{act.category || 'Général'}</span>
                          </td>
                          <td className="py-3 px-4 text-stone-600 text-xs">{act.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${act.status === 'Publié' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {act.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button onClick={() => handleEdit(act)} className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer">Modifier</button>
                            <button onClick={() => handleDelete(act.id)} className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer">Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GESTION DES ADHÉSIONS */}
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

        {/* INSCRIPTIONS FORMATIONS */}
        {activeTab === 'formreg' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Inscriptions aux Formations</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              {formRegs.length === 0 ? (
                <p className="text-stone-500 text-sm py-8 text-center">Aucune inscription enregistrée.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">
                        <th className="py-3 px-4">Nom Complet</th>
                        <th className="py-3 px-4">Téléphone</th>
                        <th className="py-3 px-4">Activité / Formation</th>
                        <th className="py-3 px-4">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formRegs.map(reg => (
                        <tr key={reg.id} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="py-3 px-4 font-semibold text-stone-800">{reg.fullName}</td>
                          <td className="py-3 px-4 text-stone-600">{reg.phone}</td>
                          <td className="py-3 px-4 text-stone-600">{reg.activity}</td>
                          <td className="py-3 px-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">{reg.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MESSAGES DE CONTACT LISIBLES */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Messages de Contact</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-4">
              {contacts.length === 0 ? (
                <p className="text-stone-500 text-sm py-8 text-center">Aucun message reçu.</p>
              ) : (
                contacts.map(c => (
                  <div key={c.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-2 shadow-sm">
                    <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                      <h3 className="font-bold text-stone-900 text-base">{c.name} <span className="text-xs font-normal text-emerald-700">({c.email})</span></h3>
                      <span className="text-xs text-stone-500 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-xs">{c.date}</span>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed pt-1">{c.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}