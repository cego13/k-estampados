import React from 'react';
import StoreHero from '../components/home/StoreHero';
import AwwwardsMarquee from '../components/home/AwwwardsMarquee';
import StoreProductGrid from '../components/home/StoreProductGrid';
import AwwwardsGallery from '../components/home/AwwwardsGallery';
import CompletedWorksSection from '../components/home/CompletedWorksSection';
import AwwwardsProcess from '../components/home/AwwwardsProcess';
import FeaturesGrid from '../components/home/FeaturesGrid';
import AwwwardsAdvisoryBanner from '../components/home/AwwwardsAdvisoryBanner';
import SizeGuideAndCare from '../components/home/SizeGuideAndCare';

export default function HomePage() {
  return (
    <div className="bg-[#f8f8f8] text-[#111111] overflow-hidden">
      {/* 1. Hero Principal de Tienda de Camisetas Personalizadas */}
      <StoreHero />

      {/* 2. Marquee Ticker Infinito */}
      <AwwwardsMarquee />

      {/* 3. Catálogo de las 3 Telas de Camiseta (Algodón, Tela Fría, Oversize Qatar) */}
      <StoreProductGrid />

      {/* 4. Galería de Diseños para Estampar */}
      <AwwwardsGallery />

      {/* 5. Trabajos Realizados Reales (21 Fotos de Producción Real) */}
      <CompletedWorksSection />

      {/* 6. Cómo Funciona el Pedido y Confección */}
      <AwwwardsProcess />

      {/* 7. Pilares de Confianza (+50 Lavadas, Confección Colombiana) */}
      <FeaturesGrid />

      {/* 8. Banner de Asesoría por WhatsApp */}
      <AwwwardsAdvisoryBanner />

      {/* 9. Guía de Tallas (S, M, L, XL) */}
      <SizeGuideAndCare />
    </div>
  );
}
