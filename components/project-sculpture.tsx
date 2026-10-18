'use client';

import { useId } from 'react';
import type { ProjectArtwork } from '@/lib/student-projects';

export function ProjectSculpture({ kind }: { kind: ProjectArtwork }) {
  const id = useId().replace(/:/gu,'');
  const metal = `url(#${id}-metal)`;
  const blue = `url(#${id}-blue)`;
  const violet = `url(#${id}-violet)`;
  const glass = `url(#${id}-glass)`;
  const shade = `url(#${id}-shade)`;
  let art;
  switch (kind) {
    case 'shield': art = <>
      <path d="m161 23 107 45-11 110c-5 47-44 79-96 102-53-23-92-55-97-102L53 68Z" fill={shade}/>
      <path d="m148 15 106 45-11 110c-5 47-44 79-95 102-53-23-92-55-97-102L40 60Z" fill={metal} stroke="#abddff" strokeWidth="2"/>
      <path d="m148 35 86 36-9 95c-5 37-34 66-77 86-43-20-73-49-77-86l-9-95Z" fill={blue}/>
      <path d="M148 39v207c43-20 70-47 74-82l9-90Z" fill={violet} opacity=".58"/>
      <path d="m101 145 31 32 64-71" fill="none" stroke="#d6f6ff" strokeWidth="17"/>
      <path d="m44 62 104 44L251 62M148 107v147" fill="none" stroke="#a3e5ff" opacity=".3"/>
      <path d="m267 167 8 17 18 7-18 7-8 17-7-17-18-7 18-7Z" fill={metal}/>
    </>; break;
    case 'interview': art = <>
      <path d="m48 65 218-27 24 163L72 231Z" fill={shade}/><path d="m32 51 218-27 24 163L56 217Z" fill={metal} stroke="#c8eaff" strokeWidth="2"/>
      <path d="m46 80 195-24 17 116-194 26Z" fill="#0b2451"/>
      <path d="m51 104 78-10 10 78-78 10Z" fill={blue}/><circle cx="94" cy="123" r="16" fill={metal}/><path d="M70 165c-1-29 48-31 50-5Z" fill={metal}/>
      <path d="m143 91 82-10 10 77-81 10Z" fill={violet}/><circle cx="188" cy="111" r="15" fill={metal}/><path d="M164 153c-1-27 45-30 47-6Z" fill={metal}/>
      <path d="m66 198 195-26" stroke="#d2efff" opacity=".7"/><circle cx="47" cy="58" r="3" fill="#344c9c"/><circle cx="58" cy="57" r="3" fill="#7886d9"/>
      <path d="m240 174 36-5 23 26-12 39-36 5-23-26Z" fill={blue} stroke="#a9ddff" strokeWidth="2"/><path d="m245 205 14 12 23-26" fill="none" stroke="#d4f4ff" strokeWidth="7"/>
    </>; break;
    case 'standards': art = <>
      <path d="m91 52 128-24 51 173-128 37Z" fill={violet} stroke="#9c8fe9"/>
      <path d="m70 60 133-28 40 182-133 29Z" fill={blue} stroke="#a3d9ff"/>
      <path d="m45 58 139-11 37 38 12 158-172 13Z" fill={metal} stroke="#d4edff" strokeWidth="2"/>
      <path d="m184 48 3 41 36-4" fill={glass} stroke="#809bd5"/>
      <path d="m76 105 100-7m-97 27 116-8m-113 28 95-7m-93 27 107-7" stroke="#4f6cb5" strokeWidth="7"/>
      <path d="m221 161 21 3 15 18-2 23-18 16-22-2-16-18 3-23Z" fill={blue} stroke="#b6e8ff" strokeWidth="2"/>
      <path d="m213 189 11 12 22-25" fill="none" stroke="#d4f3ff" strokeWidth="6"/>
      <path d="m225 219-5 43 20-12 13 10-1-43" fill={violet}/><path d="m48 260 212-15" stroke="#9aafff" opacity=".4"/>
    </>; break;
    case 'magazine': art = <>
      <path d="m108 31 136 30-29 183-138-31Z" fill={violet} stroke="#c1b3ff"/>
      <path d="m80 24 139 26-21 191-140-28Z" fill={metal} stroke="#e4f3ff" strokeWidth="2"/>
      <path d="m60 49 141-7 9 195-143 9Z" fill={blue} stroke="#b3ddff" strokeWidth="2"/>
      <path d="m71 64 118-5 7 139-119 6Z" fill={glass}/><text x="89" y="157" fill="#e5f4ff" fontFamily="Georgia,serif" fontSize="89">R</text>
      <path d="m81 218 98-5m-96 14 78-3" stroke="#aecfff" strokeWidth="3"/><path d="m210 108 25 6-11 68-25-6Z" fill={violet}/>
    </>; break;
    case 'agents': case 'community': art = <>
      <path d="M160 65 71 178l162 14L160 65Zm0 0v150M71 178l89 37 73-23" stroke="#a8c9ff" strokeWidth="4" opacity=".55"/>
      <circle cx="160" cy="137" r="58" fill={glass} stroke="#c8e5ff" strokeWidth="2"/>
      {kind === 'agents' ? <path d="M149 100h23v25h24v23h-24v25h-23v-25h-24v-23h24Z" fill={metal}/> : <><circle cx="160" cy="121" r="18" fill={metal}/><path d="M123 165c0-38 74-38 74 0Z" fill={metal}/></>}
      <circle cx="160" cy="39" r="28" fill={metal}/><circle cx="57" cy="190" r="29" fill={violet}/><circle cx="259" cy="197" r="29" fill={blue}/><circle cx="160" cy="252" r="21" fill={metal}/>
      <circle cx="151" cy="30" r="6" fill="#fff" opacity=".6"/><path d="m45 187 8 8 16-16m178 20 8 8 16-17" fill="none" stroke="#d2f1ff" strokeWidth="5"/>
    </>; break;
    case 'train': art = <>
      <path d="m21 236 280-101M41 257l280-101" stroke="#799be8" strokeWidth="7"/><path d="m37 242 20 14m15-28 20 14m15-28 20 14m16-28 20 14m16-28 20 14m16-28 20 14m16-28 20 14" stroke="#c6dfff" strokeWidth="4"/>
      <path d="m56 124 172-75c20-8 37 0 44 20l20 76-176 76-52-21-18-52Z" fill={shade}/>
      <path d="m45 108 172-75c20-8 37 0 44 20l20 76-176 76-52-21-18-52Z" fill={metal} stroke="#cbecff" strokeWidth="2"/>
      <path d="m51 114 44 20 155-68-8-18-25-2Z" fill={blue}/><path d="m99 140 162-70 9 42-163 70Z" fill="#0d2c62"/>
      <path d="m64 139 26 11 8 31-30-12Z" fill={glass}/><path d="m59 178 37 15" stroke="#a3eaff" strokeWidth="5"/><path d="m154 116 9 40m47-65 9 39" stroke="#91bfff" strokeWidth="3"/>
      <circle cx="126" cy="200" r="11" fill="#16234b" stroke="#7fa6e9" strokeWidth="3"/><circle cx="245" cy="148" r="11" fill="#16234b" stroke="#7fa6e9" strokeWidth="3"/>
    </>; break;
    case 'analytics': art = <>
      <path d="m42 207 181-43 69 43-182 43Z" fill={shade} stroke="#829ee4"/>
      <path d="m67 145 34-8v74l-34 8Z" fill={blue}/><path d="m101 137 17 10v74l-17-10Z" fill={violet}/><path d="m67 145 17 10 34-8-17-10Z" fill={metal}/>
      <path d="m126 105 34-8v100l-34 8Z" fill={blue}/><path d="m160 97 17 10v100l-17-10Z" fill={violet}/><path d="m126 105 17 10 34-8-17-10Z" fill={metal}/>
      <path d="m187 54 34-8v137l-34 8Z" fill={blue}/><path d="m221 46 17 10v137l-17-10Z" fill={violet}/><path d="m187 54 17 10 34-8-17-10Z" fill={metal}/>
      <path d="m49 86-18 21 24 13m203-12 18 16-24 21" fill="none" stroke="#b8e8ff" strokeWidth="7"/>
    </>; break;
    case 'livestock': art = <>
      <path d="M105 83 65 49l4 47 40 26m106-39 40-34-4 47-40 26" fill={metal} stroke="#bedfff" strokeWidth="2"/>
      <path d="M109 90C78 72 69 95 85 112l25 16m100-38c31-18 40 5 24 22l-25 16" fill={violet}/>
      <path d="M114 73c26-16 67-16 92 0l14 100c0 44-30 63-60 63s-60-19-60-63Z" fill={metal} stroke="#dcf0ff" strokeWidth="2"/>
      <path d="M114 78c17-15 35-15 46-9v73l-28 13-22-22Z" fill={blue}/><ellipse cx="160" cy="190" rx="55" ry="34" fill={glass}/><circle cx="131" cy="133" r="7" fill="#163267"/><circle cx="190" cy="133" r="7" fill="#163267"/><ellipse cx="141" cy="190" rx="7" ry="5" fill="#315387"/><ellipse cx="181" cy="190" rx="7" ry="5" fill="#315387"/>
      <circle cx="248" cy="225" r="30" fill={blue} stroke="#b5ecff" strokeWidth="2"/><path d="M238 210h19v30h-19m-5-21h29v13h-29" fill="#d4f3ff"/>
    </>; break;
    case 'location': art = <>
      <ellipse cx="160" cy="240" rx="82" ry="24" fill={glass} stroke="#93bcff"/><ellipse cx="160" cy="240" rx="50" ry="13" stroke="#b9dfff" strokeWidth="2"/>
      <path d="M169 20c-56 0-90 36-90 82 0 58 90 127 90 127s90-69 90-127c0-46-34-82-90-82Z" fill={shade}/>
      <path d="M153 15c-56 0-90 36-90 82 0 58 90 127 90 127s90-69 90-127c0-46-34-82-90-82Z" fill={metal} stroke="#c5eaff" strokeWidth="2"/>
      <circle cx="153" cy="96" r="48" fill={blue}/><path d="M110 96h86m-43-43c-28 28-28 58 0 86 28-28 28-58 0-86Z" fill="none" stroke="#9fddff" strokeWidth="2"/><ellipse cx="153" cy="96" rx="42" ry="19" stroke="#a9d6ff" strokeWidth="2"/>
    </>; break;
    case 'ticket': art = <>
      <path d="m101 37 171 48-18 64c-22-5-29 20-8 29l-20 66-170-48 18-65c23 4 30-21 8-29Z" fill={violet} stroke="#b6acff" strokeWidth="2"/>
      <path d="m50 68 193-7 2 67c-24 2-23 28 1 29l2 69-193 7-3-67c24-2 23-29-1-29Z" fill={metal} stroke="#d8edff" strokeWidth="2"/>
      <path d="m68 83 154-5 2 51c-23 9-23 23 1 32l1 49-154 5-1-52c23-8 23-23-1-31Z" fill={blue}/><path d="m179 84 5 126" stroke="#b7deff" strokeWidth="2" strokeDasharray="5 6"/>
      <path d="m103 112 10 19 21 3-15 15 4 22-19-10-19 11 3-22-16-14 22-4Z" fill={metal}/><path d="m194 97 18-1m-18 9 18-1m-17 9 18-1m-17 62 18-1m-18 9 18-1" stroke="#b3dcff" strokeWidth="3"/>
    </>; break;
    case 'folder': case 'medical': art = <>
      <path d="m47 76 79-13 30 22 102-15 21 142-212 31Z" fill={shade}/><path d="m36 65 79-13 30 22 102-15 21 142-212 31Z" fill={blue} stroke="#94ceff" strokeWidth="2"/>
      <path d="m73 46 139-16 22 168-139 16Z" fill={metal} stroke="#e0f2ff"/>
      <path d="m91 78 94-10m-91 31 95-10m-92 31 75-8" stroke="#6e8ec7" strokeWidth="6"/>
      <path d="m45 130 204-28 13 112-204 28Z" fill={glass} stroke="#a3d8ff" strokeWidth="2"/>
      {kind === 'medical' ? <path d="m143 135 21-3 3 25 24-3 3 21-24 3 3 25-21 3-3-25-24 3-3-21 24-3Z" fill={metal}/> : <path d="m95 160 115-15m-112 32 77-10" stroke="#c4e8ff" strokeWidth="7"/>}
    </>; break;
    case 'books': art = <>
      <path d="m57 59 42-12 15 166-42 13Z" fill={blue} stroke="#a3dcff"/><path d="m99 47 18 13 15 166-18-13Z" fill={shade}/><path d="m57 59 18 13 42-12-18-13Z" fill={metal}/>
      <path d="m125 36 43-10 12 180-43 10Z" fill={violet} stroke="#c4b3ff"/><path d="m168 26 18 13 12 180-18-13Z" fill={shade}/><path d="m125 36 18 13 43-10-18-13Z" fill={metal}/>
      <path d="m202 79 37-16 42 143-37 16Z" fill={metal} stroke="#d5e9ff"/><path d="m239 63 18 10 42 143-18-10Z" fill={blue}/>
      <path d="m70 100 26-7m-22 74 26-7m39-89 27-6m-21 99 27-6m45-39 22-10" stroke="#cee9ff" strokeWidth="4"/>
      <path d="m49 240 173-35 70 29-174 36Z" fill={glass} stroke="#9bb9f4"/>
    </>; break;
    case 'trust': art = <>
      <path d="m148 29 91 37-9 100c-4 44-40 71-82 93-44-22-78-49-83-93L57 66Z" fill={metal} stroke="#c2e5ff" strokeWidth="2"/>
      <path d="m148 52 67 27-7 82c-4 32-28 52-60 71-32-19-56-39-60-71l-7-82Z" fill={violet}/>
      <path d="M111 156v-35c0-51 74-51 74 0v35m-61 14v-49c0-34 48-34 48 0v52m-35 10v-62c0-16 22-16 22 0v68" fill="none" stroke="#b5eaff" strokeWidth="4"/>
      <path d="m211 161 53 33-24 10-9 28-20-71Z" fill={metal} stroke="#809cdd" strokeWidth="2"/>
    </>; break;
    case 'organization': art = <>
      <path d="M160 111v37M68 199v-51h184v51m-92-51v51" stroke="#a3cfff" strokeWidth="5"/>
      <path d="m118 45 69-10 26 21-70 11Z" fill={metal}/><path d="m118 45 25 22v55l-25-21Z" fill={shade}/><path d="m143 67 70-11v55l-70 11Z" fill={blue} stroke="#a4d8ff"/>
      {[24,116,208].map((x,i)=><g key={x}><path d={`m${x} 196 55-9 22 18-55 9Z`} fill={metal}/><path d={`m${x} 196 22 18v48l-22-18Z`} fill={shade}/><path d={`m${x+22} 214 55-9v48l-55 9Z`} fill={i===1?violet:blue} stroke="#a6ceff"/></g>)}
    </>; break;
    case 'controller': art = <>
      <path d="M73 104c13-23 38-32 61-25l21 7h26l22-7c23-7 47 2 60 25l25 71c13 37-17 55-41 29l-27-27H115l-27 27c-24 26-54 8-41-29Z" fill={shade}/>
      <path d="M62 89c13-23 38-32 61-25l21 7h26l22-7c23-7 47 2 60 25l25 71c13 37-17 55-41 29l-27-27H104l-27 27c-24 26-54 8-41-29Z" fill={metal} stroke="#d7efff" strokeWidth="2"/>
      <path d="M78 94h14v14h14v14H92v14H78v-14H64v-14h14Z" fill="#173565"/><circle cx="213" cy="103" r="10" fill={blue}/><circle cx="232" cy="123" r="10" fill={violet}/><circle cx="191" cy="123" r="10" fill={violet}/><circle cx="213" cy="143" r="10" fill={blue}/>
      <circle cx="125" cy="145" r="17" fill="#234476" stroke="#a1bded" strokeWidth="3"/><circle cx="170" cy="145" r="17" fill="#234476" stroke="#a1bded" strokeWidth="3"/><path d="M139 92h17" stroke="#71a6dc" strokeWidth="5"/>
    </>; break;
    case 'voice': art = <>
      <path d="M164 27c-29 0-46 20-46 49v66c0 28 17 48 46 48s46-20 46-48V76c0-29-17-49-46-49Z" fill={shade}/>
      <path d="M149 20c-29 0-46 20-46 49v66c0 28 17 48 46 48s46-20 46-48V69c0-29-17-49-46-49Z" fill={metal} stroke="#d4ebff" strokeWidth="2"/>
      <path d="M113 66h72m-72 14h72m-72 14h72m-72 14h72m-72 14h72" stroke="#486ba7" strokeWidth="4"/>
      <path d="M83 118v21c0 39 28 64 66 64s66-25 66-64v-21m-66 85v46m-39 1h78" fill="none" stroke="#a4d7ff" strokeWidth="8"/>
      <path d="M57 81c-22 22-22 62 0 84m188-84c22 22 22 62 0 84M36 62C6 94 6 150 36 182m230-120c30 32 30 88 0 120" fill="none" stroke="#8fb6f3" strokeWidth="4" opacity=".7"/>
    </>; break;
  }
  return <svg className={`project-sculpture project-sculpture-${kind}`} viewBox="0 0 320 290" fill="none" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-metal`} x1="60" y1="30" x2="225" y2="256" gradientUnits="userSpaceOnUse"><stop stopColor="#f1faff"/><stop offset=".25" stopColor="#a9ddff"/><stop offset=".48" stopColor="#7ba6f0"/><stop offset=".66" stopColor="#d0ccff"/><stop offset="1" stopColor="#5286dc"/></linearGradient>
      <linearGradient id={`${id}-blue`} x1="55" y1="45" x2="245" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="#6fe0ff"/><stop offset=".27" stopColor="#237fea"/><stop offset=".6" stopColor="#1945bd"/><stop offset="1" stopColor="#071b58"/></linearGradient>
      <linearGradient id={`${id}-violet`} x1="80" y1="10" x2="245" y2="255" gradientUnits="userSpaceOnUse"><stop stopColor="#ddc6ff"/><stop offset=".25" stopColor="#a07ce7"/><stop offset=".6" stopColor="#5035ab"/><stop offset="1" stopColor="#1b1b58"/></linearGradient>
      <linearGradient id={`${id}-glass`} x1="70" y1="60" x2="230" y2="230" gradientUnits="userSpaceOnUse"><stop stopColor="#d0f1ff" stopOpacity=".88"/><stop offset=".35" stopColor="#5d9ce5" stopOpacity=".8"/><stop offset=".7" stopColor="#4b69c4" stopOpacity=".94"/><stop offset="1" stopColor="#192e7c"/></linearGradient>
      <linearGradient id={`${id}-shade`} x1="90" y1="25" x2="235" y2="260" gradientUnits="userSpaceOnUse"><stop stopColor="#91b5ef"/><stop offset=".35" stopColor="#405598"/><stop offset=".7" stopColor="#152958"/><stop offset="1" stopColor="#091934"/></linearGradient>
      <radialGradient id={`${id}-ground`}><stop stopColor="#09152d" stopOpacity=".6"/><stop offset="1" stopColor="#09152d" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="161" cy="263" rx="140" ry="25" fill={`url(#${id}-ground)`}/>{art}
  </svg>;
}
