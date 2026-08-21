import React from 'react';

export default function AwwwardsMarquee() {
  const items = [
    'PERSONALIZA TU ESTILO',
    'DTF TEXTIL MÁXIMA DEFINICIÓN HD',
    'CONFECCIÓN COLOMBIANA',
    'SIN MÍNIMO DE COMPRA (DESDE 1 UND)',
    'TELA ALGODÓN 195G • TELA FRÍA 180G • QATAR 250G',
    'GARANTÍA +50 LAVADAS',
    'ENVÍOS A TODA COLOMBIA',
    'SIMULADOR 3D EN TIEMPO REAL'
  ];

  return (
    <div className="w-full bg-[#111111] text-white py-3.5 border-y border-neutral-800 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-6 mx-4 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase text-neutral-300">
            <span>{text}</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          </div>
        ))}
      </div>
    </div>
  );
}
