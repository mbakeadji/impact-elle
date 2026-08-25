import React, { useState } from 'react';

// Imports des mêmes images que la page Activités
import img1 from './assets/1957241.jpg';
import img2 from './assets/1957242.jpg';
import img3 from './assets/1957243.jpg';
import img4 from './assets/1957245.jpg';
import img5 from './assets/1957246.jpg';

export default function Gallery() {
  // Liste complète des photos avec leurs catégories
  const galleryPhotos = [
    {
      id: 1,
      image: img1,
      title: "Session intensive de formation et gestion des coûts",
      category: "Formation"
    },
    {
      id: 2,
      image: img2,
      title: "Ateliers de stratégie et concertation locale à Dakar",
      category: "Concertation"
    },
    {
      id: 3,
      image: img3,
      title: "Remise officielle d'attestations de compétences",
      category: "Certification"
    },
    {
      id: 4,
      image: img4,
      title: "Initiation aux outils digitaux pour entrepreneures",
      category: "Innovation"
    },
    {
      id: 5,
      image: img5,
      title: "Forum régional sur le leadership féminin",
      category: "Communauté"
    }
  ];

  // États pour les filtres et la pagination
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Nombre d'images affichées par page

  // État pour afficher une image en grand format (Lightbox)
  const [activeImage, setActiveImage] = useState(null);

  // Liste des catégories uniques
  const categories = ["Tous", "Formation", "Concertation", "Certification", "Innovation", "Communauté"];

  // 1. Filtrage des photos selon la catégorie sélectionnée
  const filteredPhotos = selectedCategory === "Tous" 
    ? galleryPhotos 
    : galleryPhotos.filter(photo => photo.category === selectedCategory);

  // 2. Calculs pour la pagination basés sur les photos filtrées
  const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhotos = filteredPhotos.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de catégorie en réinitialisant la page à 1
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section id="gallery" className="py-8 lg:py-12 bg-stone-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EN-TÊTE COMPACTÉ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-stone-200 pb-5 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-800 font-black text-[11px] uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Immersion Visuelle
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Galerie & Souvenirs
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
              Explorez en images les moments forts, les visages et l'impact de nos actions menées sur le terrain au quotidien.
            </p>
          </div>

          {/* Compteur compact */}
          <div className="text-stone-500 font-medium text-xs bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-sm">
            Total : <strong className="text-stone-900 font-bold">{filteredPhotos.length} photos</strong>
          </div>
        </div>

        {/* BARRE DE FILTRES PLUS PROCHE */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/20'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLE DES PHOTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPhotos.length > 0 ? (
            currentPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActiveImage(photo)}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-stone-200/80 flex flex-col"
              >
                {/* Conteneur de l'image */}
                <div className="relative h-56 bg-stone-900 overflow-hidden m-3 rounded-2xl flex items-center justify-center">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Badge de catégorie flottant sur l'image */}
                  <span className="absolute top-3 left-3 bg-stone-950/70 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white/10 shadow-sm">
                    {photo.category}
                  </span>

                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-stone-900 font-bold text-xs px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      🔍 Agrandir l'image
                    </span>
                  </div>
                </div>

                {/* Titre et description en dessous de l'image */}
                <div className="p-4 pt-1 flex-1 flex flex-col justify-between">
                  <h3 className="text-stone-900 font-bold text-sm sm:text-base leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {photo.title}
                  </h3>
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-medium">
                    <span>Impact'Elle Media</span>
                    <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform inline-block">Voir &rarr;</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-stone-500 bg-white rounded-3xl border border-stone-200">
              Aucune photo trouvée dans cette catégorie.
            </div>
          )}
        </div>

        {/* PAGINATION INTERACTIVE */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                currentPage === 1
                  ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-emerald-800 hover:text-white cursor-pointer shadow-sm'
              }`}
            >
              &larr; Précédent
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm ${
                  currentPage === number
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/20'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                currentPage === totalPages
                  ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-emerald-800 hover:text-white cursor-pointer shadow-sm'
              }`}
            >
              Suivant &rarr;
            </button>
          </div>
        )}

      </div>

      {/* MODALE LIGHTBOX (Agrandissement de l'image au clic) */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-stone-900 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-stone-800 flex flex-col items-center p-4 sm:p-6 cursor-default"
          >
            {/* Bouton de fermeture */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-stone-900 flex items-center justify-center font-bold transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              &#10005;
            </button>

            {/* Image grand format */}
            <div className="w-full h-[60vh] flex items-center justify-center mb-4">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>

            {/* Légende de l'image */}
            <div className="text-center">
              <span className="bg-emerald-700 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mb-2">
                {activeImage.category}
              </span>
              <h3 className="text-white font-bold text-base sm:text-lg">
                {activeImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}