export function Surfboard({ color }: { color: string }) {
  return (
    <group position={[-3.3, 0.9, 1.4]} rotation={[0, 0.3, 0.12]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.22, 1.5, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.03]} scale={[0.55, 1, 0.3]}>
        <capsuleGeometry args={[0.22, 1.5, 4, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
    </group>
  );
}
