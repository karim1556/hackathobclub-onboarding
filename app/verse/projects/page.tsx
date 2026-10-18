import type { Metadata } from 'next';
import Link from 'next/link';
import { ClubMark } from '@/components/verse-marks';
import { ProjectWall } from '@/components/project-wall';
import './projects.css';

export const metadata: Metadata = { title: 'Student Projects — Hackathon Club 2.0', description: 'Explore 18 student projects across AI, healthcare, mobility, education and more, built by Hackathon Club teams.' };
export default function ProjectsPage() {
  return <main className="projects-page"><div className="projects-shell">
    <header className="projects-nav"><Link href="/verse/winners">↖ <span>Our winners</span></Link><Link href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></Link></header>
    <ProjectWall />
    <footer className="projects-footer"><span>HACKATHON CLUB 2.0 <i /> THE PROJECTS CHAPTER</span><Link href="/verse/achievements">This semester’s achievements ↗</Link></footer>
  </div></main>;
}
