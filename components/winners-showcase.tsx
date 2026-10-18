'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { winningEntries, winnerPhotos } from '@/lib/winner-showcase';
import type { SeasonHighlight } from '@/lib/season-highlights';

const filters = [
  { id: 'all', label: 'All recognitions' },
  { id: 'first', label: '1st place' },
  { id: 'second', label: 'Runners-up' },
  { id: 'other', label: 'Other podiums' },
  { id: 'special', label: 'Special awards' },
] as const;
type Filter = typeof filters[number]['id'];
function matches(entry: SeasonHighlight, filter: Filter) {
  if (filter === 'all') return true;
  if (filter === 'special') return entry.category === 'special';
  if (filter === 'first') return entry.prize === '1st prize';
  if (filter === 'second') return entry.prize === '2nd prize';
  return entry.category === 'podium' && entry.prize !== '1st prize' && entry.prize !== '2nd prize';
}
function label(entry: SeasonHighlight) {
  if (entry.category === 'special') return entry.result;
  return entry.prize ?? entry.result;
}
function initials(entry: SeasonHighlight) {
  const text = entry.team ?? entry.event;
  const words = text.split(/\s+/u);
  return (words.length > 1 ? words.slice(0,2).map((word) => word[0]).join('') : (text.match(/[A-Z]/gu)?.slice(0,2).join('') || text.slice(0,2))).toUpperCase();
}
function WinnerPhoto({ entry, hero = false }: { entry: SeasonHighlight; hero?: boolean }) {
  const photo = winnerPhotos[entry.id];
  return photo ? <picture><img src={photo} alt={`${entry.event} winning team`} loading={hero ? 'eager' : 'lazy'} decoding="async" /></picture> : <div className="winner-monogram" aria-label={`${entry.team ?? entry.event} team initials`}><span>{initials(entry)}</span><i aria-hidden="true">✦</i></div>;
}
function Trophy() {
  return <svg viewBox="0 0 100 110" fill="none" aria-hidden="true"><defs><linearGradient id="winners-trophy" x1="10" y1="0" x2="90" y2="110" gradientUnits="userSpaceOnUse"><stop stopColor="#e4f8ff"/><stop offset=".35" stopColor="#7dbaff"/><stop offset=".65" stopColor="#9692ff"/><stop offset="1" stopColor="#3565e4"/></linearGradient></defs><path d="M29 12h42v30c0 18-10 28-21 28S29 60 29 42V12Z" fill="url(#winners-trophy)"/><path d="M29 22H15v13c0 14 7 21 20 21m36-34h14v13c0 14-7 21-20 21" stroke="#a8d8ff" strokeWidth="6"/><path d="M50 69v19m-18 10h36l-5-11H37l-5 11Z" stroke="#a6c8ff" strokeWidth="7"/><path d="m50 25 3.5 7 8 1-6 5.5 1.5 8-7-4-7 4 1.5-8-6-5.5 8-1 3.5-7Z" fill="#2645a9"/></svg>;
}

