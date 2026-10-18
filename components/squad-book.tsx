'use client';

import { useEffect, useRef, useState } from 'react';
import type { Squad } from '@/lib/team-rosters';

function monogram(name: string) {
  const words = name.trim().split(/\s+/u);
  return (words.length > 1 ? `${words[0][0]}${words[words.length - 1][0]}` : name.slice(0, 2)).toUpperCase();
}

function MetalClip() {
  return (
    <svg className="squad-metal-clip" viewBox="0 0 440 105" aria-hidden="true">
      <defs>
        <linearGradient id="squad-steel" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#effaff" /><stop offset=".13" stopColor="#727e96" /><stop offset=".25" stopColor="#e7f5ff" /><stop offset=".36" stopColor="#727e9a" /><stop offset=".64" stopColor="#d0e1ed" /><stop offset=".81" stopColor="#3a4663" /><stop offset=".93" stopColor="#9caec4" /><stop offset="1" stopColor="#36405c" /></linearGradient>
        <linearGradient id="squad-wire"><stop stopColor="#35415f" /><stop offset=".18" stopColor="#eef6ff" /><stop offset=".5" stopColor="#8b9bb4" /><stop offset=".8" stopColor="#e4f6ff" /><stop offset="1" stopColor="#35415f" /></linearGradient>
      </defs>
      <path d="M23 27h394v62H23Z" fill="#020719" opacity=".55" />
      <path d="M31 17h378l12 17v39l-16 15H35L19 73V34Z" fill="url(#squad-steel)" stroke="#95a4b7" strokeWidth="1.5" />
      <path d="M26 40h13v42H26zm375 0h13v42h-13z" fill="#1c2946" />
      <path d="M42 19v-8h356v8M39 45v27h137l11 8h66l11-8h137V45" fill="none" stroke="#0d172d" strokeWidth="7" />
      <path d="M42 19v-8h356v8M39 45v27h137l11 8h66l11-8h137V45" fill="none" stroke="url(#squad-wire)" strokeWidth="4" />
      <path d="M38 26h363M43 32h353" stroke="#f2fbff" strokeWidth="1.5" opacity=".8" />
      <circle cx="44" cy="58" r="3" fill="#d5e5ed" /><circle cx="396" cy="58" r="3" fill="#d5e5ed" />
    </svg>
  );
}

function ClubBadge() {
  return (
    <svg className="squad-club-badge" viewBox="0 0 310 360" aria-hidden="true">
      <defs>
        <linearGradient id="squad-badge-rim" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e2e6ff" /><stop offset=".26" stopColor="#7e92d0" /><stop offset=".5" stopColor="#d6b6ff" /><stop offset=".75" stopColor="#7289b4" /><stop offset="1" stopColor="#a8cfff" /></linearGradient>
        <linearGradient id="squad-badge-face" x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#1464c6" /><stop offset=".55" stopColor="#123994" /><stop offset="1" stopColor="#100c45" /></linearGradient>
        <linearGradient id="squad-badge-mark"><stop stopColor="#1fe4ff" /><stop offset="1" stopColor="#174bff" /></linearGradient>
      </defs>
      <path d="m155 27 142 78v162l-142 86L13 267V105Z" fill="#030c2d" />
      <path d="m155 9 142 78v162l-142 86L13 249V87Z" fill="url(#squad-badge-rim)" />
      <path d="m155 24 129 71v146l-129 78L26 241V95Z" fill="#071336" />
      <path d="m155 36 118 65v134l-118 71L37 235V101Z" fill="url(#squad-badge-rim)" />
      <path d="m155 47 108 60v122l-108 65L47 229V107Z" fill="url(#squad-badge-face)" />
      <g transform="translate(68 107) scale(.86)">
        <path d="m8 20 21-17v119l-21 18Zm82 0 22-17v137l-22-18Z" fill="#eef5ff" />
        <path d="M36 50h43v90H57V72H36Zm84-47h17l49 42-15 16-51-43Zm0 119 51-43 15 16-49 45h-17Z" fill="url(#squad-badge-mark)" />
      </g>
    </svg>
  );
}

function DeskPen() {
  return (
    <svg className="squad-desk-pen" viewBox="0 0 80 420" aria-hidden="true">
      <defs><linearGradient id="squad-pen-metal"><stop stopColor="#081125" /><stop offset=".25" stopColor="#7b8fae" /><stop offset=".45" stopColor="#e4eff7" /><stop offset=".62" stopColor="#5f7596" /><stop offset="1" stopColor="#101b32" /></linearGradient></defs>
      <path d="m27 34 3-20h20l3 20v303l-13 63-13-63Z" fill="url(#squad-pen-metal)" />
      <path d="M27 127h26v192H27Z" fill="#0c1730" /><path d="M30 132h3v182h-3Z" fill="#61789d" opacity=".6" />
      <path d="M47 23h8v109l-7 15" fill="none" stroke="#c0cfe2" strokeWidth="4" /><path d="m37 384 3 17 3-17Z" fill="#d5e9ff" />
    </svg>
  );
}

