"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Mesh, Vector3 } from "three";

type Vector = [number, number, number];

/** Normalize source assets to meters, centered on their footprint with feet at y=0. */
export function Furniture({ file, height, dimensions, position = [0, 0, 0], rotation = [0, 0, 0] }: { file: string; height?: number; dimensions?: Vector; position?: Vector; rotation?: Vector }) {
  const { scene } = useGLTF(`/models/${file}.glb`);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse(object => {
      if (object instanceof Mesh) { object.castShadow = true; object.receiveShadow = true; }
    });
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const factor = height ? height / size.y : 1;
    clone.position.set(-center.x, -box.min.y, -center.z);
    return { clone, scale: dimensions ? dimensions.map((value, i) => value / size.getComponent(i)) as Vector : [factor, factor, factor] as Vector };
  }, [scene, height, dimensions]);
  return <group position={position} rotation={rotation} scale={model.scale}><primitive object={model.clone} /></group>;
}
