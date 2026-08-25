import React, { useState } from 'react';

export default function FormReg({ membersList, setMembersList }) {
  const [membershipForm, setMembershipForm] = useState({ 
    firstName: '', 
    lastName: '', 
    address: '', 
    phone: '', 
    activity: '' 
  });
  const [membershipSubmitted, setMembershipSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(),
      ...membershipForm,
      date: new Date().toISOString().split('T')[0]
    };
    
    setMembersList([newMember, ...membersList]);
    setMembershipSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] py-20 bg-stone-50 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="text-center max-w-xl mx-auto mb-10 relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full inline-block mb-4">
              Devenez membre du réseau
            </span>
            <h2 className="text-4xl font-black text-stone-900 mt-1 mb-4">Rejoindre Impact'Elle</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Remplissez ce formulaire pour nous rejoindre. Vos données seront directement intégrées dans votre espace administrateur.
            </p>
          </div>

          {membershipSubmitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-2xl p-10 text-center space-y-5">
              <div className="w-20 h-20 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto text-4xl font-bold shadow-lg">✓</div>
              <h4 className="text-2xl font-bold text-emerald-900">Bienvenue parmi nous !</h4>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Votre demande d'adhésion a été enregistrée avec succès.
              </p>
              <button 
                onClick={() => { 
                  setMembershipSubmitted(false); 
                  setMembershipForm({ firstName: '', lastName: '', address: '', phone: '', activity: '' }); 
                }}
                className="mt-4 bg-stone-900 text-white font-bold px-8 py-3 rounded-full text-xs hover:bg-stone-800 uppercase tracking-wider cursor-pointer"
              >
                Inscrire une autre personne
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">Nom *</label>
                  <input 
                    type="text" required placeholder="Ex: Ndiaye" 
                    value={membershipForm.lastName}
                    onChange={(e) => setMembershipForm({...membershipForm, lastName: e.target.value})}
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">Prénom *</label>
                  <input 
                    type="text" required placeholder="Ex: Fatou" 
                    value={membershipForm.firstName}
                    onChange={(e) => setMembershipForm({...membershipForm, firstName: e.target.value})}
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">Adresse *</label>
                  <input 
                    type="text" required placeholder="Ex: Dakar, Medina" 
                    value={membershipForm.address}
                    onChange={(e) => setMembershipForm({...membershipForm, address: e.target.value})}
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">Numéro de téléphone *</label>
                  <input 
                    type="tel" required placeholder="Ex: +221 77 000 00 00" 
                    value={membershipForm.phone}
                    onChange={(e) => setMembershipForm({...membershipForm, phone: e.target.value})}
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">Domaine d'activité / Profession *</label>
                <input 
                  type="text" required placeholder="Ex: Commerce, Couture..." 
                  value={membershipForm.activity}
                  onChange={(e) => setMembershipForm({...membershipForm, activity: e.target.value})}
                  className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800 shadow-sm"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-900 to-emerald-700 hover:from-emerald-800 text-white font-bold py-4 px-8 rounded-xl text-sm transition-all shadow-lg cursor-pointer uppercase tracking-wider"
                >
                  Valider mon adhésion →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}