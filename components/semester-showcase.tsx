'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { semesterAchievements as moments } from '@/lib/semester-achievements';

export function SemesterShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const selected = active === null ? null : moments[active];

  function reset() { setActive(null); setPinned(false); }
  function select(index: number) { setActive(index); setPinned(true); }

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setActive(null); setPinned(false); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return <section className="semester-showcase" aria-label="This semester’s achievements">
    <div className="semester-gallery" ref={showcaseRef} data-expanded={active !== null} onPointerLeave={() => { if (!pinned) setActive(null); }}>
      {moments.map((moment, index) => <button
        type="button"
        key={moment.id}
        className="semester-panel"
        data-active={active === index}
        style={{ '--panel-index': index, '--photo-position': moment.position, '--moment-accent': moment.accent } as CSSProperties}
        onPointerEnter={(event) => { if (event.pointerType === 'mouse' && !pinned) setActive(index); }}
        onFocus={() => setActive(index)}
        onClick={() => select(index)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + moments.length) % moments.length;
            select(next);
            showcaseRef.current?.querySelectorAll<HTMLButtonElement>('.semester-panel')[next]?.focus();
          }
        }}
        aria-label={`${index + 1}. ${moment.event} — ${moment.team} — ${moment.result}`}
        aria-pressed={active === index}
        aria-describedby={active === index ? 'semester-selected-description' : undefined}
      >
        <span className="semester-photo-haze" style={{ backgroundImage: `url("${moment.image}")` }} aria-hidden="true" />
        <picture className="semester-photo"><img src={moment.image} alt={moment.alt} width={index === 1 || index === 3 ? 1440 : 1920} height={index === 1 || index === 3 ? 1920 : 1440} fetchPriority={index === 0 ? 'high' : 'auto'} /></picture>
        <span className="semester-panel-wash" aria-hidden="true" />
        <span className="semester-panel-label"><span className="semester-panel-number">0{index + 1}<span>↗</span></span><span className="semester-panel-event">{moment.event}</span><span className="semester-panel-team">{index === 5 ? 'Club members' : index === 4 ? 'Together' : moment.team}</span><span className="semester-panel-result">{index === 4 ? 'Two podiums' : moment.result}</span></span>
      </button>)}
      <span className="semester-gallery-corner" aria-hidden="true">HC / <span>2026</span></span>
      {selected && <div className="semester-expanded-label" key={selected.id} aria-hidden="true"><span>{selected.event}</span><span>{selected.result}</span></div>}
    </div>

    <div className="semester-controls">
      <button type="button" className="semester-overview" onClick={reset} aria-label="Show all six achievement photos" aria-pressed={active === null}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16m6-16v16"/></svg><span>All moments</span></button>
      <div className="semester-photo-nav" aria-label="Choose an achievement">{moments.map((moment,index) => <button type="button" key={moment.id} className="semester-photo-tab" aria-label={`View ${moment.event} — ${moment.team}`} aria-pressed={active === index} onClick={() => select(index)}><span>0{index + 1}</span><span>{moment.event}</span></button>)}</div>
      <div className="semester-step"><button type="button" aria-label="Previous achievement" onClick={() => select(active === null ? moments.length - 1 : (active + moments.length - 1) % moments.length)}>←</button><button type="button" aria-label="Next achievement" onClick={() => select(active === null ? 0 : (active + 1) % moments.length)}>→</button></div>
    </div>

    <div className="semester-caption" aria-live="polite" aria-atomic="true">
      <div key={selected?.id ?? 'overview'} className="semester-caption-copy"><p className="semester-caption-kicker">{selected ? `${String(active! + 1).padStart(2,'0')} / ${selected.event} · ${selected.location}` : 'THE MOMENTS BEHIND THE MILESTONES'}</p><h2>{selected?.title ?? 'Six moments. One club.'}</h2><p id="semester-selected-description">{selected?.description ?? 'Mindcraft. Technothon. Ideathon. This semester, our builders took their ideas further.'}</p></div>
      <div className="semester-caption-result">{selected ? <><span>{selected.team}</span><strong style={{ color: selected.accent }}>{selected.result}</strong></> : <><span>THIS SEMESTER</span><strong>Still building. Still going. ↗</strong></>}</div>
    </div>
  </section>;
}
