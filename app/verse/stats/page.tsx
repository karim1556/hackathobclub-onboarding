import type { Metadata } from 'next';
import Link from 'next/link';
import { ClubMark } from '@/components/verse-marks';
import { SeasonStats } from '@/components/season-stats';
import './stats.css';

export const metadata: Metadata = { title: 'Our Track Record — Hackathon Club 2.0', description: 'Previous-season hackathon appearances, podium finishes and special awards from Hackathon Club 2.0.' };

export default function StatsPage() {
  return <main className="season-page"><div className="season-shell">
    <header className="season-nav"><Link href="/verse/teams">↖ <span>The squads</span></Link><Link href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></Link></header>
    <SeasonStats />
    <footer className="season-footer"><span>HACKATHON CLUB 2.0 <i /> THE IMPACT CHAPTER</span><Link href="/verse/winners">Our winners ↗</Link></footer>
  </div></main>;
}