export function WinnersShowcase() {
  const [round, setRound] = useState(0);
  const [replay, setReplay] = useState(0);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SeasonHighlight | null>(null);
  const stageRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { stage.dataset.revealed = 'true'; observer.disconnect(); }
    }, { threshold: .15 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
  }, [selected]);

  const firstPlace = winningEntries.filter((entry) => winnerPhotos[entry.id] && entry.prize === '1st prize');
  const runnersUp = winningEntries.filter((entry) => winnerPhotos[entry.id] && entry.prize === '2nd prize');
  const specialAward = winningEntries.find((entry) => winnerPhotos[entry.id] && entry.category === 'special')!;
  const first = firstPlace[round % firstPlace.length];
  const second = runnersUp[round % runnersUp.length];
  const podium = [{ entry: second, place: 2 }, { entry: first, place: 1 }, { entry: specialAward, place: 3 }];
  const needle = query.trim().toLowerCase();
  const shown = winningEntries.filter((entry) => matches(entry, filter) && [entry.event, entry.team ?? '', entry.college, entry.result, ...entry.members].some((value) => value.toLowerCase().includes(needle)));
  function browse() { galleryRef.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }

  return <>
    <div className="winners-hero">
      <div className="winners-atmosphere" aria-hidden="true"><span className="winners-ribbon winners-ribbon-one" /><span className="winners-ribbon winners-ribbon-two" /><span className="winner-float winner-float-one"><i>✦</i></span><span className="winner-float winner-float-two"><i>✳</i></span><span className="winner-float winner-float-three"><i>↗</i></span><span className="winner-float winner-float-four"><i>✦</i></span></div>
      <div className="winners-heading"><p className="winners-eyebrow">THE VERSE / PREVIOUS SEASONS</p><h1>Our <em>champions.</em></h1><p className="winners-intro">Previous-season podiums and special awards.</p><button onClick={browse}>Explore all {winningEntries.length} recognitions <span aria-hidden="true">↗</span></button></div>
      <section className="winners-podium" aria-label="Featured photographed winners and special award team" ref={stageRef}>
        <div className="winners-podium-row" key={`${round}-${replay}`}>{podium.map(({ entry, place }) => {
          const isSpecialAward = entry.category === 'special';
          return <article className={`winner-column winner-place-${place}`} key={place} style={{ '--rise-delay': `${place === 2 ? 0 : place === 1 ? 160 : 320}ms` } as CSSProperties}>
            <div className="winner-orb">{place === 1 && <svg className="winner-crown" viewBox="0 0 100 70" fill="none" aria-hidden="true"><path d="m12 15 18 20L50 8l20 27 18-20-9 40H21L12 15Z" fill="#9edcff" stroke="#e6f6ff" strokeWidth="3"/><path d="M22 63h56" stroke="#527cf4" strokeWidth="7" strokeLinecap="round"/><circle cx="12" cy="12" r="5" fill="#d0f1ff"/><circle cx="50" cy="7" r="5" fill="#d0f1ff"/><circle cx="88" cy="12" r="5" fill="#d0f1ff"/></svg>}<WinnerPhoto entry={entry} hero /></div>
            <div className="winner-bar"><div className="winner-bar-face" aria-hidden="true" /><div className="winner-bar-copy"><strong>{isSpecialAward ? '✳' : place}{!isSpecialAward && <span>{place === 1 ? 'ST' : 'ND'}</span>}</strong><h2>{entry.event}</h2><p className="winner-podium-team">{entry.team ?? entry.members.slice(0,2).map((name) => name.split(' ')[0]).join(' & ')}</p><p className="winner-place-label"><span aria-hidden="true">✦</span>{isSpecialAward ? 'Special award' : place === 1 ? 'First place' : 'Runner-up'}</p><button onClick={() => setSelected(entry)}>Meet the team <span aria-hidden="true">↗</span></button></div></div>
          </article>;
        })}</div>
        <div className="winners-podium-controls"><span>Different hackathons. The same drive.</span><div><button onClick={() => setReplay((value) => value + 1)} aria-label="Replay podium animation">↻</button><button onClick={() => setRound((value) => value + 1)}>More champions <span aria-hidden="true">→</span></button></div></div>
      </section>
    </div>

    <section className="winners-gallery" ref={galleryRef} aria-labelledby="winners-gallery-title">
      <div className="winners-gallery-heading"><div><p className="winners-eyebrow">THE HONOUR ROLL</p><h2 id="winners-gallery-title">More than a place on a podium<span>.</span></h2></div><p><strong>9</strong> podium finishes <i /> <strong>5</strong> special awards</p></div>
      <div className="winners-tools"><div className="winners-filters" aria-label="Filter winners">{filters.map((item) => <button key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{winningEntries.filter((entry) => matches(entry,item.id)).length}</span></button>)}</div><label className="winners-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search winners</span><input type="search" placeholder="Team, hackathon or name…" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
      <p className="winners-result-count" aria-live="polite">{shown.length} {shown.length === 1 ? 'recognition' : 'recognitions'}</p>
      <div className="winners-grid" key={`${filter}-${query}`}>{shown.map((entry,index) => <article className={`winner-card ${entry.category === 'special' ? 'winner-card-special' : ''}`} key={entry.id} style={{ '--card-delay': `${Math.min(index,8) * 55}ms` } as CSSProperties}>
        <button className="winner-card-image" onClick={() => setSelected(entry)} aria-label={`View ${entry.event}${entry.team ? ` — ${entry.team}` : ` — ${entry.members[0].split(' · ')[0]}`} winning team`}><WinnerPhoto entry={entry} />{!winnerPhotos[entry.id] && <span className="winner-card-graphic-label">{entry.event}</span>}<span className="winner-photo-arrow" aria-hidden="true">↗</span></button>
        <div className="winner-card-copy"><p className="winner-award-label"><span aria-hidden="true">{entry.category === 'special' ? '✳' : '✦'}</span>{label(entry)}</p><h3>{entry.event}</h3><p className="winner-team-name">{entry.team ?? 'Team recognition'}</p><p className="winner-host">{entry.college}</p><div className="winner-card-footer"><span>{entry.members.length} builders</span><button onClick={() => setSelected(entry)}>Winning team <span aria-hidden="true">↗</span></button></div></div>
      </article>)}</div>
      {!shown.length && <div className="winners-empty"><h3>No matching winners.</h3><p>Try a different team, event or name.</p><button onClick={() => { setFilter('all'); setQuery(''); }}>Show all recognitions ↗</button></div>}
    </section>
    <div className="winners-closing"><Trophy /><p>A moment on stage.<br /><em>A team behind every one.</em></p></div>
    <dialog className="winner-dialog" ref={dialogRef} onClose={() => setSelected(null)} aria-labelledby="winner-dialog-title">
      {selected && <div className="winner-dialog-panel"><button className="winner-dialog-close" aria-label="Close winner details" onClick={() => dialogRef.current?.close()}>×</button><div className="winner-dialog-image"><WinnerPhoto entry={selected} /></div><div className="winner-dialog-copy"><p className="winner-award-label">✦ {label(selected)}</p><h2 id="winner-dialog-title">{selected.event}</h2>{selected.team && <p className="winner-dialog-team">{selected.team}</p>}<p className="winner-host">{selected.college}</p><h3>The winning team</h3><ul>{selected.members.map((member) => <li key={member}><span aria-hidden="true">{member.split(' ').map((word) => word[0]).slice(0,2).join('')}</span>{member}</li>)}</ul></div></div>}
    </dialog>
  </>;
}
