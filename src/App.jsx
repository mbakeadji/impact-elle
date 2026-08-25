import React, { useState } from 'react';
import Hero from './Hero';
import About from './About';
import Activities from './Activities';
import Gallery from './Gallery';
import Contact from './Contact';
import FormReg from './FormReg';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [membersList, setMembersList] = useState([]);

  // Fonction de navigation avec remontée automatique en haut de page
  const navigateTo = (page, e) => {
    if (e) e.preventDefault();
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-900 font-sans antialiased selection:bg-stone-900 selection:text-white">
      
      {/* 1. BANDEAU SUPÉRIEUR */}
      <aside aria-label="Annonce d'actualité" className="bg-gradient-to-r from-stone-900 via-emerald-900 to-stone-900 text-stone-100 text-xs py-2.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-700 text-white font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider shadow-sm">
              Impact
            </span>
            <span className="truncate text-stone-200 font-medium">
              Mobilisation pour l'autonomisation économique et le leadership des femmes.
            </span>
          </div>
          <a href="#activites" onClick={(e) => navigateTo('activities', e)} className="text-emerald-300 hover:text-white font-semibold transition-colors flex items-center gap-1 shrink-0 cursor-pointer">
            Voir le journal des activités &rarr;
          </a>
        </div>
      </aside>

      {/* 2. NAVIGATION MODERNE */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" onClick={(e) => navigateTo('home', e)} className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-stone-900 to-emerald-800 text-white flex items-center justify-center font-black text-xl rounded-2xl shadow-md shadow-stone-900/10">
              I
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-stone-900 via-emerald-900 to-stone-800 bg-clip-text text-transparent tracking-tight">
                Impact'Elle
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold -mt-0.5">
                Ensemble vers l'Égalité
              </span>
            </div>
          </a>

          {/* Menu Nav Dynamique */}
          <nav className="hidden md:flex items-center space-x-8 font-semibold text-sm text-stone-600">
            <a 
              href="#home" 
              onClick={(e) => navigateTo('home', e)}
              className={`transition-colors pb-1 relative cursor-pointer ${activePage === 'home' ? 'text-emerald-800 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-800' : 'hover:text-emerald-800'}`}
            >
              Accueil
            </a>
            <a 
              href="#qui-sommes-nous" 
              onClick={(e) => navigateTo('about', e)}
              className={`transition-colors pb-1 relative cursor-pointer ${activePage === 'about' ? 'text-emerald-800 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-800' : 'hover:text-emerald-800'}`}
            >
              Qui sommes-nous
            </a>
            <a 
              href="#activites" 
              onClick={(e) => navigateTo('activities', e)}
              className={`transition-colors pb-1 relative cursor-pointer ${activePage === 'activities' ? 'text-emerald-800 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-800' : 'hover:text-emerald-800'}`}
            >
              Nos activités
            </a>
            <a 
              href="#galerie" 
              onClick={(e) => navigateTo('gallery', e)}
              className={`transition-colors pb-1 relative cursor-pointer ${activePage === 'gallery' ? 'text-emerald-800 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-800' : 'hover:text-emerald-800'}`}
            >
              Galerie
            </a>
            <a 
              href="#contact" 
              onClick={(e) => navigateTo('contact', e)}
              className={`transition-colors pb-1 relative cursor-pointer ${activePage === 'contact' ? 'text-emerald-800 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-800' : 'hover:text-emerald-800'}`}
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a
              href="#formreg"
              onClick={(e) => navigateTo('formreg', e)}
              className="bg-gradient-to-r from-stone-900 to-emerald-800 hover:from-stone-800 hover:to-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer uppercase tracking-wider"
            >
              Rejoindre impact'Elle
            </a>
          </div>

        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main>
        {activePage === 'home' && <Hero navigateTo={navigateTo} />}
        {activePage === 'about' && <About />}
        {activePage === 'activities' && <Activities />}
        {activePage === 'gallery' && <Gallery />}
        {activePage === 'contact' && <Contact />}
        {activePage === 'formreg' && (
          <FormReg membersList={membersList} setMembersList={setMembersList} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center text-sm">
        <p>&copy; 2026 Impact'Elle. Tous droits réservés.</p>
      </footer>

    </div>
  );
}