import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, ShieldCheck, ArrowRight, RotateCcw, Droplets, SunDim, Flame, CheckCircle2, Sparkles } from 'lucide-react';
import { SIZE_CHARTS, CARE_TIPS } from '../data/productsData';

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState('standard');

  const getCareIcon = (iconName) => {
    switch (iconName) {
      case 'RotateCcw':
        return <RotateCcw className="w-5 h-5 text-blue-600" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-cyan-600" />;
      case 'SunDim':
        return <SunDim className="w-5 h-5 text-amber-500" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8f8f8] text-[#111111] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Medidas Reales & Garantía
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Guía de Tallas & Cuidados DTF
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Consulta las medidas exactas en centímetros (Ancho x Largo) para cada tipo de tela confeccionada y sigue nuestras pautas para una durabilidad superior a 50 lavadas.
          </p>

          {/* Toggle de Pestañas */}
          <div className="flex items-center justify-center flex-wrap gap-3 pt-4">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'standard'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Tela Algodón & Tela Fría</span>
            </button>
            <button
              onClick={() => setActiveTab('oversize')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'oversize'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Oversize Tela Qatar</span>
            </button>
            <button
              onClick={() => setActiveTab('cuidados')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'cuidados'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Instrucciones (+50 Lavadas)</span>
            </button>
          </div>
        </div>

        {/* TABLA: ALGODÓN Y TELA FRÍA */}
        {activeTab === 'standard' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Medidas: Tela Algodón (195g) & Tela Fría (180g)</h2>
                <p className="text-xs text-slate-500">Corte regular y silueta definida</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Tallas S a XL
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 uppercase font-bold text-[11px] tracking-wider">
                    <th className="py-3 px-4 rounded-l-xl">Talla</th>
                    <th className="py-3 px-4">Ancho (Pecho)</th>
                    <th className="py-3 px-4 rounded-r-xl">Largo Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {SIZE_CHARTS.standard.map((row) => (
                    <tr key={row.size} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 px-4 font-black text-blue-600 text-base">{row.size}</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">{row.width}</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              * Medidas tomadas en plano con la prenda extendida sobre superficie lisa (±1.5 cm de tolerancia).
            </p>
          </div>
        )}

        {/* TABLA: OVERSIZE TELA QATAR */}
        {activeTab === 'oversize' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Medidas: Oversize Tela Qatar (250g)</h2>
                <p className="text-xs text-slate-500">Corte Boxy Streetwear holgado y estructurado</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Tallas S a XL
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 uppercase font-bold text-[11px] tracking-wider">
                    <th className="py-3 px-4 rounded-l-xl">Talla</th>
                    <th className="py-3 px-4">Ancho (Pecho)</th>
                    <th className="py-3 px-4 rounded-r-xl">Largo Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {SIZE_CHARTS.oversize.map((row) => (
                    <tr key={row.size} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 px-4 font-black text-blue-600 text-base">{row.size}</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">{row.width}</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              * Medidas tomadas en plano con la prenda extendida sobre superficie lisa (±1.5 cm de tolerancia).
            </p>
          </div>
        )}

        {/* TABLA: CUIDADOS */}
        {activeTab === 'cuidados' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Instrucciones para +50 Lavadas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Sigue estos 4 pasos básicos para mantener el estampado con sus colores vivos y tacto suave como nuevo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CARE_TIPS.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-inner">
                    {getCareIcon(tip.icon)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{tip.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Simulador */}
        <div className="text-center pt-6">
          <Link
            to="/simulador"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
          >
            <span>Crear mi camiseta en 3D</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
