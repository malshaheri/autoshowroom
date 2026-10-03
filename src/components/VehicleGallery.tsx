"use client";

import { useState } from "react";

type VehicleGalleryProps = {
  images: string[];
  vehicleName: string;
};

export function VehicleGallery({
  images,
  vehicleName,
}: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeImage = images[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <>
      <div className="premiumGallery">
        <div className="premiumGalleryMain">
          <button
            className="galleryArrow galleryArrowLeft"
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            className="galleryImageButton"
            type="button"
            onClick={() => setIsFullscreen(true)}
          >
            <img
              src={activeImage}
              alt={`${vehicleName} gallery ${activeIndex + 1}`}
            />
          </button>

          <button
            className="galleryArrow galleryArrowRight"
            type="button"
            onClick={showNext}
            aria-label="Next image"
          >
            ›
          </button>

          <div className="galleryCounter">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        <div className="galleryThumbnails">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`galleryThumbnail ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={image}
                alt={`${vehicleName} thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>

      {isFullscreen && (
        <div className="galleryLightbox">
          <button
            className="galleryClose"
            type="button"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close gallery"
          >
            ×
          </button>

          <button
            className="galleryLightboxArrow galleryLightboxArrowLeft"
            type="button"
            onClick={showPrevious}
          >
            ‹
          </button>

          <img
            src={activeImage}
            alt={`${vehicleName} fullscreen ${activeIndex + 1}`}
          />

          <button
            className="galleryLightboxArrow galleryLightboxArrowRight"
            type="button"
            onClick={showNext}
          >
            ›
          </button>

          <div className="galleryLightboxCounter">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}