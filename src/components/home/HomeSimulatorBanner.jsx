import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCw, Check, Smartphone } from 'lucide-react';

export default function HomeSimulatorBanner() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          
          {/* C?rculos decorativos de fondo */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulador 3D en Vivo</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                ?Listo para crear tu camiseta personalizada?
              </h2>

              <p className="text-blue-100 text-sm sm:text-base max-w-xl leading-relaxed">
                Prueba nuestro simulador 3D interactivo: sube tus imágenes, gira en 360 grados, elige tu tela y genera tu pedido directo a WhatsApp en minutos.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-blue-100">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300" /> Giro 360? total
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300" /> Hasta 3 estampados
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300" /> Cotización instant?nea
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
              <Link
                to="/simulador"
                className="px-8 py-4 rounded-2xl font-black text-sm text-blue-700 bg-white hover:bg-blue-50 shadow-xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Entrar al Simulador 3D</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/telas"
                className="px-6 py-3.5 rounded-2xl font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all text-center"
              >
                Conocer las telas
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
