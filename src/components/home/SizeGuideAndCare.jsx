import React, { useState } from 'react';
import { Ruler, ShieldCheck, RotateCcw, Droplets, SunDim, Flame, CheckCircle2 } from 'lucide-react';
import { SIZE_CHARTS, CARE_TIPS } from '../../data/productsData';

export default function SizeGuideAndCare() {
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
    <section id="tallas" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Medidas Reales & Garantía
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Guía de Tallas & Cuidados DTF
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Medidas exactas en centímetros (Ancho x Largo) para cada tipo de tela y recomendaciones para garantizar más de 50 lavadas impecables.
          </p>

          {/* Toggle de Pestañas */}
          <div className="flex items-center justify-center flex-wrap gap-3 pt-4">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'standard'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Cuidados (+50 Lavadas)</span>
            </button>
          </div>
        </div>

        {/* CONTENIDO DE PESTAÑAS */}
        {activeTab === 'standard' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Medidas: Tela Algodón (195g) & Tela Fría (180g)</h3>
                <p className="text-xs text-slate-500">Corte regular y silueta definida</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Tallas S a XL</span>
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
            <p className="text-[11px] text-slate-400 mt-4 text-center">
              * Medidas tomadas en plano sobre prenda extendida (±1.5 cm de tolerancia).
            </p>
          </div>
        )}

        {activeTab === 'oversize' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Medidas: Oversize Tela Qatar (250g)</h3>
                <p className="text-xs text-slate-500">Corte Boxy Fit holgado con hombros caídos</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Tallas S a XL</span>
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
            <p className="text-[11px] text-slate-400 mt-4 text-center">
              * Medidas tomadas en plano sobre prenda extendida (±1.5 cm de tolerancia).
            </p>
          </div>
        )}

        {activeTab === 'cuidados' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {CARE_TIPS.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-inner">
                  {getCareIcon(tip.icon)}
                </div>
                <h4 className="text-base font-bold text-slate-900">{tip.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
