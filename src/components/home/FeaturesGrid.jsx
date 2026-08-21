import React from 'react';
import { ShieldCheck, Truck, Sparkles, Layers } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      id: 1,
      title: 'Impresión DTF Textil HD',
      description: 'Máxima definición y nitidez visual con colores vibrantes y gran elasticidad sobre telas negras y blancas con tintas de alta duración.',
      badge: 'Calidad Superior',
      icon: Sparkles
    },
    {
      id: 2,
      title: 'Confección Nacional Certificada',
      description: 'Oversize Tela Qatar pesada de 250 gr, Tela Algodón de 195 gr y Tela Fría transpirable de 180 gr con excelentes acabados de costura.',
      badge: '3 Telas Premium',
      icon: Layers
    },
    {
      id: 3,
      title: 'Envíos Rápidos a Colombia',
      description: 'Producción ágil en 24 a 48 horas hábiles y despachos asegurados a todas las ciudades principales y municipios del país.',
      badge: 'Cobertura Nacional',
      icon: Truck
    }
  ];

  return (
    <section className="py-24 bg-[#f8f8f8] text-[#111111] border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Garantía & Confianza
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            ¿Por qué elegir CK Estampados?
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Combinamos tecnología de estampado textil digital de última generación con la mejor confección nacional y garantía de +50 lavadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-900 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111111] group-hover:text-blue-600 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold text-blue-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garantía de +50 Lavadas</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
