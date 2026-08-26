import React, { useState } from 'react';
import Hero from './Hero';
import About from './About';
import Activities from './Activities';
import Gallery from './Gallery';
import Contact from './Contact';
import FormReg from './FormReg';
import AdminDashboard from './AdminDashboard';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [membersList, setMembersList] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // États pour l'authentification Admin
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Fonction de navigation globale
  const navigateTo = (page, e) => {
    if (e) e.preventDefault();
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'impactelle' && password === '25082026') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // 1. Si on est sur l'onglet 'admin' et pas encore connecté -> Afficher l'écran de connexion
  if (activePage === 'admin' && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-stone-200 p-8 relative">
          <button 
            onClick={(e) => navigateTo('home', e)} 
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-sm font-bold cursor-pointer"
          >
            ✕ Quitter
          </button>

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-emerald-800 text-white flex items-center justify-center font-black text-xl rounded-2xl mx-auto mb-3 shadow-md">
              I
            </div>
            <h1 className="text-2xl font-black text-stone-900">Administration</h1>
            <p className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">Impact'Elle - Connexion sécurisée</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
              Identifiant ou mot de passe incorrect.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Identifiant</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="impactelle"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-sm"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Mot de passe</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-sm"
                required 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-stone-900 text-emerald-400 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md hover:bg-stone-800 transition-all cursor-pointer mt-2"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Si on est sur l'onglet 'admin' et connecté -> Afficher le Dashboard complet
  if (activePage === 'admin' && isAuthenticated) {
    return (
      <AdminDashboard 
        membersList={membersList} 
        onLogout={() => {
          setIsAuthenticated(false);
          navigateTo('home');
        }} 
      />
    );
  }

  // 3. Affichage normal du site (Accueil, À propos, Activités, etc.)
  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-900 font-sans antialiased selection:bg-stone-900 selection:text-white">
      
      {/* BANDEAU SUPÉRIEUR */}
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

      {/* NAVIGATION MODERNE */}
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

          {/* Menu Nav Desktop */}
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

          {/* Actions & Bouton Burger Mobile */}
          <div className="flex items-center space-x-4">
            <a
              href="#formreg"
              onClick={(e) => navigateTo('formreg', e)}
              className="hidden sm:inline-block bg-gradient-to-r from-stone-900 to-emerald-800 hover:from-stone-800 hover:to-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer uppercase tracking-wider"
            >
              Rejoindre impact'Elle
            </a>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-stone-700 hover:text-emerald-800 focus:outline-none p-2"
              aria-label="Ouvrir le menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Menu Déroulant Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <a 
              href="#home" 
              onClick={(e) => navigateTo('home', e)}
              className={`block px-3 py-2 rounded-md text-base font-semibold ${activePage === 'home' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              Accueil
            </a>
            <a 
              href="#qui-sommes-nous" 
              onClick={(e) => navigateTo('about', e)}
              className={`block px-3 py-2 rounded-md text-base font-semibold ${activePage === 'about' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              Qui sommes-nous
            </a>
            <a 
              href="#activites" 
              onClick={(e) => navigateTo('activities', e)}
              className={`block px-3 py-2 rounded-md text-base font-semibold ${activePage === 'activities' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              Nos activités
            </a>
            <a 
              href="#galerie" 
              onClick={(e) => navigateTo('gallery', e)}
              className={`block px-3 py-2 rounded-md text-base font-semibold ${activePage === 'gallery' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              Galerie
            </a>
            <a 
              href="#contact" 
              onClick={(e) => navigateTo('contact', e)}
              className={`block px-3 py-2 rounded-md text-base font-semibold ${activePage === 'contact' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              Contact
            </a>
            <div className="pt-2">
              <a
                href="#formreg"
                onClick={(e) => navigateTo('formreg', e)}
                className="block text-center bg-gradient-to-r from-stone-900 to-emerald-800 text-white text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider shadow-md"
              >
                Rejoindre impact'Elle
              </a>
            </div>
          </div>
        )}
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
      <footer className="bg-stone-900 text-stone-400 py-12 text-center text-sm space-y-2">
        <div>
          <button 
            onClick={(e) => navigateTo('admin', e)} 
            className="text-xs text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer bg-transparent border-none underline"
          >
            Espace Admin
          </button>
        </div>
        <p>&copy; 2026 Impact'Elle. Tous droits réservés.</p>
      </footer>

    </div>
  );
}