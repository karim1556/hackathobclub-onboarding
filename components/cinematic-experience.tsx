'use client';

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ClubIcon, type ClubIconName } from '@/components/club-icon';
import { OnboardingForm } from '@/components/join-experience';
import { Button } from '@/components/ui/button';

type Chapter = {
  label: string;
  title: string;
  copy: string;
  tags: string[];
  tone: 'lime' | 'paper' | 'coral' | 'night';
  icon: ClubIconName;
};

const chapters: Chapter[] = [
  {
    label: 'Workshops',
    title: 'Code it live.',
    copy: 'Build with code, Git, APIs, interfaces and AI tools—hands-on, in the room.',
    tags: ['Live code', 'Guided builds', 'Real tools'],
    tone: 'lime',
    icon: 'brain-circuit',
  },
  {
    label: 'Team sprints',
    title: 'Ship as a team.',
    copy: 'Find developers, designers and storytellers. Turn one idea into a working demo.',
    tags: ['Squads', 'Prototype', 'Demo'],
    tone: 'paper',
    icon: 'code',
  },
  {
    label: 'Game nights',
    title: 'Play under pressure.',
    copy: 'Take on speed-coding, logic rounds and college challenges with the room behind you.',
    tags: ['Team quests', 'Logic', 'Fast rounds'],
    tone: 'coral',
    icon: 'gamepad',
  },
  {
    label: 'Hackathons',
    title: 'Pitch to win.',
    copy: 'Enter with a tested process: choose sharply, build fast, and tell a story judges remember.',
    tags: ['Strategy', 'Build', 'Pitch'],
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
const stageHashes = [
  '#top',
  '#workshops',
  '#team-sprints',
  '#game-nights',
  '#hackathons',
  '#takeaways',
  '#join-gate',
  '#join',
] as const;

function getStageFromHash(hash: string) {
  const index = stageHashes.indexOf(hash as (typeof stageHashes)[number]);
  return index < 0 ? 0 : index;
}

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest('button, a, input, textarea, select, form'));
}

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const gestureStart = useRef<{ x: number; y: number } | null>(null);
  const wheelLockedUntil = useRef(0);

  const activeChapter = useMemo(() => chapters[activeIndex - 1], [activeIndex]);
  const isStoryPlaying = activeIndex < finalCtaStage && !isPaused && !prefersReducedMotion;

  const goToStage = useCallback(
    (index: number, pause = true, historyMode: 'push' | 'replace' = 'push') => {
      const target = Math.max(0, Math.min(index, formStage));
      setActiveIndex(target);
      setIsPaused(pause);

      const method = historyMode === 'push' ? 'pushState' : 'replaceState';
      window.history[method](null, '', stageHashes[target]);
    },
    [],
  );

  useEffect(() => {
    function syncFromHistory() {
      const target = getStageFromHash(window.location.hash);
      setActiveIndex(target);
      setIsPaused(target !== 0);
    }

    const frame = window.requestAnimationFrame(syncFromHistory);
    window.addEventListener('popstate', syncFromHistory);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('popstate', syncFromHistory);
    };
  }, []);

  useEffect(() => {
    function syncPageVisibility() {
      setIsPageVisible(!document.hidden);
    }

    document.addEventListener('visibilitychange', syncPageVisibility);
    return () => document.removeEventListener('visibilitychange', syncPageVisibility);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    const frame = window.requestAnimationFrame(syncMotionPreference);
    mediaQuery.addEventListener('change', syncMotionPreference);
    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener('change', syncMotionPreference);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isInteractiveTarget(event.target)) return;

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        goToStage(activeIndex - 1);
      } else if (
        (event.key === 'ArrowDown' || event.key === 'PageDown') &&
        activeIndex < finalCtaStage
      ) {
        event.preventDefault();
        goToStage(activeIndex + 1);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, goToStage]);

  useEffect(() => {
    if (
      isPaused ||
      activeIndex >= finalCtaStage ||
      !isPageVisible ||
      prefersReducedMotion
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => {
        const target = Math.min(current + 1, finalCtaStage);
        window.history.replaceState(null, '', stageHashes[target]);
        return target;
      });
    }, stageDurations[activeIndex]);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isPageVisible, isPaused, prefersReducedMotion]);

  function openJoin() {
    goToStage(formStage);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (activeIndex === formStage || isInteractiveTarget(event.target)) {
      gestureStart.current = null;
      return;
    }

    gestureStart.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLElement>) {
    const start = gestureStart.current;
    gestureStart.current = null;

    if (!start || activeIndex === formStage || isInteractiveTarget(event.target)) return;

    const horizontalDistance = Math.abs(event.clientX - start.x);
    const verticalDistance = start.y - event.clientY;

    if (Math.abs(verticalDistance) < 48 || Math.abs(verticalDistance) < horizontalDistance * 1.15) {
      return;
    }

    const direction = verticalDistance > 0 ? 1 : -1;
    if (direction > 0 && activeIndex >= finalCtaStage) return;
    goToStage(activeIndex + direction);
  }

  function handleWheel(event: ReactWheelEvent<HTMLElement>) {
    if (activeIndex === formStage || Math.abs(event.deltaY) < 24) return;

    const now = Date.now();
    if (now < wheelLockedUntil.current) return;

    const direction = event.deltaY > 0 ? 1 : -1;
    if (direction > 0 && activeIndex >= finalCtaStage) return;

    wheelLockedUntil.current = now + 700;
    goToStage(activeIndex + direction);
  }

  const stageLabel =
    activeIndex === 0
      ? 'Hackathon Club introduction'
      : activeIndex <= 4
        ? `Chapter ${activeIndex} of four: ${activeChapter?.label}`
        : activeIndex === 5
          ? 'What you leave with'
          : activeIndex === finalCtaStage
            ? 'Story complete. Join the club.'
            : 'Join the Hackathon Club';

  return (
    <main
      className="cinematic-experience"
      data-active-stage={activeIndex}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        gestureStart.current = null;
      }}
      onWheel={handleWheel}
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
            <span className="stage-dot" /> Hackathon Club
          </div>
          <h1 className="deck-display hero-stage-title">
            Build fast.
            <br />
            Think bold.
            <br />
            <em>Win together.</em>
          </h1>
          <p className="hero-stage-copy">
            Live workshops, team games and hackathon squads for students who want to build under pressure.
          </p>
          <Button className="hero-stage-cta" type="button" onClick={openJoin}>
            Join the club <ClubIcon name="arrow-right" size={20} strokeWidth={1.8} />
          </Button>
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
              </div>
              <div className="chapter-stage-copy">
                <p className="stage-eyebrow">{chapter.label}</p>
                <h2 className="deck-display">{chapter.title}</h2>
                <p>{chapter.copy}</p>
                <div className="chapter-tags">
                  {chapter.tags.map((tag) => <span key={tag}>{tag}</span>)}
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
            <p className="stage-eyebrow">What you leave with</p>
            <h2 className="deck-display">Skills. Teammates. <em>A playbook.</em></h2>
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
        <div className="deck-stage-inner join-stage-inner">
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
            <h2 className="deck-display">Save your <em>spot.</em></h2>
            <p>Register once, then enter the official WhatsApp group.</p>
          </div>
          <OnboardingForm />
        </div>
      </section>

      <div className="deck-manual-controls" aria-label="Story controls">
        <Button
          aria-label="Previous section"
          className="deck-step-button"
          disabled={activeIndex === 0}
          type="button"
          variant="ghost"
          onClick={() => goToStage(activeIndex - 1)}
        >
          <ClubIcon name="arrow-down" size={18} strokeWidth={1.8} className="deck-arrow-back" />
        </Button>
        {activeIndex < finalCtaStage && !prefersReducedMotion && (
          <Button
            aria-label={isPaused ? 'Play sequence' : 'Pause sequence'}
            className="deck-step-button deck-playback-button"
            data-autoplay-control
            type="button"
            variant="ghost"
            onClick={() => setIsPaused((current) => !current)}
          >
            <ClubIcon name={isStoryPlaying ? 'pause' : 'play'} size={17} strokeWidth={1.8} />
          </Button>
        )}
        {activeIndex < finalCtaStage && (
          <Button
            aria-label="Next section"
            className="deck-step-button"
            type="button"
            variant="ghost"
            onClick={() => goToStage(activeIndex + 1)}
          >
            <ClubIcon name="arrow-down" size={18} strokeWidth={1.8} />
          </Button>
        )}
      </div>
    </main>
  );
}
