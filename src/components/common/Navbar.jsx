import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, MessageCircle } from 'lucide-react';
import logoImg from '../../assets/logo-ck.png';
import { WHATSAPP_PHONE } from '../../data/productsData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Simulador 3D', path: '/simulador', highlight: true },
    { name: 'Telas & Precios', path: '/telas' },
    { name: 'Galería', path: '/catalogo' },
    { name: 'Guía de Tallas', path: '/guia-tallas' },
    { name: 'FAQ & Contacto', path: '/faq-contacto' }
  ];

  const isActive = (path) => location.pathname === path;

  // Cerrar automáticamente el menú móvil en cada navegación
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO OFICIAL */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="h-11 w-11 rounded-xl bg-white p-1 flex items-center justify-center border border-neutral-200 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src={logoImg}
                alt="CK Estampados"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#111111] group-hover:text-blue-600 transition-colors">
                CK <span className="text-blue-600">ESTAMPADOS</span>
              </span>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                Personaliza tu estilo
              </p>
            </div>
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#111111] text-white shadow-sm'
                      : link.highlight
                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                      : 'text-neutral-700 hover:text-blue-600 hover:bg-neutral-100'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA WHATSAPP DIRECTO */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados. Quiero hacer una consulta sobre prendas personalizadas.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 shadow-md shadow-blue-500/20 group"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* BOTÓN MÓVIL */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-[#111111]"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between ${
                  active
                    ? 'bg-[#111111] text-white'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-neutral-200">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados. Quiero hacer un pedido personalizado.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp (+57 318 624 1724)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
