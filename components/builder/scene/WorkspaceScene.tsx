"use client";

import { Component, Suspense, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  Lightformer,
  OrbitControls,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import { RepeatWrapping, SRGBColorSpace } from "three";
import type {
  WorkspaceSelection,
  DeskOption,
  ChairOption,
  AmbienceMode,
  CameraView,
  AccessoryKey,
} from "@/lib/types";
import { Furniture } from "./models/Furniture";
import { Monitor } from "./models/Monitor";

function Room({ ambience }: { ambience: AmbienceMode }) {
  const source = useTexture("/textures/wood-floor.jpg");
  const floor = useMemo(() => {
    const t = source.clone();
    t.wrapS = t.wrapT = RepeatWrapping;
    t.repeat.set(2.3, 2);
    t.colorSpace = SRGBColorSpace;
    return t;
  }, [source]);

  const wallColor =
    ambience === "night" ? "#22272e" : ambience === "sunset" ? "#e6cfc1" : "#d9d5ce";
  const floorTint =
    ambience === "night" ? "#7d7870" : ambience === "sunset" ? "#d49b7f" : "#c5b9a7";
  const windowSkyColor =
    ambience === "night" ? "#0b121c" : ambience === "sunset" ? "#ff7c43" : "#eef6fa";
  const frameColor = ambience === "night" ? "#1e2229" : "#3b3d37";

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.012, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial map={floor} color={floorTint} roughness={0.78} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 1.7, -2.15]} receiveShadow>
        <boxGeometry args={[12, 3.4, 0.12]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      {/* Skirting Baseboard */}
      <mesh position={[0, 0.055, -2.06]}>
        <boxGeometry args={[12, 0.11, 0.025]} />
        <meshStandardMaterial color={ambience === "night" ? "#2a2f38" : "#efebe3"} />
      </mesh>

      {/* Left Wall with Window opening */}
      <mesh position={[-3.1, 1.7, 0]} receiveShadow>
        <boxGeometry args={[0.12, 3.4, 5]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      {/* Tropical Villa Window */}
      <group position={[-3.025, 1.9, -0.15]} rotation={[0, Math.PI / 2, 0]}>
        {/* Outside Sky / Scenery */}
        <mesh>
          <planeGeometry args={[2.3, 2.15]} />
          <meshBasicMaterial color={windowSkyColor} />
        </mesh>
        {/* Palm tree shadow effect */}
        {ambience !== "night" && (
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[2.1, 2.0]} />
            <meshBasicMaterial
              color={ambience === "sunset" ? "#d96538" : "#98b9a8"}
              transparent
              opacity={0.18}
            />
          </mesh>
        )}
        {/* Window Frames */}
        {[-1.18, 0, 1.18].map((x) => (
          <mesh key={x} position={[x, 0, 0.025]} castShadow>
            <boxGeometry args={[0.055, 2.24, 0.08]} />
            <meshStandardMaterial color={frameColor} />
          </mesh>
        ))}
        {[-1.1, 0, 1.1].map((y) => (
          <mesh key={y} position={[0, y, 0.025]} castShadow>
            <boxGeometry args={[2.4, 0.055, 0.08]} />
            <meshStandardMaterial color={frameColor} />
          </mesh>
        ))}
      </group>

      {/* Workspace Area Rug */}
      <RoundedBox
        args={[2.9, 0.012, 2.25]}
        radius={0.035}
        position={[0, 0.002, 0.35]}
        receiveShadow
      >
        <meshStandardMaterial
          color={ambience === "night" ? "#343a42" : ambience === "sunset" ? "#bda596" : "#aaa092"}
          roughness={1}
        />
      </RoundedBox>

      {/* Wall Art Frame */}
      <group position={[0.65, 1.9, -2.065]}>
        <mesh>
          <boxGeometry args={[0.8, 1.08, 0.035]} />
          <meshStandardMaterial color="#433c32" />
        </mesh>
        <mesh position={[0, 0, 0.023]}>
          <planeGeometry args={[0.75, 1.03]} />
          <meshStandardMaterial color={ambience === "night" ? "#d8d3c8" : "#f1ebe0"} />
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

      {/* Floating Oak Shelf */}
      <mesh position={[-1.25, 1.46, -1.92]} castShadow>
        <boxGeometry args={[1.1, 0.035, 0.24]} />
        <meshStandardMaterial color="#8d6b4c" roughness={0.7} />
      </mesh>
      {/* Books on shelf */}
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

function DesktopDetails({ ambience }: { ambience: AmbienceMode }) {
  return (
    <group position={[0, 0.756, 0.02]}>
      {/* Leather Desk Mat */}
      <RoundedBox
        args={[0.75, 0.006, 0.35]}
        radius={0.02}
        position={[0.04, 0, 0.06]}
        receiveShadow
      >
        <meshStandardMaterial
          color={ambience === "night" ? "#22252a" : "#685b4e"}
          roughness={0.98}
        />
      </RoundedBox>
      {/* Mechanical Keyboard */}
      <RoundedBox
        args={[0.39, 0.015, 0.135]}
        radius={0.007}
        position={[-0.06, 0.012, 0.05]}
        castShadow
      >
        <meshStandardMaterial color="#35393d" roughness={0.6} />
      </RoundedBox>
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 12 }, (_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-0.23 + col * 0.03, 0.022, 0.002 + row * 0.029]}
          >
            <boxGeometry args={[0.025, 0.006, 0.022]} />
            <meshStandardMaterial
              color={row === 0 || col === 0 ? "#ff8855" : "#e6e6e2"}
            />
          </mesh>
        )),
      )}
      {/* Wireless Ergonomic Mouse */}
      <mesh position={[0.26, 0.024, 0.06]} scale={[0.033, 0.016, 0.055]} castShadow>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#2d3033" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Hotspot({
  position,
  label,
  active,
  onClick,
}: {
  position: [number, number, number];
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Html position={position} center distanceFactor={7} zIndexRange={[50, 0]}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`scene-hotspot-pin ${active ? "is-active" : ""}`}
        title={label}
      >
        <span className="hotspot-pulse" />
        <span className="hotspot-icon">{active ? "✓" : "+"}</span>
        <span className="hotspot-text">{label}</span>
      </button>
    </Html>
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
        <button className="secondary-button" onClick={() => this.setState({ failed: false })}>
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
  ambience = "day",
  cameraView = "iso",
  showHotspots = true,
  onToggleAccessory,
  onIncrementMonitor,
}: {
  desk: DeskOption;
  chair: ChairOption;
  selection: WorkspaceSelection;
  ambience?: AmbienceMode;
  cameraView?: CameraView;
  showHotspots?: boolean;
  onToggleAccessory?: (key: AccessoryKey) => void;
  onIncrementMonitor?: () => void;
}) {
  const cameraConfig = useMemo(() => {
    if (cameraView === "front") {
      return { position: [0, 2.05, 4.4] as [number, number, number], fov: 38, target: [0, 0.9, -0.3] };
    }
    if (cameraView === "top") {
      return { position: [0, 6.2, 0.3] as [number, number, number], fov: 36, target: [0, 0.1, 0] };
    }
    // Default Isometric
    return { position: [3.65, 2.5, 4.5] as [number, number, number], fov: 39, target: [0, 0.88, -0.2] };
  }, [cameraView]);

  const bg =
    ambience === "night" ? "#12151a" : ambience === "sunset" ? "#382721" : "#ddd9d1";

  return (
    <SceneBoundary>
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: cameraConfig.position, fov: cameraConfig.fov }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        fallback={
          <div className="scene-loading">
            3D preview unavailable. Product selection & rental still work smoothly.
          </div>
        }
      >
        <color attach="background" args={[bg]} />

        {/* Ambient lighting per mode */}
        {ambience === "night" ? (
          <>
            <ambientLight intensity={0.16} color="#3c4c61" />
            <directionalLight
              position={[-2.5, 4.5, 3]}
              intensity={0.65}
              color="#7c9fca"
              castShadow
            />
            {/* Lamp warm spotlight on desk */}
            {selection.accessories.lamp && (
              <pointLight
                position={[-0.72, 1.25, -0.35]}
                intensity={4.2}
                color="#ffba54"
                distance={5}
                castShadow
              />
            )}
            {/* Monitor screen glow */}
            {selection.monitorCount > 0 && (
              <pointLight
                position={[0, 1.05, -0.3]}
                intensity={1.2}
                color="#78b7e6"
                distance={2.5}
              />
            )}
          </>
        ) : ambience === "sunset" ? (
          <>
            <ambientLight intensity={0.5} color="#ffb080" />
            <directionalLight
              position={[-4.5, 3.4, 3]}
              intensity={3.2}
              color="#ff7f3d"
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-bias={-0.0001}
              shadow-normalBias={0.025}
            />
            {selection.accessories.lamp && (
              <pointLight
                position={[-0.72, 1.25, -0.35]}
                intensity={2.0}
                color="#ffcf70"
                distance={4}
              />
            )}
          </>
        ) : (
          <>
            <ambientLight intensity={0.55} color="#ffffff" />
            <directionalLight
              position={[-3, 5, 4]}
              intensity={2.8}
              color="#fff1dd"
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-bias={-0.0001}
              shadow-normalBias={0.025}
            />
            {selection.accessories.lamp && (
              <pointLight
                position={[-0.72, 1.25, -0.35]}
                intensity={1.2}
                color="#ffe5a3"
                distance={3}
              />
            )}
          </>
        )}

        <Environment resolution={128}>
          <Lightformer
            intensity={ambience === "night" ? 0.6 : 2.5}
            position={[-4, 4, 2]}
            scale={[5, 5, 1]}
            color={ambience === "sunset" ? "#ff8844" : "#ffffff"}
          />
          <Lightformer
            intensity={ambience === "night" ? 0.3 : 1.2}
            position={[3, 3, 1]}
            scale={[4, 4, 1]}
          />
        </Environment>

        <Suspense fallback={null}>
          <Room ambience={ambience} />

          {/* Desk Model */}
          <Furniture
            file={desk.variant === "classic" ? "oak-desk" : "steel-desk"}
            dimensions={[1.85, 0.75, 0.88]}
            position={[0, 0, -0.32]}
          />

          {/* Chair Model */}
          <Furniture
            file={chair.variant === "ergo" ? "office-chair" : "lounge-chair"}
            height={chair.variant === "ergo" ? 1.16 : 1.02}
            position={[0.15, 0, 0.74]}
            rotation={[0, Math.PI - 0.3, 0]}
          />

          {/* Keyboard & Mouse Details */}
          <DesktopDetails ambience={ambience} />

          {/* Monitors */}
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

          {/* Optional Accessories */}
          {selection.accessories.lamp && (
            <Furniture
              file="lamp"
              height={0.42}
              position={[-0.72, 0.75, -0.35]}
              rotation={[0, 0.65, 0]}
            />
          )}

          {selection.accessories.plant && (
            <Furniture
              file="plant"
              height={1.22}
              position={[-1.43, 0, -0.7]}
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
            <group position={[1.65, 0, -0.65]}>
              <RoundedBox
                args={[0.55, 0.72, 0.48]}
                radius={0.02}
                position={[0, 0.36, 0]}
                castShadow
              >
                <meshStandardMaterial color="#8c7560" />
              </RoundedBox>
              <Furniture file="coffee" height={0.35} position={[0, 0.72, 0]} />
            </group>
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
            <group position={[-2.2, 1.05, -1.75]} rotation={[0, 0.3, -0.14]}>
              <mesh scale={[0.3, 1, 0.045]} castShadow>
                <sphereGeometry args={[1, 48, 48]} />
                <meshStandardMaterial color="#f0e2cd" roughness={0.28} />
              </mesh>
              <mesh position={[0, 0, 0.047]} scale={[0.012, 0.98, 0.003]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#825c45" />
              </mesh>
            </group>
          )}

          {/* Interactive 3D Hotspot Pins (from the Challenge Wireframe Sketch) */}
          {showHotspots && onToggleAccessory && (
            <group>
              {/* Monitor Hotspot */}
              <Hotspot
                position={[0, 1.38, -0.47]}
                label={
                  selection.monitorCount === 0
                    ? "+ Add Monitor!"
                    : `Monitors (${selection.monitorCount})`
                }
                active={selection.monitorCount > 0}
                onClick={() => onIncrementMonitor && onIncrementMonitor()}
              />

              {/* Lamp Hotspot */}
              <Hotspot
                position={[-0.72, 1.15, -0.35]}
                label={selection.accessories.lamp ? "Desk Lamp" : "+ Add Lamp!"}
                active={selection.accessories.lamp}
                onClick={() => onToggleAccessory("lamp")}
              />

              {/* Plant Hotspot */}
              <Hotspot
                position={[-1.43, 1.25, -0.7]}
                label={selection.accessories.plant ? "Monstera" : "+ Place a Plant!"}
                active={selection.accessories.plant}
                onClick={() => onToggleAccessory("plant")}
              />

              {/* Coffee Station Hotspot */}
              <Hotspot
                position={[1.65, 1.1, -0.65]}
                label={
                  selection.accessories.coffeeMachine
                    ? "Espresso Bar"
                    : "+ Coffee Station"
                }
                active={selection.accessories.coffeeMachine}
                onClick={() => onToggleAccessory("coffeeMachine")}
              />

              {/* Surfboard Hotspot */}
              <Hotspot
                position={[-2.2, 1.7, -1.75]}
                label={
                  selection.accessories.surfboard
                    ? "Surfboard"
                    : "+ Add Surfboard"
                }
                active={selection.accessories.surfboard}
                onClick={() => onToggleAccessory("surfboard")}
              />

              {/* City Scooter Hotspot */}
              <Hotspot
                position={[-2, 1.0, 1.9]}
                label={
                  selection.accessories.motorcycle
                    ? "City Scooter"
                    : "+ Add Motorcycle"
                }
                active={selection.accessories.motorcycle}
                onClick={() => onToggleAccessory("motorcycle")}
              />

              {/* Relax Zone / Bean Bag Hotspot */}
              <Hotspot
                position={[2, 0.85, 1.3]}
                label={
                  selection.accessories.beanBag
                    ? "Lounge Seat"
                    : "+ Add Bean Bag"
                }
                active={selection.accessories.beanBag}
                onClick={() => onToggleAccessory("beanBag")}
              />

              {/* Tool Shelf Hotspot */}
              <Hotspot
                position={[1.8, 1.7, -1.65]}
                label={
                  selection.accessories.toolShelf
                    ? "Oak Bookcase"
                    : "+ Add Tool Shelf"
                }
                active={selection.accessories.toolShelf}
                onClick={() => onToggleAccessory("toolShelf")}
              />
            </group>
          )}

          <ContactShadows
            key={`${desk.id}-${chair.id}-${Object.values(selection.accessories).join("")}-${selection.monitorCount}`}
            position={[0, 0.014, 0]}
            opacity={ambience === "night" ? 0.35 : 0.25}
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
          maxDistance={8.5}
          minPolarAngle={0.4}
          maxPolarAngle={Math.PI / 2.15}
          minAzimuthAngle={-0.75}
          maxAzimuthAngle={1.15}
          target={cameraConfig.target as [number, number, number]}
        />
      </Canvas>
    </SceneBoundary>
  );
}
