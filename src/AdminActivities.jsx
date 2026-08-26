import React, { useState } from 'react';

export default function AdminActivities({ activities = [], setActivities }) {
  // États du formulaire d'activité
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Formation & Gestion');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('Publié');
  
  // ID de l'activité en cours de modification (null si c'est un ajout)
  const [editingId, setEditingId] = useState(null);

  // Gestion de l'upload d'image locale (convertie en URL Data URL) ou saisie d'URL directe
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Stocke l'image sous forme de chaîne base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Soumission du formulaire (Ajout ou Modification)
  const handleSubmitActivity = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    if (editingId !== null) {
      // Modification
      setActivities(activities.map(act => 
        act.id === editingId 
          ? { ...act, title, date, category, description, image: image || act.image, status } 
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
        image: image || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800',
        status
      };
      setActivities([newActivity, ...activities]);
    }

    // Réinitialisation du formulaire
    setTitle('');
    setDate('');
    setDescription('');
    setImage('');
    setStatus('Publié');
  };

  // Charger une activité dans le formulaire pour modification
  const handleEdit = (act) => {
    setEditingId(act.id);
    setTitle(act.title);
    setDate(act.date);
    setCategory(act.category || 'Formation & Gestion');
    setDescription(act.description || '');
    setImage(act.image || '');
    setStatus(act.status || 'Publié');
  };

  // Supprimer une activité
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette activité ?")) {
      setActivities(activities.filter(act => act.id !== id));
    }
  };

  return (
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
            <p className="text-[11px] text-stone-400 mt-1">Sélectionnez une image depuis votre ordinateur.</p>
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
                onClick={() => { setEditingId(null); setTitle(''); setDate(''); setDescription(''); setImage(''); }}
                className="bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl hover:bg-stone-300 transition-all cursor-pointer"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tableau CRUD des Activités */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 overflow-hidden">
        <h2 className="text-base font-bold text-stone-900 mb-4">Liste des activités ({activities.length})</h2>
        
        {activities.length === 0 ? (
          <p className="text-stone-500 text-sm py-8 text-center">Aucune activité enregistrée pour le moment.</p>
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
                  <tr key={act.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4">
                      <img 
                        src={act.image || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=200'} 
                        alt="" 
                        className="w-12 h-12 object-cover rounded-xl shadow-sm border border-stone-100" 
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-800">{act.title}</td>
                    <td className="py-3 px-4 text-stone-600 text-xs font-medium">
                      <span className="px-2.5 py-1 bg-stone-100 rounded-md text-stone-700">{act.category || 'Général'}</span>
                    </td>
                    <td className="py-3 px-4 text-stone-600 text-xs">{act.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${act.status === 'Publié' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(act)} 
                        className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer inline-block"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDelete(act.id)} 
                        className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer inline-block"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}