/**
 * =============================================================================
 *  WEDDING INVITATION — SITE CONFIG
 * =============================================================================
 *  This is the ONLY file you need to edit to customise the invitation.
 *  Change any text, image path, link or date below and the whole site updates.
 *
 *  IMAGES:
 *   - All images live in /public/assets/.  Reference them as "/assets/<file>".
 *   - To pull the exact images/video from the original site, run:
 *         npm run fetch-assets
 *     (downloads everything into /public/assets automatically).
 *   - To use your own, just drop files into /public/assets and update the paths.
 * =============================================================================
 */

export const siteConfig = {
  /* ---------- Browser tab / social sharing ---------- */
  meta: {
    title: "Natasha & Nayan— Our Forever Begins Together",
    description:
      "Celebrate the wedding of Natasha & Nayan — 9th January, 2027, Kottayam, Kerala.",
    // OG-specific overrides (used for WhatsApp / iMessage / social previews)
    ogTitle: "You're Invited 💍 Natasha & Nayan's Wedding",
    ogDescription:
      "Join us as we celebrate the wedding of Natasha & Nayan — 24th–25th October, 2026 · JMD Resort, Mandav.",
    ogImage: "/assets/og-image.webp",
    siteName: "Natasha & Nayan",
  },

  /* ---------- Global identity ---------- */
  couple: {
    // Used in the big script heading on the hero (rendered as one word).
    scriptName: "Natasha Weds Nayan",
    monogramText: "N&N",
    monogramImageGanesh: "/assets/ganesh.webp",
    monogramImage: "/assets/monogram.png",
    initials: "N | N",
  },

  /* ---------- Background music ---------- */
  music: {
    enabled: true,
    src: "/assets/bg-music.mp3",
    loop: true,
    // Starts automatically on the first user interaction (tap/click)
    autoplay: true,
  },

  /* ---------- Envelope intro overlay ---------- */
  intro: {
    enabled: true,
    video: "/assets/envelope-intro.mp4",
    poster: "/assets/hero-bg.webp",
    tapLabel: "TAP TO OPEN",
  },

  /* ---------- Hero ---------- */
  hero: {
    backgroundImage: "/assets/hero-bg.webp",
    kicker: "WE ARE GETTING MARRIED",
    saveTheDate: "SAVE THE DATE",
    dateLine: "24th-25th October, 2026",
    location: "JMD Resort, Mandav",
  },

  /* ---------- Countdown ---------- */
  countdown: {
    // ISO date/time of the wedding (local). Drives the live countdown.
    targetDate: "2026-10-24T15:00:00+05:30",
    heading: "THE COUNTDOWN BEGINS",
    footnote: "Until our forever begins",
    thankYou: "Looking forward to your gracious prescence. See you super soon!",
  },

  /* ---------- Families ---------- */
  families: {
    backgroundImage: "/assets/families-bg.webp",
    tagline: "Two families. One promise.",
    heading: "Introducing the families",
    closing: ["Raised with love,", "united by destiny,", "together forever"],
    groom: {
      name: "Nayan",
      relationLabel: "S/o",
      parents: "Bhajan & Sapna Lakhwani",
      siblingLabel: "Grandson of",
      siblings: ["Lt. Shri Tikamdas", "Lt. Shrimati Rajkumari Lakhwani"],
    },
    bride: {
      name: "Natasha",
      relationLabel: "D/o",
      parents: "Bhushan & Payal Pradhan",
      siblingLabel: "Granddaughter of",
      siblings: ["Lt. Shri Rajendra", "Lt. Shrimati Rajeshree Pradhan"],
    },
  },

  /* ---------- Our Story ---------- */
  story: {
    backgroundImage: "/assets/story-bg.webp",
    heading: "OUR STORY",
    intro: "Some chapters are written by destiny.",
    quote: "From that first conversation to a lifetime of adventures",
    // Gallery images (any number). caption shows as alt + optional overlay.
    gallery: [
      { src: "/assets/story-1.webp", caption: "Every journey led us here" },
      { src: "/assets/story-2.webp", caption: "From craziness to forever" },
      { src: "/assets/story-3.webp", caption: "We wrote our story." },
      { src: "/assets/story-4.webp", caption: "One trip at a time" },
      { src: "/assets/story-5.webp", caption: "Surprise Birthday Bash became a ritual" },
      { src: "/assets/story-6.webp", caption: "Doing everything felt special together" },
      { src: "/assets/story-7.webp", caption: "Our best adventure begins now" },
    ],
  },

  /* ---------- Schedule of events (overview + cards) ---------- */
  schedule: {
    backgroundImage: "/assets/schedule-bg.webp",
    heading: "SCHEDULE OF EVENTS",
    subheading: "A CELEBRATION OF TRADITION, LOVE & FAMILY",
    // Each card is a pre-designed image from the original deck.
    cards: [
      { image: "/assets/mehendi.webp", title: "Mehendi", locationUrl: "https://maps.app.goo.gl/otmow8TfYVacjQXx6" },
      { image: "/assets/haldi.webp", title: "Haldi" },
      { image: "/assets/cocktail.webp", title: "Cocktail" },
      { image: "/assets/baraat.webp", title: "Baraat" },
      { image: "/assets/phere.webp", title: "Phere" },
      { image: "/assets/sufi.webp", title: "Sufi Night" },
      { image: "/assets/after-party.webp", title: "After Party" },
    ],
  },

  /* ---------- Wedding ceremony ---------- */
  wedding: {
    backgroundImage: "/assets/wedding-bg.webp",
    contentImage: "/assets/wedding-content.webp",
    eyebrow: "SCHEDULE OF EVENTS",
    subheading: "A CELEBRATION OF LOVE, FAITH & FOREVER",
    dateLabel: "24th-25th October, 2026",
    title: "Wedding",
    time: "3:00 PM",
    venueLabel: "Venue:",
    venueName: "St. Joseph's Church Pushpagiri Kottayam",
    venueMapUrl: "https://maps.app.goo.gl/F1RsPp6k4SX69nKL9?g_st=iw",
    verse: ["Therefore what God has joined together,", "let no one separate."],
    verseRef: "MATTHEW 19:6",
  },

  /* ---------- Reception ---------- */
  reception: {
    backgroundImage: "/assets/reception-bg.webp",
    contentImage: "/assets/reception-content.webp",
    eyebrow: "SCHEDULE OF EVENTS",
    subheading: "A CELEBRATION OF LOVE, FAITH & FOREVER",
  },

  /* ---------- RSVP ---------- */
  rsvp: {
    backgroundImage: "/assets/rsvp-bg.webp",
    shapeImage: "/assets/rsvp-shape.webp",
    heading: "RSVP",
    nameLabel: "FULL NAME",
    namePlaceholder: "Your name",
    attendingQuestion: "WILL YOU BE ATTENDING?",
    acceptLabel: "Joyfully Accept",
    declineLabel: "Regretfully Decline",
    submitLabel: "SEND RSVP",
    // Shown after a (client-only) submit. No data leaves the browser.
    successMessage: "Thank you! Your response has been noted with love.",
    footer: "Celebrate this new chapter with us.",
    directionsLabel: "GET DIRECTIONS",
    jmdDirectionsUrl: "https://maps.app.goo.gl/WPWAA1GNrsKendJ17",
  },
} as const;

export type SiteConfig = typeof siteConfig;
