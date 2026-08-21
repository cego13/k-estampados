import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Sparkles, MessageCircle, ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Elige tu línea de tela y color',
      description: 'Selecciona entre Licra algodón con elongaci?n premium, Tela fría deportiva o Corte Boxy Oversize en colores Negro Full o Blanco Full.',
      icon: Shirt,
      accent: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      number: '02',
      title: 'Sube tu imagen y ajusta en 3D',
      description: 'Carga hasta 3 imágenes o selecciona diseños de colección. Gira la camiseta en 360?, arrastra los estampados directamente y escala a tu gusto.',
      icon: Sparkles,
      accent: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      number: '03',
      title: 'Pide por WhatsApp y recibe en casa',
      description: 'Tu pedido se envía preformateado con la imagen 3D a nuestro WhatsApp oficial. Producimos en 24-48h y despachamos a cualquier ciudad de Colombia.',
      icon: PackageCheck,
      accent: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    }
  ];

  return (
    <section className="py-24 bg-slate-50/70 border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Nuestro Servicio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ?Cómo personalizamos tu camiseta?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Un proceso 100% digital, rápido y sin complicaciones desde tu tel?fono o computador.
          </p>
        </div>

        {/* Grid de 2 Columnas (Inspirado en la imagen de referencia) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* COLUMNA IZQUIERDA: TARJETA VISUAL / ILUSTRACI?N */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6 text-center">
                <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Shirt className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    Estampados DTF Textil
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    impresión de alta resoluci?n con tintas ecol?gicas alemanas que no se cuartean, mantienen el brillo y se sienten suaves al tacto.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-around text-left">
                  <div>
                    <div className="text-lg font-extrabold text-blue-600">300 DPI</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Resoluci?n HD</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <div className="text-lg font-extrabold text-slate-900">+60</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Lavadas Garantizadas</div>
                  </div>
                </div>

                <Link
                  to="/simulador"
                  className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Probar Simulador Ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: LOS 3 PASOS NUMERADOS */}
          <div className="lg:col-span-7 space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-start gap-5 group"
                >
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 font-mono font-black text-base shadow-sm ${step.accent}`}>
                    {step.number}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
