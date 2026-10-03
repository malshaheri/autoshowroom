"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Interior360ViewerProps = {
  panorama: string;
  alt?: string;
};

export function Interior360Viewer({
  panorama,
}: Interior360ViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1100,
    );

    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      container.clientWidth,
      container.clientHeight,
    );

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(
      500,
      80,
      40,
    );

    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(
      panorama,
      () => {
        texture.colorSpace = THREE.SRGBColorSpace;
      },
    );

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    const sphere = new THREE.Mesh(
      geometry,
      material,
    );

    scene.add(sphere);

    let longitude = 0;
    let latitude = 0;

    let isDragging = false;
    let previousX = 0;
    let previousY = 0;

    let fieldOfView = 75;

    const updateCamera = () => {
      latitude = Math.max(
        -85,
        Math.min(85, latitude),
      );

      const phi =
        THREE.MathUtils.degToRad(90 - latitude);

      const theta =
        THREE.MathUtils.degToRad(longitude);

      const target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta),
      );

      camera.lookAt(target);
    };

    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      isDragging = true;
      previousX = event.clientX;
      previousY = event.clientY;

      renderer.domElement.setPointerCapture(
        event.pointerId,
      );

      renderer.domElement.style.cursor =
        "grabbing";
    };

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      if (!isDragging) {
        return;
      }

      const deltaX =
        event.clientX - previousX;

      const deltaY =
        event.clientY - previousY;

      longitude -= deltaX * 0.12;
      latitude += deltaY * 0.12;

      previousX = event.clientX;
      previousY = event.clientY;

      updateCamera();
    };

    const handlePointerUp = (
      event: PointerEvent,
    ) => {
      isDragging = false;

      if (
        renderer.domElement.hasPointerCapture(
          event.pointerId,
        )
      ) {
        renderer.domElement.releasePointerCapture(
          event.pointerId,
        );
      }

      renderer.domElement.style.cursor = "grab";
    };

    const handleWheel = (
      event: WheelEvent,
    ) => {
      event.preventDefault();

      fieldOfView += event.deltaY * 0.03;

      fieldOfView = Math.max(
        35,
        Math.min(90, fieldOfView),
      );

      camera.fov = fieldOfView;
      camera.updateProjectionMatrix();
    };

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.touchAction = "none";

    renderer.domElement.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    renderer.domElement.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    renderer.domElement.addEventListener(
      "pointerup",
      handlePointerUp,
    );

    renderer.domElement.addEventListener(
      "pointercancel",
      handlePointerUp,
    );

    renderer.domElement.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    window.addEventListener(
      "resize",
      handleResize,
    );

    updateCamera();

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId =
        requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener(
        "resize",
        handleResize,
      );

      renderer.domElement.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      renderer.domElement.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      renderer.domElement.removeEventListener(
        "pointerup",
        handlePointerUp,
      );

      renderer.domElement.removeEventListener(
        "pointercancel",
        handlePointerUp,
      );

      renderer.domElement.removeEventListener(
        "wheel",
        handleWheel,
      );

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      container.innerHTML = "";
    };
  }, [panorama]);

  return (
    <div
      ref={containerRef}
      className="interior360Viewer"
      aria-label="360 interior panorama"
    />
  );
}