export function SquadBook({ teams, memberCount, loadFailed = false }: { teams: Squad[]; memberCount: number; loadFailed?: boolean }) {
  const [selectedId, setSelectedId] = useState(() => teams[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const optionsRef = useRef<HTMLUListElement>(null);
  const selected = teams.find((team) => team.id === selectedId) ?? teams[0];
  const selectedIndex = selected ? teams.findIndex((team) => team.id === selected.id) : 0;
  const needle = query.trim().toLowerCase();
  const filtered = teams.filter((team) => team.name.toLowerCase().includes(needle) || team.members.some((member) => member.name.toLowerCase().includes(needle)));

  useEffect(() => {
    const list = optionsRef.current;
    const active = list?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (list && active && list.scrollWidth > list.clientWidth) {
      list.scrollLeft += active.getBoundingClientRect().left - list.getBoundingClientRect().left - (list.clientWidth - active.offsetWidth) / 2;
    }
  }, [selected?.id, query]);

  function next(direction: number) {
    if (teams.length) setSelectedId(teams[(selectedIndex + direction + teams.length) % teams.length].id);
  }

  return (
    <>
      <div className="squads-heading"><div><p className="squads-eyebrow">The Verse <span>/</span> Teams</p><h1>Built together<span>.</span></h1></div><p className="squads-stats">{loadFailed ? 'Squads are a moment away.' : <><strong>{teams.length}</strong> squads <i /> <strong>{memberCount}</strong> people<br /><span>Different strengths. One shared ambition.</span></>}</p></div>
      {loadFailed ? <div className="squads-empty"><span aria-hidden="true">↻</span><h2>The squads are taking a moment.</h2><p>We couldn’t load the team sheets. Please try again.</p><button type="button" onClick={() => window.location.reload()}>Try again ↗</button></div> : !selected ? <div className="squads-empty"><span aria-hidden="true">✦</span><h2>The next great squad starts here.</h2><p>Teams will appear here once they’re created.</p></div> : (
        <div className="squads-workspace">
          <aside className="squads-selector" aria-label="Choose a team">
            <div className="squads-selector-heading"><h2>The squads</h2><span>{String(teams.length).padStart(2, '0')}</span></div>
            <div className="squads-search"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg><label className="sr-only" htmlFor="squad-search">Find a team or member</label><input id="squad-search" type="search" placeholder="Team or member name…" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" /></div>
            <p className="squads-search-status" aria-live="polite">{needle ? `${filtered.length} ${filtered.length === 1 ? 'squad' : 'squads'} found` : 'Choose your team sheet'}</p>
            <ul className="squads-options" ref={optionsRef}>{filtered.map((team) => <li key={team.id}><button type="button" aria-pressed={team.id === selected.id} aria-controls="squad-sheet" onClick={() => setSelectedId(team.id)}><span className="squads-option-number">{String(teams.indexOf(team) + 1).padStart(2, '0')}</span><span className="squads-option-copy"><strong>{team.name}</strong><span>{team.members.length} {team.members.length === 1 ? 'member' : 'members'}</span></span><span className="squads-option-arrow" aria-hidden="true">↗</span></button></li>)}</ul>
            {!filtered.length && <div className="squads-no-matches"><p>No squads found.</p><button type="button" onClick={() => setQuery('')}>Clear search ↗</button></div>}
            <p className="squads-selector-note">A good team makes<br />the impossible a little smaller.</p>
          </aside>

          <section className="squad-scene" aria-label="Selected team roster">
            <div className="squad-clipboard">
              <MetalClip />
              <div className="squad-sheet" id="squad-sheet">
                <div className="squad-sheet-content" key={selected.id}>
                  <div className="squad-sheet-topline"><span>HACKATHON CLUB 2.0</span><span>ROSTER / {String(selectedIndex + 1).padStart(2, '0')}</span></div>
                  <div className="squad-identity"><span className="squad-monogram" aria-hidden="true">{monogram(selected.name)}</span><div><p>Introducing</p><h2>{selected.name}</h2></div></div>
                  <p className="squad-wordmark">SQUAD</p>
                  <div className="squad-rule"><span /><p>{selected.members.length} {selected.members.length === 1 ? 'member' : 'members'}</p><span /></div>
                  <ul className="squad-roster">{selected.members.map((member, i) => {
                    const words = member.name.split(/\s+/u);
                    const family = words.pop()!;
                    return <li key={`${member.name}-${i}`}><span className="squad-member-marker" aria-hidden="true">{member.leader ? '✦' : String(i + 1).padStart(2, '0')}</span><div><span className="squad-given-name">{words.join(' ')}</span><strong>{family}</strong>{member.leader && <span className="sr-only"> — Team lead</span>}</div></li>;
                  })}</ul>
                  {selected.unlinkedMembers > 0 && <p className="squad-roster-note">{selected.unlinkedMembers} {selected.unlinkedMembers === 1 ? 'member is' : 'members are'} still being linked to this roster.</p>}
                  {!selected.members.length && !selected.unlinkedMembers && <p className="squad-roster-note">This squad is waiting for its first members.</p>}
                  <div className="squad-sheet-bottom"><span>{selected.members.some((member) => member.leader) && <><i aria-hidden="true">✦</i> Team lead</>}</span><span>LEARN. BUILD. WIN.</span></div>
                </div>
                <span className="squad-watermark" aria-hidden="true">HC</span>
              </div>
            </div>
            <ClubBadge /><DeskPen />
            <div className="squad-paging"><button type="button" onClick={() => next(-1)} aria-label="Previous team"><span aria-hidden="true">←</span></button><p aria-live="polite"><strong>{String(selectedIndex + 1).padStart(2, '0')}</strong><span>/ {String(teams.length).padStart(2, '0')}</span><span className="sr-only"> — {selected.name}</span></p><button type="button" onClick={() => next(1)} aria-label="Next team"><span aria-hidden="true">→</span></button></div>
          </section>
        </div>
      )}
    </>
  );
}
