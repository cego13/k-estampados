import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import logoImg from '../../assets/logo-ck.png';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950">
      {/* Luces de ambiente en azul el?ctrico y cobalto */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-700/20 via-blue-600/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid sutil de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* TEXTO Y PROPUESTA DE VALOR */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* BADGE DESTACADO */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Tecnología DTF Textil Ultra HD | Envíos a toda Colombia</span>
            </div>

            {/* TITULAR PRINCIPAL */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Personaliza tu estilo con la máxima calidad en{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-300 drop-shadow-sm">
                Estampados DTF
              </span>
            </h1>

            {/* SUBT?TULO */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Tus ideas estampadas con definición fotogr?fica, colores hipervivos y máxima resistencia al lavado. Elige entre Licra algodón, Tela fría y Oversize.
            </p>

            {/* BOTONES DE ACCI?N HACIA P?GINAS REALES */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/simulador"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-[0_0_25px_rgba(37,99,235,0.5)] flex items-center justify-center gap-3 group"
              >
                <span>Crear mi camiseta ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/telas"
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-semibold text-slate-300 hover:text-white bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Ver tipos de tela</span>
              </Link>
            </div>

            {/* PILLS DE CONFIANZA */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Sin compra mínima (desde 1 und)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Envíos rápidos a todo el pa?s</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>garantía +60 lavadas</span>
              </div>
            </div>

          </div>

          {/* TARJETA VISUAL HERO SHOWCASE */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900/90 to-slate-950 border border-blue-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Header de la tarjeta */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <span className="text-[11px] font-mono tracking-widest text-blue-400 font-semibold uppercase">
                  CK Estampados ? DTF HD
                </span>
              </div>

              {/* Contenido Visual */}
              <div className="py-6 flex flex-col items-center text-center relative">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-4 shadow-inner group">
                  <div className="absolute inset-0 bg-blue-600/10 rounded-2xl blur-xl pointer-events-none group-hover:bg-blue-600/20 transition-all" />
                  <img
                    src={logoImg}
                    alt="CK Estampados Logo"
                    className="max-h-full max-w-full object-contain filter invert contrast-125"
                  />
                </div>

                {/* Floating Tag 1 */}
                <div className="absolute -left-3 top-8 bg-slate-900/95 border border-blue-500/40 rounded-xl px-3 py-2 text-left shadow-lg flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    HD
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">impresión</div>
                    <div className="text-xs font-bold text-white">Full Color 300 DPI</div>
                  </div>
                </div>

                {/* Floating Tag 2 */}
                <div className="absolute -right-3 bottom-6 bg-slate-900/95 border border-slate-700 rounded-xl px-3 py-2 text-left shadow-lg flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ?
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Despachos</div>
                    <div className="text-xs font-bold text-white">24 - 48 Horas</div>
                  </div>
                </div>
              </div>

              {/* Botón rápido hacia simulador */}
              <Link
                to="/simulador"
                className="w-full py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-bold transition-all text-center block"
              >
                Abrir Simulador Interactivo ?
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
