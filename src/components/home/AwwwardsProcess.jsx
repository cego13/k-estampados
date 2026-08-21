import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shirt, Sparkles, PackageCheck, Layers, ChevronRight } from 'lucide-react';

export default function AwwwardsProcess() {
  const steps = [
    {
      num: '01',
      tag: 'TEXTIL & COLOR',
      title: 'Elige tu Tela y Silueta',
      desc: 'Selecciona entre Tela Algodón (195 gr, 33% algodón / 62% poliéster / 5% spandex), Tela Fría (180 gr, 47% algodón / 47% rayón / 6% spandex) u Oversize Tela Qatar (250 gr, 86% algodón / 10% poliéster / 4% spandex) en colores Negro Full o Blanco Full.',
      icon: Shirt
    },
    {
      num: '02',
      tag: 'ESTUDIO 3D',
      title: 'Sube tu Arte y Proyecta en 3D',
      desc: 'Coloca hasta 3 estampados independientes. Gira la camiseta 360°, arrastra los diseños con el ratón o en tu celular, gradúa el tamaño y previsualiza en tiempo real.',
      icon: Sparkles
    },
    {
      num: '03',
      tag: 'PRODUCCIÓN & DESPACHO',
      title: 'Pide por WhatsApp y Recibe',
      desc: 'Generamos tu resumen con imagen 3D listo para WhatsApp. Nuestro equipo estampa en DTF HD, cura térmicamente la prenda en 24-48h y despacha con seguro a toda Colombia con garantía de +50 lavadas.',
      icon: PackageCheck
    }
  ];

  return (
    <section className="py-24 bg-white text-[#111111] border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 mb-1 block">
              // FLUJO DE CONFECCIÓN & PRODUCCIÓN
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111]">
              ¿Cómo Funciona?
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
            Una experiencia de personalización textil rápida, intuitiva y profesional en 3 pasos sencillos.
          </p>
        </div>

        {/* 3 PASOS EDITORIALES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-200 pt-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="py-10 md:py-8 md:px-8 first:pl-0 last:pr-0 space-y-6 group hover:bg-[#fafafa] transition-colors rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-mono font-black text-neutral-300 group-hover:text-blue-600 transition-colors">
                    {step.num}
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-600">
                    {step.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#111111] group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Paso {step.num}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
