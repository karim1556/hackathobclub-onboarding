export type WorkshopMedia = {
  id: string;
  kind: 'photo' | 'video' | 'board';
  title: string;
  description: string;
  src: string;
  poster?: string;
  duration?: string;
  position?: string;
};

export const bootcampMedia: WorkshopMedia[] = [
  { id: 'group', kind: 'photo', title: 'The people behind the builds.', description: 'A moment together at the AI-powered Hackathon Bootcamp.', src: '/workshops/bootcamp-group.webp', position: '50% 76%' },
  { id: 'together', kind: 'photo', title: 'One room. So many ideas.', description: 'The bootcamp community, together between builds.', src: '/workshops/bootcamp-together.webp', position: '50% 65%' },
  { id: 'clip-1', kind: 'video', title: 'Walking through the build.', description: 'A glimpse of a live bootcamp walkthrough.', src: '/workshops/bootcamp-clip-1.mp4', poster: '/workshops/bootcamp-clip-1.webp', duration: '0:07' },
  { id: 'clip-2', kind: 'video', title: 'From screen to explanation.', description: 'Sharing the process with the room.', src: '/workshops/bootcamp-clip-2.mp4', poster: '/workshops/bootcamp-clip-2.webp', duration: '0:07' },
  { id: 'clip-3', kind: 'video', title: 'A room full of builders.', description: 'A look around the lab during the session.', src: '/workshops/bootcamp-clip-3.mp4', poster: '/workshops/bootcamp-clip-3.webp', duration: '0:15' },
  { id: 'clip-4', kind: 'video', title: 'Questions become conversations.', description: 'A short moment from the live session.', src: '/workshops/bootcamp-clip-4.mp4', poster: '/workshops/bootcamp-clip-4.webp', duration: '0:03' },
  { id: 'clip-5', kind: 'video', title: 'Hands on. Heads together.', description: 'Students working at their stations during the bootcamp.', src: '/workshops/bootcamp-clip-5.mp4', poster: '/workshops/bootcamp-clip-5.webp', duration: '0:12' },
];

export const bootcampBoards: WorkshopMedia[] = [
  { id: 'overview', kind: 'board', title: 'The workshop brief.', description: 'The original bootcamp poster and participation certificate design.', src: '/workshops/bootcamp-overview.webp' },
  { id: 'recap', kind: 'board', title: 'The session, in snapshots.', description: 'The original photo and video recap from the bootcamp.', src: '/workshops/bootcamp-recap.webp' },
];
