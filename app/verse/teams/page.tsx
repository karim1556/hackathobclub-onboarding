import type { Metadata } from 'next';
import Link from 'next/link';
import { ClubMark } from '@/components/verse-marks';
import { SquadBook } from '@/components/squad-book';
import { getTeamRosters, type Squad } from '@/lib/team-rosters';
import './teams.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Teams — Hackathon Club 2.0',
  description: 'Meet the squads of Hackathon Club 2.0. Find your team and explore the people building together.',
};

export default async function TeamsPage() {
  let teams: Squad[] = [];
  let memberCount = 0;
  let loadFailed = false;
  try {
    const rosters = await getTeamRosters();
    teams = rosters.teams;
    memberCount = rosters.memberCount;
  } catch (error) {
    console.error('Unable to load team rosters:', error instanceof Error ? error.message : 'Unknown error');
    loadFailed = true;
  }
  return (
    <main className="squads-page">
      <div className="squads-desk">
        <header className="squads-nav">
          <Link href="/verse/students" className="squads-back"><span aria-hidden="true">↖</span> Registered students</Link>
          <Link href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></Link>
        </header>
        <SquadBook teams={teams} memberCount={memberCount} loadFailed={loadFailed} />
        <footer className="squads-footer"><span>HACKATHON CLUB 2.0 <i /> THE SQUADS CHAPTER</span><Link href="/verse/stats">Previous season stats <span aria-hidden="true">↗</span></Link></footer>
      </div>
    </main>
  );
}
