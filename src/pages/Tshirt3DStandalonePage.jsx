import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Tshirt3DViewer from '../components/simulator/Tshirt3DViewer';
import logoImg from '../assets/logo-ck.png';
import { CATALOG_DESIGNS } from '../data/catalogData';

export default function Tshirt3DStandalonePage() {
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem('ck_3d_viewer_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('No se pudo leer el estado del visor:', e);
    }
    return {
      colorHex: '#0a0a0a',
      fabricType: 'tela-algodon',
      designs: [
        {
          id: 'design-1',
          name: CATALOG_DESIGNS[0].title,
          src: CATALOG_DESIGNS[0].image,
          view: 'frente',
          x: 0,
          y: -10,
          scale: 90,
          rotation: 0
        }
      ]
    };
  };

  const [state, setState] = useState(getInitialState);

  // Sincronizar en tiempo real si el usuario cambia el diseño en otra pestaña
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'ck_3d_viewer_state' && e.newValue) {
        try {
          setState(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Error parseando estado 3D:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden flex flex-col justify-between p-3 sm:p-6 select-none">
      
      {/* Fondo con brillo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-slate-950/80 to-slate-950 pointer-events-none" />

      {/* Header Superior */}
      <header className="relative z-20 flex items-center justify-between pointer-events-none mb-3">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => window.close()}
            className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white transition flex items-center gap-2 text-xs font-bold shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cerrar Visor</span>
          </button>

          <div className="flex items-center gap-2">
            <img src={logoImg} alt="CK Estampados" className="h-8 w-auto object-contain" />
            <div>
              <h1 className="text-sm font-black text-white tracking-wider uppercase">Estudio 3D</h1>
              <p className="text-[10px] text-blue-400 font-mono">Renderizado de Alta Definición</p>
            </div>
          </div>
        </div>
      </header>

      {/* Visor 3D Idéntico y Compartido */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center min-h-0">
        <Tshirt3DViewer
          colorHex={state.colorHex}
          designs={state.designs}
          fabricType={state.fabricType}
          isStandalone={true}
        />
      </div>

    </div>
  );
}
