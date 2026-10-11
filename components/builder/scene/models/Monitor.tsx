import { RoundedBox } from "@react-three/drei";
export function Monitor({position}: {position: [number, number, number]}) {
  return <group position={position}>
    <RoundedBox args={[.25,.012,.17]} radius={.009} position={[0,.006,0]} castShadow><meshStandardMaterial color="#9ca0a0" metalness={.8} roughness={.28} /></RoundedBox>
    <RoundedBox args={[.04,.22,.025]} radius={.005} position={[0,.12,-.04]} castShadow><meshStandardMaterial color="#9ca0a0" metalness={.8} roughness={.28} /></RoundedBox>
    <RoundedBox args={[.57,.345,.027]} radius={.012} position={[0,.35,-.04]} castShadow><meshStandardMaterial color="#282b2c" roughness={.3} /></RoundedBox>
    <mesh position={[0,.355,-.025]}><planeGeometry args={[.539,.306]} /><meshStandardMaterial color="#718c9a" emissive="#6a8591" emissiveIntensity={.35} roughness={.2} /></mesh>
    <mesh position={[-.1,.355,-.024]}><planeGeometry args={[.23,.306]} /><meshBasicMaterial color="#b2bec2" /></mesh>
    <mesh position={[.139,.355,-.023]}><circleGeometry args={[.09,64]} /><meshBasicMaterial color="#e9d9c2" /></mesh>
    <mesh position={[0,.19,-.023]}><circleGeometry args={[.003,12]} /><meshBasicMaterial color="#fafafa" /></mesh>
  </group>;
}
