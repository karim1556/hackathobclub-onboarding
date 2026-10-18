'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { projectTeams, studentProjects, type StudentProject } from '@/lib/student-projects';
import { ProjectSculpture } from '@/components/project-sculpture';

export function ProjectWall() {
  const [teamId, setTeamId] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<StudentProject | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const needle = query.trim().toLowerCase();
  const filtered = teamId !== 'all' || !!needle;
  const shown = studentProjects.filter((project) => {
    const team = projectTeams.find((item) => item.id === project.teamId)!;
    return (teamId === 'all' || team.id === teamId) && [project.name, project.description, project.category, team.name, ...team.members].some((value) => value.toLowerCase().includes(needle));
  });
  const selectedTeam = selected ? projectTeams.find((team) => team.id === selected.teamId)! : null;

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    wall.dataset.animate = 'true';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.shown = 'true'; observer.unobserve(entry.target); } });
    }, { threshold: .08 });
    wall.querySelectorAll('.project-tile').forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, [teamId, query]);
  useEffect(() => {
    if (selected && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [selected]);

  return <>
    <div className="projects-heading"><div><p>THE VERSE / STUDENT PROJECTS</p><h1>Ideas, <span>made real.</span></h1></div><div className="projects-totals"><span><strong>{studentProjects.length}</strong> projects</span><i /><span><strong>{projectTeams.length}</strong> teams</span></div></div>
    <div className="projects-tools"><p className="projects-results" aria-live="polite">{String(shown.length).padStart(2,'0')} BUILDS ON DISPLAY</p><div><label className="projects-search"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><span className="sr-only">Search student projects</span><input type="search" placeholder="Find a project or builder…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="projects-team-filter"><span className="sr-only">Filter projects by team</span><select value={teamId} onChange={(event) => setTeamId(event.target.value)}><option value="all">All teams</option>{projectTeams.map((team) => <option value={team.id} key={team.id}>{team.name}</option>)}</select></label></div></div>
    <div className={`project-wall${filtered ? ' project-wall-filtered' : ''}`} ref={wallRef} key={`${teamId}-${query}`}>
      {shown.map((project,index) => {
        const team = projectTeams.find((item) => item.id === project.teamId)!;
        return <article className={`project-tile project-shape-${project.shape} project-tone-${project.tone}${project.featured ? ' project-featured' : ''}`} key={project.id} style={{ '--tile-delay': `${Math.min(index % 4,3) * 65}ms` } as CSSProperties}>
          <div className="project-poster">{project.featured && <span className="project-featured-badge">Featured</span>}<div className="project-poster-text"><p className="project-category"><span>{String(studentProjects.indexOf(project) + 1).padStart(2,'0')}</span> {project.category}</p><h2>{project.name}</h2><p className="project-summary">{project.description}</p></div><div className="project-grid-lines" aria-hidden="true"/><span className="project-poster-watermark" aria-hidden="true">{project.name.slice(0,1)}</span><div className="project-tile-footer"><span>{team.name}</span><span>{team.members.length} BUILDERS</span></div></div>
          <div className="project-art"><ProjectSculpture kind={project.artwork}/></div>
          <button className="project-open" onClick={() => setSelected(project)} aria-label={`Explore ${project.name} — ${team.name}`}><span aria-hidden="true">↗</span></button>
        </article>;
      })}
    </div>
    {!shown.length && <div className="projects-empty"><h2>No matching builds.</h2><p>Try a project name, a team or one of the builders.</p><button onClick={() => { setTeamId('all'); setQuery(''); }}>Show all projects ↗</button></div>}
    <div className="projects-endline"><span>CONCEIVED HERE. BUILT TOGETHER.</span><span aria-hidden="true"><i/><i/><i/></span></div>
    <dialog className="project-dialog" ref={dialogRef} onClose={() => setSelected(null)} aria-labelledby="project-dialog-title">
      {selected && selectedTeam && <div className="project-dialog-panel"><button className="project-dialog-close" aria-label="Close project details" onClick={() => dialogRef.current?.close()}>×</button><div className={`project-dialog-art project-tone-${selected.tone}`}><p>{selected.category}</p><ProjectSculpture kind={selected.artwork}/><span>{selected.name}</span></div><div className="project-dialog-copy"><p className="project-dialog-eyebrow">STUDENT PROJECT / {selectedTeam.name}</p><h2 id="project-dialog-title">{selected.name}</h2><p className="project-dialog-description">{selected.description}</p><h3>Built by {selectedTeam.name}</h3><ul>{selectedTeam.members.map((member) => <li key={member}><span aria-hidden="true">{member.split(' ').map((word) => word[0]).slice(0,2).join('')}</span>{member}</li>)}</ul><p className="project-dialog-related">{studentProjects.filter((project) => project.teamId === selected.teamId).length} {studentProjects.filter((project) => project.teamId === selected.teamId).length === 1 ? 'project' : 'projects'} in this team’s collection</p></div></div>}
    </dialog>
  </>;
}
