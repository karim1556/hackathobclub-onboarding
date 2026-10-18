'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { SeasonCardStack } from '@/components/season-card-stack';
import { seasonHighlights, type HighlightCategory } from '@/lib/season-highlights';

const categories: { id: HighlightCategory; label: string; description: string }[] = [
  { id: 'podium', label: 'Top 3', description: 'First, second, third. The podium stories, including Top 3 selections.' },
  { id: 'finalists', label: 'Top 10', description: 'The finalist runs: Top 4, Top 5 and Top 10. Podium finishes have their own chapter.' },
  { id: 'special', label: 'Special prizes', description: 'Recognition for the craft. Technical implementation, design, full stack and sector awards.' },
  { id: 'participation', label: 'Participated', description: 'More rooms entered. More ideas tested. Appearances with no placement recorded.' },
];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        setCount(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .3 });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref} aria-label={String(value)}><span aria-hidden="true">{count}</span></span>;
}

function Funnel() {
  return <svg className="season-funnel" viewBox="0 0 400 350" fill="none" aria-hidden="true">
    <path d="m-15 142 174 66M244 208l171-66" stroke="currentColor" strokeWidth="5" />
    {[[65,113,24],[118,116,23],[170,89,24],[194,40,25],[237,72,24],[274,35,25],[291,116,24],[222,125,24],[160,161,23],[271,164,23],[326,155,24],[206,210,24],[240,267,24],[187,312,24]].map(([cx,cy,r],i) => <circle key={i} cx={cx} cy={cy} r={r}  />)}
  </svg>;
}

