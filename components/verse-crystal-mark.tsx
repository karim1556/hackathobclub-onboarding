// Facets follow the supplied HC artwork, including its asymmetric C arms.
const facets = [
  ['184,111 274,79 274,201 184,225', 'depth'],
  ['184,296 274,326 274,412 184,443', 'depth'],
  ['130,422 184,443 274,412 220,391', 'top'],
  ['184,225 274,201 383,241 294,266', 'top'],
  ['350,165 440,126 440,474 350,508', 'depth'],
  ['130,90 222,62 274,79 184,111', 'top'],
  ['294,143 391,107 440,126 350,165', 'top'],
  ['130,90 184,111 184,225 294,266 294,143 350,165 350,508 293,488 294,337 184,296 184,443 130,422', 'front'],
  ['438,215 519,275 519,391 438,426', 'depth'],
  ['384,177 439,126 438,426 454,461 454,529 384,435', 'spine'],
  ['439,126 540,81 688,204 571,237', 'top'],
  ['439,126 571,237 570,309 438,215', 'arm'],
  ['571,237 688,204 687,270 570,309', 'end'],
  ['438,426 533,390 587,440 454,461', 'top'],
  ['533,390 616,354 681,416 587,440', 'top'],
  ['454,461 533,417 587,440 587,500 454,529', 'arm'],
  ['587,440 681,416 681,471 587,500', 'end'],
] as const;

const gradients = {
  front: ['#cbb0ff', '#4be7ff', '#027acf', '#080e62', '#541baf', '#079de9', '#75f2ff', '#0a3a9e', '#c695ff'],
  depth: ['#77e5ff', '#08337e', '#100a52', '#631aba', '#1551d1', '#20d0ff', '#122b83', '#a17cf2', '#57deff'],
  top: ['#c49af4', '#3dc8fb', '#143b99', '#3a66ce', '#9defff', '#079ad5', '#7862c6', '#b67de8', '#72d5ff'],
  spine: ['#a6fcff', '#27d6ff', '#1367c3', '#172083', '#8554dc', '#33c2ee', '#092271', '#4a3eb0', '#9ac5ff'],
  arm: ['#9849d6', '#1c2b9a', '#068ce5', '#1b54ca', '#21c4ed', '#0a3c9a', '#2d238c', '#9850c2', '#49c9ff'],
  end: ['#acb8fc', '#1973c0', '#06366e', '#2c41a6', '#31b9dc', '#0a3e92', '#6c53b1', '#99c5ee', '#af7ef2'],
};

