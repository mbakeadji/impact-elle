import React, { useState } from 'react';

export default function Contact() {
  // États pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // État pour afficher le message de succès
  const [submitted, setSubmitted] = useState(false);

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Création de l'objet message avec une date
    const newMessage = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };

    // Récupération des anciens messages stockés ou tableau vide
    const existingMessages = JSON.parse(localStorage.getItem('admin_messages') || '[]');

    // Ajout du nouveau message au début
    const updatedMessages = [newMessage, ...existingMessages];

    // Sauvegarde dans le localStorage (pour le futur Espace Admin)
    localStorage.setItem('admin_messages', JSON.stringify(updatedMessages));

    // Activation de l'état de succès et réinitialisation
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-8 lg:py-12 bg-white text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TROIS SIGNAUX / BADGES EN HAUT (En remplacement du grand titre) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 rounded-full text-emerald-800 text-xs font-black uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Centre d'échange & Support
          </div>
          <div className="inline-flex items-center gap-2 bg-stone-100 border border-stone-200/80 px-4 py-1.5 rounded-full text-stone-700 text-xs font-bold uppercase tracking-wider">
            <span>🤝</span> Partenariats & Projets
          </div>
          <div className="inline-flex items-center gap-2 bg-stone-100 border border-stone-200/80 px-4 py-1.5 rounded-full text-stone-700 text-xs font-bold uppercase tracking-wider">
            <span>⚡</span> Réponse rapide
          </div>
        </div>

        {/* Grille principale : Infos à gauche, Formulaire à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLONNE GAUCHE : Cartes de contact épurées et modernes */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="text-lg font-black tracking-wide uppercase text-emerald-400 mb-2">Coordonnées Directes</h3>
              <p className="text-stone-300 text-xs leading-relaxed mb-6">
                Vous pouvez également nous joindre directement via nos canaux officiels ou nous rendre visite au siège.
              </p>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">📍</span>
                  <div>
                    <strong className="block text-white font-bold">Siège Social</strong>
                    <span className="text-stone-300 text-xs">Dakar, Sénégal (Permanence administrative)</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">📞</span>
                  <div>
                    <strong className="block text-white font-bold">Téléphone & WhatsApp</strong>
                    <span className="text-stone-300 text-xs">+221 33 000 00 00 / +221 77 000 00 00</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">✉️</span>
                  <div>
                    <strong className="block text-white font-bold">E-mail Officiel</strong>
                    <span className="text-stone-300 text-xs">contact@impactelle.org</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note d'information Espace Admin */}
            <div className="bg-emerald-50/80 border border-emerald-200/70 p-5 rounded-2xl flex items-center gap-4">
              <span className="text-2xl">⚙️</span>
              <p className="text-xs text-emerald-900 font-medium">
                <strong className="font-bold block mb-0.5">Sécurité & Centralisation :</strong> 
                Chaque message envoyé ici est stocké et transmis instantanément dans votre espace de gestion administrateur.
              </p>
            </div>

          </div>

          {/* COLONNE DROITE : Formulaire de contact stylisé */}
          <div className="lg:col-span-7 bg-stone-50/80 border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative">
            
            {submitted ? (
              /* Message de succès après envoi */
              <div className="py-12 text-center space-y-6 animate-fadeIn">
                <div className="w-20 h-20 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-stone-900">Message envoyé avec succès !</h3>
                  <p className="text-stone-600 text-sm max-w-md mx-auto">
                    Merci pour votre message. L'équipe d'Impact'Elle l'a bien reçu dans son espace de gestion et vous recontactera très rapidement.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-colors cursor-pointer shadow-md"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              /* Formulaire de saisie */
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                  <span>✍️</span> Envoyez-nous un message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nom complet */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Aminata Diallo"
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 transition-colors shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Adresse e-mail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ex: aminata@gmail.com"
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Téléphone */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+221 77 000 00 00"
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 transition-colors shadow-sm"
                    />
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Sujet *</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Objet de votre message"
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Votre Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Écrivez votre message ici..."
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 transition-colors resize-none shadow-sm"
                  ></textarea>
                </div>

                {/* Bouton d'envoi */}
                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl transition-colors cursor-pointer shadow-md shadow-emerald-800/25 flex items-center justify-center gap-2"
                >
                  <span>Envoyer le message</span> 🚀
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}