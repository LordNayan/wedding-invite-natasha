import { siteConfig as c } from "@/site.config";
import Reveal from "@/components/Reveal";
import Envelope from "@/components/Envelope";
import Countdown from "@/components/Countdown";
import Rsvp from "@/components/Rsvp";
import StoryCarousel from "@/components/StoryCarousel";
import MusicPlayer from "@/components/MusicPlayer";
import ScratchCard from "@/components/ScratchCard";
import SectionNav from "@/components/SectionNav";
import ScrollCue from "@/components/ScrollCue";

const bg = (src: string) => ({ backgroundImage: `url('${src}')` });

export default function Home() {
  return (
    <main>
      <Envelope />
      <MusicPlayer />
      <SectionNav />
      <ScrollCue />

      {/* ---------------- HERO ---------------- */}
      <section id="s-hero" className="section hero">
        <div className="section-bg" style={bg(c.hero.backgroundImage)} />
        <div className="section-inner">
          <Reveal>
            <img className="hero__monogram" src={c.couple.monogramImageGanesh} alt={c.couple.monogramText} />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="hero__name script">{c.couple.scriptName}</h1>
          </Reveal>
          <Reveal delay={220}>
            <div className="heart">♥</div>
            <p className="eyebrow hero__kicker">{c.hero.kicker}</p>
            <div className="heart">♥</div>
          </Reveal>
          <Reveal delay={320}>
            <div className="divider">{c.hero.saveTheDate}</div>
            <ScratchCard>
              <p className="hero__date script" dangerouslySetInnerHTML={{ __html: c.hero.dateLine.replace(/(\d+)(th|st|nd|rd)/g, '$1<sup>$2</sup>') }} />
            </ScratchCard>
            <p className="eyebrow hero__loc">{c.hero.location}</p>
            <a className="rsvp__directions" href={c.rsvp.jmdDirectionsUrl} target="_blank" rel="noopener noreferrer">
              📍 {c.rsvp.directionsLabel}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COUNTDOWN ---------------- */}
      <section id="s-countdown" className="section countdown">
        <div className="section-inner">
          <Reveal>
            <p className="ornament">⤙ {c.countdown.heading} ⤚</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="countdown__clock">
              <Countdown />
            </div>
          </Reveal>
          <Reveal delay={250}>
            <p className="countdown__foot">❦ {c.countdown.footnote} ❦</p>
            <div className="heart" style={{ marginTop: "1.5rem" }}>♥</div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- INVITATION ---------------- */}
      <section id="s-invitation" className="section invitation">
        <div className="section-bg" style={bg(c.families.backgroundImage)} />
        <div className="section-inner">
          <Reveal>
            <p className="ornament">⤙ ❦ ⤚</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="invitation__salutation script">With immense joy and gratitude,</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="invitation__rule" />
            <h2 className="invitation__family">The Pradhan Family</h2>
            <div className="invitation__rule" />
          </Reveal>
          <Reveal delay={300}>
            <p className="invitation__body">
              cordially invites you to celebrate the wedding of their beloved daughter{" "}
              <em>Natasha</em> as she embarks on this beautiful journey of love,
              togetherness, and lifelong companionship.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p className="invitation__blessing">
              Your gracious presence and blessings will make this occasion even more special.
            </p>
            <div className="heart" style={{ marginTop: "2rem" }}>♥</div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAMILIES ---------------- */}
      <section id="s-families" className="section">
        <div className="section-bg" style={bg(c.families.backgroundImage)} />
        <div className="section-inner">
          <Reveal>
            <p className="script families__tagline">{c.families.tagline}</p>
            <p className="ornament">❦ ♥ ❦</p>
            <h2 className="section-title">{c.families.heading}</h2>
            <p className="ornament">⤙ ❦ ⤚</p>
          </Reveal>

          <div className="families__grid">
            <Reveal className="family-card" delay={80}>
              <h3 className="family-card__name script">{c.families.bride.name}</h3>
              <span className="family-card__star">✦</span>
              <p className="family-card__rel">{c.families.bride.relationLabel}</p>
              <p className="family-card__parents">{c.families.bride.parents}</p>
              <p className="family-card__rel">{c.families.bride.siblingLabel}</p>
              <p className="family-card__sib">{c.families.bride.siblings.join(" & ")}</p>
              
            </Reveal>

            <Reveal className="families__sep" delay={140}>
              <img src={c.couple.monogramImage} alt={c.couple.monogramText} />
            </Reveal>

            <Reveal className="family-card" delay={200}>
              <h3 className="family-card__name script">{c.families.groom.name}</h3>
              <span className="family-card__star">✦</span>
              <p className="family-card__rel">{c.families.groom.relationLabel}</p>
              <p className="family-card__parents">{c.families.groom.parents}</p>
              <p className="family-card__rel">{c.families.groom.siblingLabel}</p>
              <p className="family-card__sib">{c.families.groom.siblings.join(" & ")}</p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p className="families__closing">
              {c.families.closing.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <div className="heart">♥</div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- OUR STORY ---------------- */}
      <section id="s-story" className="section">
        <div className="section-bg" style={bg(c.story.backgroundImage)} />
        <div className="section-inner">
          <Reveal>
            <h2 className="section-title">{c.story.heading}</h2>
            <p className="ornament">❦ ❦</p>
            <p className="story__intro">{c.story.intro}</p>
          </Reveal>

          <StoryCarousel items={c.story.gallery} />

          <Reveal delay={120}>
            <p className="story__quote">&rdquo;{c.story.quote}&rdquo;</p>
            <div className="heart">♥</div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SCHEDULE OVERVIEW ---------------- */}
      <section id="s-schedule" className="section">
        <div className="section-bg" style={bg(c.schedule.backgroundImage)} />
        <div className="section-inner">
          <Reveal>
            <p className="ornament">❦</p>
            <h2 className="section-title">{c.schedule.heading}</h2>
            <div className="heart">♥</div>
            <p className="eyebrow schedule__sub">{c.schedule.subheading}</p>
          </Reveal>
          <div className="schedule__cards">
            {c.schedule.cards.map((card, i) => (
              <Reveal className="schedule__card-wrap" delay={i * 90} key={i}>
                <div className="schedule__card">
                  <img src={card.image} alt={card.title} loading="lazy" />
                </div>
                {"locationUrl" in card && (
                  <a className="schedule__location" href={card.locationUrl} target="_blank" rel="noopener noreferrer">
                    📍 {c.rsvp.directionsLabel}
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GIFTS ---------------- */}
      <section id="s-gifts" className="section gifts">
        <div className="section-inner">
          <Reveal>
            <p className="ornament">⤙ ❦ ⤚</p>
            <h2 className="gifts__heading script">Your Presence is Our Present</h2>
            <div className="gifts__rule" />
          </Reveal>
          <Reveal delay={140}>
            <p className="gifts__body">
              The only gift we could ever ask for is <em>you</em> — your warm smiles,
              your joyful laughter, and the memory of celebrating this day surrounded
              by the people we love most.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="gifts__note">
              Please, no gifts or envelopes — simply come with an open heart
              and bless us with your love. That is more than enough.
            </p>
            <div className="heart" style={{ marginTop: "2rem" }}>♥</div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- RSVP ---------------- */}
      <section id="s-rsvp" className="section rsvp">
        <div className="section-bg" style={bg(c.rsvp.backgroundImage)} />
        <div className="section-inner">
          <Reveal delay={120}>
            <p className="rsvp__footer script">{c.rsvp.footer}</p>
            <div className="heart">♥</div>
            <p className="countdown__thanks">{c.countdown.thankYou}</p>
            <div className="heart">♥</div>
            <a className="rsvp__directions" href={c.rsvp.jmdDirectionsUrl} target="_blank" rel="noopener noreferrer">
              📍 {c.rsvp.directionsLabel}
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
