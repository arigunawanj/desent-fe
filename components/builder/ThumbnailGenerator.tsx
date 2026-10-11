"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type Callback = (map: Record<string, string>) => void;
const listeners = new Set<Callback>();
let cachedThumbnails: Record<string, string> = {};

export function subscribeThumbnails(cb: Callback) {
  listeners.add(cb);
  if (Object.keys(cachedThumbnails).length > 0) cb(cachedThumbnails);
  return () => {
    listeners.delete(cb);
  };
}

export function ThumbnailGenerator() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const width = 480;
    const height = 360;
    const canvas = document.createElement("canvas");
    canvas.width = width * 1.5;
    canvas.height = height * 1.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(1.5);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);

    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff8ee, 2.6);
    key.position.set(4, 5, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xd4e2f0, 1.2);
    fill.position.set(-4, 3, -3);
    scene.add(fill);

    const loader = new GLTFLoader();

    function renderSnapshot(obj: THREE.Object3D, camPos: [number, number, number], targetY = 0.45) {
      const box = new THREE.Box3().setFromObject(obj);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = 1.0 / Math.max(size.x, size.y, size.z);
      obj.scale.set(scale, scale, scale);
      obj.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
      scene.add(obj);

      camera.position.set(...camPos);
      camera.lookAt(0, targetY, 0);

      renderer.render(scene, camera);
      const dataUrl = canvas.toDataURL("image/png");

      scene.remove(obj);
      return dataUrl;
    }

    async function generateAll() {
      const results: Record<string, string> = {};

      // 1. Surfboard
      {
        const group = new THREE.Group();
        const board = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.24, 1.3, 16, 32),
          new THREE.MeshStandardMaterial({ color: 0xf4ede1, roughness: 0.28, metalness: 0.04 })
        );
        board.scale.set(1, 1, 0.16);
        group.add(board);

        const str = new THREE.Mesh(
          new THREE.PlaneGeometry(0.015, 1.7),
          new THREE.MeshStandardMaterial({ color: 0x8b5a36, roughness: 0.65 })
        );
        str.position.z = 0.04;
        group.add(str);

        group.rotation.set(0.05, 0.25, -0.08);
        results["surfboard"] = renderSnapshot(group, [0.4, 0.85, 2.5], 0.45);
      }

      // 2. Coffee Machine (Espresso Station)
      {
        const group = new THREE.Group();
        const body = new THREE.Mesh(
          new RoundedBoxGeometry(0.38, 0.42, 0.38, 4, 0.02),
          new THREE.MeshStandardMaterial({ color: 0xdce0e4, metalness: 0.92, roughness: 0.16 })
        );
        body.position.y = 0.21;
        group.add(body);

        const rail = new THREE.Mesh(
          new THREE.BoxGeometry(0.34, 0.015, 0.01),
          new THREE.MeshStandardMaterial({ color: 0xc8cccf, metalness: 0.95, roughness: 0.12 })
        );
        rail.position.set(0, 0.43, 0.17);
        group.add(rail);

        const gh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.045, 0.05, 0.06, 20),
          new THREE.MeshStandardMaterial({ color: 0xe6e9ec, metalness: 0.95, roughness: 0.08 })
        );
        gh.rotation.x = Math.PI / 2;
        gh.position.set(-0.06, 0.24, 0.21);
        group.add(gh);

        const pfGroup = new THREE.Group();
        pfGroup.position.set(-0.06, 0.21, 0.24);
        pfGroup.rotation.y = 0.45;
        const handle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.012, 0.01, 0.14, 16),
          new THREE.MeshStandardMaterial({ color: 0x222220, roughness: 0.65 })
        );
        handle.rotation.x = Math.PI / 2;
        handle.position.z = 0.09;
        pfGroup.add(handle);
        group.add(pfGroup);

        const gauge = new THREE.Mesh(
          new THREE.CircleGeometry(0.03, 24),
          new THREE.MeshStandardMaterial({ color: 0xf6f6f6, roughness: 0.3 })
        );
        gauge.position.set(0.09, 0.3, 0.192);
        group.add(gauge);

        const wand = new THREE.Mesh(
          new THREE.CylinderGeometry(0.006, 0.006, 0.16, 12),
          new THREE.MeshStandardMaterial({ color: 0xd8dcde, metalness: 0.95, roughness: 0.1 })
        );
        wand.rotation.set(0.3, 0, -0.3);
        wand.position.set(-0.16, 0.26, 0.16);
        group.add(wand);

        const tray = new THREE.Mesh(
          new RoundedBoxGeometry(0.38, 0.045, 0.18, 4, 0.01),
          new THREE.MeshStandardMaterial({ color: 0xc8cbce, metalness: 0.9, roughness: 0.2 })
        );
        tray.position.set(0, 0.025, 0.2);
        group.add(tray);

        const cup1 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.026, 0.045, 16),
          new THREE.MeshStandardMaterial({ color: 0xfaf8f5, roughness: 0.2 })
        );
        cup1.position.set(-0.08, 0.445, 0.02);
        group.add(cup1);
        const cup2 = cup1.clone();
        cup2.position.set(0.08, 0.445, 0.04);
        group.add(cup2);

        group.rotation.y = -0.35;
        results["coffee"] = renderSnapshot(group, [1.1, 0.8, 1.4], 0.4);
      }

      // 3. Task Lamp
      {
        const group = new THREE.Group();
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.125, 0.025, 24),
          new THREE.MeshStandardMaterial({ color: 0x242422, roughness: 0.45, metalness: 0.4 })
        );
        group.add(base);

        const arm1 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.011, 0.011, 0.45, 16),
          new THREE.MeshStandardMaterial({ color: 0x1f1f1d, roughness: 0.4, metalness: 0.5 })
        );
        arm1.rotation.x = 0.35;
        arm1.position.set(0, 0.22, 0.05);
        group.add(arm1);

        const arm2 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.011, 0.011, 0.35, 16),
          new THREE.MeshStandardMaterial({ color: 0x1f1f1d, roughness: 0.4, metalness: 0.5 })
        );
        arm2.rotation.set(-0.5, 0, -0.35);
        arm2.position.set(0.09, 0.54, 0.04);
        group.add(arm2);

        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(0.12, 0.2, 24, 1, true),
          new THREE.MeshStandardMaterial({ color: 0x242422, roughness: 0.45, metalness: 0.3, side: THREE.DoubleSide })
        );
        cone.rotation.set(0.5, -0.2, 0.7);
        cone.position.set(0.2, 0.65, -0.06);
        group.add(cone);

        group.rotation.y = -0.4;
        results["lamp"] = renderSnapshot(group, [1.3, 0.9, 1.8], 0.45);
      }

      // GLTF models: scooter, shelf, lounge-chair
      const gltfModels: { name: string; file: string; rotY: number; camPos: [number, number, number]; targetY: number }[] = [
        { name: "scooter", file: "scooter", rotY: -0.45, camPos: [2.3, 1.1, 2.7], targetY: 0.42 },
        { name: "shelf", file: "shelf", rotY: -0.4, camPos: [2.0, 1.25, 2.4], targetY: 0.5 },
        { name: "lounge-chair", file: "lounge-chair", rotY: -0.55, camPos: [1.7, 1.0, 2.0], targetY: 0.42 },
      ];

      for (const m of gltfModels) {
        try {
          const gltf = await loader.loadAsync(`/models/${m.file}.glb`);
          const obj = gltf.scene;
          obj.rotation.y = m.rotY;
          results[m.name] = renderSnapshot(obj, m.camPos, m.targetY);
        } catch (e) {
          console.warn("Failed rendering 3D model", m.file, e);
        }
      }

      // Save snapshots to server /public/products
      for (const [name, dataUrl] of Object.entries(results)) {
        try {
          fetch("/api/save-thumbnail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, dataUrl }),
          }).catch(() => {});
        } catch {}
      }

      cachedThumbnails = results;
      listeners.forEach((cb) => cb(results));
      renderer.dispose();
    }

    generateAll();
  }, []);

  return null;
}
