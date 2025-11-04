import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    const pointLight = new THREE.PointLight(0xf59e0b, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    // --- Create Floating Orbs ---
    const orbGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: "#f59e0b",
      emissive: "#f59e0b",
      emissiveIntensity: 0.8,
      roughness: 0.4,
      metalness: 0.1,
    });

    const orbs = [];
    for (let i = 0; i < 40; i++) {
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8
      );
      orb.userData = { speed: 0.001 + Math.random() * 0.002 };
      scene.add(orb);
      orbs.push(orb);
    }

    // --- Mouse Movement Interaction ---
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * -2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);
      orbs.forEach((orb, i) => {
        orb.rotation.y += 0.01;
        orb.position.y += Math.sin(Date.now() * orb.userData.speed + i) * 0.001;
      });
      scene.rotation.y = mouse.x * 0.1;
      scene.rotation.x = mouse.y * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    // --- Resize Handling ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Safe Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10"
      style={{ overflow: "hidden" }}
    />
  );
};

export default ThreeBackground;
