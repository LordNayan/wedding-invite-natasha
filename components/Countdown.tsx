"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/site.config";

const { countdown } = siteConfig;

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d / 3_600_000) % 24),
    mins: Math.floor((d / 60_000) % 60),
    secs: Math.floor((d / 1000) % 60),
  };
}

export default function Countdown() {
  const target = new Date(countdown.targetDate).getTime();
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { v: t.days, l: "DAYS" },
    { v: t.hours, l: "HRS" },
    { v: t.mins, l: "MINS" },
    { v: t.secs, l: "SECS" },
  ];

  return (
    <div className="cd">
      {units.map((u, i) => (
        <div className="cd__cell" key={u.l}>
          <span className="cd__num">{String(u.v).padStart(2, "0")}</span>
          <span className="cd__label">{u.l}</span>
          {i < units.length - 1 && <span className="cd__sep">:</span>}
        </div>
      ))}

      <style jsx>{`
        .cd {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: clamp(0.6rem, 4vw, 2.5rem);
          margin: 0 auto;
        }
        .cd__cell {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: clamp(56px, 16vw, 96px);
        }
        .cd__num {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.2rem, 9vw, 4rem);
          color: var(--gold-deep);
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .cd__label {
          margin-top: 0.6rem;
          letter-spacing: 0.3em;
          font-size: clamp(0.6rem, 1.6vw, 0.78rem);
          color: var(--ink-soft);
          padding-left: 0.3em;
        }
        .cd__sep {
          position: absolute;
          right: calc(-1 * clamp(0.45rem, 2.4vw, 1.5rem));
          top: clamp(0.4rem, 2vw, 0.7rem);
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 6vw, 2.6rem);
          color: var(--gold-soft);
        }
      `}</style>
    </div>
  );
}
