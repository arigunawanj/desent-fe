export function BeanBag({ color }: { color: string }) {
  return (
    <mesh position={[2.9, 0.4, -1.6]} scale={[1, 0.7, 1]} castShadow receiveShadow>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </mesh>
  );
}
