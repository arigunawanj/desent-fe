export function Lamp({ color }: { color: string }) {
  return (
    <group position={[0.85, 0.72, -0.25]}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.03, 16]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.35, 8]} />
        <meshStandardMaterial color="#3d3d3d" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.12, 0.42, 0]} rotation={[0, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 8]} />
        <meshStandardMaterial color="#3d3d3d" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.25, 0.52, 0]} rotation={[0, 0, Math.PI / 2.4]} castShadow>
        <coneGeometry args={[0.1, 0.16, 16, 1, true]} />
        <meshStandardMaterial color={color} side={2} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
