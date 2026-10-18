'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { QuestBackdrop, QuestLandscape, QuestMountains, QuestPlayer, QuestStars } from '@/components/quest-world';
import { advanceQuest, createQuest, jumpQuest, questPickups, QUEST_FLOOR, QUEST_WIDTH, type QuestGame } from '@/lib/karim-quest';

export function KarimQuest() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<SVGGElement>(null);
  const starsRef = useRef<SVGGElement>(null);
  const mountainRef = useRef<SVGGElement>(null);
  const playerRef = useRef<SVGGElement>(null);
  const gameRef = useRef<QuestGame>(createQuest());
  const keysRef = useRef(new Set<string>());
  const [viewWidth, setViewWidth] = useState(1440);
  const [collected, setCollected] = useState<ReadonlySet<string>>(new Set());
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [toast, setToast] = useState('Collect coins. Find the four trophies. Make it home.');
  const [burst, setBurst] = useState<{ x: number; y: number; id: string } | null>(null);
  const coins = questPickups.filter((item) => item.kind === 'coin' && collected.has(item.id)).length;
  const trophies = questPickups.filter((item) => item.kind === 'trophy' && collected.has(item.id)).length;

  function restart() {
    const isPaused = gameRef.current.paused;
    gameRef.current = createQuest();
    gameRef.current.paused = isPaused;
    keysRef.current.clear();
    setCollected(new Set()); setFinished(false); setAuto(true); setBurst(null);
    setToast('New run. Same ambition.');
    stageRef.current?.focus({ preventScroll: true });
  }

  function togglePause() {
    gameRef.current.paused = !gameRef.current.paused;
    setPaused(gameRef.current.paused);
  }

  function takeControl() {
    gameRef.current.auto = !gameRef.current.auto;
    keysRef.current.clear();
    setAuto(gameRef.current.auto);
    stageRef.current?.focus({ preventScroll: true });
  }

  function directionDown(direction: 'left' | 'right') {
    gameRef.current.auto = false; setAuto(false);
    keysRef.current.add(direction);
  }

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      setViewWidth(entry.contentRect.width / entry.contentRect.height * 600);
    });
    observer.observe(stage);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      if (preference.matches) { gameRef.current.paused = true; setPaused(true); }
    };
    const initial = requestAnimationFrame(syncMotion);
    preference.addEventListener('change', syncMotion);
    return () => { observer.disconnect(); cancelAnimationFrame(initial); preference.removeEventListener('change', syncMotion); };
  }, []);

  useEffect(() => {
    let frame = 0;
    let previous = 0;
    let burstUntil = 0;
    function animate(now: number) {
      const seconds = previous ? Math.min((now - previous) / 1000, .04) : 0;
      previous = now;
      const game = gameRef.current;
      if (!document.hidden) {
        const input = (keysRef.current.has('right') ? 1 : 0) - (keysRef.current.has('left') ? 1 : 0);
        const wasFinished = game.finished;
        const pickups = advanceQuest(game, seconds, input);
        if (pickups.length) {
          setCollected(new Set(game.collected));
          const pickup = pickups[0];
          setBurst({ x: pickup.x, y: pickup.y, id: pickup.id });
          burstUntil = now + 800;
          setToast(pickup.kind === 'coin' ? `+1 coin` : `${pickup.label} +1 trophy`);
        }
        if (burstUntil && now > burstUntil) { setBurst(null); burstUntil = 0; }
        if (!wasFinished && game.finished) setFinished(true);
        const camera = Math.max(0, Math.min(game.x - viewWidth * .3, QUEST_WIDTH - viewWidth));
        cameraRef.current?.setAttribute('transform', `translate(${-camera} 0)`);
        starsRef.current?.setAttribute('transform', `translate(${-camera * .12} 0)`);
        mountainRef.current?.setAttribute('transform', `translate(${-camera * .32} 0)`);
        playerRef.current?.setAttribute('transform', `translate(${game.x - camera - 44} ${QUEST_FLOOR - 132 + game.y})`);
        playerRef.current?.setAttribute('data-moving', String(!game.paused && !game.finished && (game.auto || input !== 0)));
        playerRef.current?.setAttribute('data-jumping', String(!game.grounded));
        playerRef.current?.style.setProperty('--player-facing', String(game.direction));
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    const clearKeys = () => keysRef.current.clear();
    window.addEventListener('blur', clearKeys);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('blur', clearKeys); };
  }, [viewWidth]);

  return <section className="karim-quest" aria-label="Karim’s moonlight quest">
    <div className="quest-hud"><div className="quest-player-tag"><span className="quest-player-dot" /><span>KARIM’S QUEST</span><i /> <span>{finished ? 'LEVEL CLEAR' : paused ? 'PAUSED' : auto ? 'AUTO PLAY' : 'YOU’RE IN CONTROL'}</span></div><div className="quest-scores"><span><i aria-hidden="true">{'◈'}</i> <strong>{coins}</strong><span>/56</span> <span className="quest-score-label">coins</span></span><span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M7 3h10v6c0 7-10 7-10 0ZM7 5H3c0 6 1 8 5 8m9-8h4c0 6-1 8-5 8m-4 2v5m-4 1h8" /></svg><strong>{trophies}</strong><span>/4</span> <span className="quest-score-label">trophies</span></span></div></div>
    {/* A game application intentionally captures movement and jump keys on its focusable surface. */}
    {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
    <div className="quest-stage" ref={stageRef} tabIndex={0} role="application" aria-label="Playable side-scrolling game. Use arrow keys to move and Space to jump." aria-describedby="quest-instructions" data-paused={paused} data-finished={finished} onBlur={() => keysRef.current.clear()} onKeyDown={(event) => {
      if (event.target !== event.currentTarget) return;
      const key = event.key.toLowerCase();
      if (['arrowleft', 'arrowright', 'a', 'd'].includes(key)) {
        event.preventDefault(); directionDown(key === 'arrowleft' || key === 'a' ? 'left' : 'right');
      } else if ([' ', 'arrowup', 'w'].includes(key)) {
        event.preventDefault(); if (!event.repeat) jumpQuest(gameRef.current);
      } else if (key === 'p' && !event.repeat) { event.preventDefault(); togglePause(); }
    }} onKeyUp={(event) => {
      const key = event.key.toLowerCase();
      if (key === 'arrowleft' || key === 'a') keysRef.current.delete('left');
      if (key === 'arrowright' || key === 'd') keysRef.current.delete('right');
    }}>
      <svg className="quest-world" viewBox={`0 0 ${viewWidth} 600`} preserveAspectRatio="none" aria-hidden="true"><QuestBackdrop /><g ref={starsRef}><QuestStars /></g><g ref={mountainRef}><QuestMountains /></g><g ref={cameraRef}><QuestLandscape collected={collected} />{burst && <g key={burst.id} transform={`translate(${burst.x} ${burst.y})`} className="quest-burst">{Array.from({ length: 10 }, (_, n) => <circle key={n} r={n % 2 ? 2.5 : 4} fill={n % 2 ? '#b8acff' : '#a9deff'} style={{ '--burst-x': `${Math.cos(n / 10 * Math.PI * 2) * 65}px`, '--burst-y': `${Math.sin(n / 10 * Math.PI * 2) * 65}px` } as CSSProperties} />)}<text y="-35" textAnchor="middle" fill="#d5edff" fontFamily="monospace" fontSize="18">+1</text></g>}</g><g ref={playerRef} className="quest-player" transform={`translate(96 ${QUEST_FLOOR - 132})`}><QuestPlayer /></g></svg>
      <div className="quest-vignette" aria-hidden="true" />
      {paused && !finished && <div className="quest-pause-overlay"><span>THE ADVENTURE CAN WAIT.</span><button type="button" onClick={togglePause}>Continue Karim’s quest <span aria-hidden="true">→</span></button></div>}
      {finished && <div className="quest-finish"><div className="quest-confetti" aria-hidden="true">{Array.from({ length: 22 }, (_, n) => <i key={n} style={{ '--confetti-x': `${n * 4.7}%`, '--confetti-delay': `${n % 6 * -.45}s`, '--confetti-color': ['#79ceff', '#b7a3ff', '#d7eaff'][n % 3] } as CSSProperties} />)}</div><p>LEVEL CLEARED / THE VERSE</p><h2>More than a club.<br /><span>A world we build together.</span></h2><span>{coins} coins collected · {trophies} trophies earned</span><button type="button" onClick={restart}>One more adventure ↻</button></div>}
    </div>
    <div className="quest-bottom-bar"><p className="quest-toast" aria-live="polite">{toast}</p><div className="quest-game-actions"><button type="button" onClick={takeControl} aria-pressed={!auto}>{auto ? 'Take control' : 'Auto play'} <span aria-hidden="true">↗</span></button><button type="button" onClick={togglePause} aria-label={paused ? 'Resume quest' : 'Pause quest'}>{paused ? '▶' : 'Ⅱ'}</button><button type="button" onClick={restart} aria-label="Restart quest">↻</button></div></div>
    <div className="quest-controls-row"><p id="quest-instructions"><span>MOONLIGHT RUN · WORLD 01</span><span className="quest-keyboard-help"><kbd>←</kbd><kbd>→</kbd> move <kbd>SPACE</kbd> jump <kbd>P</kbd> pause</span></p><div className="quest-touch-controls"><button type="button" aria-label="Move Karim left" onPointerDown={(event) => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); directionDown('left'); }} onPointerUp={() => keysRef.current.delete('left')} onPointerCancel={() => keysRef.current.delete('left')} onLostPointerCapture={() => keysRef.current.delete('left')}>←</button><button type="button" aria-label="Move Karim right" onPointerDown={(event) => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); directionDown('right'); }} onPointerUp={() => keysRef.current.delete('right')} onPointerCancel={() => keysRef.current.delete('right')} onLostPointerCapture={() => keysRef.current.delete('right')}>→</button><button type="button" className="quest-jump-button" onPointerDown={(event) => event.preventDefault()} onClick={() => jumpQuest(gameRef.current)}>Jump <span aria-hidden="true">↑</span></button></div></div>
  </section>;
}
