import type { Metadata } from 'next';
import { ClubMark } from '@/components/verse-marks';
import { SemesterShowcase } from '@/components/semester-showcase';
import './achievements.css';

export const metadata: Metadata = {
  title: 'This Semester — Hackathon Club 2.0',
  description: 'This semester’s achievements at Mindcraft, Technothon and Ideathon. Six moments from the Hackathon Club.',
};

export default function AchievementsPage() {
  return <main className="achievements-page"><div className="achievements-shell">
    <header className="achievements-nav"><a href="/verse/projects">↖ <span>Student projects</span></a><a href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></a></header>
    <div className="achievements-heading"><div><p>THE VERSE / THIS SEMESTER</p><h1>In <span>full force.</span></h1></div><p className="achievements-heading-note">New rooms. Bigger ideas.<br /><span>The same Hackathon Club.</span></p></div>
    <SemesterShowcase />
    <footer className="achievements-footer"><span>HACKATHON CLUB 2.0 <i /> THE NEXT CHAPTER</span><a href="/verse/events">Workshops & events ↗</a></footer>
  </div></main>;
}
