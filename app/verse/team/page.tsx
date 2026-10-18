import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { ClubMark } from '@/components/verse-marks';
import './team.css';

export const metadata: Metadata = {
  title: 'Our Team — Hackathon Club 2.0',
  description: 'Meet Karishma S., Karim Shaikh, Vedanth Gali, Manas Amare, and Saathvik Shetty: the people behind Hackathon Club 2.0.',
};

const members = [
  { id: 'karishma', name: 'Karishma S.', role: 'Faculty Coordinator', number: '01' },
  { id: 'vedanth', name: 'Vedanth Gali', role: 'Student Lead', number: '02' },
  { id: 'karim', name: 'Karim Shaikh', role: 'Student Lead', number: '03' },
  { id: 'manas', name: 'Manas Amare', role: 'Student Lead', number: '04' },
  { id: 'saathvik', name: 'Saathvik Shetty', role: 'Student Lead', number: '05' },
];

const tiles = [
  { letter: 'O', paper: '#1749c4', ink: '#d9eeff', angle: '-9deg', offset: '9px', font: 'Georgia, serif' },
  { letter: 'U', paper: '#c4e8ff', ink: '#101c58', angle: '5deg', offset: '-2px', font: 'var(--font-brand-mono), monospace' },
  { letter: 'R', paper: '#8064d4', ink: '#0c1237', angle: '-7deg', offset: '4px', font: 'Georgia, serif' },
  { letter: 'T', paper: '#101b4a', ink: '#9ae7ff', angle: '7deg', offset: '-4px', font: 'Georgia, serif' },
  { letter: 'E', paper: '#49b9f0', ink: '#0e215b', angle: '-5deg', offset: '7px', font: 'Arial Black, sans-serif' },
  { letter: 'A', paper: '#d2ddf5', ink: '#2d2988', angle: '6deg', offset: '-5px', font: 'Georgia, serif' },
  { letter: 'M', paper: '#355ee2', ink: '#e6efff', angle: '-8deg', offset: '3px', font: 'var(--font-display), sans-serif' },
];

function Word({ start, end }: { start: number; end: number }) {
  return <span className="team-title-word">{tiles.slice(start, end).map((tile) => (
    <span key={tile.letter} className="team-letter" style={{ '--paper': tile.paper, '--ink': tile.ink, '--angle': tile.angle, '--offset': tile.offset, fontFamily: tile.font } as CSSProperties}>{tile.letter}</span>
  ))}</span>;
}

export default function TeamPage() {
  return (
    <main className="team-page">
      <section className="team-board" aria-labelledby="team-heading">
        <div className="team-spotlight" aria-hidden="true" />
        <svg className="team-grain" aria-hidden="true" width="100%" height="100%">
          <filter id="team-paper-grain"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#team-paper-grain)" opacity=".13" />
        </svg>

        <header className="team-header">
          <a href="/verse" className="team-back"><span aria-hidden="true">↖</span> Back to the Verse</a>
          <a href="/verse" className="team-brand" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></a>
        </header>

        <svg className="team-bulb" viewBox="0 0 240 230" aria-hidden="true">
          <defs>
            <radialGradient id="team-bulb-glow"><stop stopColor="#e9faff" stopOpacity=".85" /><stop offset=".25" stopColor="#87caff" stopOpacity=".35" /><stop offset="1" stopColor="#76baff" stopOpacity="0" /></radialGradient>
            <linearGradient id="team-bulb-glass" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#b1d9ff" /><stop offset="1" stopColor="#f2fcff" /></linearGradient>
          </defs>
          <path d="M120 0v59" stroke="#030914" strokeWidth="5" />
          <ellipse cx="120" cy="140" rx="115" ry="90" fill="url(#team-bulb-glow)" />
          <path d="M103 83c0 18-17 29-17 47a34 34 0 0 0 68 0c0-18-17-29-17-47Z" fill="url(#team-bulb-glass)" />
          <path d="m112 112 8 16 8-16M120 128v25" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".75" />
          <path d="M96 55h48v18h-48zM101 73h38v15h-38z" fill="#172949" />
          <path d="M101 78h38M103 84h34" stroke="#527299" strokeWidth="2" />
        </svg>

        <div className="team-scribble team-scribble-one" aria-hidden="true">Good people.<br />Great possibilities.<span>↘</span></div>
        <div className="team-scribble team-scribble-two" aria-hidden="true">a little chaos,<br />a lot of building.</div>

        {members.map((member) => (
          <figure className={`team-polaroid team-polaroid-${member.id}`} key={member.id}>
            <span className="team-tape" aria-hidden="true" />
            <div className="team-portrait">
              <picture><img src={`/team/${member.id}.webp`} alt={member.name} width={446} height={525} decoding="async" /></picture>
              <span className="team-photo-number" aria-hidden="true">HC / {member.number}</span>
            </div>
            <figcaption><span className="team-member-name">{member.name}</span><span className="team-member-role">{member.role}</span></figcaption>
          </figure>
        ))}

        <div className="team-title-block">
          <p className="team-kicker">Meet the people behind</p>
          <h1 id="team-heading"><span className="sr-only">Our team</span><span aria-hidden="true" className="team-title-letters"><Word start={0} end={3} /><Word start={3} end={7} /></span></h1>
          <p className="team-subtitle">A few curious minds.<br />One Hackathon Club.</p>
          <span className="team-title-doodle" aria-hidden="true">✳</span>
        </div>

        <footer className="team-footer"><span>HACKATHON CLUB 2.0</span><a className="team-next" href="/verse/students">Registered students <span aria-hidden="true">↗</span></a></footer>
      </section>
    </main>
  );
}
