import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, ArrowRight, Sparkles, Send, Tag } from 'lucide-react';
import { CATALOG_DESIGNS } from '../../data/catalogData';

export default function GalleryCarousel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Todos');

  const categories = ['Todos', 'Anime & Gaming', 'Urbano & Streetwear', 'Ilustración de Autor', 'Retro & Vintage'];

  const filtered = activeTab === 'Todos'
    ? CATALOG_DESIGNS
    : CATALOG_DESIGNS.filter(d => d.category === activeTab);

  const handleSelectDesign = (design) => {
    navigate('/simulador', { state: { presetDesign: design } });
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Galería
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Colección de Estilos Propios
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Insp?rate con nuestras ilustraciones y artes optimizados especialmente para estampado DTF HD.
          </p>

          {/* Filtros de Categoría */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de la Galería (Inspirado en la cuadr?cula de 6 imágenes de la referencia) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Imagen */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-600 text-white shadow-md">
                    {item.badge}
                  </span>
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white/90 text-blue-700 backdrop-blur-sm border border-slate-200">
                    {item.category}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón Acci?n */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleSelectDesign(item)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-200 hover:border-blue-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Probar en Simulador 3D</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
          >
            <span>Ver todo el catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
