export function Motorcycle({ color }: { color: string }) {
  return (
    <group position={[-3.4, 0, 2.6]} rotation={[0, 0.5, 0]}>
      <mesh position={[-0.5, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.28, 0.07, 8, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.6} />
      </mesh>
      <mesh position={[0.55, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.28, 0.07, 8, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.1, 0.22, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.55, 0.7, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.5, 0.05, 0.05]} />
        <meshStandardMaterial color="#2e2e2e" />
      </mesh>
      <mesh position={[-0.5, 0.65, 0]} castShadow>
        <boxGeometry args={[0.22, 0.4, 0.22]} />
        <meshStandardMaterial color="#2e2e2e" roughness={0.6} />
      </mesh>
    </group>
  );
}
