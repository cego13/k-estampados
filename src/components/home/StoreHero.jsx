import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Sparkles, ShieldCheck, Truck, Shirt, ChevronLeft, ChevronRight } from 'lucide-react';
import algodonNegro from '../../assets/telas/algodon_negro.jpeg';
import algodonBlanco from '../../assets/telas/algodon_blanco.jpeg';
import telaFriaNegro from '../../assets/telas/tela_fria_negro.jpeg';
import telaFriaBlanco from '../../assets/telas/tela_fria_blanco.jpeg';
import oversizeNegro from '../../assets/telas/oversize_negro.png';
import oversizeBlanco from '../../assets/telas/oversize_blacno.png';
import { WHATSAPP_PHONE } from '../../data/productsData';

export default function StoreHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [colorMode, setColorMode] = useState('negro'); // 'negro' o 'blanco'

  // Pares de telas que rotan en el carrusel manteniendo el formato exacto de 2 tarjetas + 2 píldoras
  const slides = [
    {
      card1: {
        name: 'Tela Algodón',
        weight: '195 GR',
        price: '$40.000 COP',
        badgeColor: 'bg-blue-600',
        imgNegro: algodonNegro,
        imgBlanco: algodonBlanco
      },
      pillTop: {
        title: '250g',
        subtitle: 'OVERSIZE QATAR',
        isBlue: true
      },
      pillBottom: {
        title: '+50',
        subtitle: 'LAVADAS GARANTIZADAS',
        isBlue: false
      },
      card2: {
        name: 'Oversize Qatar',
        weight: 'BOXY FIT',
        price: '$70.000 COP',
        badgeColor: 'bg-[#111111]',
        imgNegro: oversizeNegro,
        imgBlanco: oversizeBlanco
      }
    },
    {
      card1: {
        name: 'Tela Fría',
        weight: '180 GR',
        price: '$55.000 COP',
        badgeColor: 'bg-blue-600',
        imgNegro: telaFriaNegro,
        imgBlanco: telaFriaBlanco
      },
      pillTop: {
        title: '195g',
        subtitle: 'TELA ALGODÓN',
        isBlue: true
      },
      pillBottom: {
        title: '+50',
        subtitle: 'LAVADAS GARANTIZADAS',
        isBlue: false
      },
      card2: {
        name: 'Tela Algodón',
        weight: 'CLÁSICO FIT',
        price: '$40.000 COP',
        badgeColor: 'bg-[#111111]',
        imgNegro: algodonNegro,
        imgBlanco: algodonBlanco
      }
    },
    {
      card1: {
        name: 'Oversize Qatar',
        weight: '250 GR',
        price: '$70.000 COP',
        badgeColor: 'bg-blue-600',
        imgNegro: oversizeNegro,
        imgBlanco: oversizeBlanco
      },
      pillTop: {
        title: '180g',
        subtitle: 'TELA FRÍA',
        isBlue: true
      },
      pillBottom: {
        title: '+50',
        subtitle: 'LAVADAS GARANTIZADAS',
        isBlue: false
      },
      card2: {
        name: 'Tela Fría',
        weight: 'TACTO SUAVE',
        price: '$55.000 COP',
        badgeColor: 'bg-[#111111]',
        imgNegro: telaFriaNegro,
        imgBlanco: telaFriaBlanco
      }
    }
  ];

  // Desvanecido automático continuo cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full bg-[#f8f8f8] text-[#111111] pt-28 pb-16 border-b border-neutral-200 overflow-hidden">
      
      {/* Fondo con líneas sutiles */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Barra superior estilo cápsula */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-300 font-mono text-xs text-neutral-600">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#111111] text-white font-extrabold tracking-wider text-[11px]">
              TIENDA OFICIAL
            </span>
            <span className="hidden sm:inline text-neutral-400">•</span>
            <span className="font-semibold text-neutral-800">CAMISETAS PERSONALIZADAS EN DTF HD</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-blue-600 font-bold flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Desde 1 sola unidad</span>
            </span>
            <span className="hidden md:inline text-neutral-500 font-medium">Envíos a toda Colombia</span>
          </div>
        </div>

        {/* CONTENIDO HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-16">
          
          {/* COLUMNA IZQUIERDA: TEXTO & LLAMADO A LA ACCIÓN */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>CK Estampados • Confección Nacional</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-[#111111] uppercase">
              Tu Tienda de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900">
                Camisetas
              </span>{' '}
              Personalizadas
            </h1>

            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Diseñamos, confeccionamos y estampamos tus camisetas con la máxima definición textil DTF. Disponibles en <strong>Tela Algodón (195g)</strong>, <strong>Tela Fría (180g)</strong> y <strong>Oversize Qatar (250g)</strong> con garantía de +50 lavadas.
            </p>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="#catalogo-prendas"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ver Telas & Precios</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                to="/simulador"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-neutral-100 text-[#111111] border border-neutral-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Personalizar en Simulador</span>
              </Link>
            </div>

            {/* BADGES DE CONFIANZA */}
            <div className="pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg font-medium text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Garantía +50 lavadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Despachos 24-48h</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Shirt className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Tallas S, M, L, XL</span>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: CARRUSEL CON DESVANECIDO (CROSS-FADE DISOLVE) */}
          <div className="lg:col-span-5 relative">
            
            <div className="grid grid-cols-2 gap-4 select-none">
              
              {/* Columna Izquierda del Bento */}
              <div className="space-y-4">
                
                {/* TARJETA 1 (DESVANECIDO SUAVE) */}
                <div className="relative h-56 sm:h-64 rounded-[2rem] overflow-hidden bg-white border border-neutral-200 shadow-xl group">
                  {slides.map((s, idx) => (
                    <div
                      key={`card1-${idx}`}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        currentSlide === idx
                          ? 'opacity-100 z-10 scale-100 pointer-events-auto'
                          : 'opacity-0 z-0 scale-105 pointer-events-none'
                      }`}
                    >
                      <img
                        src={colorMode === 'negro' ? s.card1.imgNegro : s.card1.imgBlanco}
                        alt={s.card1.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className={`text-[10px] font-mono uppercase ${s.card1.badgeColor} px-2.5 py-0.5 rounded-full font-bold shadow-md`}>
                          {s.card1.weight}
                        </span>
                        <div className="font-black text-base sm:text-lg mt-1 tracking-tight">{s.card1.name}</div>
                        <div className="text-xs font-semibold text-neutral-300">{s.card1.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PÍLDORA INFERIOR (DESVANECIDO SUAVE) */}
                <div className="relative h-20 sm:h-24 rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-md">
                  {slides.map((s, idx) => (
                    <div
                      key={`pillBottom-${idx}`}
                      className={`absolute inset-0 p-4 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-in-out ${
                        currentSlide === idx
                          ? 'opacity-100 z-10 pointer-events-auto'
                          : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                        {s.pillBottom.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-500 font-bold uppercase tracking-wider mt-0.5">
                        {s.pillBottom.subtitle}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Columna Derecha del Bento */}
              <div className="space-y-4 pt-6">
                
                {/* PÍLDORA SUPERIOR (DESVANECIDO SUAVE) */}
                <div className="relative h-20 sm:h-24 rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-md">
                  {slides.map((s, idx) => (
                    <div
                      key={`pillTop-${idx}`}
                      className={`absolute inset-0 p-4 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-in-out ${
                        currentSlide === idx
                          ? 'opacity-100 z-10 pointer-events-auto'
                          : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
                        {s.pillTop.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-500 font-bold uppercase tracking-wider mt-0.5">
                        {s.pillTop.subtitle}
                      </div>
                    </div>
                  ))}
                </div>

                {/* TARJETA 2 (DESVANECIDO SUAVE) */}
                <div className="relative h-56 sm:h-64 rounded-[2rem] overflow-hidden bg-white border border-neutral-200 shadow-xl group">
                  {slides.map((s, idx) => (
                    <div
                      key={`card2-${idx}`}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        currentSlide === idx
                          ? 'opacity-100 z-10 scale-100 pointer-events-auto'
                          : 'opacity-0 z-0 scale-105 pointer-events-none'
                      }`}
                    >
                      <img
                        src={colorMode === 'negro' ? s.card2.imgNegro : s.card2.imgBlanco}
                        alt={s.card2.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className={`text-[10px] font-mono uppercase ${s.card2.badgeColor} px-2.5 py-0.5 rounded-full font-bold shadow-md`}>
                          {s.card2.weight}
                        </span>
                        <div className="font-black text-base sm:text-lg mt-1 tracking-tight">{s.card2.name}</div>
                        <div className="text-xs font-semibold text-neutral-300">{s.card2.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* CONTROLES Y PUNTOS DEL CARRUSEL */}
            <div className="mt-4 flex items-center justify-between px-2">
              
              {/* Selector Rápido de Color Negro / Blanco */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-neutral-200 shadow-sm text-[11px] font-mono font-bold">
                <button
                  onClick={() => setColorMode('negro')}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    colorMode === 'negro' ? 'bg-[#111111] text-white shadow-sm' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111111] border border-neutral-600" />
                  <span>Negro</span>
                </button>
                <button
                  onClick={() => setColorMode('blanco')}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    colorMode === 'blanco' ? 'bg-[#111111] text-white shadow-sm' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-neutral-400" />
                  <span>Blanco</span>
                </button>
              </div>

              {/* Indicadores de diapositivas y flechas */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="p-1.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 shadow-sm text-neutral-700 transition-all"
                  title="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        currentSlide === i ? 'w-5 bg-blue-600' : 'w-1.5 bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  className="p-1.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 shadow-sm text-neutral-700 transition-all"
                  title="Siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
