"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "s-hero",       label: "Save the Date" },
  { id: "s-countdown",  label: "Countdown" },
  { id: "s-invitation", label: "Invitation" },
  { id: "s-families",   label: "Families" },
  { id: "s-story",      label: "Our Story" },
  { id: "s-schedule",   label: "Schedule" },
  { id: "s-rsvp",       label: "RSVP" },
];

export default function SectionNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((sec, i) => {
      const el = document.getElementById(sec.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        // fires when a section crosses the centre line of the viewport
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const isLast = active === SECTIONS.length - 1;

  return (
    <nav className="snav" aria-label="Page sections">

      {/* dot pill */}
      <div className="snav__pill">
        {SECTIONS.map((sec, i) => (
          <button
            key={sec.id}
            className={`snav__dot${i === active ? " snav__dot--active" : ""}`}
            onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" })}
            aria-label={sec.label}
          >
            <span className="snav__tip">{sec.label}</span>
          </button>
        ))}
      </div>

      {/* scroll cue below — fades out on last section */}
      <div className="snav__scroll" style={{ opacity: isLast ? 0 : 1 }}>
        <div className="snav__wire">
          <div className="snav__bead" />
        </div>
        <svg className="snav__chevron" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style jsx>{`
        /* ── outer wrapper ── */
        .snav {
          position: fixed;
          right: 1rem;
          top: 50%;
          transform: translateY(-100%);
          z-index: 60;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        /* ── frosted glass pill ── */
        .snav__pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 11px;
          padding: 11px 7px;
          background: rgba(20, 14, 8, 0.32);
          backdrop-filter: blur(12px) saturate(1.2);
          -webkit-backdrop-filter: blur(12px) saturate(1.2);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.22);
        }

        /* ── each dot ── */
        .snav__dot {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 248, 220, 0.55);
          background: rgba(255, 248, 220, 0.18);
          padding: 0;
          cursor: pointer;
          transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .snav__dot:hover {
          transform: scale(1.5);
          border-color: rgba(255, 248, 220, 0.9);
          background: rgba(255, 248, 220, 0.35);
        }

        .snav__dot--active {
          background: #ffffff;
          border-color: #ffffff;
          transform: scale(1.45);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25), 0 0 12px rgba(255, 255, 255, 0.7);
        }

        /* ── label tooltip ── */
        .snav__tip {
          position: absolute;
          right: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%);
          white-space: nowrap;
          font-family: var(--font-display);
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 248, 220, 0.95);
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .snav__dot:hover .snav__tip { opacity: 1; }

        /* ── scroll cue ── */
        .snav__scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          color: rgba(30, 20, 10, 0.85);
          transition: opacity 0.5s ease;
          filter:
            drop-shadow(0 0 3px rgba(255, 255, 255, 0.9))
            drop-shadow(0 1px 5px rgba(0, 0, 0, 0.45));
        }

        .snav__wire {
          width: 1.5px;
          height: 32px;
          background: rgba(30, 20, 10, 0.18);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .snav__bead {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to bottom, transparent, rgba(30, 20, 10, 0.9), transparent);
          animation: snav-bead 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .snav__chevron {
          width: 10px;
          animation: snav-chevron 1.8s ease-in-out infinite;
        }

        @keyframes snav-bead {
          0%   { top: -100%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { top: 120%; opacity: 0; }
        }

        @keyframes snav-chevron {
          0%, 100% { transform: translateY(0);   opacity: 0.5; }
          50%       { transform: translateY(4px); opacity: 1;   }
        }

        /* ── mobile ── */
        @media (max-width: 480px) {
          .snav { right: 0.6rem; }
          .snav__pill { padding: 9px 6px; gap: 9px; }
          .snav__dot { width: 6px; height: 6px; }
          .snav__tip { display: none; }
        }
      `}</style>
    </nav>
  );
}
