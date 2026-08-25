import React, { useState } from 'react';

// Imports des images locales
import img1 from './assets/1957241.jpg';
import img2 from './assets/1957242.jpg';
import img3 from './assets/1957243.jpg';
import img4 from './assets/1957245.jpg';
import img5 from './assets/1957246.jpg';

export default function Activities() {
  // Liste des articles / activités (prête à être connectée à l'Espace Admin futur)
  const allActivities = [
    {
      id: 1,
      image: img1,
      category: "Formation & Gestion",
      date: "18 Août 2026",
      title: "Session intensive : Gestion d'entreprise et calcul des coûts",
      excerpt: "Accompagnement terrain pour maîtriser la gestion financière, la rentabilité et la pérennisation des micro-entreprises de femmes.",
      content: `Dans le cadre de son programme d'autonomisation économique, l'association Impact'Elle a organisé une session de formation intensive dédiée à la gestion financière et au calcul rigoureux des coûts de revient. 

      Plus de 45 entrepreneures locales ont pris part à cet atelier pratique. L'objectif principal était de leur transmettre des outils méthodologiques simples mais redoutables pour évaluer leurs charges fixes et variables, fixer des prix de vente rentables et optimiser la marge bénéficiaire de leurs activités respectives (transformation agroalimentaire, couture, commerce de proximité).

      « Maîtriser ses chiffres, c'est s'assurer une pérennité et ouvrir la porte aux financements bancaires formels », a souligné la coordinatrice du projet lors de son allocution d'ouverture. La séance s'est conclue par des cas pratiques individualisés et la remise de kits de comptabilité simplifiée.`
    },
    {
      id: 2,
      image: img2,
      category: "Concertation & Réseau",
      date: "12 Juillet 2026",
      title: "Ateliers de stratégie et concertation locale à Dakar",
      excerpt: "Mise en place d'espaces de co-création pour structurer les réseaux de femmes et multiplier l'impact économique communautaire.",
      content: `Réunies au cœur de Dakar, les représentantes des groupements féminins partenaires d'Impact'Elle ont participé activement à un atelier de co-création stratégique. 

      Cet espace d'échange a permis de poser les bases d'un réseau unifié de commercialisation et de partage de ressources. Face aux défis logistiques et d'accès aux marchés de grande envergure, la mutualisation des forces apparaît comme la clé de voûte de la réussite collective.

      Au terme de la journée, une feuille de route claire a été adoptée, incluant la création d'une plateforme d'échange numérique et l'organisation de foires trimestrielles dédiées exclusivement aux produits issus de l'économie solidaire féminine.`
    },
    {
      id: 3,
      image: img3,
      category: "Reconnaissance & Certification",
      date: "05 Juin 2026",
      title: "Remise officielle d'attestations de compétences",
      excerpt: "Cérémonie de valorisation des savoir-faire et des compétences acquises tout au long du parcours d'accompagnement.",
      content: `Un moment riche en émotions et en fierté. L'organisation Impact'Elle a célébré l'aboutissement du parcours de formation professionnelle de dizaines de femmes leaders.

      L'attestation de compétences remise lors de cette cérémonie officielle constitue un véritable sésame pour ces entrepreneures. Elle atteste officiellement de leur maîtrise des normes de qualité, de gestion et de production. 

      Cette reconnaissance officielle facilite grandement leur intégration dans les circuits économiques formels, l'accès aux marchés publics et aux lignes de crédit institutionnelles adaptées.`
    },
    {
      id: 4,
      image: img4,
      category: "Innovation & Numérique",
      date: "20 Mai 2026",
      title: "Initiation aux outils digitaux pour entrepreneures",
      excerpt: "Comment intégrer les technologies mobiles et les réseaux sociaux pour booster la visibilité et les ventes de vos produits.",
      content: `À l'ère du numérique, Impact'Elle accompagne le virage technologique des micro-entreprises dirigées par des femmes. Cet atelier novateur a permis de démystifier l'utilisation des smartphones et des applications de vente en ligne.

      De la création de catalogues produits attractifs sur les réseaux sociaux à la gestion sécurisée des paiements mobiles, les participantes ont pu manipuler directement les outils sous la supervision d'experts en transformation digitale. Une étape cruciale pour s'adresser à une clientèle plus large et diversifiée.`
    },
    {
      id: 5,
      image: img5,
      category: "Solidarité & Communauté",
      date: "14 Avril 2026",
      title: "Forum régional sur le leadership féminin et l'impact durable",
      excerpt: "Des échanges inspirants pour encourager la prise de responsabilités des femmes dans les instances de décision locales.",
      content: `Le grand forum annuel d'Impact'Elle a rassemblé des figures inspirantes de l'entrepreneuriat féminin, des autorités locales et des partenaires au développement. 

      Les panels de discussion se sont articulés autour de la résilience, du leadership transformateur et de la transmission intergénérationnelle. Des témoignages poignants ont illustré le parcours de femmes sorties de la précarité grâce à l'entrepreneuriat structuré, inspirant ainsi la nouvelle génération.`
    }
  ];

  // États pour la pagination et la modale
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedArticle, setSelectedArticle] = useState(null);

  const totalPages = Math.ceil(allActivities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allActivities.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section id="activities" className="py-10 lg:py-14 bg-stone-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* NOUVELLE ENTÊTE (Disposition en 2 colonnes, dynamique et propre) */}
        <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="bg-emerald-700 text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-full mb-3 inline-block shadow-sm tracking-wider">
                Journal de Terrain
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Nos Activités & Actualités
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Suivez en temps réel nos actions, formations et impacts communautaires. Chaque publication reflète notre engagement quotidien pour l'autonomisation.
              </p>
            </div>

            {/* Mention Espace Admin futur */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-5 py-4 rounded-2xl shrink-0 text-center md:text-left">
              <span className="block text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">Espace de Publication</span>
              <span className="text-xs text-stone-200 font-medium block">
        
              </span>
            </div>
          </div>
        </div>

        {/* Grille des articles avec animations fluides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {currentItems.map((item) => (
            <article 
              key={item.id} 
              onClick={() => setSelectedArticle(item)}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image entièrement visible et centrée (object-contain avec fond contrasté) */}
                <div className="h-64 overflow-hidden relative bg-stone-900 flex items-center justify-center p-2">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 rounded-xl" 
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-emerald-900 text-[11px] font-black px-3 py-1 rounded-full shadow-md z-10">
                    {item.category}
                  </span>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-2">
                    <span>📅</span>
                    <span>{item.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-stone-900 mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Bouton de lecture */}
              <div className="px-6 pb-6 pt-2">
                <span className="text-emerald-800 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Lire l'article complet <span>&rarr;</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination en bas */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
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
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm ${
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
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
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

      {/* MODALE DE LECTURE COMPLÈTE (STYLE ARTICLE DE JOURNAL) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative">
            
            {/* Bouton Fermer */}
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-stone-700 border border-stone-200 flex items-center justify-center font-bold hover:bg-stone-900 hover:text-white transition-colors cursor-pointer shadow-md"
            >
              &#10005;
            </button>

            {/* En-tête de l'article dans la modale avec image centrée */}
            <div className="relative h-72 sm:h-80 bg-stone-950 flex items-center justify-center p-4">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-full object-contain object-center rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex items-end p-6 sm:p-8">
                <div>
                  <span className="bg-emerald-700 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full mb-3 inline-block shadow-sm">
                    {selectedArticle.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-200 mb-2">
                    <span>📅 Publié le {selectedArticle.date}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Corps du texte de l'article */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="text-stone-700 text-base sm:text-lg leading-relaxed whitespace-pre-line font-serif">
                {selectedArticle.content}
              </div>

              {/* Pied de l'article avec bouton de fermeture */}
              <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                  Impact'Elle — Journal des Activités
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-stone-900 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-colors cursor-pointer w-full sm:w-auto shadow-md"
                >
                  Fermer l'article
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}