export const QUEST_FLOOR = 510;
export const QUEST_FINISH = 5330;
export const QUEST_WIDTH = 5700;
export const questPlatforms = [
  { x: 650, width: 180, y: 440 }, { x: 920, width: 210, y: 365 },
  { x: 1730, width: 190, y: 440 }, { x: 2000, width: 200, y: 365 },
  { x: 2900, width: 200, y: 440 }, { x: 3180, width: 190, y: 365 },
  { x: 4070, width: 180, y: 440 }, { x: 4350, width: 220, y: 365 },
];
export const questPickups = [
  ...Array.from({ length: 32 }, (_, n) => ({ id: `coin-${n}`, x: 340 + n * 150, y: 453, kind: 'coin' as const, label: 'Coin', color: '#ffe3a0' })),
  ...questPlatforms.flatMap((p, n) => [0, 1, 2].map(i => ({ id: `air-${n}-${i}`, x: p.x + 35 + i * 55, y: p.y - 48, kind: 'coin' as const, label: 'Coin', color: '#ffe3a0' }))),
  ...[1100, 2170, 3340, 4530].map((x, n) => ({ id: `trophy-${n}`, x, y: 295, kind: 'trophy' as const, label: 'Trophy', color: '#c4baff' })),
];
export type QuestGame = { x: number; y: number; velocityY: number; direction: number; auto: boolean; paused: boolean; finished: boolean; grounded: boolean; collected: Set<string> };
export function createQuest(): QuestGame { return { x: 140, y: 0, velocityY: 0, direction: 1, auto: true, paused: false, finished: false, grounded: true, collected: new Set() }; }
export function jumpQuest(game: QuestGame) { if (game.grounded && !game.paused && !game.finished) { game.velocityY = -585; game.grounded = false; } }
export function advanceQuest(game: QuestGame, seconds: number, input: number) {
  if (game.paused || game.finished) return [];
  const direction = game.auto ? 1 : input;
  if (direction) game.direction = direction;
  if (game.auto && game.grounded && questPlatforms.some(p => p.x - game.x > 0 && p.x - game.x < 95 && p.y < QUEST_FLOOR + game.y)) jumpQuest(game);
  const oldFeet = QUEST_FLOOR + game.y;
  game.x = Math.max(60, Math.min(QUEST_FINISH, game.x + direction * (game.auto ? 185 : 260) * seconds));
  game.velocityY += 1400 * seconds;
  let feet = oldFeet + game.velocityY * seconds;
  game.grounded = false;
  if (game.velocityY >= 0) {
    const landing = questPlatforms.find(p => game.x > p.x - 12 && game.x < p.x + p.width + 12 && oldFeet <= p.y + 1 && feet >= p.y);
    if (landing) { feet = landing.y; game.velocityY = 0; game.grounded = true; }
  }
  if (feet >= QUEST_FLOOR) { feet = QUEST_FLOOR; game.velocityY = 0; game.grounded = true; }
  game.y = feet - QUEST_FLOOR;
  const pickups = questPickups.filter(p => !game.collected.has(p.id) && Math.abs(p.x - game.x) < 36 && Math.abs(p.y - (feet - 52)) < 50);
  pickups.forEach(p => game.collected.add(p.id));
  if (game.x >= QUEST_FINISH) game.finished = true;
  return pickups;
}
