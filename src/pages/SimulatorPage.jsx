import React from 'react';
import TshirtCustomizer from '../components/simulator/TshirtCustomizer';
import { Sparkles, MessageCircle, ShieldCheck, Truck, Rotate3d } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/productsData';

export default function SimulatorPage() {
  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Encabezado del Simulador */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2">
              <Rotate3d className="w-3.5 h-3.5" />
              <span>Simulador Textil 3D Interactivo</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Personaliza tu Camiseta
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Diseña en 2D o gira en 360°, arrastra los estampados en la prenda y gradúa tamaño, posición y rotación.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
              Garantía +50 lavadas
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
              Envíos a toda Colombia
            </span>
          </div>
        </div>

        {/* COMPONENTE PRINCIPAL CUSTOMIZER */}
        <TshirtCustomizer />

        {/* AVISO IMPORTANTE DE ASESORÍA */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <span>¿Necesitas una personalización especial o asistencia?</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              El simulador 3D es una guía visual interactiva. Para estampados en espalda completa, mangas, combinación de artes o pedidos por mayor, te asesoramos directamente por WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados. Necesito asesoría para el diseño de mi camiseta.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hablar por WhatsApp (+57 318 624 1724)</span>
          </a>
        </div>

      </div>
    </div>
  );
}
