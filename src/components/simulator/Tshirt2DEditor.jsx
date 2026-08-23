import React, { useRef, useEffect } from 'react';
import { Move } from 'lucide-react';

export default function Tshirt2DEditor({
  currentView,
  colorHex,
  designs,
  activeDesignId,
  setActiveDesignId,
  updateDesign,
  removeDesign
}) {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, initX: 0, initY: 0, designId: null });

  // Filtrar los diseños que pertenecen a la vista actual
  const viewDesigns = designs.filter(d => (d.view || 'frente') === currentView);
  const isBlack = colorHex === '#0a0a0a';

  const handlePointerDown = (e, design) => {
    e.stopPropagation();
    if (e.cancelable) e.preventDefault();
    setActiveDesignId(design.id);
    isDraggingRef.current = true;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      initX: design.x || 0,
      initY: design.y || 0,
      designId: design.id
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !dragStartRef.current.designId) return;
    if (e.cancelable) e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStartRef.current.mouseX;
    const deltaY = clientY - dragStartRef.current.mouseY;

    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const percentX = (deltaX / rect.width) * 160;
    const percentY = (deltaY / rect.height) * 160;

    updateDesign(dragStartRef.current.designId, {
      x: Math.max(-85, Math.min(85, dragStartRef.current.initX + percentX)),
      y: Math.max(-80, Math.min(85, dragStartRef.current.initY + percentY))
    });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    dragStartRef.current.designId = null;
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] aspect-[4/5] mx-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-center select-none overflow-hidden touch-none"
    >
      {/* Fondo de Cuadrícula Sutil para Guía Visual */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] sm:bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

      {/* SILUETA VECTORIAL DE CAMISETA CON PROPORCIONES REALES */}
      <div className="relative w-[92%] h-[92%] flex items-center justify-center">
        
        {/* 1. VISTA FRENTE (PROPORCIÓN STREETWEAR NATURAL) */}
        {currentView === 'frente' && (
          <svg
            viewBox="0 0 400 420"
            className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          >
            {/* Cuerpo Camiseta */}
            <path
              d="M100,68 L155,56 C170,88 230,88 245,56 L300,68 L375,135 L335,185 L290,158 L290,365 L110,365 L110,158 L65,185 L25,135 Z"
              fill={isBlack ? '#111111' : '#f8f8f8'}
              stroke={isBlack ? '#27272a' : '#d4d4d8'}
              strokeWidth="2.5"
            />
            {/* Cuello Rib Frente */}
            <path
              d="M155,56 C170,95 230,95 245,56 C230,80 170,80 155,56 Z"
              fill={isBlack ? '#1c1c1e' : '#e4e4e7'}
              stroke={isBlack ? '#3f3f46' : '#a1a1aa'}
              strokeWidth="1.5"
            />
            {/* Costuras de Hombros y Dobladillos */}
            <path d="M100,68 L110,158" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <path d="M300,68 L290,158" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <path d="M65,185 L110,158" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" fill="none" />
            <path d="M335,185 L290,158" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" fill="none" />
            <path d="M110,355 L290,355" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          </svg>
        )}

        {/* 2. VISTA ESPALDA (PROPORCIÓN STREETWEAR NATURAL) */}
        {currentView === 'espalda' && (
          <svg
            viewBox="0 0 400 420"
            className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          >
            {/* Cuerpo Camiseta */}
            <path
              d="M100,68 L155,56 C170,88 230,88 245,56 L300,68 L375,135 L335,185 L290,158 L290,365 L110,365 L110,158 L65,185 L25,135 Z"
              fill={isBlack ? '#111111' : '#f8f8f8'}
              stroke={isBlack ? '#27272a' : '#d4d4d8'}
              strokeWidth="2.5"
            />
            {/* Cuello Rib Espalda (Cerrado) */}
            <path
              d="M155,56 C170,68 230,68 245,56 C230,62 170,62 155,56 Z"
              fill={isBlack ? '#1c1c1e' : '#e4e4e7'}
              stroke={isBlack ? '#3f3f46' : '#a1a1aa'}
              strokeWidth="1.5"
            />
            {/* Costuras */}
            <path d="M100,68 L110,158" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <path d="M300,68 L290,158" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <path d="M65,185 L110,158" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" fill="none" />
            <path d="M335,185 L290,158" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" fill="none" />
            <path d="M110,355 L290,355" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          </svg>
        )}

        {/* 3. VISTA MANGA IZQUIERDA */}
        {currentView === 'manga-izquierda' && (
          <svg
            viewBox="0 0 400 420"
            className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          >
            <path
              d="M110,65 L240,65 C260,85 310,140 310,240 L205,270 L185,200 L185,365 L110,365 Z"
              fill={isBlack ? '#111111' : '#f8f8f8'}
              stroke={isBlack ? '#27272a' : '#d4d4d8'}
              strokeWidth="2.5"
            />
            <path
              d="M205,270 L310,240"
              stroke={isBlack ? '#3f3f46' : '#a1a1aa'}
              strokeWidth="3.5"
            />
            <path
              d="M185,65 C200,100 200,150 185,200"
              stroke={isBlack ? '#27272a' : '#e4e4e7'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M110,65 C135,70 160,65 170,65"
              stroke={isBlack ? '#3f3f46' : '#a1a1aa'}
              strokeWidth="2"
              fill="none"
            />
            <path d="M110,355 L185,355" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          </svg>
        )}

        {/* 4. VISTA MANGA DERECHA */}
        {currentView === 'manga-derecha' && (
          <svg
            viewBox="0 0 400 420"
            className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            style={{ transform: 'scaleX(-1)' }}
          >
            <path
              d="M110,65 L240,65 C260,85 310,140 310,240 L205,270 L185,200 L185,365 L110,365 Z"
              fill={isBlack ? '#111111' : '#f8f8f8'}
              stroke={isBlack ? '#27272a' : '#d4d4d8'}
              strokeWidth="2.5"
            />
            <path
              d="M205,270 L310,240"
              stroke={isBlack ? '#3f3f46' : '#a1a1aa'}
              strokeWidth="3.5"
            />
            <path
              d="M185,65 C200,100 200,150 185,200"
              stroke={isBlack ? '#27272a' : '#e4e4e7'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
            <path
              d="M110,65 C135,70 160,65 170,65"
              stroke={isBlack ? '#3f3f46' : '#a1a1aa'}
              strokeWidth="2"
              fill="none"
            />
            <path d="M110,355 L185,355" stroke={isBlack ? '#27272a' : '#e4e4e7'} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          </svg>
        )}

        {/* ÁREA DE ESTAMPADO GUÍA PROPORCIONAL */}
        <div
          className={`absolute pointer-events-none border-2 border-dashed rounded-xl transition-all duration-300 ${
            currentView === 'manga-izquierda'
              ? 'top-[24%] left-[44%] w-[32%] h-[30%] border-blue-500/40 bg-blue-500/5'
              : currentView === 'manga-derecha'
              ? 'top-[24%] right-[44%] w-[32%] h-[30%] border-blue-500/40 bg-blue-500/5'
              : currentView === 'espalda'
              ? 'top-[22%] left-[28%] w-[44%] h-[54%] border-blue-500/40 bg-blue-500/5'
              : 'top-[25%] left-[28%] w-[44%] h-[50%] border-blue-500/40 bg-blue-500/5'
          }`}
        >
          <span className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-mono text-blue-400 font-bold whitespace-nowrap">
            Área de Estampado DTF
          </span>
        </div>

        {/* CAPA DE ESTAMPADOS ACTIVOS EN ESTA VISTA */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          {viewDesigns.map((design) => {
            const isSelected = design.id === activeDesignId;
            const scaleFactor = (design.scale || 100) / 100;
            const rotationDeg = design.rotation || 0;

            let baseOffsetX = 0;
            let baseOffsetY = 0;
            if (currentView === 'manga-izquierda') {
              baseOffsetX = 35;
              baseOffsetY = -20;
            } else if (currentView === 'manga-derecha') {
              baseOffsetX = -35;
              baseOffsetY = -20;
            }

            const totalX = (design.x || 0) + baseOffsetX;
            const totalY = (design.y || 0) + baseOffsetY;

            return (
              <div
                key={design.id}
                onPointerDown={(e) => handlePointerDown(e, design)}
                onTouchStart={(e) => handlePointerDown(e, design)}
                style={{
                  transform: `translate(${totalX}px, ${totalY}px) rotate(${rotationDeg}deg) scale(${scaleFactor})`,
                  cursor: isDraggingRef.current && isSelected ? 'grabbing' : 'grab',
                  touchAction: 'none'
                }}
                className={`absolute w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center transition-shadow select-none group ${
                  isSelected
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent'
                    : 'hover:ring-1 hover:ring-blue-400/60'
                }`}
              >
                <img
                  src={design.src}
                  alt={design.name}
                  draggable={false}
                  className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-md"
                />

                {/* Controles flotantes si está seleccionado */}
                {isSelected && (
                  <div className="absolute -top-6 sm:-top-7 right-0 flex items-center gap-1 bg-[#111111] text-white px-1.5 sm:px-2 py-0.5 rounded-md border border-neutral-700 text-[9px] sm:text-[10px] font-mono shadow-lg pointer-events-none">
                    <span className="text-blue-400 font-bold">{design.scale}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Indicador de Vista en la Esquina */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-slate-900/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-800 text-[10px] sm:text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="capitalize font-mono">
          {currentView === 'manga-izquierda' ? 'Manga Izq' : currentView === 'manga-derecha' ? 'Manga Der' : currentView}
        </span>
      </div>

      {/* Aviso de interacción */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-slate-800 text-[9px] sm:text-[10px] text-slate-300 font-medium whitespace-nowrap shadow-md flex items-center gap-1.5">
        <Move className="w-3 h-3 text-blue-400 shrink-0" />
        <span>Arrastra con el dedo o ratón</span>
      </div>

    </div>
  );
}
