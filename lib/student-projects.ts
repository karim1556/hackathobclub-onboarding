export type ProjectArtwork = 'shield' | 'interview' | 'standards' | 'magazine' | 'agents' | 'train' | 'analytics' | 'livestock' | 'location' | 'ticket' | 'folder' | 'community' | 'medical' | 'books' | 'trust' | 'organization' | 'controller' | 'voice';
export type StudentProject = { id: string; name: string; teamId: string; description: string; category: string; artwork: ProjectArtwork; tone: string; shape: string; featured?: boolean };
export const projectTeams = [
  { id: 'astella', name: 'Astella', members: ['Karim Shaikh', 'Manas Amare', 'Saathvik Shetty', 'Vedanth Gali'] },
  { id: 'coursevault', name: 'Fauzan & team', members: ['Fauzan Siddiqui', 'Md. Amaan', 'Shhad'] },
  { id: 'five-star', name: 'Five Star', members: ['Ayaan Shaikh', 'Kartikey Sharma', 'Tatpar Potpose', 'Asmit Tungare'] },
  { id: 'runtime-rebels', name: 'Run-Time Rebels', members: ['Devashree Sarvade', 'Raj Patil', 'Angel Mandaokar', 'Ronik Bhalerao'] },
  { id: 'algorithm-elite', name: 'Algorithm Elite', members: ['Sahana Zanjure', 'Tanvi Ghogare'] },
  { id: '4-bit-coders', name: '4-Bit Coders', members: ['Atharv Shinde', 'Sahil Chavan', 'Aditya Rahate'] },
  { id: 'scout-regiment', name: 'Scout Regiment', members: ['Vishvajeet Chopade', 'Shreyash Kurade', 'Soham Konduskar', 'Vedant Khade', 'Sarthak Dethe'] },
  { id: 'eclair', name: 'Eclair', members: ['Asawari Chinchole', 'Samay Gupta'] },
];

export const studentProjects: StudentProject[] = [
  { id: 'rkive', name: 'RKive', teamId: 'astella', description: 'Magazine and newsletter uploads.', category: 'Publishing', artwork: 'magazine', tone: 'lavender', shape: 'tower', featured: true },
  { id: 'suhita', name: 'Suhita', teamId: 'astella', description: 'A team of AI agents for ASHA workers.', category: 'Community health', artwork: 'agents', tone: 'navy', shape: 'feature', featured: true },
  { id: 'coursevault', name: 'CourseVault', teamId: 'coursevault', description: 'A course file app for faculty.', category: 'Faculty tools', artwork: 'folder', tone: 'navy', shape: 'feature', featured: true },
  { id: 'nishpaksh', name: 'NishPaksh', teamId: 'astella', description: 'Guardrails for AI chatbots.', category: 'AI safety', artwork: 'shield', tone: 'cobalt', shape: 'tower', featured: true },
  { id: 'pramaan', name: 'Pramaan', teamId: 'five-star', description: 'A browser-first interview integration layer.', category: 'Interviews', artwork: 'interview', tone: 'ink', shape: 'wide' },
  { id: 'manaksetu', name: 'Manaksetu', teamId: 'runtime-rebels', description: 'AI that turns tenders into ranked, verified Indian Standards.', category: 'AI & standards', artwork: 'standards', tone: 'violet', shape: 'short' },
  { id: 'rail-opt-ai', name: 'RAIL-OPT AI', teamId: 'astella', description: 'Traffic control system for trains.', category: 'Mobility', artwork: 'train', tone: 'blue', shape: 'banner' },
  { id: 'learnlytics', name: 'Learnlytics', teamId: 'eclair', description: 'An AI-powered DSA platform for coding practice, performance analysis, learning-gap detection, and faculty progress tracking.', category: 'Learning & DSA', artwork: 'analytics', tone: 'indigo', shape: 'third' },
  { id: 'bionexus', name: 'BIONEXUS', teamId: 'eclair', description: 'An AI-assisted, offline-first livestock health surveillance platform for early disease detection, veterinary decision support, disease-risk mapping, and verified medicine dispensing.', category: 'Livestock health', artwork: 'livestock', tone: 'teal', shape: 'slim' },
  { id: 'vigilante', name: 'Vigilante', teamId: 'scout-regiment', description: 'Smart tourist safety response system.', category: 'Travel safety', artwork: 'location', tone: 'cobalt', shape: 'third' },
  { id: 'campconnect', name: 'CampConnect', teamId: 'runtime-rebels', description: 'Discover, register, and manage campus events, all in one place.', category: 'Campus events', artwork: 'ticket', tone: 'violet', shape: 'third' },
  { id: 'sahayak', name: 'Sahayak', teamId: 'algorithm-elite', description: 'An intelligent community coordination platform.', category: 'Community', artwork: 'community', tone: 'blue', shape: 'banner' },
  { id: 'centralcare', name: 'CentralCare', teamId: 'algorithm-elite', description: 'Centralized patient record management system.', category: 'Healthcare', artwork: 'medical', tone: 'teal', shape: 'third' },
  { id: 'cortex-shelf', name: 'Cortex Shelf', teamId: '4-bit-coders', description: 'Smart library management system.', category: 'Library tools', artwork: 'books', tone: 'indigo', shape: 'third' },
  { id: 'trustx', name: 'TrustX', teamId: 'scout-regiment', description: 'An AI-powered digital trust and phishing detection platform.', category: 'Cybersecurity', artwork: 'trust', tone: 'navy', shape: 'third' },
  { id: 'corg', name: 'Corg', teamId: '4-bit-coders', description: 'Organization management software.', category: 'Organization', artwork: 'organization', tone: 'violet', shape: 'third' },
  { id: 'game-over', name: 'Game Over', teamId: '4-bit-coders', description: 'Multipurpose software for gamers and PC builders.', category: 'Gaming & PCs', artwork: 'controller', tone: 'cobalt', shape: 'short' },
  { id: 'vocalize', name: 'Vocalize', teamId: 'scout-regiment', description: 'Speech and language therapy management system.', category: 'Speech therapy', artwork: 'voice', tone: 'lavender', shape: 'quarter' },
];
