import type { Metadata } from 'next';
import Link from 'next/link';
import { ClubMark } from '@/components/verse-marks';
import { WinnersShowcase } from '@/components/winners-showcase';
import './winners.css';

export const metadata: Metadata = { title: 'Our Winners — Hackathon Club 2.0', description: 'The people, podium finishes and special awards behind Hackathon Club 2.0’s previous seasons.' };

export default function WinnersPage() {
  return <main className="winners-page"><div className="winners-shell">
    <header className="winners-nav"><Link href="/verse/stats">↖ <span>Season stats</span></Link><Link href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></Link></header>
    <WinnersShowcase />
    <footer className="winners-footer"><span>HACKATHON CLUB 2.0 <i /> THE WINNERS CHAPTER</span><Link href="/verse/projects">Student projects ↗</Link></footer>
  </div></main>;
}
