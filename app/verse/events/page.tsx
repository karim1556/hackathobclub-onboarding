import type { Metadata } from 'next';
import { ClubMark } from '@/components/verse-marks';
import { WorkshopExperience } from '@/components/workshop-experience';
import './events.css';

export const metadata: Metadata = { title: 'Workshops & Events — Hackathon Club 2.0', description: 'Inside the AI-powered Hackathon Bootcamp: 123+ participants, 3+ hours of hands-on building, photos, and films from the session.' };

export default function EventsPage() {
  return <main className="events-page"><div className="events-shell"><header className="events-nav"><a href="/verse/achievements">↖ <span>This semester</span></a><a href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></a></header><div className="events-heading"><div><p>THE VERSE / WORKSHOPS & EVENTS</p><h1>Built <span>in the room.</span></h1></div><p className="events-heading-note"><span className="events-heading-star" aria-hidden="true">✳</span>Learn it. Try it.<br />Make something real.</p></div><WorkshopExperience /><footer className="events-footer"><span>HACKATHON CLUB 2.0 <i /> LEARN. BUILD. REPEAT.</span><a href="/verse/thank-you">Thank you · One last adventure ↗</a></footer></div></main>;
}
