import React, { useRef, useState, useEffect } from 'react';
import { Move, RotateCw, ZoomIn, Trash2, CheckCircle, Crosshair } from 'lucide-react';

export default function MockupCanvas({
  colorHex,
  designs = [],
  activeDesignId,
  setActiveDesignId,
  updateDesign,
  removeDesign,
  is3dEnabled = true
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [draggedDesignId, setDraggedDesignId] = useState(null);
  const dragStartPos = useRef({ mouseX: 0, mouseY: 0, designX: 0, designY: 0 });

  // Efecto 3D interactivo en hover / movimiento del cursor
  const handleContainerMouseMove = (e) => {
    if (!is3dEnabled || isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 14, // Rotación en eje X
      y: x * 18   // Rotación en eje Y
    });
  };

  const handleContainerMouseLeave = () => {
    if (!isDragging) {
      setTilt({ x: 0, y: 0 });
    }
  };

  // Inicio de Drag sobre un diseño específico
  const handleDesignMouseDown = (e, design) => {
    e.stopPropagation();
    setActiveDesignId(design.id);
    setIsDragging(true);
    setDraggedDesignId(design.id);
    dragStartPos.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      designX: design.x,
      designY: design.y
    };
  };

  // Drag con Mouse
  const handleGlobalMouseMove = (e) => {
    if (!isDragging || !draggedDesignId) return;
    const deltaX = e.clientX - dragStartPos.current.mouseX;
    const deltaY = e.clientY - dragStartPos.current.mouseY;

    // Rango libre por toda la superficie de la camiseta
    const newX = Math.max(-180, Math.min(180, dragStartPos.current.designX + deltaX));
    const newY = Math.max(-200, Math.min(200, dragStartPos.current.designY + deltaY));

    updateDesign(draggedDesignId, { x: newX, y: newY });
  };

  const handleGlobalMouseUp = () => {
    setIsDragging(false);
    setDraggedDesignId(null);
  };

  // Soporte Touch para móviles
  const handleDesignTouchStart = (e, design) => {
    e.stopPropagation();
    setActiveDesignId(design.id);
    setIsDragging(true);
    setDraggedDesignId(design.id);
    const touch = e.touches[0];
    dragStartPos.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      designX: design.x,
      designY: design.y
    };
  };

  const handleGlobalTouchMove = (e) => {
    if (!isDragging || !draggedDesignId) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartPos.current.mouseX;
    const deltaY = touch.clientY - dragStartPos.current.mouseY;

    const newX = Math.max(-180, Math.min(180, dragStartPos.current.designX + deltaX));
    const newY = Math.max(-200, Math.min(200, dragStartPos.current.designY + deltaY));

    updateDesign(draggedDesignId, { x: newX, y: newY });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        handleContainerMouseMove(e);
        handleGlobalMouseMove(e);
      }}
      onMouseLeave={() => {
        handleContainerMouseLeave();
        handleGlobalMouseUp();
      }}
      onMouseUp={handleGlobalMouseUp}
      onTouchMove={handleGlobalTouchMove}
      onTouchEnd={handleGlobalMouseUp}
      style={{ perspective: '1200px' }}
      className="relative w-full max-w-[460px] aspect-[4/5] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-slate-950/70 border border-slate-800 shadow-2xl p-2"
    >
      {/* Fondo de Estudio y cuadr?cula sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* CONTENEDOR 3D CON TRANSFORMACI?N DIN?MICA */}
      <div
        id="tshirt-mockup-capture"
        style={{
          transform: is3dEnabled ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* SVG Vectorial 3D de la Camiseta con texturas e iluminaci?n */}
        <svg
          viewBox="0 0 500 600"
          className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] pointer-events-none transition-colors duration-300"
        >
          <defs>
            {/* Iluminaci?n 3D frontal y sombras de volumen */}
            <radialGradient id="shirtVolumeLight" cx="45%" cy="25%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="75%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </radialGradient>

            {/* Sombra de pliegues en axilas y pecho */}
            <linearGradient id="foldGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Silueta Base de la Camiseta */}
          <path
            d="M 145,55 
               C 175,86 225,92 250,92 
               C 275,92 325,86 355,55 
               L 480,132 
               C 485,138 468,195 438,225 
               L 382,188 
               L 396,550 
               C 396,560 385,565 375,565 
               L 125,565 
               C 115,565 104,560 104,550 
               L 118,188 
               L 62,225 
               C 32,195 15,138 20,132 
               Z"
            fill={colorHex}
            stroke="#090d16"
            strokeWidth="3"
          />

          {/* Capa de Volumen e Iluminaci?n 3D */}
          <path
            d="M 145,55 C 175,86 225,92 250,92 C 275,92 325,86 355,55 L 480,132 C 485,138 468,195 438,225 L 382,188 L 396,550 C 396,560 385,565 375,565 L 125,565 C 115,565 104,560 104,550 L 118,188 L 62,225 C 32,195 15,138 20,132 Z"
            fill="url(#shirtVolumeLight)"
          />

          {/* Cuello en Rib Grueso */}
          <path
            d="M 145,55 C 175,90 325,90 355,55"
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="4"
          />
          <path
            d="M 145,55 C 185,76 315,76 355,55"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.5"
          />

          {/* Pliegues de Tela / Arrugas Realistas en Manga y Torso */}
          <path d="M 118,188 C 140,240 135,320 120,400" stroke="rgba(0,0,0,0.18)" strokeWidth="3" fill="none" />
          <path d="M 382,188 C 360,240 365,320 380,400" stroke="rgba(0,0,0,0.18)" strokeWidth="3" fill="none" />
          <path d="M 190,130 C 230,170 270,170 310,130" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
        </svg>

        {/* guías de Zona de impresión (Pecho & Cuerpo Libre) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Delimitaci?n del ?rea frontal completa */}
          <div className="w-[62%] h-[68%] border border-dashed border-blue-400/20 rounded-2xl relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-blue-500/30 text-[9px] font-mono tracking-widest text-blue-300 uppercase">
              Superficie DTF Libre (Hasta 3 Estampados)
            </span>
          </div>
        </div>

        {/* CAPA DE diseñoS M?LTIPLES (Hasta 3 Estampados) */}
        {designs.map((design, index) => {
          const isActive = design.id === activeDesignId;

          return (
            <div
              key={design.id}
              onMouseDown={(e) => handleDesignMouseDown(e, design)}
              onTouchStart={(e) => handleDesignTouchStart(e, design)}
              style={{
                transform: `translate(${design.x}px, ${design.y}px) scale(${design.scale / 100}) rotate(${design.rotation || 0}deg)`,
                zIndex: isActive ? 30 : 10 + index,
                cursor: isDragging && draggedDesignId === design.id ? 'grabbing' : 'grab',
              }}
              className={`absolute top-[34%] w-[42%] h-[32%] flex items-center justify-center transition-transform duration-75 group ${
                isActive ? 'ring-2 ring-blue-500 rounded-lg ring-offset-2 ring-offset-slate-950/50' : ''
              }`}
            >
              <img
                src={design.src}
                alt={design.name}
                className="max-w-full max-h-full object-contain pointer-events-none filter drop-shadow-lg"
                draggable={false}
              />

              {/* Tag flotante con n?mero de estampado */}
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-blue-600 border-2 border-white text-[10px] font-black text-white flex items-center justify-center shadow-lg pointer-events-none">
                #{index + 1}
              </div>

              {/* Borde de selecci?n y controles rápidos si está activo */}
              {isActive && (
                <div className="absolute -bottom-3 right-0 flex items-center gap-1 bg-slate-950/90 border border-blue-500/50 rounded-lg px-2 py-0.5 shadow-xl pointer-events-none">
                  <span className="text-[9px] font-bold text-blue-300 uppercase">
                    Estampado #{index + 1}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Mensaje de ayuda si no hay diseños */}
        {designs.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(37,99,235,0.3)] animate-pulse">
              ??
            </div>
            <span className="text-sm font-bold text-white tracking-wide">
              Camiseta Lista para Dise?ar
            </span>
            <span className="text-xs text-slate-400 mt-1 max-w-[200px]">
              Carga hasta 3 imágenes o diseños en cualquier parte de la prenda
            </span>
          </div>
        )}

      </div>

      {/* Badge de Indicador 3D */}
      <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-400 flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
        <span>Vista 3D Interactiva</span>
      </div>

    </div>
  );
}
