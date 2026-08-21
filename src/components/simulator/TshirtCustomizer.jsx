import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Upload, Move, ZoomIn, RotateCcw, RotateCw, Send, Sparkles, 
  AlertCircle, Shirt, Check, Layers, Trash2, Plus, Download, MessageCircle, X, Info, Sliders,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Rotate3d, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Tshirt2DEditor from './Tshirt2DEditor';
import Tshirt3DViewer from './Tshirt3DViewer';
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
      toast.success(`Diseno cargado: "${location.state.presetDesign.title}"`);
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
      toast.success(`Estampado #${designs.length + 1} agregado en vista ${currentView.toUpperCase()}`);
    };
    reader.readAsDataURL(file);
  };

  const handleQuickPosition = (type) => {
    if (!activeDesign) return;
    switch (type) {
      case 'center':
        updateDesign(activeDesign.id, { x: 0, y: -10 });
        toast.info("Alineacion: Centro");
        break;
      case 'left-chest':
        updateDesign(activeDesign.id, { x: -38, y: -30, scale: 65 });
        toast.info("Alineacion: Bolsillo Izquierdo");
        break;
      case 'right-chest':
        updateDesign(activeDesign.id, { x: 38, y: -30, scale: 65 });
        toast.info("Alineacion: Pecho Derecho");
        break;
      case 'abdomen':
        updateDesign(activeDesign.id, { x: 0, y: 35, scale: 95 });
        toast.info("Alineacion: Abdomen");
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

  const viewOptions = [
    { id: 'frente', label: 'Frente' },
    { id: 'espalda', label: 'Espalda' },
    { id: 'manga-izquierda', label: 'Manga Izq' },
    { id: 'manga-derecha', label: 'Manga Der' }
  ];

  // PRECIO EXACTO SIN RECARGOS ADICIONALES POR ESTAMPADO
  const unitPrice = selectedFabric.basePrice;
  const totalPrice = unitPrice * quantity;

  const handleOrderWhatsApp = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#2563eb', '#60a5fa', '#3b82f6', '#ffffff']
    });

    toast.success("Abriendo WhatsApp con los datos de tu pedido...");

    const designsListText = designs.map((d, i) => 
      `   * Estampado #${i + 1} (${d.view.toUpperCase()}): "${d.name}" (Tamano: ${d.scale}%, Rotacion: ${d.rotation || 0} deg, Posicion X=${Math.round(d.x)}, Y=${Math.round(d.y)})`
    ).join('\n');

    const message = 
