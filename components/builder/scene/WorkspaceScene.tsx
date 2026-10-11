"use client";

import { Component, Suspense, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import { RepeatWrapping, SRGBColorSpace } from "three";
import type { WorkspaceSelection, DeskOption, ChairOption } from "@/lib/types";
import { Furniture } from "./models/Furniture";
import { Monitor } from "./models/Monitor";

function Room() {
  const source = useTexture("/textures/wood-floor.jpg");
  const floor = useMemo(() => {
    const t = source.clone();
    t.wrapS = t.wrapT = RepeatWrapping;
    t.repeat.set(2.3, 2);
    t.colorSpace = SRGBColorSpace;
    return t;
  }, [source]);

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.012, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial map={floor} color="#e6ddd2" roughness={0.72} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 1.7, -2.15]} receiveShadow>
        <boxGeometry args={[12, 3.4, 0.12]} />
        <meshStandardMaterial color="#d9d5ce" roughness={0.95} />
      </mesh>

      {/* Skirting */}
      <mesh position={[0, 0.055, -2.06]}>
        <boxGeometry args={[12, 0.11, 0.025]} />
        <meshStandardMaterial color="#efebe3" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-3.1, 1.7, 0]} receiveShadow>
        <boxGeometry args={[0.12, 3.4, 5]} />
        <meshStandardMaterial color="#e8e4dc" />
      </mesh>

      {/* Window */}
      <group position={[-3.025, 1.9, -0.15]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[2.3, 2.15]} />
          <meshBasicMaterial color="#f6f4eb" />
        </mesh>
        {[-1.18, 0, 1.18].map((x) => (
          <mesh key={x} position={[x, 0, 0.025]} castShadow>
            <boxGeometry args={[0.055, 2.24, 0.08]} />
            <meshStandardMaterial color="#444640" />
          </mesh>
        ))}
        {[-1.1, 0, 1.1].map((y) => (
          <mesh key={y} position={[0, y, 0.025]} castShadow>
            <boxGeometry args={[2.4, 0.055, 0.08]} />
            <meshStandardMaterial color="#444640" />
          </mesh>
        ))}
      </group>

      {/* Area Rug */}
      <RoundedBox
        args={[2.9, 0.012, 2.25]}
        radius={0.035}
        position={[0, 0.002, 0.35]}
        receiveShadow
      >
        <meshStandardMaterial color="#e4ded2" roughness={0.96} />
      </RoundedBox>

      {/* Wall Art */}
      <group position={[0.65, 1.9, -2.065]}>
        <mesh>
          <boxGeometry args={[0.8, 1.08, 0.035]} />
          <meshStandardMaterial color="#433c32" />
        </mesh>
        <mesh position={[0, 0, 0.023]}>
          <planeGeometry args={[0.75, 1.03]} />
          <meshStandardMaterial color="#f1ebe0" />
        </mesh>
        <mesh position={[0, 0.14, 0.025]}>
          <circleGeometry args={[0.23, 64]} />
          <meshStandardMaterial color="#a74e34" />
        </mesh>
        <mesh position={[0, -0.21, 0.026]}>
          <planeGeometry args={[0.46, 0.17]} />
          <meshStandardMaterial color="#293c43" />
        </mesh>
      </group>

      {/* Wall Shelf */}
      <mesh position={[-1.25, 1.46, -1.92]} castShadow>
        <boxGeometry args={[1.1, 0.035, 0.24]} />
        <meshStandardMaterial color="#8d6b4c" roughness={0.7} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[-1.5 + i * 0.085, 1.63, -1.92]}
          rotation={[0, 0, i === 3 ? -0.16 : 0]}
          castShadow
        >
          <boxGeometry args={[0.06, 0.28 - i * 0.018, 0.15]} />
          <meshStandardMaterial
            color={["#a4563c", "#ded3bb", "#37464c", "#999283"][i]}
          />
        </mesh>
      ))}
    </>
  );
}

function TaskLamp({
  position = [-0.68, 0.75, -0.32],
}: {
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Weighted round base */}
      <mesh position={[0, 0.008, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.08, 0.016, 24]} />
        <meshStandardMaterial color="#262624" roughness={0.45} metalness={0.4} />
      </mesh>
      {/* Lower arm */}
      <mesh position={[0, 0.14, 0.03]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.007, 0.007, 0.28, 16]} />
        <meshStandardMaterial color="#1f1f1d" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Elbow hinge joint */}
      <mesh position={[0, 0.27, 0.07]} castShadow>
        <sphereGeometry args={[0.014, 16, 16]} />
        <meshStandardMaterial color="#1a1a18" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Upper arm angled forward */}
      <mesh position={[0.06, 0.36, 0.02]} rotation={[-0.45, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.007, 0.007, 0.22, 16]} />
        <meshStandardMaterial color="#1f1f1d" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Lamp cone shade pointing down/center */}
      <group position={[0.13, 0.44, -0.04]} rotation={[0.45, -0.2, 0.7]}>
        <mesh castShadow>
          <coneGeometry args={[0.078, 0.13, 24, 1, true]} />
          <meshStandardMaterial
            color="#262624"
            roughness={0.45}
            metalness={0.3}
            side={2}
          />
        </mesh>
        {/* Soft warm light source */}
        <pointLight intensity={1.8} distance={2.2} color="#fff2dc" />
        <mesh position={[0, -0.03, 0]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshBasicMaterial color="#fff4df" />
        </mesh>
      </group>
    </group>
  );
}

