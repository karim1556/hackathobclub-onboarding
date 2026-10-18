import type { Metadata } from 'next';
import { ClubMark } from '@/components/verse-marks';
import { KarimQuest } from '@/components/karim-quest';
import './thank-you.css';

export const metadata: Metadata = { title: 'Thank You — Hackathon Club 2.0', description: 'Thanks for being part of the build. Take one last adventure through the Verse with Karim’s playable moonlight adventure.' };

export default function ThankYouPage() {
  return <main className="thankyou-page"><div className="thankyou-shell"><header className="thankyou-nav"><a href="/verse/events">↖ <span>Workshops & events</span></a><a href="/verse" aria-label="Hackathon Club 2.0 — The Verse"><ClubMark /></a></header><div className="thankyou-heading"><p>THE VERSE / THE FINAL CHAPTER</p><h1>Thank <span>you.</span><i aria-hidden="true">✳</i></h1><p>Every builder. Every late night. Every next idea.<br /><span>Thanks for being part of the build.</span></p></div><KarimQuest /><footer className="thankyou-footer"><span>HACKATHON CLUB 2.0 <i /> THE END IS JUST A CHECKPOINT.</span><a href="/verse">Back to the Verse ↗</a></footer></div></main>;
}
