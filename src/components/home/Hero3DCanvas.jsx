import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    while (container.firstChild) container.removeChild(container.firstChild);
    container.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    const blueRimLight = new THREE.DirectionalLight(0x3b82f6, 3.0);
    blueRimLight.position.set(-3, 1, -2);
    scene.add(blueRimLight);

    // Cargar Logo de CK Estampados para proyectarlo en el pecho de la camiseta flotante
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('/logo-ck.png');
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    // Crear silueta suave de camiseta
    const group = new THREE.Group();

    // Torso
    const torsoGeo = new THREE.CylinderGeometry(0.85, 0.88, 1.9, 36, 16, true);
    const pos = torsoGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      z *= 0.5;
      if (y > 0.3) {
        const factor = (y - 0.3) / 0.6;
        x *= (1 + factor * 0.35);
        z *= (1 + factor * 0.15);
      }
      if (y > 0.75) {
        y -= Math.abs(x) * 0.2;
      }
      pos.setXYZ(i, x, y, z);
    }
    torsoGeo.computeVertexNormals();

    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Negro Medianoche Elegante
      roughness: 0.7,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    const torsoMesh = new THREE.Mesh(torsoGeo, shirtMat);
    group.add(torsoMesh);

    // Mangas
    const sleeveGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.8, 20, 8, true);
    sleeveGeo.rotateZ(Math.PI / 3.4);
    sleeveGeo.translate(-1.2, 0.5, 0.02);
    const leftSleeve = new THREE.Mesh(sleeveGeo, shirtMat);

    const rightSleeveGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.8, 20, 8, true);
    rightSleeveGeo.rotateZ(-Math.PI / 3.4);
    rightSleeveGeo.translate(1.2, 0.5, 0.02);
    const rightSleeve = new THREE.Mesh(rightSleeveGeo, shirtMat);

    group.add(leftSleeve);
    group.add(rightSleeve);

    // Cuello
    const collarGeo = new THREE.TorusGeometry(0.36, 0.055, 12, 32);
    collarGeo.rotateX(Math.PI / 2.15);
    collarGeo.scale(1, 0.75, 1);
    collarGeo.translate(0, 0.82, 0.02);
    const collarMesh = new THREE.Mesh(collarGeo, shirtMat);
    group.add(collarMesh);

    // Estampado DTF con el Logo Oficial en el Pecho
    const logoGeo = new THREE.PlaneGeometry(0.65, 0.65);
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      depthTest: true
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, 0.2, 0.44);
    group.add(logoMesh);

    scene.add(group);

    // Partículas flotantes de destellos azules
    const particlesCount = 40;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 4;
      pPositions[i + 1] = (Math.random() - 0.5) * 4;
      pPositions[i + 2] = (Math.random() - 0.5) * 2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.035,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Oscilación 3D suave y rotación fluida con el cursor
      group.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      group.rotation.y = Math.sin(elapsedTime * 0.8) * 0.35 + mouseX;
      group.rotation.x = mouseY * 0.3;
      group.rotation.z = Math.cos(elapsedTime * 1.2) * 0.03;

      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] cursor-grab active:cursor-grabbing select-none"
    />
  );
}
