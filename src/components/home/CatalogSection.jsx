import React, { useState } from 'react';
import { Flame, Sparkles, Send, Eye, Tag } from 'lucide-react';
import { CATALOG_DESIGNS } from '../../data/catalogData';
import { WHATSAPP_PHONE } from '../../data/productsData';

export default function CatalogSection({ onSelectDesign }) {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', 'Anime & Gaming', 'Urbano & Streetwear', 'Ilustración de Autor', 'Retro & Vintage'];

  const filteredDesigns = activeCategory === 'Todos'
    ? CATALOG_DESIGNS
    : CATALOG_DESIGNS.filter(d => d.category === activeCategory);

  const handleDirectOrder = (design) => {
    const message = `Hola CK Estampados. Me interesa pedir la camiseta con el diseño de colección *"${design.title}"* de la categoría *${design.category}*. ¿Qué tallas y telas tienen disponibles?`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="coleccion" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-blue-400" />
            Colección & Estilos Propios
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Diseños Listos para Estampar
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Explora nuestras ilustraciones y artes de autor optimizados especialmente para impresión DTF en alta definición.
          </p>

          {/* FILTROS DE CATEGORÍA */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                    : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DEL CATÁLOGO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((design) => (
            <div
              key={design.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)] transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Imagen del Diseño */}
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Badge de estado */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-600 text-white shadow-md">
                    {design.badge}
                  </span>

                  {/* Categoría */}
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-blue-400">
                    {design.category}
                  </span>
                </div>

                {/* Info del diseño */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {design.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {design.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {design.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-medium text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="p-6 pt-0 space-y-2.5">
                <a
                  href="#simulador"
                  onClick={() => onSelectDesign && onSelectDesign(design)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 hover:border-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Probar en el Simulador</span>
                </a>

                <button
                  onClick={() => handleDirectOrder(design)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  <span>Pedir este diseño por WhatsApp</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
