import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Eye, Plus, Shirt } from 'lucide-react';
import { CATALOG_DESIGNS } from '../data/catalogData';

export default function CatalogPage() {
  const navigate = useNavigate();

  const handleSelectDesign = (design) => {
    navigate('/simulador', { state: { presetDesign: design } });
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8f8f8] text-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Colección Oficial</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight uppercase">
            Galería de Diseños
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Diseños listos para estampar en DTF Textil HD. Selecciona cualquier diseño para abrirlo en el simulador y ajustarlo a tu medida.
          </p>
        </div>

        {/* Grid de Diseños Reales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATALOG_DESIGNS.map((design, index) => (
            <div
              key={design.id}
              onClick={() => handleSelectDesign(design)}
              className="bg-white rounded-3xl p-4 border border-neutral-200 hover:border-neutral-900 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-950 flex items-center justify-center p-4 mb-4">
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

                  <img
                    src={design.image}
                    alt={design.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                  />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-blue-600 text-white shadow-md">
                    #{index + 1}
                  </span>

                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-neutral-900/80 text-neutral-300 border border-neutral-700">
                    DTF HD
                  </span>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <span className="px-4 py-2 rounded-full bg-white text-black font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>Probar en Camiseta</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between text-xs">
                    <h3 className="text-base font-black tracking-tight text-[#111111] group-hover:text-blue-600 transition-colors uppercase">
                      {design.title}
                    </h3>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase font-semibold">
                      Colección
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between px-1 text-xs">
                <span className="font-mono text-neutral-400 text-[11px]">CK Estampados</span>
                <span className="font-bold text-[#111111] group-hover:text-blue-600 flex items-center gap-1">
                  <span>Personalizar</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Banner para Subir Arte Propio */}
        <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              ¿Tienes tu propia ilustración o imagen?
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl">
              Sube tus imágenes en PNG o JPG directamente al simulador interactivo para ver cómo queda en tu camiseta.
            </p>
          </div>

          <Link
            to="/simulador"
            className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Subir Mi Diseño</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
