import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Augment the global JSX namespace to include React Three Fiber elements.
// This fixes TypeScript errors where these elements are not recognized as valid JSX.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
      group: any;
      mesh: any;
      meshBasicMaterial: any;
      torusGeometry: any;
      ambientLight: any;
    }
  }
}

const Particles = ({ count = 3000 }) => {
  const points = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2.5 + (Math.random() * 0.2); 

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = time * 0.05;
      points.current.rotation.z = time * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00f0ff" 
        sizeAttenuation={true}
        transparent={true}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const GlowingCore = () => {
  return (
    <group>
      <Sphere args={[2.0, 64, 64]}>
         <meshBasicMaterial color="#000000" />
      </Sphere>
      <Sphere args={[2.05, 64, 64]}>
         <meshBasicMaterial color="#1a0b2e" transparent opacity={0.8} side={THREE.BackSide} />
      </Sphere>
      {/* Atmospheric Glow */}
      <Sphere args={[2.4, 64, 64]}>
         <meshBasicMaterial color="#4c00b0" transparent opacity={0.08} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </Sphere>
    </group>
  );
}

const OrbitalRings = () => {
   const groupRef = useRef<THREE.Group>(null!);

   useFrame((state) => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.002;
        groupRef.current.rotation.z += 0.002;
      }
   });

   return (
     <group ref={groupRef}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
           <torusGeometry args={[3.5, 0.005, 16, 100]} />
           <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </mesh>
        <mesh rotation={[-Math.PI / 3, 0, 0]}>
           <torusGeometry args={[4.2, 0.005, 16, 100]} />
           <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} />
        </mesh>
     </group>
   )
}

const Globe3D: React.FC = () => {
  return (
    <div className="w-full h-[100vh] absolute top-0 left-0 -z-10 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 7], fov: 35 }}>
        <ambientLight intensity={0.2} />
        <Particles />
        <GlowingCore />
        <OrbitalRings />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Globe3D;