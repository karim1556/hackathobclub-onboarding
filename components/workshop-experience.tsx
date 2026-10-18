'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { bootcampBoards, bootcampMedia, type WorkshopMedia } from '@/lib/workshop-media';

function PlayGlyph({ size = 16 }: { size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M8 4.7a1 1 0 0 1 1.5-.86l11 7.3a1 1 0 0 1 0 1.72l-11 7.3A1 1 0 0 1 8 19.3z" /></svg>;
}

export function WorkshopExperience() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<WorkshopMedia | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const media = bootcampMedia[index];

  function select(next: number) {
    const nextIndex = (next + bootcampMedia.length) % bootcampMedia.length;
    if (nextIndex === index && videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      void videoRef.current.play().catch(() => setPlaying(false));
      return;
    }
    videoRef.current?.pause();
    setPlaying(false);
    setProgress(0);
    setIndex(nextIndex);
  }

  function enlarge(item: WorkshopMedia) {
    videoRef.current?.pause();
    setExpanded(item);
  }

  useEffect(() => {
    const thumb = stripRef.current?.querySelector<HTMLElement>(`[data-media-index="${index}"]`);
    if (thumb && stripRef.current) {
      const strip = stripRef.current;
      strip.scrollTo({ left: thumb.offsetLeft - strip.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }, [index]);

  useEffect(() => {
    if (expanded && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [expanded]);

  useEffect(() => {
    const root = contentRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.dataset.animate = 'true';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = 'true'; observer.unobserve(entry.target); }
      });
    }, { threshold: .12 });
    root.querySelectorAll('.workshop-reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const visibility = () => { if (document.hidden) { videoRef.current?.pause(); dialogRef.current?.querySelector('video')?.pause(); } };
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);

  return <div className="workshop-experience" ref={contentRef}>
    <section className="workshop-feature" aria-label="AI-powered Hackathon Bootcamp">
      <div className="workshop-screen-column">
        <div className="workshop-screen" data-kind={media.kind}>
          <div className="workshop-screen-tag"><span className={playing ? 'workshop-status-dot is-playing' : 'workshop-status-dot'} />{playing ? 'PLAYING' : media.kind === 'video' ? 'BOOTCAMP / FILM' : 'BOOTCAMP / STILLS'}<span>2026</span></div>
          {media.kind === 'video' ? <video key={media.id} ref={videoRef} src={media.src} poster={media.poster} controls playsInline muted autoPlay preload="metadata" aria-label={media.title} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={(event) => { const video = event.currentTarget; setProgress(video.duration ? video.currentTime / video.duration * 100 : 0); }} /> : <picture key={media.id} className="workshop-screen-photo"><img src={media.src} alt={media.description} width="2000" height="1500" fetchPriority="high" style={{ objectPosition: media.position }} /></picture>}
          {media.kind === 'photo' && <button type="button" className="workshop-play-session" onClick={() => select(2)}><span><PlayGlyph size={17} /></span>Play the room <i>↗</i></button>}
          <div className="workshop-screen-progress" style={{ '--play-progress': `${progress}%` } as CSSProperties} aria-hidden="true" />
        </div>
        <div className="workshop-screen-caption"><div aria-live="polite"><p><span>{String(index + 1).padStart(2, '0')}</span> / {String(bootcampMedia.length).padStart(2, '0')} <i /> {media.kind === 'video' ? `FILM · ${media.duration}` : 'PHOTOGRAPH'}</p><h2>{media.title}</h2></div><div className="workshop-screen-actions"><button type="button" aria-label="Previous bootcamp moment" onClick={() => select(index - 1)}>←</button><button type="button" aria-label="Next bootcamp moment" onClick={() => select(index + 1)}>→</button><button type="button" className="workshop-expand" aria-label="Expand selected bootcamp moment" onClick={() => enlarge(media)}><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5M4 4l5 5m11-5-5 5M4 20l5-5m11 5-5-5" /></svg></button></div></div>
        <div className="workshop-filmstrip" ref={stripRef} aria-label="Bootcamp photos and films">{bootcampMedia.map((item, mediaIndex) => <button type="button" key={item.id} data-media-index={mediaIndex} className="workshop-thumb" aria-pressed={index === mediaIndex} aria-label={`Show ${item.kind}: ${item.title}`} onClick={() => select(mediaIndex)}><picture><img src={item.poster ?? item.src} alt="" loading="lazy" width="160" height="100" style={{ objectPosition: item.position }} /></picture><span className="workshop-thumb-index">{String(mediaIndex + 1).padStart(2, '0')}</span>{item.kind === 'video' && <span className="workshop-thumb-play"><PlayGlyph size={10} />{item.duration}</span>}<span className="workshop-thumb-line" /></button>)}</div>
      </div>

      <aside className="workshop-session-info"><div className="workshop-session-meta"><span>SESSION 001</span><span>CONDUCTED ↗</span></div><p className="workshop-session-category">AI-POWERED</p><h2>Hackathon<br /><span>Bootcamp.</span></h2><p className="workshop-session-description">From the first idea to a working deployment. A room full of students learning to build with AI, together.</p><div className="workshop-session-stats"><div><strong>123<span>+</span></strong><p>participants</p></div><div><strong>3<span>+</span></strong><p>hours of building</p></div></div><div className="workshop-session-date"><span>14 AUGUST 2026</span><span>10 AM — 1 PM</span></div><div className="workshop-signal" aria-hidden="true">{Array.from({ length: 38 }, (_, n) => <i key={n} style={{ '--signal-height': `${10 + ((n * 17 + 13) % 43)}px`, '--signal-delay': `${n * 35}ms` } as CSSProperties} />)}</div><p className="workshop-session-quote">“AI writes code.<br /><span>You make engineering decisions.</span>”</p></aside>
    </section>

    <section className="workshop-process workshop-reveal" aria-labelledby="workshop-process-title"><div className="workshop-section-heading"><p>THE SESSION, IN THREE ACTS</p><h2 id="workshop-process-title">An idea is <span>only the beginning.</span></h2></div><div className="workshop-process-steps">{[
      { number: '01', label: 'Research & plan', code: 'idea → direction', copy: 'Understand the problem. Research with AI, plan a solution, and map the flow.' },
      { number: '02', label: 'Generate & build', code: 'direction → prototype', copy: 'Turn ideas into a working solution. Write, refine, integrate, and test.' },
      { number: '03', label: 'Debug & deploy', code: 'prototype → real world', copy: 'Debug, improve, test like a pro, and put the project in front of people.' },
    ].map((step) => <article key={step.number}><div className="workshop-step-top"><span>{step.number}</span><svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d={step.number === '01' ? 'M9 8h22v24H9zM14 15h12m-12 5h12m-12 5h7' : step.number === '02' ? 'm14 11-9 9 9 9m12-18 9 9-9 9m-4-25-4 32' : 'M20 30V7m-9 10 9-10 9 10M6 27v7h28v-7'} /></svg></div><p className="workshop-step-code">{step.code}</p><h3>{step.label}</h3><p className="workshop-step-copy">{step.copy}</p></article>)}</div></section>

    <section className="workshop-boards workshop-reveal" aria-label="Workshop archive boards"><div className="workshop-boards-intro"><p>FROM THE ARCHIVE</p><h2>The plan.<br /><span>The people.<br />The proof.</span></h2><p>A look at the original workshop brief, certificate design, and session recap.</p></div>{bootcampBoards.map((board, boardIndex) => <button type="button" key={board.id} className="workshop-board" onClick={() => enlarge(board)} aria-label={`Open ${board.title}`}><div className="workshop-board-image"><picture><img src={board.src} alt={board.description} width="2200" height="1200" loading="lazy" /></picture><span>↗</span></div><span className="workshop-board-caption"><span>0{boardIndex + 1} / {boardIndex === 0 ? 'WORKSHOP BRIEF' : 'SESSION RECAP'}</span><strong>{board.title}</strong></span></button>)}</section>

    <dialog ref={dialogRef} className="workshop-dialog" aria-labelledby="workshop-dialog-title" onClose={() => setExpanded(null)}>{expanded && <><div className="workshop-dialog-header"><div><p>HACKATHON CLUB / BOOTCAMP ARCHIVE</p><h2 id="workshop-dialog-title">{expanded.title}</h2></div><button type="button" aria-label="Close expanded bootcamp moment" onClick={() => dialogRef.current?.close()}>×</button></div><div className="workshop-dialog-media" data-kind={expanded.kind} data-portrait={expanded.id === 'clip-3'}>{expanded.kind === 'video' ? <video key={expanded.id} src={expanded.src} poster={expanded.poster} controls playsInline muted autoPlay preload="metadata" aria-label={expanded.title} /> : <picture><img src={expanded.src} alt={expanded.description} width="2000" height="1500" /></picture>}</div><p className="workshop-dialog-description">{expanded.description}</p></>}</dialog>
  </div>;
}
