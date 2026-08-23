import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Upload, Move, ZoomIn, ZoomOut, RotateCcw, RotateCw, Send, Sparkles, 
  AlertCircle, Shirt, Check, Layers, Trash2, Plus, Download, MessageCircle, X, Info, Sliders,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Rotate3d, Eye, Palette, ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Tshirt2DEditor from './Tshirt2DEditor';
const Tshirt3DViewer = React.lazy(() => import('./Tshirt3DViewer'));
import { useToast } from '../../context/ToastContext';
import { FABRIC_TYPES, SHIRT_COLORS, SIZES, WHATSAPP_PHONE } from '../../data/productsData';
import { CATALOG_DESIGNS } from '../../data/catalogData';

export default function TshirtCustomizer() {
  const location = useLocation();
  const toast = useToast();

  const initialFabricId = location.state?.fabricId || null;
  const [selectedFabric, setSelectedFabric] = useState(
    FABRIC_TYPES.find(f => f.id === initialFabricId) || FABRIC_TYPES[0]
  );
  const [selectedColor, setSelectedColor] = useState(SHIRT_COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // 'M' por defecto
  const [quantity, setQuantity] = useState(1);

  // MODO DE VISUALIZACIÓN: '2d' o '3d'
  const [viewMode, setViewMode] = useState('2d');
  const [currentView, setCurrentView] = useState('frente');

  // PESTAÑA ACTIVA EN MÓVIL: 'design' | 'fabric' | 'order'
  const [mobileTab, setMobileTab] = useState('design');

  // Lista de Estampados (Máximo 6 sin costo adicional)
  const [designs, setDesigns] = useState([
    {
      id: 'design-1',
      name: location.state?.presetDesign?.title || CATALOG_DESIGNS[0].title,
      src: location.state?.presetDesign?.image || CATALOG_DESIGNS[0].image,
      view: 'frente',
      x: 0,
      y: -10,
      scale: 90,
      rotation: 0
    }
  ]);
  const [activeDesignId, setActiveDesignId] = useState('design-1');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (location.state?.presetDesign) {
      setDesigns([
        {
          id: `design-${Date.now()}`,
          name: location.state.presetDesign.title,
          src: location.state.presetDesign.image,
          view: currentView,
          x: 0,
          y: -10,
          scale: 90,
          rotation: 0
        }
      ]);
      toast.success(`Diseño cargado: "${location.state.presetDesign.title}"`);
    }
  }, [location.state]);

  const activeDesign = designs.find(d => d.id === activeDesignId) || designs[0] || null;

  const updateDesign = (id, newProps) => {
    setDesigns(prev => prev.map(d => d.id === id ? { ...d, ...newProps } : d));
  };

  const removeDesign = (id) => {
    const target = designs.find(d => d.id === id);
    setDesigns(prev => {
      const filtered = prev.filter(d => d.id !== id);
      if (activeDesignId === id && filtered.length > 0) {
        setActiveDesignId(filtered[0].id);
      }
      return filtered;
    });
    toast.info(`Estampado "${target?.name || ''}" eliminado`);
  };

  const handleAddDesignClick = () => {
    if (designs.length >= 6) {
      setShowLimitModal(true);
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (designs.length >= 6) {
      setShowLimitModal(true);
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      toast.error("El archivo supera los 25MB recomendados.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newId = `design-${Date.now()}`;
      const newDesignObj = {
        id: newId,
        name: file.name,
        src: event.target.result,
        view: currentView,
        x: 0,
        y: -10,
        scale: 85,
        rotation: 0
      };

      setDesigns(prev => [...prev, newDesignObj]);
      setActiveDesignId(newId);
      setMobileTab('design');
      toast.success(`Estampado agregado en vista ${currentView.toUpperCase()}`);
    };
    reader.readAsDataURL(file);
  };

  const handleQuickPosition = (type) => {
    if (!activeDesign) return;
    switch (type) {
      case 'center':
        updateDesign(activeDesign.id, { x: 0, y: -10 });
        toast.info("Alineación: Centro");
        break;
      case 'left-chest':
        updateDesign(activeDesign.id, { x: -38, y: -30, scale: 65 });
        toast.info("Alineación: Bolsillo Izquierdo");
        break;
      case 'right-chest':
        updateDesign(activeDesign.id, { x: 38, y: -30, scale: 65 });
        toast.info("Alineación: Pecho Derecho");
        break;
      case 'abdomen':
        updateDesign(activeDesign.id, { x: 0, y: 35, scale: 95 });
        toast.info("Alineación: Abdomen");
        break;
      default:
        updateDesign(activeDesign.id, { x: 0, y: -10 });
    }
  };

  const handleNudge = (dx, dy) => {
    if (!activeDesign) return;
    updateDesign(activeDesign.id, {
      x: Math.max(-85, Math.min(85, (activeDesign.x || 0) + dx)),
      y: Math.max(-80, Math.min(85, (activeDesign.y || 0) + dy))
    });
  };

  const handleScaleDelta = (delta) => {
    if (!activeDesign) return;
    const next = Math.max(30, Math.min(180, (activeDesign.scale || 90) + delta));
    updateDesign(activeDesign.id, { scale: next });
  };

  const handleRotateDelta = (degDelta) => {
    if (!activeDesign) return;
    let next = ((activeDesign.rotation || 0) + degDelta) % 360;
    if (next > 180) next -= 360;
    if (next < -180) next += 360;
    updateDesign(activeDesign.id, { rotation: next });
  };

  const viewOptions = [
    { id: 'frente', label: 'Frente' },
    { id: 'espalda', label: 'Espalda' },
    { id: 'manga-izquierda', label: 'Manga Izq' },
    { id: 'manga-derecha', label: 'Manga Der' }
  ];

  // PRECIO EXACTO
  const unitPrice = selectedFabric.basePrice;
  const totalPrice = unitPrice * quantity;

  const handleOrderWhatsApp = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#2563eb', '#60a5fa', '#3b82f6', '#ffffff']
    });

    toast.success("Abriendo WhatsApp con tu pedido...");

    const designsListText = designs.map((d, i) => 
      `   * Estampado #${i + 1} (${d.view.toUpperCase()}): "${d.name}" (Tamaño: ${d.scale}%, Rotación: ${d.rotation || 0}°, Posición X=${Math.round(d.x)}, Y=${Math.round(d.y)})`
    ).join('\n');

    const message = 
