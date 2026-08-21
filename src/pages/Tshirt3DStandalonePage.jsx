import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { Rotate3d, Box, Camera, ArrowLeft } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import logoImg from '../assets/logo-ck.png';
import { CATALOG_DESIGNS } from '../data/catalogData';

export default function Tshirt3DStandalonePage() {
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

  // Cargar estado inicial desde localStorage
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
  const [loading, setLoading] = useState(true);
  const [exporting3D, setExporting3D] = useState(false);
  const [currentAngle, setCurrentAngle] = useState('360');

  // Escuchar cambios en tiempo real desde la pestaña principal
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'ck_3d_viewer_state' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setState(parsed);
          toast.info('Vista 3D sincronizada con el personalizador');
        } catch (err) {
          console.error('Error parseando actualización 3D:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const buildDecals = () => {
    const mesh = tshirtMeshRef.current;
    const group = decalsGroupRef.current;
    if (!mesh || !group) return;

    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    }

    if (!state.designs || state.designs.length === 0) return;

    state.designs.forEach((design) => {
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
        const zOffset = (design.x || 0) * 0.003;
        const yOffset = 0.50 - (design.y || 0) * 0.004;
        rayOrigin = new THREE.Vector3(2.0, yOffset, zOffset);
        rayDir = new THREE.Vector3(-1, 0, 0);
        orientation = new THREE.Euler(0, Math.PI / 2, -rot);
        decalSize = new THREE.Vector3(0.42 * scale, 0.42 * scale, 0.35);
      } else if (view === 'manga-derecha') {
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
        console.warn('Fallback planar:', err);
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

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);
    cameraRef.current = camera;

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

    while (mountEl.firstChild) {
      mountEl.removeChild(mountEl.firstChild);
    }
    mountEl.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.4;
    controls.maxDistance = 6.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.minPolarAngle = Math.PI / 4;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLightFront = new THREE.DirectionalLight(0xffffff, 2.3);
    dirLightFront.position.set(0, 2, 4);
    scene.add(dirLightFront);

    const dirLightBack = new THREE.DirectionalLight(0xffffff, 1.9);
    dirLightBack.position.set(0, 2, -4);
    scene.add(dirLightBack);

    const sideLightLeft = new THREE.DirectionalLight(0x93c5fd, 1.1);
    sideLightLeft.position.set(-4, 1, 0);
    scene.add(sideLightLeft);

    const sideLightRight = new THREE.DirectionalLight(0x93c5fd, 1.1);
    sideLightRight.position.set(4, 1, 0);
    scene.add(sideLightRight);

    scene.add(decalsGroupRef.current);

    async function loadModel() {
      setLoading(true);
      try {
        const [posRes, normRes] = await Promise.all([
          fetch('/models/pos.bin'),
          fetch('/models/norm.bin')
        ]);

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

        const isBlack = state.colorHex === '#0a0a0a';
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(isBlack ? 0x141414 : 0xf4f4f5),
          roughness: state.fabricType === 'tela-fria' ? 0.45 : state.fabricType === 'oversize-qatar' ? 0.88 : 0.75,
          metalness: state.fabricType === 'tela-fria' ? 0.08 : 0.02,
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

    loadModel();

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
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

  useEffect(() => {
    if (!tshirtMeshRef.current) return;
    const isBlack = state.colorHex === '#0a0a0a';
    tshirtMeshRef.current.material.color.set(isBlack ? 0x141414 : 0xf4f4f5);
    tshirtMeshRef.current.material.roughness =
      state.fabricType === 'tela-fria' ? 0.45 : state.fabricType === 'oversize-qatar' ? 0.88 : 0.75;
    tshirtMeshRef.current.material.metalness = state.fabricType === 'tela-fria' ? 0.08 : 0.02;
    tshirtMeshRef.current.material.needsUpdate = true;
  }, [state.colorHex, state.fabricType]);

  useEffect(() => {
    if (tshirtMeshRef.current) {
      buildDecals();
    }
  }, [state.designs]);

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

  const handleDownload3DModel = () => {
    if (!tshirtMeshRef.current || !sceneRef.current) {
      toast.error('El modelo 3D aún se está procesando');
      return;
    }

    setExporting3D(true);
    toast.info('Generando archivo 3D (.glb)...');

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
        console.error('Error al exportar:', error);
        toast.error('Error al exportar');
      },
      options
    );
  };

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

  const toggleColor = () => {
    const newHex = state.colorHex === '#0a0a0a' ? '#ffffff' : '#0a0a0a';
    const updated = { ...state, colorHex: newHex };
    setState(updated);
    localStorage.setItem('ck_3d_viewer_state', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 bg-slate-950 text-white flex flex-col justify-between select-none overflow-hidden">
      
      {/* BARRA SUPERIOR FLOTANTE */}
      <header className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none gap-4">
        
        {/* LOGO & VOLVER */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-2xl">
          <button
            onClick={() => window.close()}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Cerrar ventana 3D"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <img src={logoImg} alt="CK Estampados" className="h-6 w-auto object-contain" />
            <span className="text-xs font-black tracking-tight text-white hidden md:inline">
              CK <span className="text-blue-500">ESTUDIO 3D</span>
            </span>
          </div>
        </div>

        {/* ÁNGULOS Y ACCIONES */}
        <div className="pointer-events-auto flex items-center gap-2 flex-wrap justify-end">
          
          {/* Preset de Ángulos */}
          <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-xl p-1 rounded-2xl border border-slate-800 shadow-xl">
            <button
              onClick={() => setCameraPreset('frente')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentAngle === 'frente' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Frente
            </button>
            <button
              onClick={() => setCameraPreset('espalda')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentAngle === 'espalda' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Espalda
            </button>
            <button
              onClick={() => setCameraPreset('manga-izq')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentAngle === 'manga-izq' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Manga Izq
            </button>
            <button
              onClick={() => setCameraPreset('manga-der')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentAngle === 'manga-der' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Manga Der
            </button>
            <button
              onClick={() => setCameraPreset('360')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentAngle === '360' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              360°
            </button>
          </div>

          {/* Toggle Color Rápido */}
          <button
            onClick={toggleColor}
            className="px-3 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-blue-500 text-xs font-bold flex items-center gap-2 shadow-xl"
            title="Alternar color de la camiseta"
          >
            <span
              style={{ backgroundColor: state.colorHex }}
              className="w-3.5 h-3.5 rounded-full border border-slate-600"
            />
            <span className="hidden sm:inline">Color</span>
          </button>

          {/* Botón Descargar 3D (.GLB) */}
          <button
            onClick={handleDownload3DModel}
            disabled={exporting3D || loading}
            className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25"
          >
            {exporting3D ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generando...</span>
              </>
            ) : (
              <>
                <Box className="w-4 h-4" />
                <span>Descargar 3D</span>
              </>
            )}
          </button>

        </div>

      </header>

      {/* LIENZO 3D COMPLETO EN PANTALLA COMPLETA */}
      <main className="relative w-full h-full flex items-center justify-center">
        <div
          ref={canvasMountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        />

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md z-30 space-y-3 pointer-events-none">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-mono text-slate-200 font-bold">Cargando Estudio 3D en Alta Definición...</span>
          </div>
        )}
      </main>

      {/* BARRA INFERIOR FLOTANTE */}
      <footer className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none gap-4">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 px-4 py-2 rounded-2xl text-xs font-mono text-slate-300 flex items-center gap-2 shadow-2xl">
          <Rotate3d className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>Gira con el ratón o dedo en 360° • Zoom con la rueda</span>
        </div>

        <button
          onClick={handleDownloadSnapshot}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-blue-500 text-slate-200 hover:text-white transition-all text-xs font-bold shadow-2xl"
          title="Tomar captura en alta definición de la vista actual"
        >
          <Camera className="w-4 h-4 text-blue-400" />
          <span>Capturar Foto HD</span>
        </button>
      </footer>

    </div>
  );
}
