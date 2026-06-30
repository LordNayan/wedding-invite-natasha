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
    </div>
  );
}
