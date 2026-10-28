"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { allPhotos, tour } from "@/lib/data";

type PhotoTourProps = {
  open: boolean;
  startIndex: number;
  saved: boolean;
  onClose: () => void;
  onPhotoClick: (index: number) => void;
  onShare: () => void;
  onSave: () => void;
};

const photoIndex = new Map(allPhotos.map((photo, index) => [photo.src, index]));

export function PhotoTour({
  open,
  startIndex,
  saved,
  onClose,
  onPhotoClick,
  onShare,
  onSave,
}: PhotoTourProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const roomRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const scroll = scrollRef.current;
    const room = roomRefs.current[startIndex];
    if (!scroll || !room) return;
    const id = window.setTimeout(() => {
      if (startIndex === 0) {
        scroll.scrollTo({ top: 0, behavior: "auto" });
        return;
      }
      const top =
        room.getBoundingClientRect().top -
        scroll.getBoundingClientRect().top +
        scroll.scrollTop -
        24;
      scroll.scrollTo({ top, behavior: "auto" });
    }, 40);
    return () => window.clearTimeout(id);
  }, [open, startIndex]);

  function goToRoom(index: number) {
    const scroll = scrollRef.current;
    const room = roomRefs.current[index];
    if (!scroll || !room) return;
    const top =
      room.getBoundingClientRect().top -
      scroll.getBoundingClientRect().top +
      scroll.scrollTop -
      24;
    scroll.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div
      className={`tour ${open ? "is-open" : ""}`}
      id="photoTour"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      aria-hidden={!open}
    >
      <header className="tour-header" id="tourBar">
        <button
          className="tour-back icon-button"
          type="button"
          aria-label="Back"
          onClick={onClose}
          data-autofocus
        >
          <span>
            <Icon name="back" />
          </span>
        </button>
        <h2 className="tour-title">Photo tour</h2>
        <div className="tour-actions">
          <button className="icon-button" type="button" aria-label="Share" onClick={onShare}>
            <span>
              <Icon name="share" />
            </span>
          </button>
          <button
            className={`icon-button ${saved ? "is-saved" : ""}`}
            type="button"
            aria-label="Save"
            onClick={onSave}
          >
            <span>
              <Icon name="heart" />
            </span>
          </button>
        </div>
      </header>

      <div className="tour-scroll" id="tourScroll" ref={scrollRef}>
        <div className="tour-inner">
          <nav className="tour-nav" id="tourNav" aria-label="Photo categories">
            {tour.cats.map((cat, index) => (
              <button
                className="tour-cat"
                type="button"
                aria-label={cat.label}
                key={cat.label}
                onClick={() => goToRoom(index)}
              >
                <img loading="lazy" alt="" src={cat.thumb} />
                <span className="small-label">{cat.label}</span>
              </button>
            ))}
          </nav>

          <div className="tour-rooms" id="tourRooms">
            {tour.rooms.map((room, roomIndex) => (
              <section
                className="tour-room"
                id={`tour-room-${roomIndex}`}
                key={room.name}
                ref={(node) => {
                  roomRefs.current[roomIndex] = node;
                }}
              >
                <div className="tour-room-head">
                  <div className="tour-room-title">{room.name}</div>
                  {room.amenities ? (
                    <div className="tour-room-meta">{room.amenities}</div>
                  ) : null}
                </div>
                <div className="tour-mosaic">
                  {room.groups.map((group, groupIndex) => (
                    <div
                      className={`tour-row ${
                        group.cols === 2 ? "tour-row-half" : "tour-row-full"
                      }`}
                      key={groupIndex}
                    >
                      {group.imgs.map((img) => {
                        const index = photoIndex.get(img.src) ?? 0;
                        return (
                          <button
                            className="tour-photo"
                            type="button"
                            data-idx={index}
                            aria-label={`${room.name} image ${index + 1}`}
                            key={img.src}
                            onClick={() => onPhotoClick(index)}
                          >
                            <img loading="lazy" alt={img.alt} src={img.src} />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
