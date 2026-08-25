import React from 'react';
import focusImg from './assets/1957246.jpg';

export default function About({ navigateTo }) {
  return (
    <section id="about" className="py-10 lg:py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section compacté */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full inline-block mb-3 shadow-sm">
            Qui sommes-nous
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Découvrez l'engagement d'Impact'Elle
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
            Une dynamique collective pensée par et pour les femmes, engagée pour transformer durablement l'écosystème entrepreneurial et le leadership communautaire.
          </p>
        </div>

        {/* Grille principale : Histoire & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
          
          {/* Bloc Texte / Histoire */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm tracking-wide uppercase">
              <span className="w-8 h-0.5 bg-emerald-800 inline-block"></span>
              Notre Histoire & Notre Mission
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-snug">
              Bâtir des ponts vers l'autonomie financière et l'excellence professionnelle.
            </h3>

            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              Fondée avec la conviction profonde que l'autonomisation des femmes est le moteur du développement, <strong className="text-stone-900">Impact'Elle</strong> structure des parcours d'accompagnement complets. De la maîtrise des coûts de revient à la gestion d'entreprise, nous outillons chaque entrepreneure pour révéler son plein potentiel.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-stone-50 border border-stone-200/80 p-4 sm:p-5 rounded-2xl shadow-sm hover:border-emerald-800/50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold mb-3 shadow-md shadow-emerald-800/20 text-sm">
                  01
                </div>
                <h4 className="font-bold text-stone-900 mb-1 text-sm sm:text-base">Formation & Terroir</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Des ateliers pratiques ancrés dans les réalités économiques locales.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200/80 p-4 sm:p-5 rounded-2xl shadow-sm hover:border-emerald-800/50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold mb-3 shadow-md shadow-stone-900/20 text-sm">
                  02
                </div>
                <h4 className="font-bold text-stone-900 mb-1 text-sm sm:text-base">Réseau & Solidarité</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Création de synergies puissantes entre groupements féminins.
                </p>
              </div>
            </div>
          </div>

          {/* Bloc Visuel / Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 h-[380px] sm:h-[440px]">
              <img 
                src={focusImg} 
                alt="Impact'Elle en action" 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white">
                  <span className="bg-emerald-700 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full mb-2 inline-block">
                    Leadership Féminin
                  </span>
                  <p className="text-base sm:text-lg font-bold">Ensemble, cultivons l'impact et la réussite durable.</p>
                </div>
              </div>
            </div>
            {/* Élément décoratif en arrière-plan */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-100 rounded-full blur-3xl -z-10 opacity-70"></div>
          </div>

        </div>

        {/* Valeurs / Piliers clés */}
        <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <span className="text-emerald-400 font-black text-xs uppercase tracking-widest block mb-2">Notre Vision</span>
              <h3 className="text-lg sm:text-xl font-bold mb-2">L'Égalité par l'Action</h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Offrir aux femmes les clés stratégiques pour siéger au cœur des décisions économiques de demain.
              </p>
            </div>

            <div>
              <span className="text-emerald-400 font-black text-xs uppercase tracking-widest block mb-2">Notre Mission</span>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Accompagner & Certifier</h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Structurer les micro-entreprises, formaliser les compétences et faciliter l'accès aux marchés.
              </p>
            </div>

            <div>
              <span className="text-emerald-400 font-black text-xs uppercase tracking-widest block mb-2">Nos Valeurs</span>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Solidarité & Rigueur</h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Cultiver l'entraide communautaire alliée à des standards professionnels irréprochables.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}