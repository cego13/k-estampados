import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import ScrollToTop from './components/common/ScrollToTop';
import { ToastProvider } from './context/ToastContext';

// Carga Perezosa (Lazy Loading) para acelerar la carga inicial en móviles
const HomePage = lazy(() => import('./pages/HomePage'));
const SimulatorPage = lazy(() => import('./pages/SimulatorPage'));
const FabricsPage = lazy(() => import('./pages/FabricsPage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const SizeGuidePage = lazy(() => import('./pages/SizeGuidePage'));
const FaqContactPage = lazy(() => import('./pages/FaqContactPage'));
const Tshirt3DStandalonePage = lazy(() => import('./pages/Tshirt3DStandalonePage'));

// Componente de Carga de Página
function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-slate-950">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-3 border-blue-600/30 border-t-blue-500 animate-spin" />
        <div className="absolute w-4 h-4 rounded-full bg-blue-500/20 animate-ping" />
      </div>
      <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest">
        Cargando CK Estampados...
      </span>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isStandalone3D = location.pathname === '/visor-3d';

  if (isStandalone3D) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Tshirt3DStandalonePage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Restaurador de Scroll Automático hacia Arriba */}
      <ScrollToTop />

      {/* Barra de Navegación Superior Persistente */}
      <Navbar />

      {/* Contenido Dinámico con Lazy Loading */}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simulador" element={<SimulatorPage />} />
            <Route path="/telas" element={<FabricsPage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/guia-tallas" element={<SizeGuidePage />} />
            <Route path="/faq-contacto" element={<FaqContactPage />} />
            {/* Fallback a Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer Persistente */}
      <Footer />

      {/* Botón Flotante Permanente de WhatsApp */}
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <AppLayout />
      </Router>
    </ToastProvider>
  );
}
