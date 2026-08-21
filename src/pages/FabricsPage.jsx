import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, Sparkles, Wind, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { FABRIC_TYPES } from '../data/productsData';

export default function FabricsPage() {
  const [selectedColors, setSelectedColors] = useState({
    'tela-algodon': 'negro',
    'tela-fria': 'negro',
    'oversize-qatar': 'negro'
  });

  const handleColorChange = (fabricId, color) => {
    setSelectedColors(prev => ({ ...prev, [fabricId]: color }));
  };

  const getIcon = (id) => {
    switch(id) {
      case 'tela-algodon':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'tela-fria':
        return <Wind className="w-5 h-5 text-blue-600" />;
      case 'oversize-qatar':
        return <Layers className="w-5 h-5 text-blue-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8f8f8] text-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Confección Colombiana de Alta Gama
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight uppercase">
            Nuestras Líneas de Tela
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Fotografías reales de nuestras 3 telas en Negro y Blanco, con sus fichas técnicas y gramajes exactos.
          </p>
        </div>

        {/* Muestrario de Telas Detallado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FABRIC_TYPES.map((fabric) => {
            const activeColor = selectedColors[fabric.id] || 'negro';
            const currentImg = activeColor === 'blanco' ? fabric.imageWhite : fabric.imageBlack;

            return (
              <div
                key={fabric.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-900 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-72 overflow-hidden bg-neutral-100 flex items-center justify-center p-4">
                    <img
                      src={currentImg}
                      alt={`${fabric.name} ${activeColor}`}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                      {fabric.badge}
                    </span>

                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#111111] text-white shadow-md">
                      {fabric.weight}
                    </span>
                  </div>

                  {/* Selector de color */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-xs font-bold text-slate-700">Muestra en:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleColorChange(fabric.id, 'negro')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeColor === 'negro'
                            ? 'bg-[#111111] text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-black" />
                        <span>Negro</span>
                      </button>
                      <button
                        onClick={() => handleColorChange(fabric.id, 'blanco')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeColor === 'blanco'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white border border-slate-300" />
                        <span>Blanco</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 pt-2 space-y-4">
                    <div className="flex items-center gap-2">
                      {getIcon(fabric.id)}
                      <h2 className="text-2xl font-black text-slate-900">{fabric.name}</h2>
                    </div>

                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                      {fabric.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fabric.description}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-slate-900 block mb-1">Composición Textil:</span>
                      <span className="text-slate-600">{fabric.composition}</span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-900 block">
                        Ventajas Técnicas:
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

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium uppercase">Precio base:</span>
                    <div className="text-2xl font-black text-slate-900">
                      ${fabric.basePrice.toLocaleString('es-CO')}{' '}
                      <span className="text-xs font-bold text-blue-600">COP</span>
                    </div>
                  </div>

                  <Link
                    to="/simulador"
                    state={{ fabricId: fabric.id }}
                    className="px-5 py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <span>Personalizar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Pilares de Garantía */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Garantía +50 Lavadas</h3>
              <p className="text-xs text-slate-500">Cero cuarteado y colores vivos permanentes.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Producción 24-48h</h3>
              <p className="text-xs text-slate-500">Curado térmico y alistamiento exprés.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Despachos a Colombia</h3>
              <p className="text-xs text-slate-500">Envíos asegurados a todo el territorio nacional.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
