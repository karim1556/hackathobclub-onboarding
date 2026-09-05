import { ClubIcon, type ClubIconName } from '@/components/club-icon';
import { MobileJoinDock, OnboardingForm } from '@/components/join-experience';

type ClubEvent = {
  step: string;
  label: string;
  title: string;
  copy: string;
  tags: string[];
  signal: string;
  next: string;
  tone: string;
  icon: ClubIconName;
};

const events: ClubEvent[] = [
  {
    step: '01',
    label: 'Hands-on workshop',
    title: 'Learn the moves.',
    copy: 'Start with the tools that matter: code, Git, APIs, UI, AI workflows, and the habit of turning “how?” into “done.”',
    tags: ['Live code', 'Zero jargon', 'Build along'],
    signal: 'Skill unlocked',
    next: 'Build sprint',
    tone: 'lime',
    icon: 'brain-circuit',
  },
  {
    step: '02',
    label: 'Team build sprint',
    title: 'Make it real.',
    copy: 'Pick a problem, find your people, and ship a rough first version. You learn faster when the idea has to work outside your head.',
    tags: ['Small teams', 'Real prototype', 'Demo ready'],
    signal: 'Project shipped',
    next: 'Game night',
    tone: 'paper',
    icon: 'code',
  },
  {
    step: '03',
    label: 'Club game night',
    title: 'Play under pressure.',
    copy: 'Speed-code, solve ridiculous constraints, and take on games hosted by clubs, committees, and colleges—with the clock very much alive.',
    tags: ['Team quests', 'Logic chaos', 'Fast feedback'],
    signal: 'Instincts sharpened',
    next: 'Hackathon day',
    tone: 'coral',
    icon: 'gamepad',
  },
  {
    step: '04',
    label: 'The hackathon',
    title: 'Build to win.',
    copy: 'Walk in with a crew, a playbook, and the confidence to pitch. The trophy is the headline; becoming dangerous together is the real result.',
    tags: ['Strategy', 'Storytelling', 'Submission'],
    signal: 'Arena ready',
    next: 'Join the club',
    tone: 'night',
    icon: 'trophy',
  },
];

