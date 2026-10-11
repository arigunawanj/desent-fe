export function ToolShelf({ color }: { color: string }) {
  const shelves = [0.5, 1.0, 1.5];
  const tools: [number, number, number][] = [
    [-0.5, 0, 0.1],
    [0, 0, -0.05],
    [0.45, 0, 0.08],
  ];

  return (
    <group position={[0, 0, -2.8]}>
      <mesh position={[-0.75, 0.75, 0]} castShadow>
        <boxGeometry args={[0.06, 1.5, 0.35]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0.75, 0.75, 0]} castShadow>
        <boxGeometry args={[0.06, 1.5, 0.35]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {shelves.map((y, i) => (
        <group key={i}>
          <mesh position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.56, 0.04, 0.35]} />
            <meshStandardMaterial color={color} roughness={0.7} />
          </mesh>
          {tools.map((offset, j) => (
            <mesh key={j} position={[offset[0], y + 0.08, offset[2]]} castShadow>
              <boxGeometry args={[0.16, 0.12, 0.12]} />
              <meshStandardMaterial color={j % 2 === 0 ? "#c0392b" : "#2c3e50"} roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
