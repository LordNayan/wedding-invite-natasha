"use client";

import { useState } from "react";
import { siteConfig } from "@/site.config";

const { rsvp, couple } = siteConfig;

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"accept" | "decline" | null>(null);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !attending) return;
    // Static, no backend: response stays in the browser.
    setSent(true);
  }

  return (
    <div className="rsvp-card">
      <img className="rsvp-card__shape" src={rsvp.shapeImage} alt="" aria-hidden />
      <div className="rsvp-card__body">
        <div className="rsvp-card__initials script">{couple.initials}</div>
        <h2 className="section-title">{rsvp.heading}</h2>
        <div className="heart" style={{ margin: "0.5rem 0 1.5rem" }}>
          ♥
        </div>

        {sent ? (
          <p className="rsvp-card__success">{rsvp.successMessage}</p>
        ) : (
          <form onSubmit={submit} className="rsvp-form">
            <label className="rsvp-form__label" htmlFor="rsvp-name">
              {rsvp.nameLabel}
            </label>
            <input
              id="rsvp-name"
              className="rsvp-form__input"
              type="text"
              value={name}
              placeholder={rsvp.namePlaceholder}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <span className="rsvp-form__label">{rsvp.attendingQuestion}</span>
            <div className="rsvp-form__choices">
              <button
                type="button"
                className={`rsvp-choice ${attending === "accept" ? "is-active" : ""}`}
                onClick={() => setAttending("accept")}
              >
                {rsvp.acceptLabel}
              </button>
              <button
                type="button"
                className={`rsvp-choice ${attending === "decline" ? "is-active" : ""}`}
                onClick={() => setAttending("decline")}
              >
                {rsvp.declineLabel}
              </button>
            </div>

            <button type="submit" className="rsvp-form__submit">
              {rsvp.submitLabel}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .rsvp-card {
          position: relative;
          max-width: 520px;
          margin: 0 auto;
          padding: clamp(2rem, 6vw, 3.5rem) clamp(1.5rem, 5vw, 3rem);
          background: rgba(255, 253, 248, 0.92);
          border: 1px solid var(--gold-soft);
          border-radius: 4px;
          box-shadow: 0 24px 60px rgba(67, 56, 42, 0.18);
        }
        .rsvp-card__shape {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.08;
          pointer-events: none;
        }
        .rsvp-card__body {
          position: relative;
          z-index: 1;
        }
        .rsvp-card__initials {
          font-size: clamp(2rem, 7vw, 3rem);
          margin-bottom: 0.5rem;
        }
        .rsvp-card__success {
          font-size: 1.2rem;
          color: var(--gold-deep);
          padding: 1.5rem 0;
          font-style: italic;
        }
        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          text-align: left;
        }
        .rsvp-form__label {
          letter-spacing: 0.28em;
          font-size: 0.72rem;
          color: var(--ink-soft);
          text-transform: uppercase;
          margin-top: 0.5rem;
        }
        .rsvp-form__input {
          font-family: var(--font-body);
          font-size: 1rem;
          padding: 0.75rem 0.5rem;
          border: none;
          border-bottom: 1px solid var(--gold-soft);
          background: transparent;
          color: var(--ink);
          outline: none;
        }
        .rsvp-form__input:focus {
          border-bottom-color: var(--gold-deep);
        }
        .rsvp-form__choices {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .rsvp-choice {
          flex: 1;
          min-width: 140px;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 0.95rem;
          padding: 0.7rem 1rem;
          border: 1px solid var(--gold-soft);
          background: transparent;
          color: var(--ink);
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .rsvp-choice:hover {
          border-color: var(--gold-deep);
        }
        .rsvp-choice.is-active {
          background: var(--gold);
          border-color: var(--gold);
          color: #fff;
        }
        .rsvp-form__submit {
          margin-top: 1.25rem;
          cursor: pointer;
          letter-spacing: 0.28em;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.9rem 1rem;
          padding-left: calc(1rem + 0.28em);
          border: none;
          background: var(--ink);
          color: var(--cream);
          border-radius: 2px;
          transition: background 0.25s ease;
        }
        .rsvp-form__submit:hover {
          background: var(--gold-deep);
        }
      `}</style>
    </div>
  );
}
