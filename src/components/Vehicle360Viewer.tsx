"use client";

import { useRef, useState } from "react";

type Vehicle360ViewerProps = {
  images: string[];
  alt: string;
  hint: string;
};

export function Vehicle360Viewer({
  images,
  alt,
  hint,
}: Vehicle360ViewerProps) {
  const [frame, setFrame] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  if (images.length === 0) {
    return null;
  }

  const sensitivity = 5;

  const moveFrames = (steps: number) => {
    setFrame((current) => {
      const total = images.length;
      let next = (current + steps) % total;

      if (next < 0) {
        next += total;
      }

      return next;
    });
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    dragging.current = true;
    lastX.current = event.clientX;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging.current) return;

    const delta = event.clientX - lastX.current;

    if (Math.abs(delta) < sensitivity) return;

    const steps = Math.trunc(delta / sensitivity);

    moveFrames(-steps);

    lastX.current += steps * sensitivity;
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    dragging.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className="vehicle360Viewer"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={() => {
        dragging.current = false;
      }}
    >
      <img
        src={images[frame]}
        alt={`${alt} 360 view ${frame + 1}`}
        draggable={false}
      />

      <div className="vehicle360Hint">
        <strong>360°</strong>
        <span>{hint}</span>
      </div>

      <div className="vehicle360Progress">
        {frame + 1} / {images.length}
      </div>
    </div>
  );
}