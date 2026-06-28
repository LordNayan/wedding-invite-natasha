"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface GalleryItem {
  src: string;
  caption: string;
}

export default function StoryCarousel({ items }: { items: readonly GalleryItem[] }) {
  const [slots, setSlots] = useState<[number, number]>([0, 0]);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [target, setTarget] = useState(0);       // dots — updates immediately
  const [captionIdx, setCaptionIdx] = useState(0); // caption — updates when image is ready
  const [inView, setInView] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hintShownRef = useRef(false);

  const activeSlotRef = useRef<0 | 1>(0);
  const targetRef = useRef(0);
  const inViewRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Tracks the in-flight preload so stale loads can be cancelled
  const preloadRef = useRef<HTMLImageElement | null>(null);

  function changeSlide(newIndex: number) {
    const nextSlot: 0 | 1 = activeSlotRef.current === 0 ? 1 : 0;
    targetRef.current = newIndex;
    setTarget(newIndex); // immediate dot feedback

    // Cancel any previous in-flight preload
    if (preloadRef.current) preloadRef.current.onload = null;

    const img = new Image();
    preloadRef.current = img;
    img.onload = () => {
      if (preloadRef.current !== img) return; // stale — a newer navigation happened
      preloadRef.current = null;
      // Only NOW update the slot src and activate — image is guaranteed loaded, no flash
      setSlots((prev) => {
        const updated: [number, number] = [prev[0], prev[1]];
        updated[nextSlot] = newIndex;
        return updated;
      });
      activeSlotRef.current = nextSlot;
      setActiveSlot(nextSlot);
      setCaptionIdx(newIndex); // caption syncs with visible image
    };
    img.src = items[newIndex].src;
  }

  const next = useCallback(() => {
    setShowHint(false);
    changeSlide((targetRef.current + 1) % items.length);
  }, [items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  function restartTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (inViewRef.current) timerRef.current = setInterval(next, 5000);
  }

  useEffect(() => {
    inViewRef.current = inView;
    if (inView) {
      restartTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView, next]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cancel preload on unmount
  useEffect(() => () => { if (preloadRef.current) preloadRef.current.onload = null; }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && !hintShownRef.current) {
          hintShownRef.current = true;
          setShowHint(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function goTo(newIndex: number) {
    if (newIndex === targetRef.current) return;
    setShowHint(false);
    changeSlide(newIndex);
    restartTimer();
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      setShowHint(false);
      goTo(delta < 0
        ? (targetRef.current + 1) % items.length
        : (targetRef.current - 1 + items.length) % items.length
      );
    }
    touchStartX.current = null;
  }

  return (
    <div className="carousel" ref={containerRef}>
      <div
        className={`carousel__slide ${showHint ? "carousel__slide--nudge" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {([0, 1] as const).map((slot) => (
          <img
            key={slot}
            src={items[slots[slot]].src}
            alt={items[slots[slot]].caption}
            className={`carousel__img ${slot === activeSlot ? "carousel__img--active" : ""}`}
          />
        ))}
        <span className="story__caption">{items[captionIdx].caption}</span>

        <div className={`carousel__hint ${showHint ? "carousel__hint--visible" : ""}`}>
          <span className="carousel__hint-arrow">‹</span>
          <span>swipe</span>
          <span className="carousel__hint-arrow">›</span>
        </div>
      </div>

      <div className="carousel__dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot ${i === target ? "carousel__dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .carousel {
          width: 100%;
          max-width: 420px;
          margin: 2rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        .carousel__slide {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 2px;
          outline: 1px solid rgba(185, 146, 78, 0.5);
          outline-offset: 6px;
          box-shadow:
            0 0 0 7px rgba(247, 241, 230, 0.9),
            0 0 0 8px rgba(185, 146, 78, 0.3),
            0 24px 60px rgba(67, 56, 42, 0.22);
        }
        .carousel__slide--nudge {
          animation: nudge 0.9s ease 0.4s both;
        }
        @keyframes nudge {
          0%   { transform: translateX(0); }
          25%  { transform: translateX(-14px); }
          55%  { transform: translateX(9px); }
          80%  { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .carousel__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          z-index: 0;
          transition: opacity 0.7s ease;
        }
        .carousel__img--active {
          opacity: 1;
          z-index: 1;
        }
        .story__caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 2rem 1.25rem 1rem;
          background: linear-gradient(transparent, rgba(28, 21, 12, 0.65));
          color: #f6ecd7;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          font-style: italic;
          text-align: center;
        }
        .carousel__hint {
          position: absolute;
          bottom: 3.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(20, 14, 6, 0.52);
          color: rgba(246, 236, 215, 0.92);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.32rem 0.85rem;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          white-space: nowrap;
        }
        .carousel__hint--visible {
          opacity: 1;
        }
        .carousel__hint-arrow {
          font-size: 1rem;
          line-height: 1;
          opacity: 0.75;
        }
        .carousel__dots {
          display: flex;
          gap: 0.6rem;
          align-items: center;
        }
        .carousel__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          background: rgba(185, 146, 78, 0.3);
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .carousel__dot--active {
          background: #b9924e;
          transform: scale(1.5);
        }
      `}</style>
    </div>
  );
}
