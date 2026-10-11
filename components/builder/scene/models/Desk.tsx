import type { DeskVariant } from "@/lib/types";

export const DESK_TOP_Y = 0.72;

export function Desk({ color, variant }: { color: string; variant: DeskVariant }) {
  const legPositions: [number, number, number][] = [
    [-1.0, 0.36, -0.42],
    [1.0, 0.36, -0.42],
    [-1.0, 0.36, 0.42],
    [1.0, 0.36, 0.42],
  ];

  return (
    <group>
      <mesh position={[0, DESK_TOP_Y, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.06, 1]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>

      {variant === "classic"
        ? legPositions.map((pos, i) => (
            <mesh key={i} position={pos} castShadow>
              <boxGeometry args={[0.07, 0.72, 0.07]} />
              <meshStandardMaterial color="#3d3d3d" roughness={0.5} />
            </mesh>
          ))
        : (
            <>
              <mesh position={[-0.9, 0.36, 0]} castShadow>
                <boxGeometry args={[0.08, 0.72, 0.6]} />
                <meshStandardMaterial color="#8a8f98" metalness={0.6} roughness={0.3} />
              </mesh>
              <mesh position={[0.9, 0.36, 0]} castShadow>
                <boxGeometry args={[0.08, 0.72, 0.6]} />
                <meshStandardMaterial color="#8a8f98" metalness={0.6} roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.04, 0]} castShadow>
                <boxGeometry args={[2.0, 0.06, 0.55]} />
                <meshStandardMaterial color="#6d7278" metalness={0.5} roughness={0.4} />
              </mesh>
            </>
          )}
    </group>
  );
}
