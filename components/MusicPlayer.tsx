"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

const { music } = siteConfig;

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // Start on first user interaction if autoplay is enabled
  useEffect(() => {
    if (!music.enabled || !music.autoplay) return;

    function start() {
      setTimeout(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.5;
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }, 2000);
    }

    document.addEventListener("click", start, { once: true });
    document.addEventListener("touchstart", start, { once: true });

    return () => {
      document.removeEventListener("click", start);
      document.removeEventListener("touchstart", start);
    };
  }, []);

  // Pause when tab is hidden, resume when it comes back
  useEffect(() => {
    function onVisibilityChange() {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (playing) {
        audio.play().catch(() => {});
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [playing]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  if (!music.enabled) return null;

  return (
    <>
      <audio ref={audioRef} src={music.src} loop={music.loop} />

      <button
        className={`music-btn ${playing ? "music-btn--playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <span className="music-btn__icon">♫</span>
      </button>

      <style jsx>{`
        .music-btn {
          position: fixed;
          bottom: 1.75rem;
          right: 1.75rem;
          z-index: 50;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: rgba(251, 247, 239, 0.88);
          border: 1px solid rgba(185, 146, 78, 0.45);
          color: var(--gold-deep);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(67, 56, 42, 0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .music-btn:hover {
          background: rgba(203, 171, 111, 0.25);
          border-color: var(--gold);
          box-shadow: 0 6px 24px rgba(67, 56, 42, 0.24);
        }
        .music-btn__icon {
          font-size: 1.15rem;
          line-height: 1;
          display: block;
          transition: opacity 0.3s ease;
        }
        /* Slow spin when playing */
        .music-btn--playing .music-btn__icon {
          animation: spin 8s linear infinite;
        }
        /* Muted / stopped state */
        .music-btn:not(.music-btn--playing) .music-btn__icon {
          opacity: 0.45;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
