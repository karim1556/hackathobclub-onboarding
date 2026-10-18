import { seasonHighlights } from '@/lib/season-highlights';

export const winnerPhotos: Record<number, string> = {
  1: '/winners/algoforge.webp',
  3: '/winners/hacknova.webp',
  4: '/winners/hackstomp.webp',
  7: '/winners/colo-hacks.webp',
  8: '/winners/knowcode-ravenclaw.webp',
  9: '/winners/knowcode-harshita.webp',
  10: '/winners/plutonium.webp',
};

export const winningEntries = seasonHighlights
  .filter((entry) => entry.category === 'podium' || entry.category === 'special')
  .sort((a, b) => Number(Boolean(winnerPhotos[b.id])) - Number(Boolean(winnerPhotos[a.id])));
