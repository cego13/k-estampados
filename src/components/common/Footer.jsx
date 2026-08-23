import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, MessageCircle, Instagram, Facebook, Phone, MapPin, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import logoImg from '../../assets/logo-ck.png';
import { WHATSAPP_PHONE, INSTAGRAM_URL } from '../../data/productsData';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Columna 1: Marca & Eslogan */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md">
                <img
                  src={logoImg}
                  alt="CK Estampados"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  CK <span className="text-blue-500">ESTAMPADOS</span>
                </span>
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                  Personaliza tu estilo
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Marca colombiana especializada en personalización textil de alta gama con estampado DTF HD sobre Tela Algodón, Tela Fría y Oversize Tela Qatar.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700 shadow-sm"
                aria-label="Instagram Oficial de CK Estampados"
                title="@ck.estampados en Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/simulador" className="text-blue-400 font-bold hover:underline flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  Simulador 3D
                </Link>
              </li>
              <li>
                <Link to="/telas" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Líneas de Tela
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Galería de Diseños
                </Link>
              </li>
              <li>
                <Link to="/guia-tallas" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Guía de Medidas (cm)
                </Link>
              </li>
              <li>
                <Link to="/faq-contacto" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Telas Disponibles */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Líneas Confeccionadas
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Tela Algodón (195 gr)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Tela Fría Transpirable (180 gr)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Oversize Tela Qatar (250 gr)</span>
              </li>
              <li className="flex items-center gap-2 pt-1 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Garantía de +50 lavadas</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Canal de Atención Oficial */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Atención Directa
            </h4>
            
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono font-bold">+57 318 624 1724</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Colombia • Despachos Nacionales</span>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados. Quiero hacer una consulta directa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md mt-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Barra de Copyright */}
        <div className="pt-10 mt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-400 font-bold">CK Estampados</strong>. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Hecho con dedicación en Colombia</span>
            <Heart className="w-3.5 h-3.5 text-blue-500 fill-blue-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
