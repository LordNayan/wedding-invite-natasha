"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

const { intro, couple } = siteConfig;

export default function Envelope() {
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock scroll while envelope is visible; unlock after fade-out completes
  useEffect(() => {
    if (!intro.enabled) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => { document.body.style.overflow = ""; }, 900);
    return () => clearTimeout(t);
  }, [open]);

  if (!intro.enabled) return null;

  function handleOpen() {
    if (playing) return;
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div
      className={`envelope ${open ? "envelope--open" : ""}`}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label={intro.tapLabel}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpen();
      }}
    >
      <video
        ref={videoRef}
        className={`envelope__video ${playing ? "envelope__video--visible" : ""}`}
        src={intro.video}
        poster={intro.poster}
        muted
        playsInline
        onEnded={() => setOpen(true)}
      />

      <div className={`envelope__content ${playing ? "envelope__content--hide" : ""}`}>
        <div className="envelope__monogram script">{couple.monogramText}</div>
        <span className="envelope__tap">{intro.tapLabel}</span>
        <span className="envelope__chevron">⌄</span>
      </div>

      <style jsx>{`
        .envelope {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
          cursor: pointer;
          background: #1c150c;
          transition: opacity 0.9s ease, visibility 0.9s ease;
        }
        .envelope--open {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .envelope__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1.6s ease;
          transition-delay: 0.3s;
        }
        .envelope__video--visible {
          opacity: 1;
        }

        .envelope__content {
          position: relative;
          text-align: center;
          color: #f6ecd7;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          animation: floaty 3s ease-in-out infinite;
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .envelope__content--hide {
          opacity: 0;
          transform: translateY(-16px);
        }
        .envelope__monogram {
          font-family: "Cormorant Garamond", "Georgia", serif;
          font-size: clamp(3.5rem, 14vw, 7rem);
          color: #e9cf9a;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
        }
        .envelope__tap {
          letter-spacing: 0.45em;
          font-size: clamp(0.8rem, 2vw, 1rem);
          padding-left: 0.45em;
          font-weight: 600;
        }
        .envelope__chevron {
          font-size: 1.6rem;
          line-height: 0.4;
          opacity: 0.85;
        }
        @keyframes floaty {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
      `}</style>
    </div>
  );
}
