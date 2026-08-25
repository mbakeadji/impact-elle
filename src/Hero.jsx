import React, { useState, useEffect } from 'react';

// Imports des images locales pour le Hero
import heroImg1 from './assets/1957241.jpg';
import heroImg2 from './assets/1957242.jpg';
import heroImg3 from './assets/1957243.jpg';
import heroImg4 from './assets/1957245.jpg';

export default function Hero({ navigateTo }) {
  // Données des diapos du slider Hero
  const slides = [
    {
      image: heroImg1,
      tag: "Inspiration & Innovation",
      title: "Investir dans les femmes, révéler le potentiel.",
      description: "Impact'Elle œuvre pour le renforcement des capacités entrepreneuriales, la solidarité communautaire et l'autonomisation durable des femmes."
    },
    {
      image: heroImg2,
      tag: "Formations Pratiques",
      title: "Gestion d'entreprise et calcul des coûts.",
      description: "Accompagnement terrain pour maîtriser la gestion financière, la rentabilité et la pérennisation des micro-entreprises."
    },
    {
      image: heroImg3,
      tag: "Lien & Solidarité",
      title: "Ateliers de stratégie et concertation locale.",
      description: "Des espaces de co-création pour structurer les réseaux de femmes et multiplier l'impact économique communautaire."
    },
    {
      image: heroImg4,
      tag: "Reconnaissance",
      title: "Valorisation des compétences & Certifications.",
      description: "Attestation officielle des compétences acquises pour faciliter l'accès au financement et aux marchés institutionnels."
    }
  ];

  // Données factices de secours si l'admin n'a encore rien publié
  const defaultNewsActivities = [
    {
      id: 1,
      image: heroImg1,
      category: "Formation",
      date: "20 Août 2026",
      title: "Atelier pratique sur la gestion financière",
      description: "Session de formation intensive axée sur le calcul des coûts et la tenue de la comptabilité simplifiée pour les entrepreneures."
    },
    {
      id: 2,
      image: heroImg2,
      category: "Autonomisation",
      date: "14 Août 2026",
      title: "Remise d'attestations de compétences",
      description: "Célébration des femmes ayant achevé avec succès leur parcours d'accompagnement et de formation professionnelle."
    },
    {
      id: 3,
      image: heroImg3,
      category: "Communauté",
      date: "05 Août 2026",
      title: "Rencontre de concertation locale",
      description: "Échanges stratégiques pour renforcer la synergie entre les groupements de femmes et élargir les opportunités de marché."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsActivities, setNewsActivities] = useState(defaultNewsActivities);

  // Charger les dernières activités publiées par l'admin depuis le localStorage
  useEffect(() => {
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      try {
        const parsed = JSON.parse(savedActivities);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // On prend par exemple les 3 plus récentes
          setNewsActivities(parsed.slice(0, 3));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des activités:", error);
      }
    }
  }, []);

  // Rotation automatique toutes les 5 secondes pour le slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      {/* Hero Slider */}
      <section className="bg-gradient-to-br from-white via-stone-50 to-emerald-50/30 py-10 lg:py-14 border-b border-stone-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 z-10">
              <span className="bg-gradient-to-r from-emerald-800 to-stone-900 text-white font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-4 shadow-sm">
                {slides[currentSlide].tag}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight mb-5 tracking-tight min-h-[100px] lg:min-h-[120px] flex items-center">
                {slides[currentSlide].title}
              </h1>

              <p className="text-stone-600 text-base leading-relaxed mb-8 min-h-[60px]">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="#qui-sommes-nous"
                  onClick={(e) => navigateTo('about', e)}
                  className="bg-gradient-to-r from-stone-900 to-emerald-800 hover:from-stone-800 hover:to-emerald-700 text-white font-bold px-7 py-3.5 rounded-full text-sm text-center transition-all shadow-md shadow-stone-900/15 hover:-translate-y-0.5 cursor-pointer"
                >
                  Découvrir notre vision
                </a>
                <a
                  href="#activites"
                  onClick={(e) => navigateTo('activities', e)}
                  className="bg-white hover:bg-emerald-50/50 text-emerald-900 border-2 border-emerald-800/20 font-bold px-7 py-3.5 rounded-full text-sm text-center transition-all shadow-sm cursor-pointer"
                >
                  Voir nos activités
                </a>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <div className="flex space-x-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide
                          ? 'w-8 bg-emerald-800'
                          : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                      }`}
                      aria-label={`Aller à la diapositive ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="w-9 h-9 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-emerald-800 hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    aria-label="Précédent"
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-emerald-800 hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    aria-label="Suivant"
                  >
                    &#10095;
                  </button>
                </div>
              </div>

            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-stone-100 via-white to-emerald-50 h-[420px] sm:h-[520px] flex items-center justify-center">
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide.image}
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
                      index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none z-20"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ruban Statistique */}
      <section className="relative z-20 -mt-6 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y-0 md:divide-x divide-stone-100 text-center">
          <div className="p-2">
            <span className="block text-4xl font-black bg-gradient-to-r from-stone-900 to-emerald-800 bg-clip-text text-transparent">100%</span>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-2 block">Autonomisation</span>
          </div>
          <div className="p-2">
            <span className="block text-4xl font-black bg-gradient-to-r from-stone-900 to-emerald-800 bg-clip-text text-transparent">+500</span>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-2 block">Femmes Formées</span>
          </div>
          <div className="p-2">
            <span className="block text-4xl font-black bg-gradient-to-r from-stone-900 to-emerald-800 bg-clip-text text-transparent">12+</span>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-2 block">Projets Accompagnés</span>
          </div>
          <div className="p-2">
            <span className="block text-4xl font-black bg-gradient-to-r from-stone-900 to-emerald-800 bg-clip-text text-transparent">01</span>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-2 block">Vision Commune</span>
          </div>
        </div>
      </section>

      {/* Aperçu des Dernières Activités (Dynamiques) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800">Actualités de terrain</span>
            <h2 className="text-3xl font-black text-stone-900 mt-1">Nos dernières activités</h2>
          </div>
          <button onClick={(e) => navigateTo('activities', e)} className="text-emerald-800 font-bold text-sm hover:text-emerald-900 transition-colors mt-4 md:mt-0 flex items-center gap-1 cursor-pointer">
            Voir toutes les actualités &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsActivities.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
              <div>
                <div className="h-60 overflow-hidden relative bg-stone-100 flex items-center justify-center">
                  <img 
                    src={item.image || heroImg1} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-emerald-900 text-[11px] font-black px-3 py-1 rounded-full shadow-sm z-10">
                    {item.category || "Activité"}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-emerald-700 block mb-2">{item.date || "Récemment"}</span>
                  <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button 
                  onClick={(e) => navigateTo('activities', e, item.id)} 
                  className="text-emerald-800 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  Lire la suite <span>&rarr;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}