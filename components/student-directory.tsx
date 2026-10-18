'use client';

import { useState, type CSSProperties } from 'react';

function initials(name: string) {
  const words = name.trim().split(/\s+/u);
  return [words[0]?.[0], words.length > 1 ? words[words.length - 1]?.[0] : ''].join('').toLocaleUpperCase();
}

function nameSeed(name: string) {
  return Array.from(name).reduce((value, letter) => (value * 31 + letter.codePointAt(0)!) >>> 0, 7);
}

function searchText(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLocaleLowerCase();
}

const cloud = [
  [0, 55, 142], [9, 40, 164], [18, 66, 182], [27, 36, 148],
  [35, 66, 194], [44, 28, 155], [53, 66, 222], [62, 31, 153],
  [70, 63, 190], [80, 37, 166], [89, 67, 194], [99, 43, 159],
];
const hues = [199, 215, 230, 249, 266];

export function StudentDirectory({ names, loadFailed = false }: { names: string[]; loadFailed?: boolean }) {
  const [query, setQuery] = useState('');
  const [paused, setPaused] = useState(false);
  const needle = searchText(query);
  const students = names.map((name, index) => ({ name, id: index, seed: nameSeed(name) }));
  const matches = students.filter((student) => searchText(student.name).includes(needle));

  return (
    <div className="students-directory" data-motion={paused ? 'paused' : 'playing'}>
      <section className="students-hero" aria-labelledby="students-heading">
        <div className="students-cloud" aria-hidden="true">
          <div className="students-cloud-glow" />
          {cloud.map(([x, y, size], i) => {
            if (!names.length) return null;
            const name = names[(i * 5 + 2) % names.length];
            return (
              <span className="students-cloud-orb" key={i} style={{ left: `${x}%`, top: `${y}%`, '--orb-size': `${size}px`, '--hue': hues[i % hues.length], '--float-duration': `${6 + i % 5}s`, '--float-delay': `${-i * 1.3}s`, '--rise-duration': `${2.2 + i % 5 * .18}s`, '--rise-delay': `${i * .085}s`, '--launch-x': `${(i % 2 ? 1 : -1) * (24 + i % 4 * 12)}px`, zIndex: i % 3 === 0 ? 1 : 3 } as CSSProperties}>
                <span className="student-orb-motion"><span className="student-orb"><span className="student-initials">{initials(name)}</span></span></span>
              </span>
            );
          })}
          <span className="students-cloud-spark students-cloud-spark-one">✦</span><span className="students-cloud-spark students-cloud-spark-two">✧</span>
        </div>
        <p className="students-eyebrow"><span /> Registered students <span /></p>
        <h1 id="students-heading">Meet the builders<span>.</span></h1>
        <p className="students-intro">{loadFailed ? 'A whole verse of possibilities starts with our people.' : names.length ? <><strong>{names.length}</strong> curious minds. One shared verse.</> : 'The next chapter starts with our people.'}</p>
        <a className="students-explore" href="#students-list">Find your people <span aria-hidden="true">↓</span></a>
      </section>

      <section className="students-collection" id="students-list" aria-label="Student names">
        <div className="students-toolbar">
          <div className="students-collection-label"><span className="students-live-dot" /><h2>The collective</h2><span className="students-total">{loadFailed ? '—' : String(names.length).padStart(2, '0')}</span></div>
          <div className="students-controls">
            <div className="students-search">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
              <label htmlFor="student-search" className="sr-only">Search students by name</label>
              <input id="student-search" type="search" placeholder="Find a familiar name…" value={query} onChange={(event) => setQuery(event.target.value)} disabled={loadFailed || !names.length} autoComplete="off" spellCheck={false} />
              {query && <button className="students-search-clear" type="button" onClick={() => setQuery('')} aria-label="Clear name search">×</button>}
            </div>
            <button className="students-motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Resume bubble animation' : 'Pause bubble animation'} title={paused ? 'Resume motion' : 'Pause motion'}>
              {paused ? <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="m6 3 10 7-10 7Z" /></svg> : <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 3h3v14H5zm7 0h3v14h-3z" /></svg>}
            </button>
          </div>
        </div>

        {loadFailed ? (
          <div className="students-empty"><span className="students-empty-symbol" aria-hidden="true">↻</span><h3>Our people are a moment away.</h3><p>We couldn’t load the names right now. Give it another try.</p><button type="button" onClick={() => window.location.reload()}>Try again <span aria-hidden="true">↗</span></button></div>
        ) : !names.length ? (
          <div className="students-empty"><span className="students-empty-symbol" aria-hidden="true">✦</span><h3>A new collective is on its way.</h3><p>Registered students will appear here.</p></div>
        ) : (
          <>
            <p className="students-results" aria-live="polite">{needle ? `${matches.length} ${matches.length === 1 ? 'name' : 'names'} found` : 'Different minds. Endless possibilities.'}</p>
            {matches.length ? <ul className="students-grid">
              {matches.map((student, index) => (
                <li className="student-card" key={student.id} style={{ '--orb-size': `${88 + student.seed % 4 * 8}px`, '--hue': hues[student.seed % hues.length], '--float-duration': `${6 + student.seed % 5}s`, '--float-delay': `${-(student.seed % 50) / 10}s`, '--reveal-delay': `${Math.min(index, 15) * 25}ms` } as CSSProperties}>
                  <span className="student-orb-slot" aria-hidden="true"><span className="student-orb-motion"><span className="student-orb"><span className="student-initials">{initials(student.name)}</span></span></span></span>
                  <span className="student-name">{student.name}</span>
                </li>
              ))}
            </ul> : <div className="students-empty"><span className="students-empty-symbol" aria-hidden="true">⌕</span><h3>No names in this orbit.</h3><p>Try a different spelling or clear your search.</p><button type="button" onClick={() => setQuery('')}>Show everyone <span aria-hidden="true">↗</span></button></div>}
          </>
        )}
      </section>
    </div>
  );
}
