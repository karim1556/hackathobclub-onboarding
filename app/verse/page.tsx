import type { Metadata } from 'next';
import { CollegeEmblem, ClubMark } from '@/components/verse-marks';
import { VerseHologram } from '@/components/verse-hologram';
import './verse.css';

export const metadata: Metadata = {
  title: 'The Verse — Hackathon Club 2.0',
  description: 'The Hackathon Club universe. Our people, teams, projects, events, and wins, all in one place.',
};

const chapters = [
  'Registered students',
  'Teams',
  'Attendance',
  'Team projects',
  'Hackathon registrations',
  'Winners',
  'Club events',
];

export default function VersePage() {
  return (
    <main className="verse">
      <div className="verse-poster">
        <div className="verse-year" aria-hidden="true"><span>20</span><span>26</span></div>

        <header className="verse-header">
          <CollegeEmblem />
          <div className="verse-institution">
            <p className="verse-college-name">Vasantdada Patil Pratishthan’s<br />College of Engineering and Visual Arts, Mumbai</p>
            <p className="verse-accreditation">An Autonomous Institute Affiliated to Mumbai University<br />NAAC ACCREDITED with “A” Grade<br />NBA ACCREDITED (Dated 1/7/2024 to 30/06/2027)</p>
          </div>
          <ClubMark />
        </header>

        <p className="verse-department">Department of Computer Engineering</p>

        <div className="verse-center">
          <VerseHologram />
        </div>

        <div className="verse-title-block">
          <p className="verse-eyebrow"><span /> Hackathon Club 2.0 <span /></p>
          <h1>Enter the Verse<span className="verse-title-period">.</span></h1>
          <div className="verse-bottom-line">
            <span>Our people. Our projects. Our next chapter.</span>
            <div className="verse-bottom-actions">
              <a href="/verse/students" className="verse-back">Registered students <span aria-hidden="true">↗</span></a>
              <a href="/verse/teams" className="verse-back">Teams <span aria-hidden="true">↗</span></a>
              <a href="/verse/stats" className="verse-back">Season stats <span aria-hidden="true">↗</span></a>
              <a href="/verse/winners" className="verse-back">Winners <span aria-hidden="true">↗</span></a>
              <a href="/verse/projects" className="verse-back">Projects <span aria-hidden="true">↗</span></a>
              <a href="/verse/achievements" className="verse-back">This semester <span aria-hidden="true">↗</span></a>
              <a href="/verse/events" className="verse-back">Workshops & events <span aria-hidden="true">↗</span></a>
              <a href="/verse/thank-you" className="verse-back">Thank you <span aria-hidden="true">↗</span></a>
              <a href="/verse/team" className="verse-back">Our team <span aria-hidden="true">↗</span></a>
              <a href="/" className="verse-back">Back to the club <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>

        <footer className="verse-ticker" aria-label="Coming to the Verse">
          <div className="verse-ticker-track">
            {[0, 1].map((copy) => (
              <div className="verse-ticker-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {chapters.map((chapter) => <span key={chapter}><i aria-hidden="true" />{chapter}</span>)}
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
