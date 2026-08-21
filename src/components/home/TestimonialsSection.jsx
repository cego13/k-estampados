import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      city: 'Medellín, Antioquia',
      role: 'Cliente Particular',
      text: 'Mandé a hacer 2 camisetas en tela fría con ilustraciones propias. La calidad del estampado DTF es impresionante, los colores se ven súper vivos y la tela es muy fresca.',
      rating: 5,
      product: 'Camiseta Tela Fría (180g)'
    },
    {
      id: 2,
      name: 'Valentina Restrepo',
      city: 'Bogotá, D.C.',
      role: 'Creadora de Marca',
      text: 'Pedí camisetas Oversize en tela Qatar de 250g para el drop de mi marca y la calidad de la tela y el cuello en rib es de alto nivel. La atención por WhatsApp fue rápida.',
      rating: 5,
      product: 'Camiseta Oversize Qatar (250g)'
    },
    {
      id: 3,
      name: 'Andrés Felipe Gómez',
      city: 'Cali, Valle',
      role: 'Diseñador Gráfico',
      text: 'La definición del estampado es excelente, sin bordes blancos raros y con un tacto muy suave. Ya las he lavado varias veces y siguen como el primer día.',
      rating: 5,
      product: 'Camiseta Tela Algodón (195g)'
    }
  ];

  return (
    <section className="py-24 bg-white text-[#111111] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Opiniones de Clientes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            Lo que dicen de nosotros
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Clientes en toda Colombia que ya visten prendas personalizadas por CK Estampados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#f8f8f8] rounded-3xl p-8 border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-900 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-blue-600">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-blue-600 text-blue-600" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-[#111111]">{item.name}</h4>
                  <p className="text-[11px] text-neutral-500">{item.city}</p>
                </div>

                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
                  {item.product}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
