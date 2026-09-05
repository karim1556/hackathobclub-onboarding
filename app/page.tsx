import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Layers3,
  Radio,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

const tracks = [
  {
    number: '01',
    tag: 'Learn',
    title: 'Decode the craft',
    copy: 'Zero spectator mode. Learn Git, APIs, UI systems, AI workflows, and the engineering habits that make ideas shippable.',
    icon: Braces,
    className: 'track-card track-card-light',
    footer: 'Mentor-led · Beginner friendly',
  },
  {
    number: '02',
    tag: 'Build',
    title: 'Get your hands dirty',
    copy: 'Pair up, break things, debug loudly, and leave every hands-on workshop with something real running on your screen.',
    icon: Layers3,
    className: 'track-card track-card-signal',
    footer: 'Team sprints · Real prototypes',
  },
  {
    number: '03',
    tag: 'Compete',
    title: 'Enter the arena',
    copy: 'Games, speed-builds, committee challenges, college events, and hackathons that teach you to think when the clock bites.',
    icon: Trophy,
    className: 'track-card track-card-dark',
    footer: 'Club games · Hackathon prep',
  },
];

const workshopLoop = [
  {
    week: 'Week 01',
    title: 'Tool up',
    detail: 'Git · APIs · product thinking',
  },
  {
    week: 'Week 02',
    title: 'Build fast',
    detail: 'UI systems · AI workflows · demos',
  },
  {
    week: 'Week 03',
    title: 'Game night',
    detail: 'Logic chaos · team quests · speed code',
  },
  {
    week: 'Week 04',
    title: 'Ship & pitch',
    detail: 'Polish · storytelling · battle test',
  },
];

