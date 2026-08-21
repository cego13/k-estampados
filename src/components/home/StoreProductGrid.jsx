import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, MessageCircle, Sparkles, CheckCircle2, ShieldCheck, Check } from 'lucide-react';
import { FABRIC_TYPES, WHATSAPP_PHONE } from '../../data/productsData';

export default function StoreProductGrid() {
  const [selectedColors, setSelectedColors] = useState({
    'tela-algodon': 'negro',
    'tela-fria': 'negro',
    'oversize-qatar': 'negro'
  });

  const handleColorChange = (fabricId, color) => {
    setSelectedColors(prev => ({ ...prev, [fabricId]: color }));
  };

  const handleWhatsAppOrder = (product) => {
    const activeColor = selectedColors[product.id] || 'negro';
    const text = `Hola CK Estampados. Me interesa comprar / personalizar la *${product.name}* en color *${activeColor === 'negro' ? 'Negro Full' : 'Blanco Full'}* (Precio: $${product.basePrice.toLocaleString('es-CO')} COP - ${product.weight}). Solicito asesoria para mi pedido.`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="catalogo-prendas" className="py-24 bg-white text-[#111111] border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Tienda */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 mb-1 block">
              // FOTOS REALES • NUESTRAS 3 LÍNEAS DE CAMISETA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111]">
              Prendas Disponibles
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
            Fotografías reales de nuestras telas en color Negro y Blanco. Confección 100% colombiana con estampado digital DTF de alta fijación.
          </p>
        </div>

        {/* Grid de las 3 Telas Oficiales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {FABRIC_TYPES.map((product) => {
            const activeColor = selectedColors[product.id] || 'negro';
            const currentImg = activeColor === 'blanco' ? product.imageWhite : product.imageBlack;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-5 border border-neutral-200 hover:border-[#111111] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Imagen Real de la Prenda */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                    <img
                      src={currentImg}
                      alt={`${product.name} ${activeColor}`}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge de Gramaje */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#111111] text-white shadow-md">
                      {product.weight}
                    </span>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-md">
                      {product.badge}
                    </span>
                  </div>

                  {/* Selector de Color Real */}
                  <div className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 mb-4">
                    <span className="text-xs font-bold text-neutral-700">Color de muestra:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleColorChange(product.id, 'negro')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeColor === 'negro'
                            ? 'bg-[#111111] text-white shadow-sm'
                            : 'bg-white text-neutral-600 border border-neutral-200'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-400" />
                        <span>Negro</span>
                      </button>

                      <button
                        onClick={() => handleColorChange(product.id, 'blanco')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeColor === 'blanco'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-neutral-600 border border-neutral-200'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white border border-neutral-400" />
                        <span>Blanco</span>
                      </button>
                    </div>
                  </div>

                  {/* Info del Producto */}
                  <div className="space-y-2 px-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-blue-600 font-bold uppercase">
                        {product.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-[#111111] group-hover:text-blue-600 transition-colors uppercase leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                      <span className="font-bold text-[#111111] block mb-1">Composición:</span>
                      <span className="text-neutral-600">{product.composition}</span>
                    </div>

                    {/* Tallas Disponibles */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-neutral-400 mr-1 uppercase">Tallas:</span>
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <span
                          key={size}
                          className="w-7 h-7 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-800 flex items-center justify-center"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer con Precio y Botones de Compra */}
                <div className="pt-5 mt-5 border-t border-neutral-100 space-y-3">
                  <div className="flex items-baseline justify-between px-1">
                    <span className="text-[11px] text-neutral-400 uppercase font-mono font-semibold">Precio por unidad:</span>
                    <div className="text-2xl font-black text-[#111111]">
                      ${product.basePrice.toLocaleString('es-CO')}{' '}
                      <span className="text-xs font-bold text-blue-600">COP</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => handleWhatsAppOrder(product)}
                      className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pedir</span>
                    </button>

                    <Link
                      to="/simulador"
                      state={{ fabricId: product.id }}
                      className="py-3 px-4 rounded-xl bg-[#111111] hover:bg-blue-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1 text-center"
                    >
                      <span>Personalizar</span>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
