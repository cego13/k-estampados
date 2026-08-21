import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowUpRight, Eye, Plus, Shirt } from 'lucide-react';
import { CATALOG_DESIGNS } from '../../data/catalogData';

export default function AwwwardsGallery() {
  const navigate = useNavigate();

  const handleSelectDesign = (design) => {
    navigate('/simulador', { state: { presetDesign: design } });
  };

  return (
    <section className="py-24 bg-[#f8f8f8] text-[#111111] border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-300">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 mb-1 block">
              // COLECCIÓN & ESTAMPADOS DISPONIBLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111]">
              Diseños para Estampar
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-sm leading-relaxed">
            Selecciona cualquiera de nuestros diseños para proyectarlo en el simulador 3D sobre cualquier tela y color.
          </p>
        </div>

        {/* Grid de Diseños Reales */}
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATALOG_DESIGNS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleSelectDesign(item)}
              className="bg-white rounded-3xl p-4 border border-neutral-200 hover:border-neutral-900 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Contenedor de la Imagen PNG con fondo de contraste */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-950 flex items-center justify-center p-4 mb-4">
                  {/* Patrón sutil para resaltar transparencia */}
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

                  <img
                    src={item.image}
                    alt={item.title}
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
                      {item.title}
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
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* CTA para Subir Arte Propio */}
        <div className="mt-12 text-center">
          <Link
            to="/simulador"
            className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-[#111111] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-blue-500/20"
          >
            <Shirt className="w-4 h-4 text-blue-400" />
            <span>Personalizar Mi Camiseta en el Simulador 3D</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