const outcomes = [
  ['Build proof, not playlists', 'Turn tutorials into a working product people can click.'],
  ['Find your unfair team', 'Meet designers, developers, and chaos-proof presenters.'],
  ['Pitch under pressure', 'Explain the problem, the build, and why your idea deserves the room.'],
  ['Walk into hackathons ready', 'A repeatable playbook beats last-minute panic every time.'],
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Hackathon Club home">
            <span className="brand-mark">H/C</span>
            <span>Hackathon Club</span>
          </a>

          <div className="nav-links">
            <a href="#workshops">Workshops</a>
            <a href="#arena">The arena</a>
            <a href="#wins">Why join</a>
          </div>

          <a className="nav-cta" href="#join">
            Join now <ArrowUpRight size={15} strokeWidth={1.8} />
          </a>
        </nav>

        <div className="hero-art" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="core">01</span>
        </div>

        <div className="hero-content shell">
          <div className="eyebrow reveal-one">
            <span className="status-dot" />
            Enrollment open · season 01
          </div>

          <h1 className="reveal-two">
            Stop watching.
            <br />
            <span>Start shipping.</span>
          </h1>

          <p className="hero-copy reveal-three">
            Master the code. Enter the arena. Win the room. A club for curious
            builders who want to turn late-night ideas into working products.
          </p>

          <div className="hero-actions reveal-four">
            <a className="primary-button" href="#join">
              Join the club <ArrowUpRight size={18} strokeWidth={2} />
            </a>
            <a className="text-link" href="#workshops">
              Explore the journey <ArrowDownRight size={17} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div className="hero-footer shell reveal-five">
          <p>Learn the stack</p>
          <p>Build with a crew</p>
          <p>Compete to win</p>
          <span className="scroll-note">Scroll to enter ↓</span>
        </div>
      </section>

      <section className="manifesto" id="workshops">
        <div className="shell section-rule section-kicker">
          <span>Why this club exists</span>
          <span>01 — 04</span>
        </div>

        <div className="shell manifesto-grid">
          <h2>
            You don&apos;t need to be a genius.
            <br />
            <em>You need reps.</em>
          </h2>

          <div className="manifesto-copy">
            <p>
              Coding gets real when the timer starts, the demo breaks, and your
              team looks at you. We make that moment familiar—before the big day.
            </p>
            <p>
              Learn in short bursts. Build with your hands. Play weird games.
              Then take that energy to hackathons across clubs, committees, and
              colleges.
            </p>
          </div>
        </div>

        <div className="shell terminal-window" aria-label="Club build terminal">
          <div className="terminal-bar">
            <div className="terminal-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span>club_protocol.sh</span>
            <span>LIVE</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-prompt">
              <span>01</span>
              <code>$ join hackathon-club --mode=builder</code>
            </div>
            <div className="terminal-output">
              <span>✓ curiosity detected</span>
              <span>✓ team matched</span>
              <span>✓ fear of failing removed</span>
              <strong>READY TO BUILD_</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="tracks-section">
        <div className="shell tracks-heading">
          <div>
            <span className="micro-label">The club loop</span>
            <h2>Three moves. On repeat.</h2>
          </div>
          <p>
            Workshops give you the tools. Games sharpen the instincts. Hackathons
            make it count.
          </p>
        </div>

        <div className="shell track-grid">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <article className={track.className} key={track.number}>
                <div className="track-topline">
                  <span>{track.number}</span>
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="track-card-copy">
                  <span className="track-tag">{track.tag}</span>
                  <h3>{track.title}</h3>
                  <p>{track.copy}</p>
                </div>
                <div className="track-footer">
                  <span>{track.footer}</span>
                  <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="arena-section" id="arena">
        <div className="arena-orbit" aria-hidden="true" />
        <div className="shell section-rule arena-rule">
          <span>The arena</span>
          <span>Pressure makes builders</span>
        </div>

        <div className="shell arena-intro">
          <div>
            <span className="micro-label micro-label-lime">Simulated intensity</span>
            <h2>
              Train like it&apos;s
              <br />
              <span>submission night.</span>
            </h2>
          </div>
          <p>
            Timed builds. Surprise constraints. Demo disasters. Tiny games with
            very real lessons—so your first hackathon never feels like your first.
          </p>
        </div>

        <div className="shell arena-board">
          <div className="board-toolbar">
            <div>
              <Radio size={15} strokeWidth={1.8} />
              <span>Live challenge</span>
            </div>
            <span>HC / ARENA_04</span>
          </div>

          <div className="board-main">
            <div className="challenge-copy">
              <span className="challenge-number">CHALLENGE 04</span>
              <h3>Make boring data impossible to ignore.</h3>
              <p>
                Pick one campus problem. Build the smallest useful product. Demo
                it before the countdown hits zero.
              </p>
              <div className="constraint-row">
                <span>3 people</span>
                <span>1 public API</span>
                <span>No slide deck</span>
              </div>
            </div>

            <div className="countdown" aria-label="Illustrative 48 hour challenge timer">
              <span>Time remaining</span>
              <strong>48:00:00</strong>
              <div className="timer-track">
                <span />
              </div>
              <div className="team-line">
                <div className="avatar-stack" aria-label="Team of four builders">
                  <span>AK</span>
                  <span>NS</span>
                  <span>RJ</span>
                  <span>+</span>
                </div>
                <span>Squad online</span>
              </div>
            </div>
          </div>

          <div className="board-ticker" aria-hidden="true">
            <span>BUILD</span>
            <Zap size={14} fill="currentColor" />
            <span>BREAK</span>
            <Zap size={14} fill="currentColor" />
            <span>DEBUG</span>
            <Zap size={14} fill="currentColor" />
            <span>SHIP</span>
          </div>
        </div>
      </section>

      <section className="outcomes-section" id="wins">
        <div className="shell section-rule dark-rule">
          <span>What you actually win</span>
          <span>Beyond the trophy</span>
        </div>

        <div className="shell outcomes-lead">
          <div className="trophy-seal" aria-hidden="true">
            <Trophy size={39} strokeWidth={1.15} />
            <span>Built to win</span>
          </div>
          <h2>
            Winning starts
            <br />
            <em>before the trophy.</em>
          </h2>
          <p>
            The real flex is becoming the person every serious team wants in the
            room.
          </p>
        </div>

        <div className="shell outcomes-list">
          {outcomes.map(([title, detail], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <ArrowRight size={21} strokeWidth={1.5} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="workshop-section">
        <div className="shell workshop-layout">
          <div className="workshop-sticky">
            <span className="micro-label micro-label-lime">How we run</span>
            <h2>A four-week loop with no filler.</h2>
            <p>
              Join anywhere in the cycle. Leave every session with a new skill,
              a stronger team, or a build worth showing.
            </p>
            <a href="#join">
              Save your seat <ArrowDown size={17} strokeWidth={1.7} />
            </a>
          </div>

          <div className="week-list">
            {workshopLoop.map((item, index) => (
              <article key={item.week}>
                <div className="week-index">0{index + 1}</div>
                <div>
                  <span>{item.week}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <Sparkles size={19} strokeWidth={1.4} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="club-strip" aria-label="Club values">
        <div className="club-strip-track">
          <span>NO SPECTATORS</span>
          <span>◆</span>
          <span>BUILD IN PUBLIC</span>
          <span>◆</span>
          <span>TEAM OVER EGO</span>
          <span>◆</span>
          <span>SHIP THE DEMO</span>
          <span>◆</span>
        </div>
      </section>

      <section className="join-section" id="join">
        <div className="join-grid" aria-hidden="true" />
        <div className="shell join-topline">
          <span>Next cohort forming now</span>
          <Users size={21} strokeWidth={1.4} />
        </div>

        <div className="shell join-layout">
          <h2>
            Your first commit
            <br />
            starts <em>here.</em>
          </h2>
          <div className="join-copy">
            <p>
              No perfect résumé. No “10x developer” energy. Just curiosity,
              consistency, and a willingness to build with other people.
            </p>
            <a
              className="join-button"
              href="mailto:?subject=I%20want%20to%20join%20Hackathon%20Club&body=Hey!%20I%20want%20to%20join%20Hackathon%20Club.%20I%E2%80%99m%20interested%20in%20the%20next%20hands-on%20workshop.%20Here%E2%80%99s%20a%20little%20about%20what%20I%20want%20to%20build%3A%20"
            >
              Draft my intro <ArrowUpRight size={19} strokeWidth={2} />
            </a>
            <small>
              Opens a ready-to-send email. Add your club coordinator and hit send.
            </small>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-main">
          <a className="brand" href="#top" aria-label="Back to top">
            <span className="brand-mark">H/C</span>
            <span>Hackathon Club</span>
          </a>
          <p>Learn hard. Build real. Win together.</p>
          <a href="#top">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="shell footer-meta">
          <span>For the curious, not the finished.</span>
          <span>© 2026 Hackathon Club</span>
        </div>
      </footer>
    </main>
  );
}
