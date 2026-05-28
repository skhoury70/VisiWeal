"use client";

import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ---------- Error Boundary ----------

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ---------- Helpers ----------

interface City {
  name: string;
  lat: number;
  lng: number;
}

const cities: City[] = [
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Riyadh", lat: 24.7136, lng: 46.6753 },
  { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773 },
  { name: "Doha", lat: 25.2854, lng: 51.531 },
  { name: "Kuwait City", lat: 29.3759, lng: 47.9774 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
];

function latLngToPosition(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

// ---------- Point Cloud ----------

function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function PointCloud() {
  const count = 2000;
  const positions = useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const lat = (seeded(i * 2) - 0.5) * 140;
      const lng = (seeded(i * 2 + 1) - 0.5) * 360;
      const [x, y, z] = latLngToPosition(lat, lng, 2.01);
      pts[i * 3] = x;
      pts[i * 3 + 1] = y;
      pts[i * 3 + 2] = z;
    }
    return pts;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#1DBFA0"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// ---------- Atmosphere ----------

function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.15, 64, 64]} />
      <meshBasicMaterial
        color="#1DBFA0"
        transparent
        opacity={0.05}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// ---------- City Marker ----------

interface CityMarkerProps {
  lat: number;
  lng: number;
}

function CityMarker({ lat, lng }: CityMarkerProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = latLngToPosition(lat, lng, 2);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
      ringRef.current.scale.set(scale, scale, scale);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 - Math.sin(clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#1DBFA0" />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.04, 0.07, 24]} />
        <meshBasicMaterial
          color="#1DBFA0"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ---------- Scene ----------

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#0A1520" roughness={0.6} metalness={0.1} />
      </mesh>
      <PointCloud />
      <Atmosphere />
      {cities.map((c) => (
        <CityMarker key={c.name} lat={c.lat} lng={c.lng} />
      ))}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

// ---------- Export ----------

export default function MenaGlobe() {
  return (
    <ErrorBoundary
      fallback={
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #071017, #0A1520)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "inherit",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(29,191,160,0.15) 0%, transparent 70%)",
            }}
          />
        </div>
      }
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Scene />
      </Canvas>
    </ErrorBoundary>
  );
}
