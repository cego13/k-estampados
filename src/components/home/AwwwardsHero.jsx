import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Star, ShieldCheck, Truck, Shirt, MessageCircle, Rotate3d, CheckCircle2 } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import logoImg from '../../assets/logo-ck.png';
import { WHATSAPP_PHONE } from '../../data/productsData';

export default function AwwwardsHero() {
  return (
    <section className="relative w-full bg-[#f8f8f8] text-[#111111] pt-24 pb-16 border-b border-neutral-200 overflow-hidden">
      
      {/* Background Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* BARRA SUPERIOR EDITORIAL AWWWARDS (SCORE & BADGES) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-300/80 font-mono text-xs text-neutral-600">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#111111] text-white font-extrabold tracking-wider">
              COLECCIÓN 2026
            </span>
            <span className="hidden sm:inline text-neutral-400">•</span>
            <span className="hidden sm:inline font-semibold">DTF TEXTIL DE MÁXIMA DEFINICIÓN</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-neutral-800">Calidad: 9.9/10</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-neutral-400">Durabilidad:</span>
              <span className="font-bold text-blue-600">+50 Lavadas</span>
            </div>
          </div>
        </div>

        {/* TITULAR GIGANTE EDITORIAL ESTILO AWWWARDS */}
        <div className="py-10 lg:py-14 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CK Estampados • Personaliza Tu Estilo</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] text-[#111111] uppercase">
                Personaliza <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">
                  Tu Estilo
                </span>{' '}
                en 3D
              </h1>
            </div>

            <div className="max-w-md space-y-4 text-neutral-600">
              <p className="text-sm sm:text-base leading-relaxed">
                Transformamos tus diseños e ilustraciones en camisetas de alta calidad con estampado DTF textil de máxima definición. Previsualiza en 360°, elige tu tela favorita y pide desde 1 sola unidad sin mínimos.
              </p>
              
              <div className="flex items-center gap-3">
                <Link
                  to="/simulador"
                  className="px-6 py-3.5 rounded-full bg-[#111111] hover:bg-blue-600 text-white text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-black/10 group"
                >
                  <span>Abrir Simulador 3D</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  to="/catalogo"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#111111] border border-neutral-300 text-xs font-bold tracking-wider uppercase transition-all"
                >
                  Ver Catálogo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SHOWCASE CENTRAL 3D */}
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f4f4f4] to-[#ebebeb] border border-neutral-300 shadow-[0_30px_90px_rgba(0,0,0,0.08)] overflow-hidden">
          
          {/* Top Bar del Canvas */}
          <div className="p-4 sm:p-6 border-b border-neutral-200/80 flex items-center justify-between backdrop-blur-sm bg-white/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 shadow-sm p-1.5 flex items-center justify-center">
                <img src={logoImg} alt="CK Estampados" className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-[#111111] tracking-tight">CK ESTAMPADOS</div>
                <div className="text-[10px] text-neutral-500 font-mono">Personaliza tu estilo</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                <Rotate3d className="w-3.5 h-3.5" />
                <span>Gira con tu ratón o dedo</span>
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#111111] text-white">
                DTF HD
              </span>
            </div>
          </div>

          {/* CANVAS THREE.JS 3D INMERSIVO */}
          <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[580px] flex items-center justify-center">
            <Hero3DCanvas />

            {/* Badges Flotantes de Métricas */}
            <div className="absolute top-6 left-6 hidden md:block bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-neutral-200 shadow-xl max-w-[200px] animate-float">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">Definición</span>
              <div className="text-xl font-black text-[#111111]">Calidad HD</div>
              <p className="text-[11px] text-neutral-500 mt-1">Colores vivos y máxima nitidez visual</p>
            </div>

            <div className="absolute bottom-6 right-6 hidden md:block bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-neutral-200 shadow-xl max-w-[220px] animate-float" style={{ animationDelay: '2.5s' }}>
              <span className="text-[10px] font-mono uppercase text-blue-600 font-bold block">Textil Pesado</span>
              <div className="text-xl font-black text-[#111111]">Qatar 250g</div>
              <p className="text-[11px] text-neutral-500 mt-1">Corte Boxy Streetwear de alta costura</p>
            </div>
          </div>

          {/* FOOTER STRIP DEL SHOWCASE */}
          <div className="p-4 sm:p-6 bg-white border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-4 text-neutral-600">
              <span className="font-bold text-[#111111]">CK ESTAMPADOS</span>
              <span>•</span>
              <span>HECHO EN COLOMBIA </span>
              <span>•</span>
              <span className="text-emerald-600 font-bold">DESDE 1 UNIDAD</span>
            </div>

            <Link
              to="/simulador"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 hover:text-blue-800 uppercase tracking-wider group"
            >
              <span>Personalizar esta prenda en 3D</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
