import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, Sparkles, Wind, Feather, ArrowRight } from 'lucide-react';
import { FABRIC_TYPES } from '../../data/productsData';

export default function FabricsSection() {
  const getIcon = (id) => {
    switch(id) {
      case 'tela-algodon':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'tela-fria':
        return <Wind className="w-6 h-6 text-cyan-600" />;
      case 'oversize-qatar':
        return <Layers className="w-6 h-6 text-indigo-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="telas" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Confección Textil Premium
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Nuestras Líneas de Tela
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Probamos exhaustivamente cada textil para garantizar la máxima adherencia, tacto suave y durabilidad del estampado DTF con garantía de +50 lavadas.
          </p>
        </div>

        {/* Grid de Telas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FABRIC_TYPES.map((fabric) => (
            <div
              key={fabric.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Imagen & Badge */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                    {fabric.badge}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      {getIcon(fabric.id)}
                      <span className="text-xs font-bold text-blue-200">{fabric.weight}</span>
                    </div>
                    <h3 className="text-xl font-black">{fabric.name}</h3>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                    {fabric.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fabric.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-900 block">
                      Composición & Ventajas:
                    </span>
                    <ul className="space-y-1.5">
                      {fabric.features.map((feature, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer de Tarjeta con Precio y Botón */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium uppercase">Precio base:</span>
                  <div className="text-xl font-black text-slate-900">
                    ${fabric.basePrice.toLocaleString('es-CO')}{' '}
                    <span className="text-xs font-bold text-blue-600">COP</span>
                  </div>
                </div>

                <Link
                  to="/simulador"
                  state={{ fabricId: fabric.id }}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>Elegir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
