import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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
    const group = decalsGroupRef.current;
    if (!group) return;

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
      const rotRad = -((design.rotation || 0) * Math.PI) / 180;

      const baseWidth = 0.58 * scale;
      const baseHeight = 0.58 * scale;

      const segments = 16;
      const planeGeo = new THREE.PlaneGeometry(baseWidth, baseHeight, segments, segments);
      const posAttr = planeGeo.attributes.position;

      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const curveZ = -Math.pow(vx, 2) * 0.12;
        posAttr.setZ(i, curveZ);
      }
      planeGeo.computeVertexNormals();

      let posX = 0, posY = 0, posZ = 0;
      let rotX = 0, rotY = 0, rotZ = 0;

      if (view === 'frente') {
        const xOffset = (design.x || 0) * 0.0055;
        const yOffset = -(design.y || 0) * 0.0055;
        posX = xOffset;
        posY = 0.22 + yOffset;
        posZ = 0.315;
        rotX = 0;
        rotY = 0;
        rotZ = rotRad;
      } else if (view === 'espalda') {
        const xOffset = -(design.x || 0) * 0.0055;
        const yOffset = -(design.y || 0) * 0.0055;
        posX = xOffset;
        posY = 0.22 + yOffset;
        posZ = -0.315;
        rotX = 0;
        rotY = Math.PI;
        rotZ = -rotRad;
      } else if (view === 'manga-izquierda') {
        const zOffset = -(design.x || 0) * 0.0035;
        const yOffset = -(design.y || 0) * 0.0035;
        posX = 0.72;
        posY = 0.44 + yOffset;
        posZ = zOffset;
        rotX = 0;
        rotY = Math.PI / 2;
        rotZ = rotRad;
      } else if (view === 'manga-derecha') {
        const zOffset = (design.x || 0) * 0.0035;
        const yOffset = -(design.y || 0) * 0.0035;
        posX = -0.72;
        posY = 0.44 + yOffset;
        posZ = zOffset;
        rotX = 0;
        rotY = -Math.PI / 2;
        rotZ = -rotRad;
      }

      const applyTextureToMesh = (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;

        const decalMat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.02,
          roughness: 0.35,
          metalness: 0.02,
          side: THREE.DoubleSide,
          depthWrite: true,
          depthTest: true
        });

        const decalMesh = new THREE.Mesh(planeGeo, decalMat);
        decalMesh.position.set(posX, posY, posZ);
        decalMesh.rotation.set(rotX, rotY, rotZ);
        decalMesh.renderOrder = 10;
        decalMesh.castShadow = true;

        group.add(decalMesh);
      };

      if (textureCacheRef.current.has(design.src)) {
        applyTextureToMesh(textureCacheRef.current.get(design.src));
      } else {
        textureLoaderRef.current.load(
          design.src,
          (loadedTex) => {
            textureCacheRef.current.set(design.src, loadedTex);
            applyTextureToMesh(loadedTex);
          },
          undefined,
          (err) => console.warn('Error cargando textura 3D:', err)
        );
      }
    });
  };

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = mountEl.clientWidth;
    const height = mountEl.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.4);
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
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    while (mountEl.firstChild) {
      mountEl.removeChild(mountEl.firstChild);
    }
    mountEl.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.6;
    controls.maxDistance = 6.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.2;
    controls.minPolarAngle = Math.PI / 4;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLightFront = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLightFront.position.set(0, 3, 5);
    scene.add(dirLightFront);

    const dirLightBack = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLightBack.position.set(0, 3, -5);
    scene.add(dirLightBack);

    const sideLightLeft = new THREE.DirectionalLight(0x93c5fd, 1.2);
    sideLightLeft.position.set(-5, 2, 0);
    scene.add(sideLightLeft);

    const sideLightRight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    sideLightRight.position.set(5, 2, 0);
    scene.add(sideLightRight);

    scene.add(decalsGroupRef.current);

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

        const isBlack = state.colorHex === '#0a0a0a';
        const material = new THREE.MeshStandardMaterial({
          color: isBlack ? 0x141414 : 0xf4f4f5,
          roughness: state.fabricType === 'tela-fria' ? 0.45 : state.fabricType === 'oversize-qatar' ? 0.88 : 0.75,
          metalness: state.fabricType === 'tela-fria' ? 0.08 : 0.02,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.scale.set(1.15, 1.15, 1.15);

        scene.add(mesh);
        tshirtMeshRef.current = mesh;

        buildDecals();
        setLoading(false);
      } catch (err) {
        console.warn('Cargando geometría procedural de respaldo:', err);
        createFallbackMesh();
      }
    }

    function createFallbackMesh() {
      const geom = new THREE.CylinderGeometry(0.55, 0.65, 1.4, 32, 1, true);
      const isBlack = state.colorHex === '#0a0a0a';
      const mat = new THREE.MeshStandardMaterial({
        color: isBlack ? 0x141414 : 0xf4f4f5,
        roughness: 0.7,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geom, mat);
      scene.add(mesh);
      tshirtMeshRef.current = mesh;
      buildDecals();
      setLoading(false);
    }

    loadTurboSquidModel();

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
    buildDecals();
  }, [state.designs]);

  const setCameraPreset = (preset) => {
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    if (!controls || !camera) return;

    setCurrentAngle(preset);
    controls.autoRotate = false;

    if (preset === 'frente') {
      camera.position.set(0, 0.2, 3.4);
    } else if (preset === 'espalda') {
      camera.position.set(0, 0.2, -3.4);
    } else if (preset === 'manga-izq') {
      camera.position.set(3.4, 0.2, 0);
    } else if (preset === 'manga-der') {
      camera.position.set(-3.4, 0.2, 0);
    } else if (preset === '360') {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.0;
    }
    controls.target.set(0, 0, 0);
    controls.update();
  };

  const toggleColor = () => {
    const nextColor = state.colorHex === '#0a0a0a' ? '#ffffff' : '#0a0a0a';
    setState(prev => ({ ...prev, colorHex: nextColor }));
    toast.info(`Color cambiado a: ${nextColor === '#0a0a0a' ? 'Negro' : 'Blanco'}`);
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
    link.download = `CK_Estampados_Estudio3D_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Fotografía en alta definición descargada');
  };

  const handleDownload3DModel = () => {
    if (!tshirtMeshRef.current || !sceneRef.current) {
      toast.error('El modelo 3D aún se está procesando');
      return;
    }

    setExporting3D(true);
    toast.info('Exportando archivo 3D (.glb)...');

    const exporter = new GLTFExporter();
    const exportGroup = new THREE.Group();
    exportGroup.name = 'CK_Estampados_Estudio3D';

    const meshClone = tshirtMeshRef.current.clone();
    exportGroup.add(meshClone);

    decalsGroupRef.current.children.forEach((child) => {
      exportGroup.add(child.clone());
    });

    exporter.parse(
      exportGroup,
      (gltf) => {
        const blob = new Blob([gltf], { type: 'model/gltf-binary' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `CK_Estampados_3D_${state.colorHex === '#0a0a0a' ? 'Negra' : 'Blanca'}_${Date.now()}.glb`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setExporting3D(false);
        toast.success('Modelo 3D descargado exitosamente (.glb)');
      },
      (error) => {
        console.error('Error exportando 3D:', error);
        setExporting3D(false);
        toast.error('No se pudo generar el modelo 3D');
      },
      { binary: true }
    );
  };

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden select-none flex flex-col justify-between">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-950/80 to-slate-950 pointer-events-none" />

      {/* HEADER SUPERIOR */}
      <header className="relative z-20 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => window.close()}
            className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white transition flex items-center gap-2 text-xs font-bold shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar Visor</span>
          </button>

          <div className="flex items-center gap-2">
            <img src={logoImg} alt="CK Estampados" className="h-8 w-auto object-contain" />
            <div className="hidden md:block">
              <h1 className="text-sm font-black text-white tracking-wider uppercase">Estudio 3D</h1>
              <p className="text-[10px] text-blue-400 font-mono">Render en tiempo real</p>
            </div>
          </div>
        </div>

        {/* ÁNGULOS Y ACCIONES */}
        <div className="pointer-events-auto flex items-center gap-2 flex-wrap justify-end">
          
          <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-xl p-1 rounded-2xl border border-slate-800 shadow-xl">
            <button
              onClick={() => setCameraPreset('frente')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentAngle === 'frente' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Frente
            </button>
            <button
              onClick={() => setCameraPreset('espalda')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentAngle === 'espalda' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Espalda
            </button>
            <button
              onClick={() => setCameraPreset('manga-izq')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentAngle === 'manga-izq' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Manga I
            </button>
            <button
              onClick={() => setCameraPreset('manga-der')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentAngle === 'manga-der' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Manga D
            </button>
            <button
              onClick={() => setCameraPreset('360')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentAngle === '360' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              360°
            </button>
          </div>

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

          <button
            onClick={handleDownload3DModel}
            disabled={exporting3D || loading}
            className="px-3.5 sm:px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-lg shadow-blue-500/25"
          >
            {exporting3D ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Box className="w-4 h-4" />
                <span className="hidden sm:inline">Descargar 3D</span>
              </>
            )}
          </button>

        </div>

      </header>

      {/* LIENZO 3D */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          ref={canvasMountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        />

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md z-30 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-mono text-slate-300 font-bold">Renderizando modelo 3D...</span>
          </div>
        )}
      </div>

      {/* FOOTER INFERIOR */}
      <footer className="relative z-20 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-xl px-4 py-2 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2 shadow-xl">
          <Rotate3d className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Gira con tu ratón o dedo en 360°</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={handleDownloadSnapshot}
            className="px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-blue-500 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 shadow-xl transition"
          >
            <Camera className="w-4 h-4 text-blue-400" />
            <span>Foto HD</span>
          </button>
        </div>
      </footer>

    </div>
  );
}
