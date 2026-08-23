import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE } from '../../data/productsData';

export default function WhatsAppFloat() {
  const location = useLocation();
  const isSimulator = location.pathname === '/simulador';

  return (
    <aside
      aria-label="Contacto directo"
      className={`fixed bottom-6 right-6 z-40 ${isSimulator ? 'hidden lg:block' : ''}`}
    >
      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados. Me gustaria hacer una consulta sobre sus camisetas personalizadas.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#111111] hover:bg-blue-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-neutral-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 group-hover:text-blue-200">
            Atencion Inmediata
          </span>
          <span className="text-xs font-black tracking-tight text-white">
            WhatsApp Oficial
          </span>
        </div>
      </a>
    </aside>
  );
}