export function CrystalMark() {
  return (
    <svg className="verse-crystal" viewBox="105 40 610 510" aria-hidden="true">
      <defs>
        {Object.entries(gradients).map(([name, colors]) => (
          <linearGradient key={name} id={`hc-${name}`} x1="0" y1="0" x2={name === 'top' ? '.8' : '1'} y2={name === 'top' ? '1' : '.2'}>
            {colors.map((color, i) => <stop key={i} offset={i / (colors.length - 1)} stopColor={color} />)}
          </linearGradient>
        ))}
        <linearGradient id="hc-edge" x1="0" y1="0" x2=".75" y2="1">
          <stop stopColor="#8ef6ff" /><stop offset=".25" stopColor="#f2d5ff" /><stop offset=".52" stopColor="#5691ea" /><stop offset=".78" stopColor="#c1efff" /><stop offset="1" stopColor="#efbaff" />
        </linearGradient>
        <radialGradient id="hc-caustic" cx=".3" cy=".25" r=".7" gradientTransform="translate(.1 -.2) rotate(24 .5 .5) scale(.7 1.4)">
          <stop stopColor="#b7fcff" stopOpacity=".85" /><stop offset=".24" stopColor="#28e0ff" stopOpacity=".45" /><stop offset=".5" stopColor="#2283ff" stopOpacity=".1" /><stop offset="1" stopColor="#06072a" stopOpacity=".3" />
        </radialGradient>
        <radialGradient id="hc-violet-flare">
          <stop stopColor="#ffe0ff" stopOpacity=".8" /><stop offset=".22" stopColor="#d26cff" stopOpacity=".7" /><stop offset=".55" stopColor="#6535e7" stopOpacity=".25" /><stop offset="1" stopColor="#3029ce" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hc-cyan-flare">
          <stop stopColor="#e0ffff" stopOpacity=".9" /><stop offset=".2" stopColor="#4ee8ff" stopOpacity=".75" /><stop offset=".6" stopColor="#079ded" stopOpacity=".3" /><stop offset="1" stopColor="#075add" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hc-reflection">
          <stop stopColor="#c4f8ff" stopOpacity="0" /><stop offset=".44" stopColor="#b9f8ff" stopOpacity="0" /><stop offset=".49" stopColor="#fff" stopOpacity=".55" /><stop offset=".53" stopColor="#bca0ff" stopOpacity=".1" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hc-art-clip">{facets.map(([points], i) => <polygon key={i} points={points} />)}</clipPath>
        <filter id="hc-glass-grain" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" seed="12" result="grain" />
          <feColorMatrix in="grain" type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope=".12" /></feComponentTransfer>
          <feComposite in2="SourceAlpha" operator="in" />
          <feBlend in="SourceGraphic" mode="soft-light" />
        </filter>
        <filter id="hc-edge-bloom" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6" /></filter>
      </defs>

      <g strokeLinejoin="round" filter="url(#hc-glass-grain)">
        {facets.map(([points, material], i) => (
          <g key={i}>
            <polygon points={points} fill={`url(#hc-${material})`} stroke="#030c3d" strokeWidth="4" />
            <polygon points={points} fill="none" stroke="#9ae8ff" strokeWidth="3" opacity=".35" filter="url(#hc-edge-bloom)" />
            <polygon points={points} fill="url(#hc-caustic)" stroke="url(#hc-edge)" strokeWidth="2" />
          </g>
        ))}
      </g>

      <g clipPath="url(#hc-art-clip)" style={{ mixBlendMode: 'screen' }}>
        <ellipse cx="149" cy="190" rx="40" ry="110" fill="url(#hc-cyan-flare)" />
        <ellipse cx="156" cy="371" rx="39" ry="72" fill="url(#hc-violet-flare)" />
        <ellipse cx="305" cy="365" rx="36" ry="135" fill="url(#hc-cyan-flare)" />
        <ellipse cx="335" cy="476" rx="34" ry="40" fill="url(#hc-violet-flare)" />
        <ellipse cx="400" cy="251" rx="34" ry="110" fill="url(#hc-cyan-flare)" transform="rotate(-13 400 251)" />
        <ellipse cx="426" cy="296" rx="28" ry="64" fill="url(#hc-violet-flare)" />
        <ellipse cx="581" cy="181" rx="90" ry="39" fill="url(#hc-cyan-flare)" transform="rotate(38 581 181)" />
        <ellipse cx="542" cy="129" rx="50" ry="31" fill="url(#hc-violet-flare)" />
        <ellipse cx="533" cy="471" rx="74" ry="37" fill="url(#hc-cyan-flare)" transform="rotate(-25 533 471)" />
        <ellipse cx="651" cy="451" rx="35" ry="34" fill="url(#hc-violet-flare)" />
        <g className="verse-crystal-reflection"><path d="M-200 0H950V650H-200Z" fill="url(#hc-reflection)" transform="rotate(-18 400 280)" /></g>
      </g>

      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d="m136 98 44 16v111l114 45M300 151l45 17v333M390 181l43-45M390 187v245l61 86M447 135l119 105v61M578 241l102-28-1 51-100 36ZM460 465l123-20v48M593 444l81-22v43l-81 29Z" stroke="#dafaff" strokeWidth="1.5" opacity=".8" />
        <path d="m188 116 80-28v110l-79 22M357 171l75-34v279M445 219l67 58v110l-67 33M578 249l96 13-90 28M595 452l73 8-67 22" stroke="#3eabf3" strokeWidth="1" opacity=".7" />
      </g>
    </svg>
  );
}