const takeaways: Array<{
  number: string;
  title: string;
  copy: string;
  icon: ClubIconName;
}> = [
  {
    number: '01',
    title: 'Skills that stick',
    copy: 'Because you used them before the workshop ended.',
    icon: 'zap',
  },
  {
    number: '02',
    title: 'A crew that ships',
    copy: 'Builders, designers, and presenters you can call again.',
    icon: 'users',
  },
  {
    number: '03',
    title: 'A hackathon playbook',
    copy: 'From choosing the idea to surviving the final demo.',
    icon: 'trophy',
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <nav className="nav shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Hackathon Club home">
            <span className="brand-mark">H/C</span>
            <span className="brand-name">Hackathon Club</span>
          </a>

          <span className="nav-mantra">Learn · Build · Compete</span>

          <a className="nav-join" href="#join-gate">
            Join now <ClubIcon name="arrow-up-right" size={17} strokeWidth={1.9} />
          </a>
        </nav>

        <div className="hero-content shell">
          <div className="hero-kicker hero-reveal hero-reveal-1">
            <span className="live-dot" />
            Hackathon Club · Build season
          </div>

          <h1 className="hero-reveal hero-reveal-2">
            Learn it.
            <br />
            Build it.
            <br />
            <em>Win with it.</em>
          </h1>

          <p className="hero-copy hero-reveal hero-reveal-3">
            Hands-on workshops, team games, and the kind of practice that makes
            hackathon day feel familiar.
          </p>

          <div className="hero-actions hero-reveal hero-reveal-4">
            <a className="primary-cta" href="#join-gate">
              Join the club <ClubIcon name="arrow-right" size={19} strokeWidth={2} />
            </a>
            <a className="story-link" href="#story">
              See the experience <ClubIcon name="arrow-down" size={17} strokeWidth={1.7} />
            </a>
          </div>
        </div>

        <div className="hero-proof shell hero-reveal hero-reveal-5">
          <span>Workshop</span>
          <ClubIcon name="arrow-right" size={13} />
          <span>Build sprint</span>
          <ClubIcon name="arrow-right" size={13} />
          <span>Game night</span>
          <ClubIcon name="arrow-right" size={13} />
          <span>Hackathon</span>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-progress" aria-hidden="true">
          <span />
        </div>

        <header className="story-header shell">
          <div className="section-index">01 / The experience</div>
          <h2>
            Four events.
            <br />
            One <em>builder arc.</em>
          </h2>
          <p>
            Don&apos;t just join a club. Move through a story that changes how you
            think, build, and compete.
          </p>
        </header>

        <div className="story-list shell">
          {events.map((event) => {
            return (
              <article className={`story-chapter story-${event.tone}`} key={event.step}>
                <div className="event-visual">
                  <span className="event-coordinate">{event.step} / 04</span>
                  <div className="event-orbit" aria-hidden="true">
                    <span />
                    <span />
                  </div>
                  <div className="event-icon" aria-hidden="true">
                    <ClubIcon name={event.icon} size={42} strokeWidth={1.25} />
                  </div>
                  <div className="event-signal">
                    <span className="signal-dot" />
                    {event.signal}
                  </div>
                </div>

                <div className="event-copy">
                  <span className="event-label">{event.label}</span>
                  <h3>{event.title}</h3>
                  <p>{event.copy}</p>
                  <div className="event-tags">
                    {event.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="event-next">
                    <span>Next</span>
                    <strong>{event.next}</strong>
                    <ClubIcon name="arrow-down" size={17} strokeWidth={1.7} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="takeaways" id="wins">
        <div className="shell takeaways-heading">
          <div className="section-index">02 / What stays with you</div>
          <h2>
            Leave with more
            <br />
            than a <em>screenshot.</em>
          </h2>
        </div>

        <div className="takeaway-rail shell">
          {takeaways.map((item) => {
            return (
              <article className="takeaway-card" key={item.number}>
                <div className="takeaway-icon" aria-hidden="true">
                  <ClubIcon name={item.icon} size={31} strokeWidth={1.3} />
                </div>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>

        <p className="swipe-note shell">
          Swipe to explore <ClubIcon name="arrow-right" size={15} strokeWidth={1.7} />
        </p>
      </section>

      <section className="join-gate" id="join-gate">
        <div className="join-gate-grid" aria-hidden="true" />
        <div className="join-gate-content shell">
          <div className="story-complete">
            <ClubIcon name="sparkles" size={15} strokeWidth={1.6} /> Story complete · 04 / 04
          </div>
          <h2>
            Ready for your
            <br />
            first commit?
          </h2>
          <a className="join-gate-button" href="#join">
            Join now <ClubIcon name="arrow-down" size={26} strokeWidth={2} />
          </a>
        </div>
      </section>

      <section className="onboarding-section" id="join">
        <div className="shell onboarding-layout">
          <div className="onboarding-intro">
            <div className="section-index section-index-light">03 / Onboarding</div>
            <h2>
              Tell us who&apos;s
              <br />
              <em>joining the crew.</em>
            </h2>
            <p>
              Add your basics now. When you send the official WhatsApp invite,
              this flow will take new members straight into the group.
            </p>
            <div className="join-path" aria-label="Two-step joining path">
              <span className="join-path-active">1</span>
              <i />
              <span>2</span>
              <p>Profile</p>
              <p>WhatsApp</p>
            </div>
          </div>

          <OnboardingForm />
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-main">
          <a className="brand" href="#top" aria-label="Back to top">
            <span className="brand-mark">H/C</span>
            <span className="brand-name">Hackathon Club</span>
          </a>
          <p>Learn hard. Build real. Win together.</p>
          <a href="#join">
            Join the crew <ClubIcon name="message" size={15} strokeWidth={1.7} />
          </a>
        </div>
      </footer>

      <MobileJoinDock />
    </main>
  );
}
