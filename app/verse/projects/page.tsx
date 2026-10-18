import type { Metadata } from 'next';
import { ClubMark } from '@/components/verse-marks';
import { ProjectWall } from '@/components/project-wall';
import './projects.css';

export const metadata: Metadata = { title: 'Student Projects — Hackathon Club 2.0', description: 'Explore 18 student projects across AI, healthcare, mobility, education and more, built by Hackathon Club teams.' };
export default function ProjectsPage() {
  return <main className="projects-page"><div className="projects-shell">
    <header className="projects-nav"><a href="/verse/winners">↖ <span>Our winners</span></a><a href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></a></header>
    <ProjectWall />
    <footer className="projects-footer"><span>HACKATHON CLUB 2.0 <i /> THE PROJECTS CHAPTER</span><a href="/verse/achievements">This semester’s achievements ↗</a></footer>
  </div></main>;
}
