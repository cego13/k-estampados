import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, ArrowUpRight, CheckCircle2, 
  MessageCircle, X, ChevronLeft, ChevronRight, Shirt, ShieldCheck, ZoomIn
} from 'lucide-react';
import { COMPLETED_WORKS } from '../../data/completedWorksData';
import { WHATSAPP_PHONE } from '../../data/productsData';

export default function CompletedWorksSection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const visibleWorks = COMPLETED_WORKS.slice(0, visibleCount);

  const openLightbox = (work) => {
    setSelectedPhoto(work);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    const currentIndex = COMPLETED_WORKS.findIndex(w => w.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % COMPLETED_WORKS.length;
    setSelectedPhoto(COMPLETED_WORKS[nextIndex]);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    const currentIndex = COMPLETED_WORKS.findIndex(w => w.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + COMPLETED_WORKS.length) % COMPLETED_WORKS.length;
    setSelectedPhoto(COMPLETED_WORKS[prevIndex]);
  };

  return (
    <section className="py-20 bg-[#f8f8f8] text-[#111111] border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO EDITORIAL LIMPIO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-300">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
                // GALERÍA DE PRODUCCIÓN REAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111111]">
              Trabajos Realizados
            </h2>
          </div>

          <div className="space-y-1 max-w-md">
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Fotos reales de prendas estampadas y entregadas a clientes. Haz clic en cualquier foto para verla en tamaño completo.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1 text-blue-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Fotos Reales
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Garantía +50 Lavadas
              </span>
            </div>
          </div>
        </div>

        {/* GRID COMPACTO DE MINIATURAS (6 COLUMNAS) */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {visibleWorks.map((work, idx) => (
            <div
              key={work.id}
              onClick={() => openLightbox(work)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-300 hover:border-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={work.image}
                alt={`Trabajo realizado #${work.id}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              
              {/* Badge discreto con número */}
              <div className="absolute top-2 left-2 pointer-events-none">
                <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-black/75 text-white backdrop-blur-sm border border-neutral-700">
                  #{idx + 1}
                </span>
              </div>

              {/* Overlay de Hover para Ampliar */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                <span className="p-2.5 rounded-full bg-white text-black font-bold shadow-xl transform scale-90 group-hover:scale-100 transition-transform flex items-center justify-center">
                  <ZoomIn className="w-4 h-4 text-blue-600" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN PARA CARGAR TODAS LAS FOTOS */}
        {visibleCount < COMPLETED_WORKS.length ? (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(COMPLETED_WORKS.length)}
              className="py-3 px-8 rounded-full bg-[#111111] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-blue-500/20"
            >
              Ver Todas las Fotos ({COMPLETED_WORKS.length} Trabajos)
            </button>
          </div>
        ) : (
          <div className="text-center mt-8">
            <span className="text-xs font-mono text-neutral-500">
              Mostrando las {COMPLETED_WORKS.length} fotos reales de producción
            </span>
          </div>
        )}

      </div>

      {/* LIGHTBOX / MODAL DE FOTO COMPLETA EN ALTA RESOLUCIÓN */}
      {selectedPhoto && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#111111] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-neutral-800 flex flex-col max-h-[92vh]"
          >
            
            {/* Barra Superior del Modal */}
            <div className="p-4 bg-[#141416] border-b border-neutral-800 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  Foto Real #{selectedPhoto.id} de {COMPLETED_WORKS.length}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Estampado DTF HD
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="p-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen Principal en Grande con Navegación */}
            <div className="flex-1 bg-neutral-950 flex items-center justify-center relative overflow-hidden min-h-[300px] max-h-[68vh] p-2">
              <img
                src={selectedPhoto.image}
                alt={`Trabajo realizado #${selectedPhoto.id}`}
                className="max-w-full max-h-full object-contain rounded-xl"
              />

              {/* Flechas de Navegación */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-blue-600 text-white backdrop-blur-sm border border-neutral-700 transition-all shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-blue-600 text-white backdrop-blur-sm border border-neutral-700 transition-all shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Barra Inferior con Botón de WhatsApp */}
            <div className="p-4 bg-[#141416] border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-400 text-center sm:text-left">
                Te gusta este estilo o quieres estampar tus prendas?
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hola CK Estampados. Me intereso la foto de produccion real #${selectedPhoto.id} de su galeria. Solicito cotizacion para un pedido similar con mi diseno.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar por WhatsApp</span>
                </a>

                <Link
                  to="/simulador"
                  onClick={closeLightbox}
                  className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-neutral-700 transition-all"
                >
                  <Shirt className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Simulador</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
