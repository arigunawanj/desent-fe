export function CoffeeMachine({ color }: { color: string }) {
  return (
    <group position={[2.6, 0, 1.1]}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.8, 0.6]} />
        <meshStandardMaterial color="#d8d2c4" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.95, 0.1]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.45]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.65, 0.33]} castShadow>
        <boxGeometry args={[0.1, 0.12, 0.1]} />
        <meshStandardMaterial color="#2e2e2e" />
      </mesh>
      <mesh position={[0, 0.46, 0.33]} castShadow>
        <cylinderGeometry args={[0.07, 0.06, 0.1, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
