// components/Interactive3D.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense } from "react";

export default function Interactive3D({ color = "hotpink" }) {
  return (
    <div className="w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl my-8 bg-gradient-to-br from-[#232b47] via-[#352865] to-[#144e65]">
      <Canvas camera={{ position: [2, 2, 4] }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.7} contactShadow>
            <mesh>
              <torusKnotGeometry args={[1, 0.4, 120, 32]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
            </mesh>
          </Stage>
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
