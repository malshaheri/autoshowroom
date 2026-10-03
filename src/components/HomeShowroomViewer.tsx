"use client";

import { useRef, useState } from "react";
import { Interior360Viewer } from "@/components/Interior360Viewer";

type HomeShowroomViewerProps = {
  images: string[];
  interiorPanorama?: string;
  locale: "de" | "en";
};

export function HomeShowroomViewer({
  images,
  interiorPanorama,
  locale,
}: HomeShowroomViewerProps) {
  const [mode, setMode] = useState<"exterior" | "interior">("exterior");
  const [frame, setFrame] = useState(0);

  const dragging = useRef(false);
  const lastX = useRef(0);

  const previous = () => {
    setFrame((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const next = () => {
    setFrame((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const target = event.target as HTMLElement;

    if (target.closest("button")) return;
    if (mode !== "exterior") return;

    dragging.current = true;
    lastX.current = event.clientX;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!dragging.current || mode !== "exterior") return;

    const delta = event.clientX - lastX.current;

    if (Math.abs(delta) < 5) return;

    const steps = Math.trunc(delta / 5);

    setFrame((current) => {
      let nextFrame =
        (current - steps) % images.length;

      if (nextFrame < 0) {
        nextFrame += images.length;
      }

      return nextFrame;
    });

    lastX.current += steps * 5;
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    dragging.current = false;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }
  };

  const exteriorLabel =
    locale === "de" ? "Außenansicht" : "Exterior";

  const interiorLabel =
    locale === "de" ? "Innenraum" : "Interior";

  const dragLabel =
    locale === "de"
      ? "Nach links oder rechts ziehen"
      : "Drag left or right";

  return (
    <div
      className="viewerCard homeInteractiveViewer"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {mode === "exterior" ? (
        <>
          <img
            className="home360Image"
            src={images[frame]}
            alt="360 vehicle exterior"
            draggable={false}
          />

          <button
            className="viewerArrow leftArrow"
            type="button"
            aria-label="Previous angle"
            onClick={(event) => {
              event.stopPropagation();
              previous();
            }}
          >
            ‹
          </button>

          <button
            className="viewerArrow rightArrow"
            type="button"
            aria-label="Next angle"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
          >
            ›
          </button>

          <div className="viewerBadge">
            <strong>360°</strong>
            <span>{dragLabel}</span>
          </div>
        </>
      ) : interiorPanorama ? (
        <div className="homeInteriorViewer">
          <Interior360Viewer
            panorama={interiorPanorama}
          />
        </div>
      ) : null}

      <div className="viewerTabs">
        <button
          className={
            mode === "exterior" ? "active" : ""
          }
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setMode("exterior");
          }}
        >
          {exteriorLabel}
        </button>

        <button
          className={
            mode === "interior" ? "active" : ""
          }
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setMode("interior");
          }}
        >
          {interiorLabel}
        </button>
      </div>
    </div>
  );
}