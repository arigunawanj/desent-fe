"use client";

import { Component, Suspense, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import { RepeatWrapping, SRGBColorSpace } from "three";
import type { WorkspaceSelection, DeskOption, ChairOption } from "@/lib/types";
import { Furniture } from "./models/Furniture";
import { Monitor } from "./models/Monitor";

function Room() {
  const source = useTexture('/textures/wood-floor.jpg');
  const floor = useMemo(() => { const t = source.clone(); t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(2.3, 2); t.colorSpace = SRGBColorSpace; return t; }, [source]);
  return <>
    <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-.012,0]} receiveShadow><planeGeometry args={[12,12]} /><meshStandardMaterial map={floor} color="#c5b9a7" roughness={.78} /></mesh>
    <mesh position={[0,1.7,-2.15]} receiveShadow><boxGeometry args={[12,3.4,.12]} /><meshStandardMaterial color="#d9d5ce" roughness={.95} /></mesh>
    <mesh position={[0,.055,-2.06]}><boxGeometry args={[12,.11,.025]} /><meshStandardMaterial color="#efebe3" /></mesh>
    <mesh position={[-3.1,1.7,0]} receiveShadow><boxGeometry args={[.12,3.4,5]} /><meshStandardMaterial color="#e8e4dc" /></mesh>
    <group position={[-3.025,1.9,-.15]} rotation={[0,Math.PI/2,0]}>
      <mesh><planeGeometry args={[2.3,2.15]} /><meshBasicMaterial color="#f6f4eb" /></mesh>
      {[-1.18,0,1.18].map(x=><mesh key={x} position={[x,0,.025]} castShadow><boxGeometry args={[.055,2.24,.08]} /><meshStandardMaterial color="#444640" /></mesh>)}
      {[-1.1,0,1.1].map(y=><mesh key={y} position={[0,y,.025]} castShadow><boxGeometry args={[2.4,.055,.08]} /><meshStandardMaterial color="#444640" /></mesh>)}
    </group>
    <RoundedBox args={[2.9,.012,2.25]} radius={.035} position={[0,.002,.35]} receiveShadow><meshStandardMaterial color="#aaa092" roughness={1} /></RoundedBox>
    <group position={[.65,1.9,-2.065]}>
      <mesh><boxGeometry args={[.8,1.08,.035]} /><meshStandardMaterial color="#433c32" /></mesh>
      <mesh position={[0,0,.023]}><planeGeometry args={[.75,1.03]} /><meshStandardMaterial color="#f1ebe0" /></mesh>
      <mesh position={[0,.14,.025]}><circleGeometry args={[.23,64]} /><meshStandardMaterial color="#a74e34" /></mesh>
      <mesh position={[0,-.21,.026]}><planeGeometry args={[.46,.17]} /><meshStandardMaterial color="#293c43" /></mesh>
    </group>
    <mesh position={[-1.25,1.46,-1.92]} castShadow><boxGeometry args={[1.1,.035,.24]} /><meshStandardMaterial color="#8d6b4c" roughness={.7} /></mesh>
    {[0,1,2,3].map(i=><mesh key={i} position={[-1.5+i*.085,1.63,-1.92]} rotation={[0,0,i===3?-.16:0]} castShadow><boxGeometry args={[.06,.28-i*.018,.15]} /><meshStandardMaterial color={['#a4563c','#ded3bb','#37464c','#999283'][i]} /></mesh>)}
  </>;
}

function DesktopDetails() {
  return <group position={[0,.756,.02]}>
    <RoundedBox args={[.75,.006,.35]} radius={.02} position={[.04,0,.06]} receiveShadow><meshStandardMaterial color="#685b4e" roughness={.98} /></RoundedBox>
    <RoundedBox args={[.39,.015,.135]} radius={.007} position={[-.06,.012,.05]} castShadow><meshStandardMaterial color="#d7d5cd" roughness={.6} /></RoundedBox>
    {Array.from({length:4},(_,row)=>Array.from({length:12},(_,col)=><mesh key={`${row}-${col}`} position={[-.23+col*.03,.022,.002+row*.029]}><boxGeometry args={[.025,.006,.022]} /><meshStandardMaterial color="#edede8" /></mesh>))}
    <mesh position={[.26,.024,.06]} scale={[.033,.016,.055]} castShadow><sphereGeometry args={[1,24,16]} /><meshStandardMaterial color="#e4e3dc" roughness={.5} /></mesh>
  </group>;
}

class SceneBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() { return this.state.failed ? <div className="scene-loading">The 3D preview could not load.<button className="secondary-button" onClick={() => this.setState({failed:false})}>Try again</button><small>You can still choose furniture and review your setup.</small></div> : this.props.children; }
}

export function WorkspaceScene({desk,chair,selection,front = false}: {desk: DeskOption; chair: ChairOption; selection: WorkspaceSelection; front?: boolean}) {
  return <SceneBoundary><Canvas frameloop="demand" shadows camera={{position: front ? [0,2.15,5.9] : [3.65,2.5,4.5], fov: 39}} dpr={[1,1.5]} gl={{antialias:true}} fallback={<div className="scene-loading">3D is unavailable on this device. Product selection and checkout still work.</div>}>
    <color attach="background" args={['#ddd9d1']} />
    <ambientLight intensity={.45} />
    <directionalLight position={[-3,5,4]} intensity={2.8} color="#fff1dd" castShadow shadow-mapSize={[2048,2048]} shadow-bias={-.0001} shadow-normalBias={.025} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
    <Environment resolution={128}><Lightformer intensity={2.5} position={[-4,4,2]} scale={[5,5,1]} /><Lightformer intensity={1.2} position={[3,3,1]} scale={[4,4,1]} /></Environment>
    <Suspense fallback={null}>
      <Room />
      <Furniture file={desk.variant === 'classic' ? 'oak-desk' : 'steel-desk'} dimensions={[1.85,.75,.88]} position={[0,0,-.32]} />
      <Furniture file={chair.variant === 'ergo' ? 'office-chair' : 'lounge-chair'} height={chair.variant === 'ergo' ? 1.16 : 1.02} position={[.15,0,.74]} rotation={[0,Math.PI-.3,0]} />
      <DesktopDetails />
      {Array.from({length:selection.monitorCount},(_,i)=><Monitor key={i} position={[(i-(selection.monitorCount-1)/2)*.59,.753,-.47]} />)}
      {selection.accessories.lamp && <Furniture file="lamp" height={.42} position={[-.72,.75,-.35]} rotation={[0,.65,0]} />}
      {selection.accessories.plant && <Furniture file="plant" height={1.22} position={[-1.43,0,-.7]} />}
      {selection.accessories.toolShelf && <Furniture file="shelf" height={1.85} position={[1.8,0,-1.65]} />}
      {selection.accessories.coffeeMachine && <group position={[1.65,0,-.65]}><RoundedBox args={[.55,.72,.48]} radius={.02} position={[0,.36,0]} castShadow><meshStandardMaterial color="#8c7560" /></RoundedBox><Furniture file="coffee" height={.35} position={[0,.72,0]} /></group>}
      {selection.accessories.motorcycle && <Furniture file="scooter" height={1.1} position={[-2,0,1.9]} rotation={[0,-.6,0]} />}
      {selection.accessories.beanBag && <Furniture file="lounge-chair" height={.9} position={[2,0,1.3]} rotation={[0,-.8,0]} />}
      {selection.accessories.surfboard && <group position={[-2.2,1.05,-1.75]} rotation={[0,.3,-.14]}><mesh scale={[.3,1,.045]} castShadow><sphereGeometry args={[1,48,48]} /><meshStandardMaterial color="#ddd1b9" roughness={.28} /></mesh><mesh position={[0,0,.047]} scale={[.012,.98,.003]}><sphereGeometry args={[1,16,16]} /><meshStandardMaterial color="#825c45" /></mesh></group>}
      <ContactShadows key={`${desk.id}-${chair.id}-${Object.values(selection.accessories).join('')}`} position={[0,.014,0]} opacity={.25} scale={10} blur={2.8} far={3} frames={1} resolution={512} />
    </Suspense>
    <OrbitControls makeDefault enablePan={false} minDistance={3.4} maxDistance={8} minPolarAngle={.5} maxPolarAngle={Math.PI/2.15} minAzimuthAngle={-.65} maxAzimuthAngle={1.05} target={[0,.88,-.2]} />
  </Canvas></SceneBoundary>;
}
