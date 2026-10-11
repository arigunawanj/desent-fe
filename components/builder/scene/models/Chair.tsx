import type { ChairVariant } from "@/lib/types";

export function Chair({ color, variant }: { color: string; variant: ChairVariant }) {
  const isMesh = variant === "mesh";

  return (
    <group position={[0, 0, 1.15]} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.3, 0.05, 16]} />
        <meshStandardMaterial color="#2e2e2e" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.26, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.42, 12]} />
        <meshStandardMaterial color="#2e2e2e" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.82, -0.23]} rotation={[-0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.48, 0.62, 0.07]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          transparent={isMesh}
          opacity={isMesh ? 0.75 : 1}
          wireframe={isMesh}
        />
      </mesh>
      {variant === "ergo" && (
        <mesh position={[0, 1.18, -0.3]} rotation={[-0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.28, 0.14, 0.07]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      )}
      <mesh position={[-0.28, 0.62, -0.05]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.06, 0.3, 0.06]} />
        <meshStandardMaterial color="#2e2e2e" />
      </mesh>
      <mesh position={[0.28, 0.62, -0.05]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.06, 0.3, 0.06]} />
        <meshStandardMaterial color="#2e2e2e" />
      </mesh>
    </group>
  );
}
