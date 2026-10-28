"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { Icon } from "./Icon";
import { PhotoTour } from "./PhotoTour";
import { Lightbox } from "./Lightbox";
import { AmenitiesModal } from "./AmenitiesModal";
import {
  allPhotos,
  cohosts,
  description,
  heroImages,
  highlights,
  hostFacts,
  listing,
  previewAmenities,
  ratingBars,
  ratingCategories,
  reviewChips,
  reviews,
  similarStays,
  sleepRooms,
  thingsToKnow,
  tour,
} from "@/lib/data";

type Overlay = "tour" | "lightbox" | "amenities" | null;
type SectionId = "photos" | "amenities" | "reviews" | "location";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function monthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let day = 1; day <= total; day += 1) cells.push(day);
  return cells;
}

const heroRoomIndex = heroImages.map((src) => {
  const index = tour.rooms.findIndex((room) =>
    room.groups.some((group) => group.imgs.some((img) => img.src === src)),
  );
  return index < 0 ? 0 : index;
});

export function ListingPage() {
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStart, setTourStart] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);

  const [saved, setSaved] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("photos");
  const [similarPage, setSimilarPage] = useState(1);
  const [toast, setToast] = useState("");

  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const priorOverlayRef = useRef<Overlay>(null);
  const toastTimer = useRef<number | null>(null);
  const simTrackRef = useRef<HTMLDivElement>(null);

  const overlay: Overlay = lightboxOpen
    ? "lightbox"
    : tourOpen
      ? "tour"
      : amenitiesOpen
        ? "amenities"
        : null;

  function showToast(message: string) {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  }

  function openTour(roomIndex = 0) {
    setTourStart(roomIndex);
    setLightboxOpen(false);
    setTourOpen(true);
  }

  function closeTour() {
    setLightboxOpen(false);
    setTourOpen(false);
  }

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  function openAmenities() {
    setAmenitiesOpen(true);
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    const anyOverlay = Boolean(overlay);
    document.body.classList.toggle("overlay-open", anyOverlay);
    return () => document.body.classList.remove("overlay-open");
  }, [overlay]);

  useEffect(() => {
    if (overlay && !priorOverlayRef.current) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
    }
    if (!overlay && priorOverlayRef.current) {
      lastFocusedRef.current?.focus({ preventScroll: true });
    }
    priorOverlayRef.current = overlay;
  }, [overlay]);

  useEffect(() => {
    if (!overlay) return;

    const node = document.getElementById(
      overlay === "lightbox" ? "lightbox" : overlay === "tour" ? "photoTour" : "amenModal",
    );
    if (!node) return;
    const root = node;

    const timer = window.setTimeout(() => {
      const target = root.querySelector<HTMLElement>("[data-autofocus]");
      target?.focus({ preventScroll: true });
    }, 40);

    const getFocusable = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (overlay === "lightbox") {
          setLightboxOpen(false);
        } else if (overlay === "tour") {
          closeTour();
        } else {
          setAmenitiesOpen(false);
        }
        return;
      }

      if (overlay === "lightbox") {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setLightboxIndex((index) => Math.max(0, index - 1));
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          setLightboxIndex((index) => Math.min(allPhotos.length - 1, index + 1));
        }
      }

      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (current === first || !root.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !root.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [overlay]);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("hero");
      const heroGone = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      setStickyVisible(heroGone);

      const ids: SectionId[] = ["photos", "amenities", "reviews", "location"];
      let current: SectionId = "photos";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveSection(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Tab" || event.key.startsWith("Arrow")) {
        document.body.classList.add("kbd");
      }
    }
    function onPointerDown() {
      document.body.classList.remove("kbd");
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const baseMonth = new Date(2026, 9, 1);
  const calendarMonths = [
    { year: baseMonth.getFullYear(), month: baseMonth.getMonth() },
    {
      year: new Date(baseMonth.getFullYear(), baseMonth.getMonth() + 1, 1).getFullYear(),
      month: new Date(baseMonth.getFullYear(), baseMonth.getMonth() + 1, 1).getMonth(),
    },
  ];

  function dayClass(monthIdx: number, day: number | null) {
    if (day === null) return "day empty";
    const classes = ["day"];
    if (monthIdx === 0) {
      if (day === 18) classes.push("range-start");
      else if (day > 18 && day < 23) classes.push("in-range");
      else if (day === 23) classes.push("range-end");
    }
    if (monthIdx === 1 && ([18, 19, 20, 21, 22, 23, 24, 29, 30].includes(day))) {
      classes.push("past");
    }
    return classes.join(" ");
  }

  function scrollToSimilar(direction: 1 | -1) {
    const track = simTrackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".similar-card");
    const gap = 20;
    const step = card ? (card.offsetWidth + gap) * 3 * direction : track.clientWidth * direction;
    track.scrollBy({ left: step, behavior: "smooth" });
    window.setTimeout(() => {
      setSimilarPage(track.scrollLeft > 20 ? 2 : 1);
    }, 450);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <div
        className={`section-nav ${stickyVisible ? "is-visible" : ""}`}
        id="stickyNav"
        aria-hidden={!stickyVisible}
      >
        <div className="section-nav-inner">
          <nav className="section-links" aria-label="Listing sections">
            {(
              [
                ["photos", "Photos"],
                ["amenities", "Amenities"],
                ["reviews", "Reviews"],
                ["location", "Location"],
              ] as [SectionId, string][]
            ).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "is-active" : ""}
                onClick={() => setActiveSection(id)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="section-nav-right">
            <div className="nav-price">
              <div>
                <span className="nav-price-amount">{listing.price}</span>{" "}
                <span className="nav-price-unit">for {listing.nights} nights</span>
              </div>
              <div className="nav-rating">
                <span className="star-mask" aria-hidden="true" /> {listing.rating} ·{" "}
                <span>{listing.reviewCount} reviews</span>
              </div>
            </div>
            <button
              className="btn-reserve btn-reserve-sm"
              type="button"
              onClick={() => showToast("You won't be charged yet")}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>

      <main id="main">
        <div className="container">
          <section className="title-row" id="photos">
            <h1 className="listing-title">{listing.title}</h1>
            <div className="title-actions">
              <button
                className="text-action"
                type="button"
                id="shareBtn"
                onClick={async () => {
                  try {
                    await navigator.clipboard?.writeText(window.location.href);
                  } catch {
                    /* clipboard access can be unavailable */
                  }
                  showToast("Share options");
                }}
              >
                <span className="action-icon">
                  <Icon name="share" />
                </span>
                <span className="action-label">Share</span>
              </button>
              <button
                className={`text-action ${saved ? "is-saved" : ""}`}
                type="button"
                id="saveBtn"
                onClick={() => setSaved((value) => !value)}
              >
                <span className="action-icon">
                  <Icon name="heart" />
                </span>
                <span className="action-label">{saved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </section>

          <section className="hero" id="hero" aria-label="Photos of this place">
            <div className="hero-grid" id="heroGrid">
              {heroImages.map((src, index) => (
                <button
                  className="hero-photo"
                  type="button"
                  key={src}
                  aria-label={`${listing.title} image ${index + 1}`}
                  onClick={() => openTour(heroRoomIndex[index])}
                >
                  <img
                    src={src}
                    alt=""
                    decoding="async"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </button>
              ))}
            </div>
            <button
              className="show-all"
              type="button"
              id="showAllPhotos"
              onClick={() => openTour(0)}
            >
              <span className="show-all-icon">
                <Icon name="grid" />
              </span>
              Show all photos
            </button>
          </section>

          <div className="content-grid">
            <div className="content-main" id="contentLeft">
              <div className="summary">
                <h2>{listing.subtitle}</h2>
                <div className="summary-meta">{listing.details}</div>
              </div>

              <div className="badge-card">
                <div className="laurel-wrap">
                  <span className="laurel">
                    <Icon name="laurel" />
                  </span>
                  <span className="badge-text">
                    Guest
                    <br />
                    favourite
                  </span>
                  <span className="laurel laurel-flipped">
                    <Icon name="laurel" />
                  </span>
                </div>
                <div className="badge-desc">
                  One of the most loved homes on Airbnb, according to guests
                </div>
                <div className="rating-summary">
                  <div className="rating-block">
                    <div className="rating-num">{listing.rating}</div>
                    <div className="stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index}>
                          <Icon name="star" />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="vline" />
                  <div className="rating-block">
                    <div className="rating-num">{listing.reviewCount}</div>
                    <div className="small-label">Reviews</div>
                  </div>
                </div>
              </div>

              <div className="host-row">
                <img className="host-avatar" src="/assets/images/avatars/host.jpeg" alt="" />
                <div>
                  <div className="host-name">Hosted by {listing.hostName}</div>
                  <div className="meta">{listing.hostSince}</div>
                </div>
              </div>

              <div className="highlights" style={{ borderTop: "1px solid var(--line-soft)", paddingTop: 32 }}>
                {highlights.map((item) => (
                  <div className="highlight" key={item.title}>
                    <div className="highlight-icon">
                      <Icon name={item.icon} />
                    </div>
                    <div className="highlight-body">
                      <div className="item-title">{item.title}</div>
                      <div className="item-sub">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="description" style={{ borderTop: "1px solid var(--line-soft)" }}>
                <div className="translation-note">
                  <span>
                    Some info has been automatically translated. <a href="#">Show original</a>
                  </span>
                </div>
                <p id="descText" className={`desc-text ${descriptionOpen ? "" : "desc-clamped"}`}>
                  {description}
                </p>
                <button
                  className="show-more"
                  id="descMore"
                  type="button"
                  onClick={() => setDescriptionOpen((open) => !open)}
                >
                  {descriptionOpen ? "Show less" : "Show more"}
                  <span className={`chevron ${descriptionOpen ? "chevron-up" : ""}`}>
                    <Icon name="chevronRight" />
                  </span>
                </button>
              </div>

              <div className="section">
                <h2 className="section-title">Where you&apos;ll sleep</h2>
                <div className="sleep-grid">
                  {sleepRooms.map((room) => (
                    <div className="sleep-card" key={room.title}>
                      <img src={room.image} alt="" />
                      <div className="item-title">{room.title}</div>
                      <div className="item-sub">{room.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section" id="amenities">
                <h2 className="section-title">What this place offers</h2>
                <div className="amenities-grid">
                  {previewAmenities.map((item) => (
                    <div
                      className={`amenity ${item.unavailable ? "unavailable" : ""}`}
                      key={item.label}
                    >
                      <span className="ico">
                        <Icon name={item.icon} />
                      </span>
                      <span className="label">{item.label}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-outline" id="showAmen" type="button" onClick={openAmenities}>
                  Show all 50 amenities
                </button>
              </div>

              <div className="section">
                <div>
                  <div className="calendar-head">
                    <div className="item-title">{listing.nights} nights in Candolim</div>
                    <div className="item-sub">
                      {listing.checkIn} - {listing.checkOut}
                    </div>
                  </div>
                  <div className="calendar-grid">
                    <div className="month-nav">
                      <button type="button" aria-label="Previous month">
                        <span className="ico">
                          <Icon name="chevronLeft" />
                        </span>
                      </button>
                      <button type="button" aria-label="Next month">
                        <span className="ico">
                          <Icon name="chevronRight" />
                        </span>
                      </button>
                    </div>
                    {calendarMonths.map((month, monthIdx) => (
                      <div className="month" key={`${month.year}-${month.month}`}>
                        <div className="month-title">
                          {MONTH_NAMES[month.month]} {month.year}
                        </div>
                        <div className="weekdays">
                          {WEEKDAYS.map((day, index) => (
                            <span key={`${day}-${index}`}>{day}</span>
                          ))}
                        </div>
                        <div className="days">
                          {monthDays(month.year, month.month).map((day, index) => (
                            <div className={dayClass(monthIdx, day)} key={index}>
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="calendar-foot">
                    <span className="car-icon" aria-hidden="true">
                      <Icon name="car" />
                    </span>
                    <button className="clear-dates" type="button">
                      Clear dates
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="booking-col">
              <div className="booking-sticky" id="bookingSticky">
                <div className="promo">
                  <img
                    className="promo-icon"
                    src="/assets/images/ui/discount.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  <div className="promo-text">
                    Get 10% off your next stay.
                    <br />
                    <a href="#">Terms apply</a>
                  </div>
                  <button
                    className="btn-claim"
                    type="button"
                    onClick={() => showToast("Offer claimed. 10% off your next stay.")}
                  >
                    Claim
                  </button>
                </div>

                <div className="booking-card">
                  <div className="price-line">
                    <span className="price-big">{listing.price}</span>
                    <span className="price-unit">for {listing.nights} nights</span>
                  </div>
                  <div className="booking-fields">
                    <div className="booking-dates">
                      <div className="field">
                        <div className="field-label">CHECK-IN</div>
                        <div className="field-value">{listing.checkInShort}</div>
                      </div>
                      <div className="field">
                        <div className="field-label">CHECKOUT</div>
                        <div className="field-value">{listing.checkOutShort}</div>
                      </div>
                    </div>
                    <div className="booking-guests">
                      <div>
                        <div className="field-label">GUESTS</div>
                        <div className="field-value">{listing.guests} guests</div>
                      </div>
                      <span className="field-chevron">
                        <Icon name="chevronDown" />
                      </span>
                    </div>
                  </div>
                  <div className="cancel-note">
                    Free cancellation before <b>17 October</b>
                  </div>
                  <button
                    className="btn-reserve reserve-full"
                    id="reserveBtn"
                    type="button"
                    onClick={() => showToast("You won't be charged yet")}
                  >
                    Reserve
                  </button>
                  <div className="no-charge">You won&apos;t be charged yet</div>
                </div>

                <div className="report">
                  <span className="ico">
                    <Icon name="flag" />
                  </span>
                  <a href="#">Report this listing</a>
                </div>
              </div>
            </aside>
          </div>

          <div className="wide-sections" id="wideSections">
            <section className="wide-section" id="reviews">
              <div className="reviews-hero">
                <div className="laurel-score">
                  <img src="/assets/images/ui/laurel-left.png" alt="" />
                  <div className="big-score">{listing.rating}</div>
                  <img src="/assets/images/ui/laurel-right.png" alt="" />
                </div>
                <div className="guest-favourite">Guest favourite</div>
                <div className="guest-favourite-desc">
                  This home is a guest favourite based on ratings, reviews and reliability
                </div>
                <button
                  className="how-reviews"
                  type="button"
                  onClick={() => {
                    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  How reviews work
                </button>
              </div>

              <div className="rating-grid">
                <div className="rating-col">
                  <div className="rating-col-title">Overall rating</div>
                  <div className="rating-bars">
                    {ratingBars.map((bar) => (
                      <div className="bar-row" key={bar.label}>
                        <span className="bar-label">{bar.label}</span>
                        <div className="bar-track">
                          <div className="bar-fill" style={{ width: `${bar.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {ratingCategories.map((category) => (
                  <div className="rating-col" key={category.label}>
                    <div className="rating-col-title">{category.label}</div>
                    <div className="rating-col-score">{category.score}</div>
                    <div className="ico">
                      <Icon name={category.icon} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="chips">
                {reviewChips.map((chip) => (
                  <button className="chip" type="button" key={chip.label}>
                    <img className="chip-icon" src={chip.image} alt="" aria-hidden="true" />
                    {chip.label}
                    <span className="chip-count">{chip.count}</span>
                  </button>
                ))}
              </div>

              <div className="reviews-grid">
                {reviews.map((review, index) => {
                  const isExpanded = Boolean(expandedReviews[index]);
                  return (
                    <div className="review" key={review.name}>
                      <div className="review-head">
                        {review.avatar ? (
                          <img className="review-avatar" src={review.avatar} alt="" />
                        ) : (
                          <div
                            className="review-initial"
                            style={{ background: review.initialBg, color: review.initialColor }}
                          >
                            {review.initial}
                          </div>
                        )}
                        <div>
                          <div className="review-name">{review.name}</div>
                          <div className="review-meta">{review.meta}</div>
                        </div>
                      </div>
                      <div className="review-stars">
                        <span className="stars">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <span key={starIndex}>
                              <Icon name="star" />
                            </span>
                          ))}
                        </span>
                        <span>·</span>
                        <span>{review.date}</span>
                      </div>
                      <div className={`review-text ${review.clamp && !isExpanded ? "review-clamped" : ""}`}>
                        {review.text}
                      </div>
                      {review.clamp ? (
                        <button
                          className="review-more"
                          type="button"
                          onClick={() =>
                            setExpandedReviews((current) => ({
                              ...current,
                              [index]: !current[index],
                            }))
                          }
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <button
                className="btn-outline"
                type="button"
                onClick={() => {
                  document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Show all 19 reviews
              </button>
            </section>

            <section className="wide-section" id="location">
              <h2 className="section-title">Where you’ll be</h2>
              <div className="location-name">{listing.location}</div>
              <div className="map">
                <div className="map-bg" />
                <button aria-label="Search" className="map-search" type="button">
                  <span style={{ width: 16, height: 16 }}>
                    <Icon name="search" />
                  </span>
                </button>
                <div className="map-zoom">
                  <button aria-label="Zoom in" type="button">
                    <span className="ico">
                      <Icon name="plus" />
                    </span>
                  </button>
                  <button aria-label="Zoom out" type="button">
                    <span className="ico">
                      <Icon name="minus" />
                    </span>
                  </button>
                </div>
                <div className="map-pin">
                  <Icon name="housePin" />
                </div>
              </div>
              <div className="map-note">Exact location will be provided after booking.</div>
              <div className="subheading">Neighbourhood highlights</div>
              <div className="location-desc">
                Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy
                access to beaches, cafés, and popular attractions.
              </div>
              <button className="show-more" style={{ marginTop: 18 }} type="button">
                Show more
                <span className="chevron">
                  <Icon name="chevronRight" />
                </span>
              </button>
            </section>

            <section className="wide-section">
              <h2 className="section-title">Meet your host</h2>
              <div className="host-grid">
                <div>
                  <div className="host-card">
                    <div className="host-card-main">
                      <div className="host-avatar-wrap">
                        <img src="/assets/images/avatars/host.jpeg" alt="" />
                        <span className="verified">
                          <Icon name="accuracy" />
                        </span>
                      </div>
                      <div className="host-card-name">{listing.hostName}</div>
                      <div className="host-role">Host</div>
                    </div>
                    <div className="host-stats">
                      <div className="host-stat">
                        <div className="rating-num">1,463</div>
                        <div className="small-label">Reviews</div>
                      </div>
                      <div className="host-stat">
                        <div className="rating-num">4.68★</div>
                        <div className="small-label">Rating</div>
                      </div>
                      <div className="host-stat">
                        <div className="rating-num">2</div>
                        <div className="small-label">Years hosting</div>
                      </div>
                    </div>
                  </div>
                  <div className="host-facts">
                    {hostFacts.map((fact) => (
                      <div className="host-fact" key={fact.text}>
                        <span className="ico">
                          <Icon name={fact.icon} />
                        </span>
                        {fact.text}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="subheading">Co-Hosts</div>
                  <div className="cohost-grid">
                    {cohosts.map((cohost) => (
                      <div className="cohost" key={cohost.name}>
                        {"avatar" in cohost && cohost.avatar ? (
                          <img src={cohost.avatar} alt="" />
                        ) : (
                          <div
                            className="cohost-initial"
                            style={{ background: cohost.bg, color: cohost.color }}
                          >
                            {cohost.initial}
                          </div>
                        )}
                        <span>{cohost.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="subheading">Host details</div>
                  <div className="host-details">
                    Response rate: 100%
                    <br />
                    Responds within an hour
                  </div>
                  <button className="btn-message" type="button">
                    Message host
                  </button>
                  <div className="payment-note">
                    <span className="ico">
                      <Icon name="shield" />
                    </span>
                    <span>
                      To help protect your payment, always use Airbnb to send money and communicate
                      with hosts.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="wide-section">
              <h2 className="section-title">Things to know</h2>
              <div className="know-grid">
                {thingsToKnow.map((item) => (
                  <div className="know-col" key={item.title}>
                    <div className="ico">
                      <Icon name={item.icon} />
                    </div>
                    <div className="item-title">{item.title}</div>
                    {item.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    <a className="learn-more" href="#">
                      Learn more
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="wide-section">
              <div className="carousel-head">
                <h2 className="section-title" style={{ margin: 0 }}>
                  More stays nearby
                </h2>
                <div className="carousel-controls">
                  <span className="carousel-counter">{similarPage} / 2</span>
                  <button
                    className="carousel-btn"
                    type="button"
                    aria-label="Previous stays"
                    disabled={similarPage === 1}
                    onClick={() => scrollToSimilar(-1)}
                  >
                    <span className="ico">
                      <Icon name="chevronLeft" />
                    </span>
                  </button>
                  <button
                    className="carousel-btn"
                    type="button"
                    aria-label="Next stays"
                    disabled={similarPage === 2}
                    onClick={() => scrollToSimilar(1)}
                  >
                    <span className="ico">
                      <Icon name="chevronRight" />
                    </span>
                  </button>
                </div>
              </div>
              <div
                className="carousel-track"
                ref={simTrackRef}
                onScroll={(event) => {
                  const left = event.currentTarget.scrollLeft;
                  setSimilarPage(left > 20 ? 2 : 1);
                }}
              >
                {similarStays.map((stay, index) => (
                  <div className="similar-card" key={`${stay.title}-${index}`}>
                    <img src={stay.image} alt="" loading="lazy" />
                    <div className="item-title">{stay.title}</div>
                    <div className="p">
                      {stay.price}
                      {" \u00a0 "}
                      <span className="star">
                        <Icon name="star" />
                      </span>{" "}
                      {stay.rating}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <PhotoTour
        open={tourOpen}
        startIndex={tourStart}
        saved={saved}
        onClose={closeTour}
        onPhotoClick={openLightbox}
        onShare={async () => {
          try {
            await navigator.clipboard?.writeText(window.location.href);
          } catch {
            /* clipboard access can be unavailable */
          }
          showToast("Share options");
        }}
        onSave={() => setSaved((value) => !value)}
      />

      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((index) => Math.max(0, index - 1))}
        onNext={() =>
          setLightboxIndex((index) => Math.min(allPhotos.length - 1, index + 1))
        }
      />

      <AmenitiesModal open={amenitiesOpen} onClose={() => setAmenitiesOpen(false)} />

      <div className={`toast ${toast ? "is-visible" : ""}`} id="toast" role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
