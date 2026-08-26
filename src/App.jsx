import React, { useState } from 'react';

export default function App() {
  // Navigation du site : 'home', 'activities', 'contact', 'admin'
  const [currentPage, setCurrentPage] = useState('home');

  // État global des activités partagé entre le dashboard et le site public
  const [activities, setActivities] = useState([
    { 
      id: 1, 
      title: 'Atelier Leadership Féminin', 
      date: '2026-09-10', 
      category: 'Formation', 
      status: 'Publié', 
      description: 'Atelier pratique sur le renforcement des capacités managériales et l’entrepreneuriat.',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 2, 
      title: 'Formation Transformation Agroalimentaire', 
      date: '2026-09-18', 
      category: 'Agro', 
      status: 'Publié', 
      description: 'Techniques modernes de conservation et de transformation locale des produits agricoles.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400' 
    }
  ]);

  // Liste des membres inscrits (Adhésions)
  const [membersList, setMembersList] = useState([
    { name: 'Fatou Diop', email: 'fatou@gmail.com', phone: '+221 77 000 11 22' }
  ]);

  // Liste des messages de contact reçus
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Aissatou Diallo', email: 'aissatou@gmail.com', message: 'Je souhaite en savoir plus sur vos programmes d’accompagnement.', date: '25/08/2026' }
  ]);

  // Inscriptions aux formations
  const [formRegs, setFormRegs] = useState([
    { id: 1, fullName: 'Aminata Ndiaye', phone: '+221 77 123 45 67', activity: 'Agro-business', status: 'Confirmé' }
  ]);

  // Filtre pour ne montrer que les activités publiées sur le site public
  const publishedActivities = activities.filter(act => act.status === 'Publié');

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col justify-between">
      
      {/* HEADER / NAVIGATION DU SITE PUBLIC (Masqué si l'on est dans l'admin) */}
      {currentPage !== 'admin' && (
        <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 bg-emerald-800 text-white flex items-center justify-center font-black rounded-xl shadow-md">
                I
              </div>
              <span className="font-black text-xl tracking-tight text-stone-900">Impact'Elle</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 text-sm font-bold">
              <button onClick={() => setCurrentPage('home')} className={`transition-colors cursor-pointer ${currentPage === 'home' ? 'text-emerald-800' : 'text-stone-600 hover:text-stone-900'}`}>
                Accueil
              </button>
              <button onClick={() => setCurrentPage('activities')} className={`transition-colors cursor-pointer ${currentPage === 'activities' ? 'text-emerald-800' : 'text-stone-600 hover:text-stone-900'}`}>
                Nos Activités
              </button>
              <button onClick={() => setCurrentPage('contact')} className={`transition-colors cursor-pointer ${currentPage === 'contact' ? 'text-emerald-800' : 'text-stone-600 hover:text-stone-900'}`}>
                Contact & Adhésion
              </button>
            </nav>

            <div>
              <button 
                onClick={() => setCurrentPage('admin')}
                className="bg-stone-900 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-stone-800 transition-all cursor-pointer shadow-sm"
              >
                🔐 Espace Admin
              </button>
            </div>
          </div>
        </header>
      )}

      {/* CONTENU PRINCIPAL SELON LA PAGE */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            latestActivities={publishedActivities.slice(0, 3)} 
            setCurrentPage={setCurrentPage} 
          />
        )}

        {currentPage === 'activities' && (
          <ActivitiesPage activities={publishedActivities} />
        )}

        {currentPage === 'contact' && (
          <ContactAndMembershipPage 
            setMembersList={setMembersList} 
            setContacts={setContacts} 
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard 
            activities={activities}
            setActivities={setActivities}
            membersList={membersList}
            contacts={contacts}
            formRegs={formRegs}
            onLogout={() => setCurrentPage('home')}
          />
        )}
      </main>

      {/* FOOTER PUBLIC */}
      {currentPage !== 'admin' && (
        <footer className="bg-stone-900 text-stone-400 py-12 px-6 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <p className="text-white font-bold text-lg">Impact'Elle</p>
              <p className="text-xs text-stone-500 mt-1">Plateforme d'accompagnement et d'impact communautaire.</p>
            </div>
            <p className="text-xs text-stone-500">&copy; 2026 Impact'Elle. Tous droits réservés.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

/* ================= COMPOSANT : PAGE D'ACCUEIL ================= */
function HomePage({ latestActivities, setCurrentPage }) {
  return (
    <div>
      <section className="bg-emerald-900 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-700">
            Mouvement & Impact
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Agir ensemble pour l'autonomisation</h1>
          <p className="text-emerald-100 text-base md:text-lg max-w-xl mx-auto">
            Découvrez nos initiatives, nos formations et participez activement au développement de notre communauté.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('activities')}
              className="bg-white text-emerald-900 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md hover:bg-emerald-50 transition-all cursor-pointer"
            >
              Voir nos activités
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-emerald-700 hover:bg-emerald-700 transition-all cursor-pointer"
            >
              Nous rejoindre
            </button>
          </div>
        </div>
      </section>

      {/* Dernières Activités synchronisées avec l'Admin */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-stone-900">Dernières Activités</h2>
            <p className="text-sm text-stone-500 mt-1">Mises à jour directement depuis l'espace d'administration.</p>
          </div>
          <button 
            onClick={() => setCurrentPage('activities')}
            className="text-xs font-bold uppercase tracking-wider text-emerald-800 hover:underline cursor-pointer hidden sm:block"
          >
            Tout voir &rarr;
          </button>
        </div>

        {latestActivities.length === 0 ? (
          <p className="text-stone-500 text-center py-12">Aucune activité publiée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestActivities.map((act) => (
              <div key={act.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 flex flex-col hover:shadow-md transition-shadow">
                <img src={act.image} alt={act.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md">
                      {act.category || 'Général'}
                    </span>
                    <h3 className="font-bold text-stone-900 text-lg mt-3">{act.title}</h3>
                    <p className="text-sm text-stone-600 mt-2 line-clamp-2">{act.description}</p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 text-xs font-semibold text-stone-500 flex items-center gap-1">
                    📅 {act.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ================= COMPOSANT : PAGE "NOS ACTIVITÉS" ================= */
function ActivitiesPage({ activities }) {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-stone-900">Toutes nos Activités</h1>
        <p className="text-stone-600 text-sm">Explorez l'ensemble de nos programmes, formations et événements passés et à venir.</p>
      </div>

      {activities.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-sm">
          <p className="text-stone-500 text-sm">Aucune activité disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {activities.map((act) => (
            <div key={act.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 flex flex-col">
              <img src={act.image} alt={act.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md">
                    {act.category || 'Général'}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-3">{act.title}</h3>
                  <p className="text-sm text-stone-600 mt-2">{act.description}</p>
                </div>
                <div className="pt-4 border-t border-stone-100 text-xs font-semibold text-stone-500">
                  📅 {act.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= COMPOSANT : PAGE CONTACT & ADHÉSION ================= */
function ContactAndMembershipPage({ setMembersList, setContacts }) {
  const [memberForm, setMemberForm] = useState({ name: '', email: '', phone: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [memberSuccess, setMemberSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.email) return;
    setMembersList(prev => [memberForm, ...prev]);
    setMemberSuccess(true);
    setMemberForm({ name: '', email: '', phone: '' });
    setTimeout(() => setMemberSuccess(false), 4000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;
    const newMsg = {
      id: Date.now(),
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
      date: new Date().toLocaleDateString()
    };
    setContacts(prev => [newMsg, ...prev]);
    setContactSuccess(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setContactSuccess(false), 4000);
  };

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Formulaire Adhésion */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Rejoindre Impact'Elle</h2>
          <p className="text-stone-600 text-sm mb-6">Devenez membre de notre réseau et prenez part à nos actions.</p>
          
          {memberSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
              🎉 Votre demande d'adhésion a été enregistrée avec succès !
            </div>
          )}

          <form onSubmit={handleMemberSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Nom complet</label>
              <input 
                type="text" 
                value={memberForm.name} 
                onChange={e => setMemberForm({...memberForm, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Email</label>
              <input 
                type="email" 
                value={memberForm.email} 
                onChange={e => setMemberForm({...memberForm, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Téléphone</label>
              <input 
                type="text" 
                value={memberForm.phone} 
                onChange={e => setMemberForm({...memberForm, phone: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
              />
            </div>
            <button type="submit" className="w-full bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md hover:bg-emerald-900 transition-all cursor-pointer">
              Soumettre mon adhésion
            </button>
          </form>
        </div>
      </div>

      {/* Formulaire Contact */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Envoyez-nous un message</h2>
          <p className="text-stone-600 text-sm mb-6">Une question ? Une suggestion ? Écrivez-nous.</p>

          {contactSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
              ✉️ Votre message a bien été envoyé à l'administration !
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Votre nom</label>
              <input 
                type="text" 
                value={contactForm.name} 
                onChange={e => setContactForm({...contactForm, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Votre email</label>
              <input 
                type="email" 
                value={contactForm.email} 
                onChange={e => setContactForm({...contactForm, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Message</label>
              <textarea 
                rows="3" 
                value={contactForm.message} 
                onChange={e => setContactForm({...contactForm, message: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-stone-900 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md hover:bg-stone-800 transition-all cursor-pointer">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPOSANT : DASHBOARD ADMIN ================= */
function AdminDashboard({ activities, setActivities, membersList, contacts, formRegs, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  // États du formulaire d'activité (CRUD)
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Formation');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('Publié');
  const [editingId, setEditingId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

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
        image: image || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=400',
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
              <span className="text-xs text-emerald-400 font-medium">Gestion du Site Public</span>
            </div>
          </div>

          <nav className="space-y-1.5 text-sm font-medium">
            <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'overview' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>
              📊 Vue d'ensemble
            </button>
            <button onClick={() => setActiveTab('activities')} className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'activities' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>
              📅 Gérer Activités ({activities.length})
            </button>
            <button onClick={() => setActiveTab('members')} className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'members' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>
              👥 Adhésions ({membersList.length})
            </button>
            <button onClick={() => setActiveTab('formreg')} className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'formreg' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>
              🎓 Inscriptions Form. ({formRegs.length})
            </button>
            <button onClick={() => setActiveTab('contacts')} className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${activeTab === 'contacts' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800'}`}>
              ✉️ Messages ({contacts.length})
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-800 space-y-2">
          <button onClick={onLogout} className="w-full text-left px-4 py-2.5 rounded-xl text-xs text-emerald-400 bg-stone-800 font-bold hover:bg-stone-700 transition-colors cursor-pointer">
            🌐 Retour au site public
          </button>
        </div>
      </aside>

      {/* Contenu Dashboard */}
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
                <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Formations</p>
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
          <div className="space-y-8">
            <h1 className="text-2xl font-black text-stone-900">Gestion des Activités (Publié sur le site)</h1>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <h2 className="text-base font-bold text-stone-900 mb-4">
                {editingId !== null ? '✏️ Modifier l\'activité' : '➕ Ajouter une nouvelle activité'}
              </h2>
              <form onSubmit={handleSubmitActivity} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Titre</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre de l'activité" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Catégorie</label>
                  <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Ex: Formation, Agro" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Statut d'affichage</label>
                  <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none">
                    <option value="Publié">Publié (Visible sur le site)</option>
                    <option value="Brouillon">Brouillon (Masqué du site)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Image</label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm cursor-pointer" />
                    {image && <img src={image} alt="Aperçu" className="w-12 h-12 object-cover rounded-lg border border-stone-200" />}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Description</label>
                  <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} placeholder="Détails de l'activité..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-800 focus:outline-none" />
                </div>
                <div className="sm:col-span-2 flex gap-3">
                  <button type="submit" className="bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md hover:bg-emerald-900 transition-all cursor-pointer">
                    {editingId !== null ? 'Enregistrer les modifications' : 'Publier sur le site'}
                  </button>
                  {editingId !== null && (
                    <button type="button" onClick={() => { setEditingId(null); setTitle(''); setDate(''); setDescription(''); setImage(''); }} className="bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl hover:bg-stone-300 cursor-pointer">
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <h2 className="text-base font-bold text-stone-900 mb-4">Liste de toutes les activités ({activities.length})</h2>
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
                        <td className="py-3 px-4"><img src={act.image} alt="" className="w-12 h-12 object-cover rounded-xl border border-stone-100" /></td>
                        <td className="py-3 px-4 font-bold text-stone-800">{act.title}</td>
                        <td className="py-3 px-4 text-stone-600 text-xs"><span className="px-2.5 py-1 bg-stone-100 rounded-md">{act.category}</span></td>
                        <td className="py-3 px-4 text-stone-600 text-xs">{act.date}</td>
                        <td className="py-3 px-4"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${act.status === 'Publié' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{act.status}</span></td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button onClick={() => handleEdit(act)} className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer">Modifier</button>
                          <button onClick={() => handleDelete(act.id)} className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer">Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Adhésions reçues</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">
                    <th className="py-3 px-4">Nom</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  {membersList.map((m, idx) => (
                    <tr key={idx} className="border-b border-stone-100">
                      <td className="py-3 px-4 font-semibold">{m.name}</td>
                      <td className="py-3 px-4 text-stone-600">{m.email}</td>
                      <td className="py-3 px-4 text-stone-600">{m.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'formreg' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Inscriptions aux formations</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">
                    <th className="py-3 px-4">Nom Complet</th>
                    <th className="py-3 px-4">Téléphone</th>
                    <th className="py-3 px-4">Formation</th>
                    <th className="py-3 px-4">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {formRegs.map(reg => (
                    <tr key={reg.id} className="border-b border-stone-100">
                      <td className="py-3 px-4 font-semibold">{reg.fullName}</td>
                      <td className="py-3 px-4 text-stone-600">{reg.phone}</td>
                      <td className="py-3 px-4 text-stone-600">{reg.activity}</td>
                      <td className="py-3 px-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">{reg.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-stone-900">Messages de contact</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-4">
              {contacts.map(c => (
                <div key={c.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
                  <div className="flex justify-between font-bold text-sm text-stone-900">
                    <span>{c.name} ({c.email})</span>
                    <span className="text-xs text-stone-500 font-normal">{c.date}</span>
                  </div>
                  <p className="text-sm text-stone-700">{c.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}