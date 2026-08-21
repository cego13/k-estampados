import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import { ToastProvider } from './context/ToastContext';

// Páginas Reales
import HomePage from './pages/HomePage';
import SimulatorPage from './pages/SimulatorPage';
import FabricsPage from './pages/FabricsPage';
import CatalogPage from './pages/CatalogPage';
import SizeGuidePage from './pages/SizeGuidePage';
import FaqContactPage from './pages/FaqContactPage';
import Tshirt3DStandalonePage from './pages/Tshirt3DStandalonePage';

function AppLayout() {
  const location = useLocation();
  const isStandalone3D = location.pathname === '/visor-3d';

  if (isStandalone3D) {
    return <Tshirt3DStandalonePage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Barra de Navegación Superior Persistente */}
      <Navbar />

      {/* Contenido Dinámico por Rutas */}
      <main className="flex-grow">
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
