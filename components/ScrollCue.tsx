"use client";
import { useEffect, useState } from "react";

export default function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY < 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="sc"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
      aria-hidden="true"
    >
      <span className="sc__text">Scroll Down</span>
      <span className="sc__arrow">↓</span>

      <style jsx>{`
        .sc {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(67, 56, 42, 0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(185, 146, 78, 0.55);
          border-radius: 999px;
          padding: 0.45rem 1.1rem 0.45rem 1.25rem;
          pointer-events: none;
          white-space: nowrap;
        }

        .sc__text {
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink);
        }

        .sc__arrow {
          font-size: 0.85rem;
          color: #d4a535;
          animation: sc-bounce 1.6s ease-in-out infinite;
          line-height: 1;
        }

        @keyframes sc-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(3px); }
        }

        @media (max-width: 480px) {
          .sc { bottom: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
