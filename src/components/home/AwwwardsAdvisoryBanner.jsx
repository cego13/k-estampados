import React from 'react';
import { MessageCircle, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { WHATSAPP_PHONE } from '../../data/productsData';

export default function AwwwardsAdvisoryBanner() {
  return (
    <section className="py-20 bg-[#111111] text-white relative overflow-hidden border-b border-neutral-800">
      
      {/* Glow de acento azul en el fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Asesoría Personalizada de Diseño</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
              ¿No logras el diseño exacto en el simulador?
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Ten en cuenta que nuestro personalizador 3D es una <strong>guía visual interactiva</strong>. Si tu diseño necesita ajustes de color, recortes especiales, combinación de estampados en mangas o espalda completa, nuestro equipo de diseño gráfico lo ajusta y perfecciona contigo directamente por WhatsApp sin costo adicional.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Respuesta en minutos
              </span>
              <span>•</span>
              <span>Asistencia técnica 1 a 1</span>
              <span>•</span>
              <span className="text-blue-400 font-bold">Sin cargos extra</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados. Necesito asesoría personalizada para ajustar el diseño de mi camiseta.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.4)] group"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp (+57 318 624 1724)</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <p className="text-center font-mono text-[11px] text-neutral-400">
              Atención directa de lunes a sábado
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
