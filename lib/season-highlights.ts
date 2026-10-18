export type HighlightCategory = 'podium' | 'finalists' | 'special' | 'participation';
export type SeasonHighlight = { id: number; event: string; college: string; result: string; prize?: string; team?: string; members: string[]; category: HighlightCategory };

// Club-supplied highlights. The 50+ / 10+ season totals are reported separately.
export const seasonHighlights: SeasonHighlight[] = [
  { id: 1, event: 'AlgoForge 2026', college: 'KJ Somaiya Institute of Technology, Sion', result: 'Winner', prize: '1st prize', team: 'The Iterators', members: ['Rayyan Ansari · TE B Comps', 'Siddhesh Achrekar · TE B Comps'], category: 'podium' },
  { id: 2, event: 'Heat 1.0', college: 'ATLAS SkillTech University', result: 'Consolation prize', prize: '3rd prize', team: 'BrotherHood', members: ['Kartikey Sharma', 'Sanika Jadhav', 'Atharv Binwade', 'Sanchita Susvailkar', 'Tejas Gaikwad'], category: 'podium' },
  { id: 3, event: 'Hacknova', college: 'Shivajirao Jondhale College, Dombivli', result: 'Runner up', prize: '2nd prize', team: 'GPS', members: ['Pranita Shinde', 'Karim Shaikh', 'Shalaka Sonawane', 'Gauri Kautkar'], category: 'podium' },
  { id: 4, event: 'Hackstomp', college: 'Universal SkillTech University', result: 'Winner', prize: '1st prize', team: 'Squadii', members: ['Pranita Shinde', 'Shalaka Sonawane', 'Harsh Alkar', 'Maitreya Channe'], category: 'podium' },
  { id: 5, event: 'Heat 1.0', college: 'ATLAS SkillTech University', result: 'Consolation prize', prize: 'Top 4', team: 'HackStreet Coders', members: ['Sachin Umachandar', 'Samay Gupta', 'Anjali Vishwakarma', 'Asawari Chinchole', 'Vineet Bhati'], category: 'finalists' },
  { id: 6, event: 'Quantum Hacks 2026', college: 'Rkdemy – Techskills', result: 'Runner up', prize: '2nd prize', members: ['Shivam Patil', 'Drushti Kadam', 'Atharva Karjat', 'Vaishnav Tathele'], category: 'podium' },
  { id: 7, event: 'Colo Hacks', college: 'Don Bosco Institute of Technology', result: 'Winner', prize: '1st prize', members: ['Atharv Gole', 'Sahil Tambitkar', 'Sairaj Sutar', 'Pranit Jadhav'], category: 'podium' },
  { id: 8, event: 'KnowCode 3.0', college: 'KJ Somaiya Institute of Technology, Sion', result: 'Runner up', prize: '2nd prize', team: 'Team Ravenclaw', members: ['Sai Bagwe', 'Sunny Kadam', 'Siddesh Achrekar', 'Subhodip Mathur'], category: 'podium' },
  { id: 9, event: 'KnowCode 3.0', college: 'KJ Somaiya Institute of Technology, Sion', result: 'Winner', prize: '2nd prize', members: ['Harshita Singh', 'Karan Motiwale', 'Iha Pathak', 'Shrinivas Muchewad'], category: 'podium' },
  { id: 10, event: 'Plutonium Hackathon 2026', college: 'MECS/ECSA, VPPCOE VA', result: 'Best Technical Implementation', team: 'Gate 404', members: ['Shubham Kumbhar', 'Sakshi Patil', 'Suchit Bangar', 'Manas Amare'], category: 'special' },
  { id: 11, event: 'Quasar 4.0', college: 'T & P Dept, VPPCOE VA', result: 'Sector Winner', members: ['Shruti Rapolu', 'Shreeya Patil', 'Neha Chintala', 'Mohammed Sayed'], category: 'special' },
  { id: 12, event: 'Quasar 4.0', college: 'T & P Dept, VPPCOE VA', result: 'Best UI UX Design', members: ['Ashish Dixit', 'Vijay Gaud', 'Krishna Chaudhary', 'Akif Khan'], category: 'special' },
  { id: 13, event: 'Quasar 4.0', college: 'T & P Dept, VPPCOE VA', result: 'Best FullStack Development', members: ['Karim Shaikh', 'Ayaan Shaikh'], category: 'special' },
  { id: 14, event: 'Quasar 4.0', college: 'T & P Dept, VPPCOE VA', result: 'Best FullStack Development', members: ['Harshita Singh', 'Karan Motiwale', 'Iha Pathak', 'Shrinivas Muchewad'], category: 'special' },
  { id: 15, event: 'Hackhive', college: 'Datta Meghe College of Engineering, Airoli', result: 'Participant', prize: 'Top 3', team: 'Astella', members: ['Pranita Shinde', 'Shalaka Sonawane', 'Karim Shaikh', 'Gauri Kautkar'], category: 'podium' },
  { id: 16, event: 'Hackverse', college: 'Watumull College of Engineering', result: 'Participant', prize: 'Top 10', team: 'Astella', members: ['Karim Shaikh', 'Gauri Kautkar', 'Mrunmayi Channe', 'Suhani'], category: 'finalists' },
  { id: 17, event: 'India Innovate', college: 'Governance of Delhi', result: 'Participant', team: 'Astella', members: ['Pranita Shinde', 'Shalaka Sonawane', 'Gauri Kautkar', 'Karim Shaikh'], category: 'participation' },
  { id: 18, event: 'UAI Hawk-athon', college: 'Universal AI University', result: 'Participant', team: 'Astella', members: ['Pranita Shinde', 'Karim Shaikh', 'Shalaka Sonawane', 'Gauri Kautkar'], category: 'participation' },
  { id: 19, event: 'UAI Hawk-athon', college: 'Universal AI University', result: 'Participant', team: 'Underdogs', members: ['Sachin Umachandar', 'Samay Gupta', 'Vineet Bhati'], category: 'participation' },
  { id: 20, event: 'LOOP 1.0', college: 'Bharati Vidyapeeth College of Engineering, Navi Mumbai', result: 'Participant', prize: 'Top 10', team: 'Git Happens', members: ['Rayyan Ansari', 'Kanishka Kshirsagar', 'Gauri Kshirsagar', 'Divyajeet Sahu', 'Aarya Dalvi'], category: 'finalists' },
  { id: 21, event: 'Hackverse', college: 'Watumull College of Engineering', result: 'Participant', team: 'Order of the Phoenix', members: ['Shaan Edroos', 'Siddharth Tiwari', 'Manas Amare', 'Diksha Deware'], category: 'participation' },
  { id: 22, event: 'AlgoForge 2026', college: 'KJ Somaiya Institute of Technology, Sion', result: 'Participant', prize: 'Top 5', team: 'DeployOrDie', members: ['Ritika Darade', 'Shree Alasande', 'Aayush Shinde', 'Krishna Choudhary'], category: 'finalists' },
  { id: 23, event: 'Code Prix', college: 'KJ Somaiya Institute of Technology, Sion', result: 'Participant', prize: 'Top 5', team: 'DeployOrDie', members: ['Ritika Darade', 'Shree Alasande', 'Aayush Shinde', 'Krishna Choudhary'], category: 'finalists' },
];