`*CK ESTAMPADOS - SOLICITUD DE PEDIDO PERSONALIZADO*

*DETALLES DE LA PRENDA:*
- Tela / Linea: ${selectedFabric.name} (${selectedFabric.weight}, ${selectedFabric.composition})
- Color: ${selectedColor.name}
- Talla: ${selectedSize}
- Cantidad: ${quantity} unidad(es)

*ESTAMPADOS CONFIGURADOS (${designs.length} diseno(s)):*
${designsListText || '   - Diseno adjunto en este chat'}

*TOTAL:* $${totalPrice.toLocaleString('es-CO')} COP

Adjunto mis imagenes en alta definicion para la impresion DTF HD. Solicito confirmacion de disponibilidad y tiempos de entrega.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/svg+xml, image/webp"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: AREA DE DISENO (EDITOR 2D / VISTA 360) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center">
          
          {/* BARRA DE SELECCION DE VISTAS */}
          <div className="w-full flex items-center justify-between flex-wrap gap-2 mb-5 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              {viewOptions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setCurrentView(v.id);
                    setViewMode('2d');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === '2d' && currentView === v.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{v.label}</span>
                  {designs.filter(d => (d.view || 'frente') === v.id).length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-blue-300" />
                  )}
                </button>
              ))}
            </div>

            {/* BOTON TOGGLE VISTA 360 */}
            <button
              onClick={() => {
                const nextMode = viewMode === '3d' ? '2d' : '3d';
                setViewMode(nextMode);
                if (nextMode === '3d') {
                  toast.info("Modo 360 activado: Gira la prenda con el raton o dedo");
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                viewMode === '3d'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400'
                  : 'bg-[#111111] hover:bg-blue-600 text-white border border-neutral-700'
              }`}
            >
              <Rotate3d className="w-4 h-4 text-blue-400" />
              <span>{viewMode === '3d' ? 'Volver a Editar (2D)' : 'Ver en 360'}</span>
            </button>
          </div>

          {/* LIENZO: EDITOR 2D O VISOR 3D */}
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
            <Tshirt3DViewer
              colorHex={selectedColor.hex}
              designs={designs}
              activeDesignId={activeDesignId}
              updateDesign={updateDesign}
              fabricType={selectedFabric.id}
            />
          )}

          {/* LISTA DE ESTAMPADOS ACTIVOS (HASTA 6 DISEÑOS) */}
          <div className="w-full mt-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-400" />
                Estampados en la Prenda ({designs.length} de 6 max):
              </span>
              {designs.length >= 6 && (
                <span className="text-[11px] font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded-md">
                  Limite de 6 alcanzado
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {designs.map((d, idx) => (
                <div
                  key={d.id}
                  onClick={() => {
                    setActiveDesignId(d.id);
                    if (d.view) setCurrentView(d.view);
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    d.id === activeDesignId
                      ? 'border-blue-500 bg-blue-600/15 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img
                      src={d.src}
                      alt={d.name}
                      className="w-9 h-9 rounded-lg object-contain bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white truncate">
                        #{idx + 1} {d.name}
                      </div>
                      <div className="text-[10px] text-blue-400 uppercase font-mono">
                        {d.view || 'frente'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDesign(d.id);
                    }}
                    className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                    title="Eliminar este estampado"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {designs.length < 6 && (
                <button
                  onClick={handleAddDesignClick}
                  className="p-2.5 rounded-xl border-2 border-dashed border-slate-800 hover:border-blue-500 text-slate-400 hover:text-blue-400 bg-slate-950/40 hover:bg-blue-950/20 transition-all flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Anadir Estampado #{designs.length + 1}</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: PANEL DE EDICION & CONFIGURACION */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* 1. CONTROLES DEL ESTAMPADO ACTIVO */}
          {activeDesign && (
            <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  Ajustes de: <span className="text-blue-400 font-extrabold truncate max-w-[150px]">"{activeDesign.name}"</span>
                </span>
                <button
                  onClick={() => {
                    updateDesign(activeDesign.id, { x: 0, y: -10, scale: 90, rotation: 0 });
                    toast.info("Posicion restablecida");
                  }}
                  className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reiniciar Posicion
                </button>
              </div>

              {/* Selector de Ubicacion */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
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
                        toast.info(`Ubicacion: ${v.label}`);
                      }}
                      className={`py-2 px-2 rounded-xl text-[10px] font-bold transition-all text-center ${
                        activeDesign.view === v.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-blue-500'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alineacion Rapida */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Alineacion Rapida:
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => handleQuickPosition('center')}
                    className="py-2 px-2 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white transition-all text-center"
                  >
                    Centro
                  </button>
                  <button
                    onClick={() => handleQuickPosition('left-chest')}
                    className="py-2 px-2 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white transition-all text-center"
                  >
                    Bolsillo Izq
                  </button>
                  <button
                    onClick={() => handleQuickPosition('right-chest')}
                    className="py-2 px-2 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white transition-all text-center"
                  >
                    Pecho Der
                  </button>
                  <button
                    onClick={() => handleQuickPosition('abdomen')}
                    className="py-2 px-2 bg-slate-950 border border-slate-800 hover:border-blue-500 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white transition-all text-center"
                  >
                    Abdomen
                  </button>
                </div>
              </div>

              {/* Flechas Direccionales */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">Mover milimetricamente:</span>
                  <span className="text-[10px] text-slate-500">O arrastra directo con el raton</span>
                </div>
                <div className="grid grid-cols-3 gap-1 w-28">
                  <div></div>
                  <button
                    onClick={() => handleNudge(0, -6)}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <div></div>

                  <button
                    onClick={() => handleNudge(-6, 0)}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleQuickPosition('center')}
                    className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-[9px] font-bold"
                  >
                    C
                  </button>
                  <button
                    onClick={() => handleNudge(6, 0)}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div></div>
                  <button
                    onClick={() => handleNudge(0, 6)}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <div></div>
                </div>
              </div>

              {/* Slider de Escala */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                    Tamano del Estampado:
                  </span>
                  <span className="font-mono text-blue-400 font-bold">{activeDesign.scale}%</span>
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

              {/* Slider de Rotacion */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                    Rotacion:
                  </span>
                  <span className="font-mono text-blue-400 font-bold">{activeDesign.rotation || 0} deg</span>
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

          {/* 2. SELECTOR DE COLOR SOLIDO */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <label className="text-sm font-bold text-white block">
              Color de la Camiseta: <span className="text-blue-400">{selectedColor.name}</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {SHIRT_COLORS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => {
                    setSelectedColor(col);
                    toast.info(`Color: ${col.name}`);
                  }}
                  className={`py-3.5 px-4 rounded-xl border flex items-center justify-between transition-all ${
                    selectedColor.id === col.id
                      ? 'border-blue-500 bg-blue-600/15 shadow-[0_0_20px_rgba(37,99,235,0.25)] ring-2 ring-blue-500/40'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: col.hex }}
                      className="w-6 h-6 rounded-full border border-slate-600 shadow-inner"
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

          {/* 3. TELA Y TALLAS (S, M, L, XL) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div>
              <label className="text-sm font-bold text-white mb-2 block">
                Linea de Tela:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {FABRIC_TYPES.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => {
                      setSelectedFabric(fabric);
                      toast.info(`Tela: ${fabric.name}`);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedFabric.id === fabric.id
                        ? 'border-blue-500 bg-blue-600/15 text-white ring-1 ring-blue-500'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{fabric.name}</div>
                    <div className="text-[10px] text-blue-400 font-bold">${fabric.basePrice.toLocaleString('es-CO')}</div>
                    <div className="text-[9px] text-slate-500">{fabric.weight}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* TALLAS */}
            <div className="pt-2 border-t border-slate-800">
              <label className="text-sm font-bold text-white mb-2 block">
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
                    className={`py-2.5 text-xs font-extrabold rounded-xl border transition-all ${
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

          {/* 4. RESUMEN Y BOTON DIRECTO A WHATSAPP (SIN COSTOS EXTRA DE ESTAMPADO) */}
          <div className="bg-gradient-to-br from-blue-950/90 via-slate-900 to-slate-950 border border-blue-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Estimado:</span>
                <div className="text-3xl font-black text-white tracking-tight">
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
                  className="w-12 bg-transparent text-center text-sm font-extrabold text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleOrderWhatsApp}
              className="w-full py-4 px-6 rounded-xl font-extrabold text-base text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-3 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span>Pedir por WhatsApp (+57 318 624 1724)</span>
            </button>

            <p className="text-center text-[11px] text-slate-400">
              Se enviara el pedido con las posiciones seleccionadas ({designs.length} diseno(s)) listos para confeccion.
            </p>
          </div>

        </div>

      </div>

      {/* MODAL DE ADVERTENCIA PARA MAS DE 6 ESTAMPADOS */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-blue-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5">
            
            <button
              onClick={() => setShowLimitModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Info className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">
                Deseas 7 o mas estampados en tu camiseta?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                El simulador interactivo permite colocar hasta <strong>6 disenos simultaneos</strong> distribuidos en frente, espalda o mangas.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Para prendas con <strong>estampados multiples especiales, cuello o patronaje Full Print</strong>, comunicate a nuestro WhatsApp oficial <strong>+57 318 624 1724</strong> para una cotizacion preferencial.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola CK Estampados. Necesito una cotizacion personalizada para una prenda con mas de 6 estampados / full print.')}`}
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
