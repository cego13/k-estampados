import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Truck, Shirt, MessageCircle, HelpCircle } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import { WHATSAPP_PHONE } from '../../data/productsData';

export default function HeroCarousel() {
  const slides = [
    {
      id: 1,
      badge: 'Tecnología DTF Textil HD ? Envíos a Colombia',
      title: 'Convertimos tus ideas en una realidad',
      subtitle: 'Estampados de máxima definición fotogr?fica, colores hipervivos y resistencia superior al lavado. Personaliza tu estilo sobre telas premium.',
      primaryBtnText: 'Crear mi camiseta en 3D',
      primaryBtnLink: '/simulador',
      secondaryBtnText: 'Ver catálogo de diseños',
      secondaryBtnLink: '/catalogo',
      bgImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1600&auto=format&fit=crop&q=85',
      floatingTag: { title: 'impresión DTF HD', value: '300 DPI Real' }
    },
    {
      id: 2,
      badge: 'Líneas Exclusivas ? confección Nacional',
      title: 'Corte Boxy Oversize & Licra algodón',
      subtitle: 'Prendas confeccionadas con algodón peinado pesado (220g) y telas transpirables. Elige tu silueta favorita y proy?ctala en 3D en tiempo real.',
      primaryBtnText: 'Explorar tipos de tela',
      primaryBtnLink: '/telas',
      secondaryBtnText: 'Abrir Simulador 3D',
      secondaryBtnLink: '/simulador',
      bgImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1600&auto=format&fit=crop&q=85',
      floatingTag: { title: 'Telas Premium', value: 'algodón 220g' }
    },
    {
      id: 3,
      badge: 'Sin Mínimo de Compra ? producción R?pida',
      title: 'Tu Marca o Estilo Personal Desde 1 Unidad',
      subtitle: 'Producimos desde 1 sola prenda para ti hasta colecciones por volumen con tiempos r?cord de 24 a 48 horas.',
      primaryBtnText: 'Cotizar por WhatsApp',
      primaryBtnLink: '/simulador',
      secondaryBtnText: 'guía de medidas (cm)',
      secondaryBtnLink: '/guia-tallas',
      bgImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=85',
      floatingTag: { title: 'Despacho Rápido', value: '24 - 48 Horas' }
    }
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[90vh] lg:min-h-[95vh] flex items-center bg-white overflow-hidden pt-20"
    >
      {/* SLIDES BACKGROUND CON TRANSICI?N SUAVE */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/90 to-white/60 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-[radial-gradient(#2563eb0a_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>
        </div>
      ))}

      {/* CONTENIDO PRINCIPAL INMERSIVO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* COLUMNA TEXTO */}
          <div className="lg:col-span-7 space-y-6 text-slate-900">
            
            {/* Badge de Detalle Azul */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-blue-700 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{slides[current].badge}</span>
            </div>

            {/* Titular Grande */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-2xl">
              {slides[current].title.split('en')[0]}
              {slides[current].title.includes('en') && (
                <>
                  en{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">
                    {slides[current].title.split('en')[1]}
                  </span>
                </>
              )}
            </h1>

            {/* Subt?tulo */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {slides[current].subtitle}
            </p>

            {/* AVISO IMPORTANTE SOBRE EL SIMULADOR / guía DE diseño */}
            <div className="p-3.5 rounded-2xl bg-blue-50/90 border border-blue-200 text-xs text-slate-700 flex items-start gap-3 shadow-sm max-w-xl">
              <span className="text-base shrink-0">??</span>
              <p className="leading-relaxed">
                <strong className="text-blue-900 font-bold">Nota de Asesoría:</strong> Nuestro simulador 3D es una herramienta de previsualizaci?n de guía. Si deseas un ajuste especial, corte complejo o ubicar tu diseño en otra zona, ?nuestro equipo de diseño lo adapta y perfecciona contigo directamente por{' '}
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados! ?? Necesito ayuda de su dise?ador para ajustar un estampado.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-extrabold hover:underline inline-flex items-center gap-0.5"
                >
                  WhatsApp (+57 318 624 1724)
                </a>.
              </p>
            </div>

            {/* Botones de Acci?n */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                to={slides[current].primaryBtnLink}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-[0_10px_25px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 group"
              >
                <span>{slides[current].primaryBtnText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to={slides[current].secondaryBtnLink}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-bold text-slate-700 hover:text-blue-600 bg-white/95 hover:bg-white border border-slate-200 hover:border-blue-300 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{slides[current].secondaryBtnText}</span>
              </Link>
            </div>

            {/* Pills de garantía */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2Icon className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Sin compra mínima</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Envíos a toda Colombia</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>garantía +60 lavadas</span>
              </div>
            </div>

          </div>

          {/* COLUMNA VISUAL: EXPERIENCIA 3D EN VIVO */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-white/95 via-slate-50/90 to-white/95 rounded-3xl p-6 border border-blue-500/20 shadow-[0_20px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl group">
              
              {/* Header de la tarjeta 3D */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                  <span className="text-xs font-black tracking-wider text-slate-800 uppercase">
                    Experiencia 3D Interactiva
                  </span>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Mueve el cursor
                </span>
              </div>

              {/* CANVAS THREE.JS INTERACTIVO FLOTANTE */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/5 via-blue-900/5 to-slate-900/10 flex items-center justify-center my-3 border border-slate-200/60">
                <Hero3DCanvas />
              </div>

              {/* Footer de Tarjeta con acceso directo */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">CK Estampados Oficial</span>
                  <span className="text-blue-600 font-bold">DTF Textil HD</span>
                </div>
                
                <Link
                  to="/simulador"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all text-center block"
                >
                  Personalizar esta camiseta en 3D ?
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FLECHAS DE NAVEGACI?N LATERALES */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-lg text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all focus:outline-none"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-lg text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all focus:outline-none"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* INDICADORES DE PUNTOS INFERIORES */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all rounded-full ${
              idx === current
                ? 'w-8 h-2.5 bg-blue-600 shadow-md'
                : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function CheckCircle2Icon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
