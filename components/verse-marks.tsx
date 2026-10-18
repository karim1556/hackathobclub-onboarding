function gearPath(cx: number, cy: number, root: number, tip: number, teeth: number) {
  const vertices = Array.from({ length: teeth * 4 }, (_, i) => {
    const tooth = Math.floor(i / 4);
    const corner = i % 4;
    const angle = ((tooth + [-.5, -.34, .34, .5][corner]) * 360 / teeth - 90) * Math.PI / 180;
    const radius = corner === 1 || corner === 2 ? tip : root;
    return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
  });
  return `M${vertices.join('L')}Z`;
}

export function CollegeEmblem() {
  const gear = gearPath(459, 413, 88, 98, 12);
  const colors = ['#d83227', '#f3c600', '#727b37', '#2b3e88', '#e59a9f', '#0094c1', '#dc7d2e', '#9d4778'];
  return (
    <svg className="verse-college-logo" viewBox="100 60 700 660" aria-labelledby="college-emblem-title">
      <title id="college-emblem-title">Vasantdada Patil Pratishthan’s College of Engineering and Visual Arts</title>
      <defs><clipPath id="college-gear-clip"><path d={gear} /></clipPath></defs>
      <g fill="#fff">
        <path d="m184 170 275-101 272 101Z" />
        <path d="M124 205h657v44H124zM178 275h54v302h-54zM259 275h17v302h-17zM298 275h17v302h-17zM600 275h17v302h-17zM639 275h17v302h-17zM685 275h48v302h-48z" />
        <path d="M125 598h656Q459 817 125 598Z" />
        <circle cx="459" cy="413" r="121.5" />
      </g>
      <g fontFamily="'Times New Roman', Georgia, serif" fill="#171918" textAnchor="middle">
        <text x="459" y="149" fontSize="27" letterSpacing="3">ESTD. 1990</text>
        <text x="452" y="238" fontSize="32" fontWeight="700" textLength="615" lengthAdjust="spacingAndGlyphs">VASANTDADA PATIL PRATISHTHAN’S</text>
        <text transform="translate(212 430) rotate(-90)" fontSize="34" fontWeight="700" letterSpacing="3" textLength="232" lengthAdjust="spacingAndGlyphs">SINCERITY</text>
        <text transform="translate(698 427) rotate(90)" fontSize="34" fontWeight="700" letterSpacing="3" textLength="236" lengthAdjust="spacingAndGlyphs">INGENUITY</text>
        <text x="455" y="630" fontSize="21" fontWeight="700" textLength="520" lengthAdjust="spacingAndGlyphs">COLLEGE OF ENGINEERING AND VISUAL ARTS</text>
        <text x="459" y="668" fontSize="20" fontWeight="700" letterSpacing="1.7">EMPOWERING WITH KNOWLEDGE</text>
      </g>
      <g clipPath="url(#college-gear-clip)">
        {colors.map((color, i) => {
          const a = (i * 45 - 112.5) * Math.PI / 180;
          const b = ((i + 1) * 45 - 112.5) * Math.PI / 180;
          return <path key={color} d={`M459 413L${459 + Math.cos(a) * 115} ${413 + Math.sin(a) * 115}A115 115 0 0 1 ${459 + Math.cos(b) * 115} ${413 + Math.sin(b) * 115}Z`} fill={color} />;
        })}
      </g>
      <path d={gear} fill="none" stroke="#080a09" strokeWidth="5" strokeLinejoin="round" />
      <path d={gearPath(459, 413, 43, 47, 20)} fill="#fff" stroke="#080a09" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="459" cy="413" r="21" fill="#292b29" />
      <text x="459" y="574" fill="#fff" fontFamily="Arial, Helvetica, sans-serif" fontSize="31" letterSpacing="2.4" textAnchor="middle">CREATIVITY</text>
    </svg>
  );
}

export function ClubMark() {
  return (
    <svg className="verse-club-logo" viewBox="0 0 210 145" aria-labelledby="club-mark-title">
      <title id="club-mark-title">Hackathon Club 2.0</title>
      <defs>
        <linearGradient id="club-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#20eaff" /><stop offset=".5" stopColor="#00a6ff" /><stop offset="1" stopColor="#1734ed" />
        </linearGradient>
      </defs>
      <path d="m8 20 21-17v119l-21 18Zm82 0 22-17v137l-22-18Z" fill="#eef3ff" />
      <path d="M36 50h43v90H57V72H36Zm84-47h17l49 42-15 16-51-43Zm0 119 51-43 15 16-49 45h-17Z" fill="url(#club-blue)" />
      <path d="m151 65 9 6-9 6" fill="none" stroke="#00c8ff" strokeWidth="2" />
      <text x="174" y="78" fill="#00c8ff" fontFamily="Arial, sans-serif" fontSize="19" letterSpacing="1">2.0</text>
    </svg>
  );
}
