import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { Rotate3d, Download, Camera, Box, ExternalLink } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Tshirt3DViewer({
  colorHex = '#0a0a0a',
  designs = [],
  activeDesignId,
  updateDesign,
  fabricType = 'tela-algodon',
  isStandalone = false
}) {
  const toast = useToast();
  const canvasMountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const tshirtMeshRef = useRef(null);
  const decalsGroupRef = useRef(new THREE.Group());
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  const textureCacheRef = useRef(new Map());
  const raycasterRef = useRef(new THREE.Raycaster());

  const [loading, setLoading] = useState(true);
  const [exporting3D, setExporting3D] = useState(false);
  const [currentAngle, setCurrentAngle] = useState('360');

  // Sincronizar estado con localStorage para la ventana dedicada
  useEffect(() => {
    try {
      const viewerState = {
        colorHex,
        fabricType,
        designs
      };
      localStorage.setItem('ck_3d_viewer_state', JSON.stringify(viewerState));
    } catch (e) {
      // Ignorar errores de storage
    }
  }, [colorHex, fabricType, designs]);

  // Proyectar e integrar los estampados en la malla 3D (Frente, Espalda y Mangas)
  const buildDecals = () => {
    const mesh = tshirtMeshRef.current;
    const group = decalsGroupRef.current;
    if (!mesh || !group) return;

    // Limpiar decals anteriores
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        child.material.dispose();
      }
    }

    if (!designs || designs.length === 0) return;

    designs.forEach((design) => {
      const view = design.view || 'frente';
      const scale = (design.scale || 100) / 100;
      const rot = ((design.rotation || 0) * Math.PI) / 180;

      let rayOrigin, rayDir, orientation, decalSize;

      if (view === 'frente') {
        const xOffset = (design.x || 0) * 0.006;
        const yOffset = -(design.y || 0) * 0.006;
        rayOrigin = new THREE.Vector3(xOffset, 0.2 + yOffset, 2.0);
        rayDir = new THREE.Vector3(0, 0, -1);
        orientation = new THREE.Euler(0, 0, -rot);
        decalSize = new THREE.Vector3(0.55 * scale, 0.55 * scale, 0.4);
      } else if (view === 'espalda') {
        const xOffset = (design.x || 0) * 0.006;
        const yOffset = -(design.y || 0) * 0.006;
        rayOrigin = new THREE.Vector3(-xOffset, 0.2 + yOffset, -2.0);
        rayDir = new THREE.Vector3(0, 0, 1);
        orientation = new THREE.Euler(0, Math.PI, rot);
        decalSize = new THREE.Vector3(0.55 * scale, 0.55 * scale, 0.4);
      } else if (view === 'manga-izquierda') {
        // Manga Izquierda (Brazo derecho visto desde el frente, X > 0)
        const zOffset = (design.x || 0) * 0.003;
        const yOffset = 0.50 - (design.y || 0) * 0.004;
        rayOrigin = new THREE.Vector3(2.0, yOffset, zOffset);
        rayDir = new THREE.Vector3(-1, 0, 0);
        orientation = new THREE.Euler(0, Math.PI / 2, -rot);
        decalSize = new THREE.Vector3(0.42 * scale, 0.42 * scale, 0.35);
      } else if (view === 'manga-derecha') {
        // Manga Derecha (Brazo izquierdo visto desde el frente, X < 0)
        const zOffset = (design.x || 0) * 0.003;
        const yOffset = 0.50 - (design.y || 0) * 0.004;
        rayOrigin = new THREE.Vector3(-2.0, yOffset, zOffset);
        rayDir = new THREE.Vector3(1, 0, 0);
        orientation = new THREE.Euler(0, -Math.PI / 2, rot);
        decalSize = new THREE.Vector3(0.42 * scale, 0.42 * scale, 0.35);
      }

      raycasterRef.current.set(rayOrigin, rayDir);
      const hits = raycasterRef.current.intersectObject(mesh, false);

      let position;
      if (hits.length > 0) {
        position = hits[0].point.clone();
      } else {
        if (view === 'frente') position = new THREE.Vector3((design.x || 0) * 0.006, 0.2 - (design.y || 0) * 0.006, 0.36);
        else if (view === 'espalda') position = new THREE.Vector3(-(design.x || 0) * 0.006, 0.2 - (design.y || 0) * 0.006, -0.36);
        else if (view === 'manga-izquierda') position = new THREE.Vector3(0.92, 0.50 - (design.y || 0) * 0.004, (design.x || 0) * 0.003);
        else position = new THREE.Vector3(-0.92, 0.50 - (design.y || 0) * 0.004, (design.x || 0) * 0.003);
      }

      let texture = textureCacheRef.current.get(design.src);
      if (!texture) {
        texture = textureLoaderRef.current.load(design.src);
        texture.colorSpace = THREE.SRGBColorSpace;
        textureCacheRef.current.set(design.src, texture);
      }

      const decalMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        roughness: 0.72,
        metalness: 0.04
      });

      try {
        const decalGeometry = new DecalGeometry(mesh, position, orientation, decalSize);
        const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
        decalMesh.renderOrder = 2;
        group.add(decalMesh);
      } catch (err) {
        console.warn('Fallback a proyección planar:', err);
        const planeGeo = new THREE.PlaneGeometry(decalSize.x, decalSize.y);
        const planeMesh = new THREE.Mesh(planeGeo, decalMaterial);
        planeMesh.position.copy(position);
        planeMesh.rotation.copy(orientation);
        group.add(planeMesh);
      }
    });
  };

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    const width = mountEl.clientWidth || 500;
    const height = mountEl.clientHeight || 550;

    // 1. ESCENA
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. CÁMARA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);
    cameraRef.current = camera;

    // 3. RENDERIZADOR WEBGL
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    // Limpiar canvas anterior de Three
    while (mountEl.firstChild) {
      mountEl.removeChild(mountEl.firstChild);
    }
    mountEl.appendChild(renderer.domElement);

    // 4. CONTROLES DE ÓRBITA 360
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.8;
    controls.maxDistance = 5.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.minPolarAngle = Math.PI / 4;
    controlsRef.current = controls;

    // 5. ILUMINACIÓN DE ESTUDIO TEXTIL
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLightFront = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLightFront.position.set(0, 2, 4);
    scene.add(dirLightFront);

    const dirLightBack = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLightBack.position.set(0, 2, -4);
    scene.add(dirLightBack);

    const sideLightLeft = new THREE.DirectionalLight(0x93c5fd, 1.0);
    sideLightLeft.position.set(-4, 1, 0);
    scene.add(sideLightLeft);

    const sideLightRight = new THREE.DirectionalLight(0x93c5fd, 1.0);
    sideLightRight.position.set(4, 1, 0);
    scene.add(sideLightRight);

    // Grupo de Decals
    scene.add(decalsGroupRef.current);

    // 6. CARGA DE LA MALLA TURBOSQUID (pos.bin + norm.bin)
    async function loadTurboSquidModel() {
      setLoading(true);
      try {
        const [posRes, normRes] = await Promise.all([
          fetch('/models/pos.bin'),
          fetch('/models/norm.bin')
        ]);

        if (!posRes.ok || !normRes.ok) {
          throw new Error('No se pudieron descargar los binarios 3D de la camiseta');
        }

        const [posBuffer, normBuffer] = await Promise.all([
          posRes.arrayBuffer(),
          normRes.arrayBuffer()
        ]);

        const positions = new Float32Array(posBuffer);
        const normals = new Float32Array(normBuffer);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);

        const sphereRadius = Math.max(
          Math.abs(bbox.max.x - bbox.min.x),
          Math.abs(bbox.max.y - bbox.min.y),
          Math.abs(bbox.max.z - bbox.min.z)
        ) * 0.75;
        geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), sphereRadius);

        const isBlack = colorHex === '#0a0a0a';
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(isBlack ? 0x141414 : 0xf4f4f5),
          roughness: fabricType === 'tela-fria' ? 0.45 : fabricType === 'oversize-qatar' ? 0.88 : 0.75,
          metalness: fabricType === 'tela-fria' ? 0.08 : 0.02,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1.0, 1.0, 1.0);
        mesh.position.set(0, 0, 0);
        mesh.renderOrder = 1;

        if (tshirtMeshRef.current) {
          scene.remove(tshirtMeshRef.current);
          tshirtMeshRef.current.geometry.dispose();
          tshirtMeshRef.current.material.dispose();
        }

        tshirtMeshRef.current = mesh;
        scene.add(mesh);
        setLoading(false);

        buildDecals();
      } catch (err) {
        console.error('Error cargando modelo TurboSquid:', err);
        setLoading(false);
      }
    }

    loadTurboSquidModel();

    // 7. BUCLE DE RENDER
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountEl || !camera || !renderer) return;
      const w = mountEl.clientWidth;
      const h = mountEl.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      while (mountEl.firstChild) {
        mountEl.removeChild(mountEl.firstChild);
      }
    };
  }, []);

  // Actualizar color y rugosidad de la camiseta
  useEffect(() => {
    if (!tshirtMeshRef.current) return;
    const isBlack = colorHex === '#0a0a0a';
    tshirtMeshRef.current.material.color.set(isBlack ? 0x141414 : 0xf4f4f5);
    tshirtMeshRef.current.material.roughness =
      fabricType === 'tela-fria' ? 0.45 : fabricType === 'oversize-qatar' ? 0.88 : 0.75;
    tshirtMeshRef.current.material.metalness = fabricType === 'tela-fria' ? 0.08 : 0.02;
    tshirtMeshRef.current.material.needsUpdate = true;
  }, [colorHex, fabricType]);

  // Reconstruir estampados cada vez que cambian
  useEffect(() => {
    if (tshirtMeshRef.current) {
      buildDecals();
    }
  }, [designs]);

  // Presets de Cámara Rápidos
  const setCameraPreset = (preset) => {
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    if (!controls || !camera) return;

    setCurrentAngle(preset);
    controls.autoRotate = false;

    if (preset === 'frente') {
      camera.position.set(0, 0, 3.2);
    } else if (preset === 'espalda') {
      camera.position.set(0, 0, -3.2);
    } else if (preset === 'manga-izq') {
      camera.position.set(3.2, 0.2, 0);
    } else if (preset === 'manga-der') {
      camera.position.set(-3.2, 0.2, 0);
    } else if (preset === '360') {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.0;
    }
    controls.target.set(0, 0, 0);
    controls.update();
  };

  // 📥 FUNCIÓN PARA DESCARGAR EL MODELO 3D (.GLB)
  const handleDownload3DModel = () => {
    if (!tshirtMeshRef.current || !sceneRef.current) {
      toast.error('El modelo 3D aún se está procesando');
      return;
    }

    setExporting3D(true);
    toast.info('Generando archivo 3D (.glb) con tus estampados...');

    const exporter = new GLTFExporter();
    const exportGroup = new THREE.Group();
    exportGroup.name = 'CK_Estampados_Modelo_Personalizado';

    const meshClone = tshirtMeshRef.current.clone();
    exportGroup.add(meshClone);

    if (decalsGroupRef.current && decalsGroupRef.current.children.length > 0) {
      const decalsClone = decalsGroupRef.current.clone();
      exportGroup.add(decalsClone);
    }

    const options = {
      binary: true,
      embedImages: true
    };

    exporter.parse(
      exportGroup,
      (gltf) => {
        setExporting3D(false);
        const blob = new Blob([gltf], { type: 'model/gltf-binary' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `camiseta-3d-ck-estampados-${Date.now()}.glb`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('¡Modelo 3D (.glb) descargado exitosamente!');
      },
      (error) => {
        setExporting3D(false);
        console.error('Error al exportar modelo GLTF:', error);
        toast.error('Ocurrió un error al generar el archivo 3D');
      },
      options
    );
  };

  // 📸 FUNCIÓN PARA DESCARGAR CAPTURA HD (PNG)
  const handleDownloadSnapshot = () => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) return;

    renderer.render(scene, camera);
    const dataUrl = renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `render-3d-ck-estampados-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Captura fotográfica HD descargada');
  };

  // 🚀 ABRIR EN VENTANA NUEVA INDEPENDIENTE
  const handleOpenNewWindow = () => {
    try {
      const viewerState = {
        colorHex,
        fabricType,
        designs
      };
      localStorage.setItem('ck_3d_viewer_state', JSON.stringify(viewerState));
    } catch (e) {
      console.warn('Error guardando estado para visor:', e);
    }
    toast.success('Abriendo Estudio 3D en ventana dedicada...');
    window.open('/visor-3d', '_blank');
  };

  const isBlack = colorHex === '#0a0a0a';

  return (
    <div className={`relative w-full ${isStandalone ? 'max-w-4xl h-[75vh] sm:h-[80vh]' : 'max-w-[500px] aspect-[4/5]'} ${isBlack ? 'bg-gradient-to-b from-[#dde2ea] via-[#e8edf3] to-[#d4dae3] border-slate-400/40' : 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-slate-800'} rounded-3xl border shadow-2xl flex flex-col justify-between select-none overflow-hidden mx-auto transition-all duration-300`}>
      
      {/* Barra Superior con Selector de Ángulos & Botones */}
      <div className={`p-2.5 sm:p-3.5 z-10 space-y-2 border-b ${isBlack ? 'border-slate-300/80 bg-[#e8edf3]/90 text-slate-800' : 'border-slate-800/80 bg-slate-950/80 text-slate-100'} backdrop-blur-md transition-colors duration-300`}>
        
        {/* Fila 1: Selector de Ángulos 3D (Distribución completa) */}
        <div className={`flex items-center gap-1 ${isBlack ? 'bg-[#d2d9e3]/90 border-slate-400/40' : 'bg-slate-900/90 border-slate-800'} p-1 rounded-xl border w-full justify-between`}>
          <button
            onClick={() => setCameraPreset('frente')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
              currentAngle === 'frente' ? 'bg-blue-600 text-white shadow-sm' : isBlack ? 'text-slate-700 hover:text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Frente
          </button>
          <button
            onClick={() => setCameraPreset('espalda')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
              currentAngle === 'espalda' ? 'bg-blue-600 text-white shadow-sm' : isBlack ? 'text-slate-700 hover:text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Espalda
          </button>
          <button
            onClick={() => setCameraPreset('manga-izq')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
              currentAngle === 'manga-izq' ? 'bg-blue-600 text-white shadow-sm' : isBlack ? 'text-slate-600 hover:text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Manga Izq
          </button>
          <button
            onClick={() => setCameraPreset('manga-der')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
              currentAngle === 'manga-der' ? 'bg-blue-600 text-white shadow-sm' : isBlack ? 'text-slate-600 hover:text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Manga Der
          </button>
          <button
            onClick={() => setCameraPreset('360')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
              currentAngle === '360' ? 'bg-blue-600 text-white shadow-sm' : isBlack ? 'text-slate-600 hover:text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            360°
          </button>
        </div>

        {/* Fila 2: Acciones 3D (Ver Grande & Descargar 3D) */}
        <div className="flex items-center justify-between gap-2">
          <div className={`flex items-center gap-1.5 text-[11px] font-mono ${isBlack ? 'text-slate-600' : 'text-slate-400'}`}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="capitalize">{currentAngle === '360' ? 'Giro Automático' : `Vista: ${currentAngle}`}</span>
          </div>

          <div className="flex items-center gap-2">
            {!isStandalone && (
              <button
                onClick={handleOpenNewWindow}
                className={`px-3 py-1.5 rounded-xl ${isBlack ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'} border text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm`}
                title="Abrir en una ventana grande independiente"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>Ver Grande</span>
              </button>
            )}

            <button
              onClick={handleDownload3DModel}
              disabled={exporting3D || loading}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              title="Descargar archivo 3D (.glb)"
            >
              {exporting3D ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <Box className="w-3.5 h-3.5" />
                  <span>Descargar 3D</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* CONTENEDOR WEBGL CON DECALS INTEGRADOS */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          id="tshirt-3d-canvas-mount"
          ref={canvasMountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        />

        {loading && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${isBlack ? 'bg-white/80' : 'bg-slate-950/80'} backdrop-blur-sm z-20 space-y-3 pointer-events-none`}>
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className={`text-xs font-mono ${isBlack ? 'text-slate-800' : 'text-slate-300'} font-bold`}>Integrando Estampados en 3D...</span>
          </div>
        )}
      </div>

      {/* Barra Inferior con Guía de Uso y Captura HD */}
      <div className={`p-4 z-10 flex items-center justify-between ${isBlack ? 'text-slate-600 border-slate-300/80 bg-white/75' : 'text-slate-400 border-slate-800/80 bg-slate-950/60'} text-[11px] font-mono border-t backdrop-blur-sm transition-colors duration-300`}>
        <span className="flex items-center gap-1.5">
          <Rotate3d className="w-3.5 h-3.5 text-blue-500" />
          <span>Gira con el ratón o dedo en 360°</span>
        </span>

        <button
          onClick={handleDownloadSnapshot}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${isBlack ? 'bg-white border-slate-300 hover:border-blue-500 text-slate-800 hover:text-black' : 'bg-slate-900 border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white'} border transition-all text-[10px] font-bold`}
          title="Tomar captura en alta definición de la vista actual"
        >
          <Camera className="w-3 h-3 text-blue-500" />
          <span>Capturar Foto</span>
        </button>
      </div>

    </div>
  );
}