function SurfboardModel({
  position = [-2.3, 0.95, -1.75],
  rotation = [0, 0.45, -0.16],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Clean matte ivory surfboard body matching thumbnail */}
      <mesh scale={[0.24, 0.95, 0.045]} castShadow receiveShadow>
        <capsuleGeometry args={[1, 0.8, 16, 32]} />
        <meshStandardMaterial color="#f4ede1" roughness={0.28} metalness={0.04} />
      </mesh>
      {/* Natural wood stringer down the center */}
      <mesh position={[0, 0, 0.046]} scale={[0.012, 1.7, 0.002]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#8b5a36" roughness={0.65} />
      </mesh>
    </group>
  );
}

function EspressoStation({
  position = [1.68, 0, -0.65],
}: {
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Credenza side table cabinet (warm natural oak) */}
      <RoundedBox
        args={[0.54, 0.72, 0.46]}
        radius={0.02}
        position={[0, 0.36, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#8d725a" roughness={0.7} />
      </RoundedBox>
      <RoundedBox
        args={[0.57, 0.025, 0.49]}
        radius={0.01}
        position={[0, 0.725, 0]}
        castShadow
      >
        <meshStandardMaterial color="#7a5f48" roughness={0.65} />
      </RoundedBox>

      {/* Italian Stainless Steel Espresso Machine matching product image */}
      <group position={[0, 0.74, 0]}>
        {/* Polished chrome main body */}
        <RoundedBox
          args={[0.24, 0.28, 0.26]}
          radius={0.015}
          position={[0, 0.145, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#dcdfe3"
            metalness={0.92}
            roughness={0.16}
          />
        </RoundedBox>
        {/* Top cup warmer chrome railings */}
        <mesh position={[0, 0.29, 0.11]} castShadow>
          <boxGeometry args={[0.22, 0.01, 0.006]} />
          <meshStandardMaterial color="#c5c8cc" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.29, -0.11]} castShadow>
          <boxGeometry args={[0.22, 0.01, 0.006]} />
          <meshStandardMaterial color="#c5c8cc" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Porcelain espresso cups on top */}
        <mesh position={[-0.05, 0.305, 0.01]} castShadow>
          <cylinderGeometry args={[0.024, 0.018, 0.032, 16]} />
          <meshStandardMaterial color="#faf8f5" roughness={0.2} />
        </mesh>
        <mesh position={[0.05, 0.305, 0.02]} castShadow>
          <cylinderGeometry args={[0.024, 0.018, 0.032, 16]} />
          <meshStandardMaterial color="#faf8f5" roughness={0.2} />
        </mesh>

        {/* Circular front pressure dial */}
        <mesh position={[0.055, 0.21, 0.133]}>
          <circleGeometry args={[0.02, 24]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.3} />
        </mesh>
        <mesh position={[0.055, 0.21, 0.134]}>
          <ringGeometry args={[0.018, 0.022, 24]} />
          <meshStandardMaterial color="#888c90" metalness={0.9} />
        </mesh>

        {/* Chrome Group Head */}
        <mesh
          position={[-0.035, 0.16, 0.15]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.03, 0.032, 0.04, 20]} />
          <meshStandardMaterial color="#e4e7ea" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Portafilter with black ergonomic handle angled to right */}
        <group position={[-0.035, 0.14, 0.17]} rotation={[0.05, 0.42, 0]}>
          <mesh position={[0, 0, 0.065]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.008, 0.007, 0.1, 16]} />
            <meshStandardMaterial color="#1e1e1c" roughness={0.65} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <sphereGeometry args={[0.01, 16, 16]} />
            <meshStandardMaterial
              color="#c5c8cc"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
        </group>

        {/* Steam Wand on Left */}
        <group position={[-0.1, 0.17, 0.11]} rotation={[0.2, 0, -0.25]}>
          <mesh position={[0, -0.055, 0.02]} rotation={[0.1, 0, 0]} castShadow>
            <cylinderGeometry args={[0.004, 0.004, 0.12, 12]} />
            <meshStandardMaterial color="#d4d7db" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.009, 0.009, 0.018, 12]} />
            <meshStandardMaterial color="#222220" roughness={0.7} />
          </mesh>
        </group>

        {/* Drip Tray at Bottom with Chrome Grille */}
        <RoundedBox
          args={[0.24, 0.03, 0.13]}
          radius={0.007}
          position={[0, 0.018, 0.14]}
          castShadow
        >
          <meshStandardMaterial color="#d0d3d6" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0.034, 0.14]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.22, 0.11]} />
          <meshStandardMaterial
            color="#2d3032"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