export function SeasonStats() {
  const [category, setCategory] = useState<HighlightCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLElement>(null);
  const needle = query.trim().toLowerCase();
  const shown = seasonHighlights.filter((item) => (category === 'all' || item.category === category) && [item.event, item.college, item.team ?? '', item.result, item.prize ?? '', ...item.members].some((value) => value.toLowerCase().includes(needle)));
  const counts = Object.fromEntries(categories.map(({ id }) => [id, seasonHighlights.filter((item) => item.category === id).length]));
  function explore(id: HighlightCategory | 'all') {
    setCategory(id);
    listRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }
  return <>
    <div className="season-heading"><div><p className="season-eyebrow">THE VERSE / PREVIOUS SEASON</p><h1>We showed up. We <em>stood out.</em></h1></div><button className="season-explore" onClick={() => explore('all')}>Explore results <span aria-hidden="true">↓</span></button></div>

    <SeasonCardStack labels={['The reach', 'The wins', 'Top 3 finishes', 'Top 10 finishes', 'Special prizes', 'The people']}>
      {[
        <article key="reach" className="season-poster season-appearances"><div className="season-card-top"><span>01 / THE REACH</span><span aria-hidden="true">↗</span></div><h2>Ideas don’t stay<br />on campus.</h2><div className="season-orbit" aria-hidden="true"><span /><span /><span /><i>HC</i><b>✦</b></div><div className="season-big-number"><Counter value={50} /><span>+</span></div><p className="season-number-label">hackathons participated</p><div className="season-card-split"><div><strong>{counts.podium}</strong><span>Top 3 finishes*</span></div><div><strong>{counts.special}</strong><span>Special prizes*</span></div></div></article>,
        <article key="wins" className="season-poster season-wins"><div className="season-card-top"><span>02 / THE IMPACT</span><span aria-hidden="true">✦</span></div><h2>Built to learn.<br />Ready to win.</h2><div className="season-big-number"><Counter value={10} /><span>+</span></div><p className="season-number-label">hackathons won</p><div className="season-bars" aria-hidden="true">{Array.from({ length: 16 }, (_,i) => <span key={i} style={{ '--bar-height': `${22 + i * 4.5}%` } as CSSProperties} />)}<i>↗</i></div></article>,
        <article key="podium" className="season-poster season-podium"><div className="season-card-top"><span>03 / THE PODIUM</span><span aria-hidden="true">✦</span></div><h2>Made it to<br />the top three.</h2><div className="season-podium-graphic" aria-hidden="true"><span>2</span><span>1<i>✦</i></span><span>3</span></div><div className="season-category-copy"><strong>{counts.podium}</strong><p>Top 3 finishes<small>in the recorded highlights</small></p></div><button onClick={() => explore('podium')}>The podium stories <span aria-hidden="true">↗</span></button></article>,
        <article key="finalists" className="season-poster season-finalists"><div className="season-card-top"><span>04 / THE FINALISTS</span><span aria-hidden="true">↗</span></div><h2>Past the crowd.<br />Into the finals.</h2><div className="season-finalists-graphic" aria-hidden="true">{Array.from({length:10},(_,i) => <span key={i}>{String(i + 1).padStart(2,'0')}</span>)}</div><div className="season-category-copy"><strong>{counts.finalists}</strong><p>Top 10 finishes<small>Top 4, Top 5 &amp; Top 10 runs</small></p></div><button onClick={() => explore('finalists')}>Meet the finalists <span aria-hidden="true">↗</span></button></article>,
        <article key="special" className="season-poster season-special"><div className="season-card-top"><span>05 / THE EXTRA MILE</span><span aria-hidden="true">✳</span></div><h2>A different kind<br />of standout.</h2><div className="season-award-graphic" aria-hidden="true">✳</div><div className="season-category-copy"><strong>{counts.special}</strong><p>special prizes<small>Design. Development. Ingenuity.</small></p></div><button onClick={() => explore('special')}>The craft behind the recognition <span aria-hidden="true">↗</span></button></article>,
        <article key="people" className="season-poster season-moments"><div className="season-card-top"><span>06 / THE PEOPLE</span><span aria-hidden="true">✳</span></div><h2>Small teams.<br />Big moments.</h2><Funnel /><div className="season-moments-copy"><strong>{seasonHighlights.length}</strong><p>stories worth<br />telling.</p></div><button onClick={() => explore('all')}>Meet the names behind the numbers <span aria-hidden="true">↗</span></button></article>,
      ]}
    </SeasonCardStack>
    <p className="season-source">50+ appearances &amp; 10+ wins: club-reported season totals. <span>*Breakdowns below cover the 23 recorded highlights.</span></p>

    <section className="season-record" ref={listRef} aria-labelledby="season-record-title">
      <div className="season-record-heading"><div><p className="season-eyebrow">THE HIGHLIGHT REEL</p><h2 id="season-record-title">Every finish has a story<span>.</span></h2></div><span>23 ENTRIES / ONE CLUB</span></div>
      <div className="season-filters" aria-label="Filter highlights"><button aria-pressed={category === 'all'} onClick={() => setCategory('all')}>All appearances <span>23</span></button>{categories.map(({ id, label }) => <button key={id} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}<span>{counts[id]}</span></button>)}</div>
      <div className="season-record-tools"><p>{category === 'all' ? 'Podiums, finalist runs, special prizes and the courage to take part.' : categories.find(({ id }) => id === category)?.description}</p><label><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg><span className="sr-only">Search season highlights</span><input type="search" placeholder="Team, name or hackathon…" value={query} onChange={(e) => setQuery(e.target.value)} /></label></div>
      <p className="season-result-count" aria-live="polite">{shown.length} {shown.length === 1 ? 'highlight' : 'highlights'} <span>· Open a sheet for the full team</span></p>
      <div className="season-results" key={`${category}-${query}`}>{shown.map((item,i) => <details className={`season-entry season-entry-${item.category}`} key={item.id} style={{ '--entry-delay': `${Math.min(i, 8) * 45}ms` } as CSSProperties}><summary><div className="season-entry-top"><span>{String(item.id).padStart(2,'0')} / {categories.find(({ id }) => id === item.category)?.label}</span><span className="season-entry-toggle" aria-hidden="true">+</span></div><h3>{item.event}</h3><div className="season-entry-result"><span aria-hidden="true">{item.category === 'podium' ? '✦' : item.category === 'special' ? '✳' : '↗'}</span><strong>{item.prize ?? item.result}</strong></div><p className="season-entry-team">{item.team ?? item.members.slice(0,2).map((name) => name.split(' · ')[0]).join(' & ')}{!item.team && item.members.length > 2 && <small> +{item.members.length - 2}</small>}</p><p className="season-entry-college">{item.college}</p><span className="season-entry-more">{item.members.length} builders <span>View team ↗</span></span></summary><div className="season-entry-details"><p>{item.result}{item.prize ? ` · ${item.prize}` : ''}</p><ul>{item.members.map((name) => <li key={name}>{name}</li>)}</ul></div></details>)}</div>
      {!shown.length && <div className="season-no-results"><h3>No matching stories yet.</h3><p>Try another name, team or hackathon.</p><button onClick={() => { setQuery(''); setCategory('all'); }}>Show all highlights ↗</button></div>}
    </section>
    <div className="season-endnote"><span aria-hidden="true">✳</span><p>The next chapter?<br /><em>We’re building it.</em></p><Link href="/verse/teams">Meet this season’s squads ↗</Link></div>
  </>;
}
