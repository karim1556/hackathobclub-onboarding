'use client';

import { type CSSProperties, useEffect, useMemo, useState } from 'react';

import { ClubIcon, type ClubIconName } from '@/components/club-icon';
import { OnboardingForm } from '@/components/join-experience';
import { Button } from '@/components/ui/button';

type Chapter = {
  label: string;
  title: string;
  copy: string;
  tags: string[];
  signal: string;
  tone: 'lime' | 'paper' | 'coral' | 'night';
  icon: ClubIconName;
};

const chapters: Chapter[] = [
  {
    label: 'Hands-on workshop',
    title: 'Learn the moves.',
    copy: 'Code, Git, APIs, UI and AI workflows—made practical before the session ends.',
    tags: ['Live code', 'Build along', 'Zero jargon'],
    signal: 'Skill unlocked',
    tone: 'lime',
    icon: 'brain-circuit',
  },
  {
    label: 'Team build sprint',
    title: 'Make it real.',
    copy: 'Find your people, choose a problem, and ship the rough first version together.',
    tags: ['Small teams', 'Prototype', 'Demo ready'],
    signal: 'Project shipped',
    tone: 'paper',
    icon: 'code',
  },
  {
    label: 'Club game night',
    title: 'Play under pressure.',
    copy: 'Speed-code, solve wild constraints, and take on games hosted by clubs and colleges.',
    tags: ['Team quests', 'Logic chaos', 'Fast feedback'],
    signal: 'Instincts sharpened',
    tone: 'coral',
    icon: 'gamepad',
  },
  {
    label: 'The hackathon',
    title: 'Build to win.',
    copy: 'Walk in with a crew, a playbook, and a story worth pitching when the clock starts.',
    tags: ['Strategy', 'Storytelling', 'Submission'],
    signal: 'Arena ready',
    tone: 'night',
    icon: 'trophy',
  },
];

const outcomes: Array<{ title: string; copy: string; icon: ClubIconName }> = [
  {
    title: 'Skills that stick',
    copy: 'You use them before the workshop ends.',
    icon: 'zap',
  },
  {
    title: 'A crew that ships',
    copy: 'Builders, designers and presenters in your corner.',
    icon: 'users',
  },
  {
    title: 'A hackathon playbook',
    copy: 'From first idea to final demo.',
    icon: 'trophy',
  },
];

const stageDurations = [5800, 5100, 5100, 5100, 5100, 5000] as const;
const finalCtaStage = 6;
const formStage = 7;

function stageClass(index: number, activeIndex: number) {
  if (index === activeIndex) return 'is-active';
  return index < activeIndex ? 'is-before' : 'is-after';
}