function DesktopDetails() {
  return (
    <group position={[0, 0.753, -0.16]}>
      {/* Taupe leather desk mat */}
      <RoundedBox
        args={[0.72, 0.006, 0.34]}
        radius={0.015}
        position={[0, 0.003, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#7c7468" roughness={0.94} />
      </RoundedBox>
      {/* Clean minimalist wireless mouse */}
      <mesh position={[0.26, 0.011, 0.02]} scale={[0.032, 0.015, 0.052]} castShadow>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#eae7df" roughness={0.4} />
      </mesh>
    </group>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="scene-loading">
        The 3D preview could not load.
        <button
          className="secondary-button"
          onClick={() => this.setState({ failed: false })}
        >
          Try again
        </button>
        <small>You can still choose furniture and review your setup.</small>
      </div>
    ) : (
      this.props.children
    );
  }
}

export function WorkspaceScene({
  desk,
  chair,
  selection,
  front = false,
}: {
  desk: DeskOption;
  chair: ChairOption;
  selection: WorkspaceSelection;
  front?: boolean;
}) {
  return (
    <SceneBoundary>
      <Canvas
        frameloop="demand"
        shadows
        camera={{
          position: front ? [0, 2.1, 5.5] : [1.85, 2.65, 4.65],
          fov: 39,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        fallback={
          <div className="scene-loading">
            3D is unavailable on this device. Product selection and checkout still work.
          </div>
        }
      >
        <color attach="background" args={["#ddd9d1"]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[-3, 5, 4]}
          intensity={2.8}
          color="#fff1dd"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
          shadow-normalBias={0.025}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <Environment resolution={128}>
          <Lightformer intensity={2.5} position={[-4, 4, 2]} scale={[5, 5, 1]} />
          <Lightformer intensity={1.2} position={[3, 3, 1]} scale={[4, 4, 1]} />
        </Environment>
        <Suspense fallback={null}>
          <Room />
          <Furniture
            file={desk.variant === "classic" ? "oak-desk" : "steel-desk"}
            dimensions={[1.85, 0.75, 0.88]}
            position={[0, 0, -0.32]}
          />
          <Furniture
            file={chair.variant === "ergo" ? "office-chair" : "lounge-chair"}
            height={chair.variant === "ergo" ? 1.16 : 1.02}
            position={[0, 0, 0.52]}
            rotation={[0, Math.PI - 0.14, 0]}
          />
          <DesktopDetails />
          {Array.from({ length: selection.monitorCount }, (_, i) => (
            <Monitor
              key={i}
              position={[
                (i - (selection.monitorCount - 1) / 2) * 0.59,
                0.753,
                -0.47,
              ]}
            />
          ))}
          {selection.accessories.lamp && (
            <TaskLamp position={[-0.68, 0.75, -0.32]} />
          )}
          {selection.accessories.plant && (
            <Furniture
              file="plant"
              height={1.15}
              position={[-1.45, 0, -0.65]}
            />
          )}
          {selection.accessories.toolShelf && (
            <Furniture
              file="shelf"
              height={1.85}
              position={[1.8, 0, -1.65]}
            />
          )}
          {selection.accessories.coffeeMachine && (
            <EspressoStation position={[1.68, 0, -0.65]} />
          )}
          {selection.accessories.motorcycle && (
            <Furniture
              file="scooter"
              height={1.1}
              position={[-2, 0, 1.9]}
              rotation={[0, -0.6, 0]}
            />
          )}
          {selection.accessories.beanBag && (
            <Furniture
              file="lounge-chair"
              height={0.9}
              position={[2, 0, 1.3]}
              rotation={[0, -0.8, 0]}
            />
          )}
          {selection.accessories.surfboard && (
            <SurfboardModel position={[-2.3, 0.95, -1.75]} rotation={[0, 0.45, -0.16]} />
          )}
          <ContactShadows
            key={`${desk.id}-${chair.id}-${Object.values(selection.accessories).join("")}-${selection.monitorCount}`}
            position={[0, 0.014, 0]}
            opacity={0.25}
            scale={10}
            blur={2.8}
            far={3}
            frames={1}
            resolution={512}
          />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={3.2}
          maxDistance={7.5}
          minPolarAngle={0.4}
          maxPolarAngle={Math.PI / 2.15}
          minAzimuthAngle={-0.65}
          maxAzimuthAngle={1.05}
          target={[0, 0.82, -0.2]}
        />
      </Canvas>
    </SceneBoundary>
  );
}
