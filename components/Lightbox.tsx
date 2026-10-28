"use client";

import { Icon } from "./Icon";
import { allPhotos } from "@/lib/data";

type LightboxProps = {
  open: boolean;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ open, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = allPhotos[index] ?? allPhotos[0];
  const isFirst = index === 0;
  const isLast = index === allPhotos.length - 1;

  return (
    <div
      className={`lightbox ${open ? "is-open" : ""}`}
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      aria-hidden={!open}
    >
      <header className="lb-header">
        <button
          className="lb-grid icon-button"
          type="button"
          aria-label="Show all photos"
          id="lbGrid"
          onClick={onClose}
        >
          <span>
            <Icon name="grid" />
          </span>
        </button>
        <div className="lb-title" id="lbTitle">
          {photo.room}
        </div>
        <div className="lb-right">
          <span className="lb-counter" id="lbCounter">
            {index + 1} of {allPhotos.length}
          </span>
          <button
            className="lb-close icon-button"
            type="button"
            aria-label="Close"
            id="lbClose"
            onClick={onClose}
            data-autofocus
          >
            <span>
              <Icon name="close" />
            </span>
          </button>
        </div>
      </header>

      <button
        className="lb-arrow lb-prev icon-button"
        type="button"
        aria-label="Previous"
        id="lbPrev"
        disabled={isFirst}
        onClick={onPrev}
      >
        <span>
          <Icon name="arrowLeft" />
        </span>
      </button>

      <div className="lb-stage" id="lbStage">
        <img
          key={photo.src}
          className="lb-image lb-image-anim"
          src={photo.src}
          alt={photo.room}
        />
      </div>

      <button
        className="lb-arrow lb-next icon-button"
        type="button"
        aria-label="Next"
        id="lbNext"
        disabled={isLast}
        onClick={onNext}
      >
        <span>
          <Icon name="arrowRight" />
        </span>
      </button>
    </div>
  );
}
