"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Soft pastel gradient with gentle wave motion
  void main() {
    vec2 uv = vUv;
    
    // Create gentle flowing waves
    float wave1 = sin(uv.x * 3.0 + uTime * 0.3) * 0.02;
    float wave2 = cos(uv.y * 2.0 + uTime * 0.2) * 0.02;
    float wave3 = sin((uv.x + uv.y) * 2.5 + uTime * 0.25) * 0.015;
    
    vec2 distortedUv = uv + vec2(wave1 + wave3, wave2 + wave3);
    
    // Pastel color palette - mint, sky, lavender
    vec3 mint = vec3(0.878, 0.949, 0.945);      // #E0F2F1
    vec3 sky = vec3(0.890, 0.949, 0.992);       // #E3F2FD
    vec3 lavender = vec3(0.953, 0.898, 0.961);  // #F3E5F5
    vec3 white = vec3(0.99, 0.99, 0.99);
    
    // Create soft gradient zones
    float gradient1 = smoothstep(0.0, 0.5, distortedUv.x + distortedUv.y * 0.3);
    float gradient2 = smoothstep(0.3, 0.8, distortedUv.y + sin(uTime * 0.1) * 0.1);
    float gradient3 = smoothstep(0.2, 0.7, 1.0 - distortedUv.x + cos(uTime * 0.15) * 0.1);
    
    // Blend colors softly
    vec3 color = mix(white, mint, gradient1 * 0.4);
    color = mix(color, sky, gradient2 * 0.35);
    color = mix(color, lavender, gradient3 * 0.3);
    
    // Add subtle brightness variation
    float brightness = 0.98 + sin(uTime * 0.2 + distortedUv.x * 2.0) * 0.02;
    color *= brightness;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
