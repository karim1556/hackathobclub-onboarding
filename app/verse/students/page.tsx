import type { Metadata } from 'next';
import Link from 'next/link';
import { ClubMark } from '@/components/verse-marks';
import { StudentDirectory } from '@/components/student-directory';
import { getRegisteredStudentNames } from '@/lib/registered-students';
import './students.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Registered Students — Hackathon Club 2.0',
  description: 'Meet the builders of Hackathon Club. A verse of curious minds, big ideas, and shared possibilities.',
};

export default async function StudentsPage() {
  let names: string[] = [];
  let loadFailed = false;
  try {
    names = await getRegisteredStudentNames();
  } catch (error) {
    console.error('Unable to load student names:', error instanceof Error ? error.message : 'Unknown error');
    loadFailed = true;
  }

  return (
    <main className="students-page" id="students-top">
      <div className="students-shell">
        <header className="students-nav">
          <Link className="students-back" href="/verse"><span aria-hidden="true">↖</span> Back to the Verse</Link>
          <div className="students-nav-right"><Link href="/verse/teams">Teams <span aria-hidden="true">↗</span></Link><Link href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></Link></div>
        </header>
        <StudentDirectory names={names} loadFailed={loadFailed} />
        <footer className="students-footer"><span>HACKATHON CLUB 2.0 <i /> BUILT BY OUR PEOPLE</span><a href="#students-top">Back to the top <span aria-hidden="true">↑</span></a></footer>
      </div>
    </main>
  );
}
