export function Plant({ color }: { color: string }) {
  const clusters: [number, number, number][] = [
    [0, 0.55, 0],
    [0.12, 0.45, 0.1],
    [-0.14, 0.42, -0.08],
    [0.05, 0.62, -0.12],
  ];

  return (
    <group position={[-1.75, 0, -0.75]}>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.3, 12]} />
        <meshStandardMaterial color="#8a5a3a" roughness={0.8} />
      </mesh>
      {clusters.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color={color} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  );
}
