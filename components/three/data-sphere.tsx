"use client";

import { useRef, useMemo, useEffect, useState, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

// ---------- Sphere Network ----------

function generateSphereNodes(count: number, radius: number) {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    positions.push([x, y, z]);
  }

  const connections: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const dists = positions
      .map((p, j) => ({ j, d: Math.sqrt(
        (p[0] - positions[i][0]) ** 2 +
        (p[1] - positions[i][1]) ** 2 +
        (p[2] - positions[i][2]) ** 2
      )}))
      .filter(x => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);

    for (const { j } of dists) {
      const key = [i, j].sort().join("-");
      if (!connections.find(c => c.sort().join("-") === key)) {
        connections.push([i, j]);
      }
    }
  }

  return { positions, connections };
}

function SphereScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { positions, connections } = useMemo(() => generateSphereNodes(200, 2), []);

  const lineVerts = useMemo(() => {
    const verts: number[] = [];
    for (const [i, j] of connections) {
      verts.push(...positions[i], ...positions[j]);
    }
    return new Float32Array(verts);
  }, [positions, connections]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#1DBFA0" />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lineVerts, 3]}
            count={lineVerts.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1DBFA0" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

// ---------- Export ----------

export default function DataSphere() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!visible) return null;

  return (
    <ErrorBoundary
      fallback={
        <div style={{ width: "100%", height: "100%", background: "transparent" }} />
      }
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <SphereScene />
      </Canvas>
    </ErrorBoundary>
  );
}