export function CinematicExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );

  const activeChapter = useMemo(() => chapters[activeIndex - 1], [activeIndex]);
  const isStoryPlaying = activeIndex < finalCtaStage && !isPaused;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.location.hash === '#join') {
        setActiveIndex(formStage);
        setIsPaused(true);
      } else if (window.location.hash === '#join-gate') {
        setActiveIndex(finalCtaStage);
        setIsPaused(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    function syncPageVisibility() {
      setIsPageVisible(!document.hidden);
    }

    document.addEventListener('visibilitychange', syncPageVisibility);
    return () => document.removeEventListener('visibilitychange', syncPageVisibility);
  }, []);

  useEffect(() => {
    if (
      isPaused ||
      activeIndex >= finalCtaStage ||
      !isPageVisible ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => Math.min(current + 1, finalCtaStage));
    }, stageDurations[activeIndex]);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isPageVisible, isPaused]);

  function goToStage(index: number, pause = true) {
    const target = Math.max(0, Math.min(index, formStage));
    setActiveIndex(target);
    setIsPaused(pause);

    const hash = target === formStage ? '#join' : target === finalCtaStage ? '#join-gate' : '#top';
    window.history.replaceState(null, '', hash);
  }

  function openJoin() {
    goToStage(formStage);
  }

  const stageLabel =
    activeIndex === 0
      ? 'Opening the Hackathon Club story'
      : activeIndex <= 4
        ? `Chapter ${activeIndex} of four: ${activeChapter?.label}`
        : activeIndex === 5
          ? 'What stays with you'
          : activeIndex === finalCtaStage
            ? 'Story complete. Join the club.'
            : 'Join the Hackathon Club';

  return (
    <main
      className="cinematic-experience"
      data-active-stage={activeIndex}
      onFocusCapture={(event) => {
        if (
          activeIndex < finalCtaStage &&
          !(event.target as HTMLElement).closest('[data-autoplay-control]')
        ) {
          setIsPaused(true);
        }
      }}
    >
      <p className="sr-only" aria-live="polite">
        {stageLabel}
      </p>

      {activeIndex < finalCtaStage && (
        <header className="deck-chrome">
          <button className="deck-brand" type="button" onClick={() => goToStage(0)}>
            <span className="deck-brand-mark">H/C</span>
            <span>Hackathon Club</span>
          </button>

          <div className="deck-chrome-actions">
            <Button
              aria-label={isPaused ? 'Resume automatic story' : 'Pause automatic story'}
              className="deck-pause"
              data-autoplay-control
              type="button"
              variant="ghost"
              onClick={() => setIsPaused((current) => !current)}
            >
              <span className={`pause-signal${isStoryPlaying ? ' is-playing' : ''}`} aria-hidden="true" />
              {isStoryPlaying ? 'Auto' : 'Paused'}
            </Button>
            <Button className="deck-top-join" type="button" onClick={openJoin}>
              Join now <ClubIcon name="arrow-up-right" size={16} strokeWidth={1.8} />
            </Button>
          </div>
        </header>
      )}

      <div className="deck-progress" aria-hidden="true">
        <span className="deck-progress-count">{String(Math.min(activeIndex + 1, 7)).padStart(2, '0')} / 07</span>
        <div className="deck-progress-track">
          <span
            key={activeIndex}
            className={isStoryPlaying ? 'is-playing' : ''}
            style={{
              '--progress-ratio': `${Math.min((activeIndex + 1) / 7, 1)}`,
              '--progress-start': `${activeIndex / 7}`,
            } as CSSProperties}
          />
        </div>
      </div>

      <section
        aria-hidden={activeIndex !== 0}
        className={`deck-stage stage--hero ${stageClass(0, activeIndex)}`}
        id="top"
        inert={activeIndex !== 0}
      >
        <div className="hero-stage-photo" aria-hidden="true" />
        <div className="hero-stage-grid" aria-hidden="true" />
        <div className="deck-stage-inner hero-stage-inner">
          <div className="stage-eyebrow hero-stage-kicker">
            <span className="stage-dot" /> Build season / no spectator mode
          </div>
          <h1 className="deck-display hero-stage-title">
            Learn it.
            <br />
            Build it.
            <br />
            <em>Win with it.</em>
          </h1>
          <p className="hero-stage-copy">
            Workshops, team games and the practice that makes hackathon day feel familiar.
          </p>
          <Button className="hero-stage-cta" type="button" onClick={openJoin}>
            Skip to the crew <ClubIcon name="arrow-right" size={20} strokeWidth={1.8} />
          </Button>
        </div>
        <div className="hero-stage-route" aria-hidden="true">
          <span>Workshop</span><i /><span>Build</span><i /><span>Game</span><i /><span>Win</span>
        </div>
      </section>

      {chapters.map((chapter, chapterIndex) => {
        const index = chapterIndex + 1;
        return (
          <section
            aria-hidden={activeIndex !== index}
            className={`deck-stage stage--chapter tone--${chapter.tone} ${stageClass(index, activeIndex)}`}
            key={chapter.label}
            inert={activeIndex !== index}
          >
            <div className="chapter-stage-grid" aria-hidden="true" />
            <div className="deck-stage-inner chapter-stage-inner">
              <div className="chapter-stage-visual" aria-hidden="true">
                <span className="chapter-stage-number">0{index} / 04</span>
                <span className="chapter-orbit chapter-orbit-one" />
                <span className="chapter-orbit chapter-orbit-two" />
                <span className="chapter-icon">
                  <ClubIcon name={chapter.icon} size={48} strokeWidth={1.25} />
                </span>
                <span className="chapter-signal"><i />{chapter.signal}</span>
              </div>
              <div className="chapter-stage-copy">
                <p className="stage-eyebrow">{chapter.label}</p>
                <h2 className="deck-display">{chapter.title}</h2>
                <p>{chapter.copy}</p>
                <div className="chapter-tags">
                  {chapter.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="chapter-next" aria-hidden="true">
                  <span>Up next</span><i /><strong>{chapterIndex === 3 ? 'The join' : chapters[chapterIndex + 1].label}</strong>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section
        aria-hidden={activeIndex !== 5}
        className={`deck-stage stage--outcomes ${stageClass(5, activeIndex)}`}
        inert={activeIndex !== 5}
      >
        <div className="outcomes-stage-grid" aria-hidden="true" />
        <div className="deck-stage-inner outcomes-stage-inner">
          <div>
            <p className="stage-eyebrow">What stays with you</p>
            <h2 className="deck-display">More than a <em>screenshot.</em></h2>
          </div>
          <div className="outcome-list">
            {outcomes.map((outcome, outcomeIndex) => (
              <article className="outcome-item" key={outcome.title} style={{ '--outcome-delay': `${outcomeIndex * 130}ms` } as CSSProperties}>
                <span className="outcome-index">0{outcomeIndex + 1}</span>
                <span className="outcome-icon"><ClubIcon name={outcome.icon} size={25} strokeWidth={1.4} /></span>
                <div><h3>{outcome.title}</h3><p>{outcome.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-hidden={activeIndex !== finalCtaStage}
        className={`deck-stage stage--join-gate ${stageClass(finalCtaStage, activeIndex)}`}
        id="join-gate"
        inert={activeIndex !== finalCtaStage}
      >
        <div className="join-stage-grid" aria-hidden="true" />
        <div className="join-stage-number" aria-hidden="true">07</div>
        <div className="deck-stage-inner join-stage-inner">
          <p className="stage-eyebrow">The story is ready when you are</p>
          <h2 className="deck-display">Ready for your <em>first commit?</em></h2>
          <Button className="join-stage-button" type="button" onClick={openJoin}>
            Join now <ClubIcon name="arrow-right" size={25} strokeWidth={1.9} />
          </Button>
        </div>
      </section>

      <section
        aria-hidden={activeIndex !== formStage}
        className={`deck-stage stage--form ${stageClass(formStage, activeIndex)}`}
        id="join"
        inert={activeIndex !== formStage}
      >
        <div className="form-stage-light" aria-hidden="true" />
        <div className="deck-stage-inner form-stage-inner">
          <div className="form-stage-intro">
            <p className="stage-eyebrow">One small intro</p>
            <h2 className="deck-display">Meet your <em>new crew.</em></h2>
            <p>Tell us the basics, then take the official invite straight to WhatsApp.</p>
          </div>
          <OnboardingForm />
        </div>
      </section>

      <div className="deck-manual-controls" aria-label="Story controls">
        <Button
          aria-label="Previous story panel"
          className="deck-step-button"
          disabled={activeIndex === 0}
          type="button"
          variant="ghost"
          onClick={() => goToStage(activeIndex - 1)}
        >
          <ClubIcon name="arrow-right" size={16} strokeWidth={1.8} className="deck-arrow-back" /> Back
        </Button>
        <Button
          aria-label="Next story panel"
          className="deck-step-button"
          disabled={activeIndex >= finalCtaStage}
          type="button"
          variant="ghost"
          onClick={() => goToStage(activeIndex + 1)}
        >
          Continue <ClubIcon name="arrow-right" size={16} strokeWidth={1.8} />
        </Button>
      </div>
    </main>
  );
}