`*CK ESTAMPADOS - SOLICITUD DE PEDIDO PERSONALIZADO*

*DETALLES DE LA PRENDA:*
- Tela / Línea: ${selectedFabric.name} (${selectedFabric.weight}, ${selectedFabric.composition})
- Color: ${selectedColor.name}
- Talla: ${selectedSize}
- Cantidad: ${quantity} unidad(es)

*ESTAMPADOS CONFIGURADOS (${designs.length} diseño(s)):*
${designsListText || '   - Diseño adjunto en este chat'}

*TOTAL:* $${totalPrice.toLocaleString('es-CO')} COP

Adjunto mis imágenes en alta definición para la impresión DTF HD. Solicito confirmación de disponibilidad y tiempos de entrega.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 lg:pb-0">
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/svg+xml, image/webp"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: ÁREA DE DISEÑO (EDITOR 2D / VISTA 360) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center">
          
          {/* BARRA DE SELECCIÓN DE VISTAS */}
          <div className="w-full flex items-center justify-between flex-wrap gap-2 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-slate-800">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              {viewOptions.map((v) => {
                const count = designs.filter(d => (d.view || 'frente') === v.id).length;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setCurrentView(v.id);
                      setViewMode('2d');
                    }}
                    className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === '2d' && currentView === v.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-400'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{v.label}</span>
                    {count > 0 && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* BOTÓN TOGGLE VISTA 360 */}
            <button
              onClick={() => {
                const nextMode = viewMode === '3d' ? '2d' : '3d';
                setViewMode(nextMode);
                if (nextMode === '3d') {
                  toast.info("Modo 360° activado: Gira la prenda con tu dedo o ratón");
                }
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 ${
                viewMode === '3d'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400'
                  : 'bg-slate-950 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
              <span>{viewMode === '3d' ? '2D Editor' : 'Ver 360°'}</span>
            </button>
          </div>

          {/* LIENZO: EDITOR 2D O VISOR 3D */}
          <div className="w-full flex items-center justify-center">
            {viewMode === '2d' ? (
              <Tshirt2DEditor
                currentView={currentView}
                colorHex={selectedColor.hex}
                designs={designs}
                activeDesignId={activeDesignId}
                setActiveDesignId={setActiveDesignId}
                updateDesign={updateDesign}
                removeDesign={removeDesign}
              />
            ) : (
              <React.Suspense
                fallback={
                  <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] aspect-[4/5] mx-auto bg-slate-950 rounded-2xl sm:rounded-3xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
                    <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono text-slate-400 font-bold">Cargando Motor 3D...</span>
                  </div>
                }
              >
                <Tshirt3DViewer
                  colorHex={selectedColor.hex}
                  designs={designs}
                  activeDesignId={activeDesignId}
                  updateDesign={updateDesign}
                  fabricType={selectedFabric.id}
                />
              </React.Suspense>
            )}
          </div>

          {/* LISTA DE ESTAMPADOS ACTIVOS (HASTA 6 DISEÑOS) */}
          <div className="w-full mt-4 sm:mt-6 bg-slate-950/80 border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                Estampados ({designs.length}/6):
              </span>
              {designs.length < 6 && (
                <button
                  onClick={handleAddDesignClick}
                  className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-[10px] sm:text-xs font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Subir Foto</span>
                </button>
              )}
            </div>

            {/* Scroll horizontal en móviles para máxima ergonomía */}
            <div className="flex lg:grid lg:grid-cols-3 gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {designs.map((d, idx) => (
                <div
                  key={d.id}
                  onClick={() => {
                    setActiveDesignId(d.id);
                    if (d.view) setCurrentView(d.view);
                  }}
                  className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all min-w-[170px] lg:min-w-0 shrink-0 ${
                    d.id === activeDesignId
                      ? 'border-blue-500 bg-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.25)] ring-1 ring-blue-400'
                      : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img
                      src={d.src}
                      alt={d.name}
                      className="w-8 h-8 rounded-lg object-contain bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-bold text-white truncate max-w-[85px] sm:max-w-[100px]">
                        #{idx + 1} {d.name}
                      </div>
                      <div className="text-[9px] text-blue-400 uppercase font-mono">
                        {d.view || 'frente'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDesign(d.id);
                    }}
                    className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition"
                    title="Eliminar este estampado"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: PANEL DE CONTROL Y CONFIGURACIÓN */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-5">
          
          {/* SELECTOR DE PESTAÑAS EN MÓVIL (<1024px) */}
          <div className="lg:hidden flex bg-slate-900 border border-slate-800 rounded-2xl p-1 gap-1">
            <button
              onClick={() => setMobileTab('design')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                mobileTab === 'design'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Estampado</span>
            </button>

            <button
              onClick={() => setMobileTab('fabric')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                mobileTab === 'fabric'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Prenda & Tela</span>
            </button>

            <button
              onClick={() => setMobileTab('order')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                mobileTab === 'order'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pedido</span>
            </button>
          </div>

          {/* 1. CONTROLES DEL ESTAMPADO ACTIVO */}
          {(mobileTab === 'design' || window.innerWidth >= 1024) && activeDesign && (
            <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  Ajustes: <span className="text-blue-400 font-extrabold truncate max-w-[140px]">"{activeDesign.name}"</span>
                </span>
                <button
                  onClick={() => {
                    updateDesign(activeDesign.id, { x: 0, y: -10, scale: 90, rotation: 0 });
                    toast.info("Posición restablecida");
                  }}
                  className="text-[10px] sm:text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reiniciar
                </button>
              </div>

              {/* Selector de Ubicación */}
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Ubicar en la Prenda:
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {viewOptions.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        updateDesign(activeDesign.id, { view: v.id });
                        setCurrentView(v.id);
                        setViewMode('2d');
                        toast.info(`Ubicación: ${v.label}`);
                      }}
                      className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold transition-all text-center ${
                        activeDesign.view === v.id
                          ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-blue-500'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alineación Rápida */}
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Alineación Rápida:
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => handleQuickPosition('center')}
                    className="py-2 px-1 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl text-[10px] sm:text-xs font-bold text-slate-300 hover:text-white transition text-center"
                  >
                    Centro
                  </button>
                  <button
                    onClick={() => handleQuickPosition('left-chest')}
                    className="py-2 px-1 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl text-[10px] sm:text-xs font-bold text-slate-300 hover:text-white transition text-center"
                  >
                    Bolsillo
                  </button>
                  <button
                    onClick={() => handleQuickPosition('right-chest')}
                    className="py-2 px-1 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl text-[10px] sm:text-xs font-bold text-slate-300 hover:text-white transition text-center"
                  >
                    Pecho Der
                  </button>
                  <button
                    onClick={() => handleQuickPosition('abdomen')}
                    className="py-2 px-1 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl text-[10px] sm:text-xs font-bold text-slate-300 hover:text-white transition text-center"
                  >
                    Abdomen
                  </button>
                </div>
              </div>

              {/* Flechas Direccionales & Ajuste Fino */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Ajuste fino:</span>
                  <span className="text-[10px] text-slate-500">Mueve con precisión</span>
                </div>
                <div className="grid grid-cols-3 gap-1 w-28 sm:w-32">
                  <div></div>
                  <button
                    onClick={() => handleNudge(0, -6)}
                    className="p-2 sm:p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center active:scale-95"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <div></div>

                  <button
                    onClick={() => handleNudge(-6, 0)}
                    className="p-2 sm:p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleQuickPosition('center')}
                    className="p-2 sm:p-2.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-[10px] font-bold"
                  >
                    C
                  </button>
                  <button
                    onClick={() => handleNudge(6, 0)}
                    className="p-2 sm:p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center active:scale-95"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div></div>
                  <button
                    onClick={() => handleNudge(0, 6)}
                    className="p-2 sm:p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center active:scale-95"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <div></div>
                </div>
              </div>

              {/* Slider & Botones de Escala */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                    Tamaño del Estampado:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleScaleDelta(-5)}
                      className="w-5 h-5 rounded bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 text-xs flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono text-blue-400 font-bold min-w-[35px] text-center">{activeDesign.scale}%</span>
                    <button
                      onClick={() => handleScaleDelta(5)}
                      className="w-5 h-5 rounded bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 text-xs flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  value={activeDesign.scale}
                  onChange={(e) => updateDesign(activeDesign.id, { scale: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Slider & Botones de Rotación */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                    Rotación:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleRotateDelta(-15)}
                      className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 text-[10px] font-bold"
                    >
                      -15°
                    </button>
                    <span className="font-mono text-blue-400 font-bold min-w-[40px] text-center">{activeDesign.rotation || 0}°</span>
                    <button
                      onClick={() => handleRotateDelta(15)}
                      className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 text-[10px] font-bold"
                    >
                      +15°
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={activeDesign.rotation || 0}
                  onChange={(e) => updateDesign(activeDesign.id, { rotation: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          )}

          {/* 2. PRENDA: COLOR, TELA Y TALLAS */}
          {(mobileTab === 'fabric' || window.innerWidth >= 1024) && (
            <div className="space-y-4">
              
              {/* SELECTOR DE COLOR SÓLIDO */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-2.5 sm:space-y-3">
                <label className="text-xs sm:text-sm font-bold text-white block">
                  Color de la Camiseta: <span className="text-blue-400">{selectedColor.name}</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {SHIRT_COLORS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => {
                        setSelectedColor(col);
                        toast.info(`Color: ${col.name}`);
                      }}
                      className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border flex items-center justify-between transition-all ${
                        selectedColor.id === col.id
                          ? 'border-blue-500 bg-blue-600/15 shadow-[0_0_15px_rgba(37,99,235,0.25)] ring-2 ring-blue-500/40'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          style={{ backgroundColor: col.hex }}
                          className="w-5 h-5 rounded-full border border-slate-600 shadow-inner"
                        />
                        <span className="text-xs font-bold text-white">{col.name}</span>
                      </div>
                      {selectedColor.id === col.id && (
                        <Check className="w-4 h-4 text-blue-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* TELA Y TALLAS */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-white mb-2 block">
                    Línea de Tela:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {FABRIC_TYPES.map((fabric) => (
                      <button
                        key={fabric.id}
                        onClick={() => {
                          setSelectedFabric(fabric);
                          toast.info(`Tela: ${fabric.name}`);
                        }}
                        className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all ${
                          selectedFabric.id === fabric.id
                            ? 'border-blue-500 bg-blue-600/15 text-white ring-1 ring-blue-500'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[11px] sm:text-xs font-bold text-white truncate">{fabric.name}</div>
                        <div className="text-[10px] text-blue-400 font-bold">${fabric.basePrice.toLocaleString('es-CO')}</div>
                        <div className="text-[9px] text-slate-500">{fabric.weight}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* TALLAS */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-xs sm:text-sm font-bold text-white mb-2 block">
                    Talla: <span className="text-blue-400 font-extrabold">{selectedSize}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          toast.info(`Talla: ${size}`);
                        }}
                        className={`py-2 text-xs font-extrabold rounded-xl border transition-all ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 3. RESUMEN Y BOTÓN DIRECTO A WHATSAPP */}
          {(mobileTab === 'order' || window.innerWidth >= 1024) && (
            <div className="bg-gradient-to-br from-blue-950/90 via-slate-900 to-slate-950 border border-blue-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[11px] sm:text-xs text-slate-400 uppercase font-semibold">Total Estimado:</span>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    ${totalPrice.toLocaleString('es-CO')}{' '}
                    <span className="text-xs font-bold text-blue-400">COP</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-xs font-medium text-slate-400">Cant:</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-10 sm:w-12 bg-transparent text-center text-sm font-extrabold text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Prenda:</span>
                  <span className="text-white font-bold">{selectedFabric.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Color / Talla:</span>
                  <span className="text-white font-bold">{selectedColor.name} / {selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estampados:</span>
                  <span className="text-blue-400 font-bold">{designs.length} diseño(s)</span>
                </div>
              </div>

              <button
                onClick={handleOrderWhatsApp}
                className="w-full py-3.5 sm:py-4 px-5 rounded-xl font-extrabold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2.5 group"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                <span>Pedir por WhatsApp (+57 318 624 1724)</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* BARRA FLOTANTE FIJA EN MÓVIL (<1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 px-4 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Total ({quantity} un):</div>
          <div className="text-lg font-black text-white">
            ${totalPrice.toLocaleString('es-CO')} <span className="text-[10px] text-blue-400">COP</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileTab('order')}
            className="px-3 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Opciones</span>
          </button>

          <button
            onClick={handleOrderWhatsApp}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-blue-500/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Pedir</span>
          </button>
        </div>
      </div>

      {/* MODAL DE ADVERTENCIA PARA MÁS DE 6 ESTAMPADOS */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-blue-500/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-4 sm:space-y-5">
            
            <button
              onClick={() => setShowLimitModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Info className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                ¿Deseas 7 o más estampados en tu camiseta?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                El simulador interactivo permite colocar hasta <strong>6 diseños simultáneos</strong> distribuidos en frente, espalda o mangas.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Para prendas con <strong>estampados múltiples especiales o patronaje Full Print</strong>, comunícate a nuestro WhatsApp oficial <strong>+57 318 624 1724</strong> para una cotización preferencial.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados. Necesito una cotización personalizada para una prenda con más de 6 estampados / full print.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowLimitModal(false)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hablar por WhatsApp (+57 318 624 1724)</span>
              </a>

              <button
                onClick={() => setShowLimitModal(false)}
                className="py-3 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-950 border border-slate-800 hover:bg-slate-800 transition-all"
              >
                Entendido, continuar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
