import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current?.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    const pointLight1 = new THREE.PointLight(0xf59e0b, 2.5, 100);
    pointLight1.position.set(10, 10, 10);

    const pointLight2 = new THREE.PointLight(0xdc2626, 1.5, 80);
    pointLight2.position.set(-10, -5, 8);

    const pointLight3 = new THREE.PointLight(0x1e40af, 1.2, 80);
    pointLight3.position.set(5, -10, -10);

    scene.add(ambientLight, pointLight1, pointLight2, pointLight3);

    // Floating Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Floating Geo Shapes
    const shapeGeometry = new THREE.DodecahedronGeometry(0.3, 0);
    const shapes = Array.from({ length: 8 }).map((_, i) => {
      const color = [0xf59e0b, 0xdc2626, 0x1e40af, 0xfbbf24][i % 4];
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.4,
        roughness: 0.5,
        metalness: 0.3,
      });

      const shape = new THREE.Mesh(shapeGeometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );

      shape.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        orbitRadius: Math.random() * 5 + 2,
        orbitSpeed: Math.random() * 0.0005 + 0.0001,
        startPos: shape.position.clone(),
        angle: Math.random() * Math.PI * 2,
      };

      scene.add(shape);
      return shape;
    });

    // Animated Lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(300);
    for (let i = 0; i < 300; i++) {
      linePositions[i] = (Math.random() - 0.5) * 15;
    }
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.1,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse Interaction
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * -2;
      targetRotation.y = mouse.x * 0.3;
      targetRotation.x = mouse.y * 0.3;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      camera.rotation.order = "YXZ";
      camera.rotation.y = currentRotation.y;
      camera.rotation.x = currentRotation.x;

      // Animate particles
      const positionAttribute = particles.geometry.getAttribute("position");
      const posArray = positionAttribute.array;
      for (let i = 0; i < posArray.length; i += 3) {
        posArray[i + 1] += 0.005;
        if (posArray[i + 1] > 10) posArray[i + 1] = -10;
      }
      positionAttribute.needsUpdate = true;
      particles.rotation.z += 0.0001;

      // Animate shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        shape.userData.angle += shape.userData.orbitSpeed;
        shape.position.x =
          shape.userData.startPos.x +
          Math.cos(shape.userData.angle) * shape.userData.orbitRadius;
        shape.position.y =
          shape.userData.startPos.y +
          Math.sin(shape.userData.angle * 0.5) * shape.userData.orbitRadius * 0.5;
      });

      // Animate lines
      lines.rotation.x += 0.00005;
      lines.rotation.y += 0.00008;

      renderer.render(scene, camera);
    };
    animate();

    // Responsive Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      shapeGeometry.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      shapes.forEach((shape) => shape.material.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ overflow: "hidden" }}
    />
  );
};

export default ThreeBackground;
