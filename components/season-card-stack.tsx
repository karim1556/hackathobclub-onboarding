'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export function SeasonCardStack({ children, labels }: { children: ReactNode[]; labels: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const scroller = section?.closest<HTMLElement>('.season-page');
    const stage = section?.querySelector<HTMLElement>('.season-stack-stage');
    const cards = Array.from(section?.querySelectorAll<HTMLElement>('.season-stack-card') ?? []);
    if (!section || !scroller || !stage || !cards.length) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (motion.matches) { cards.forEach((card) => { card.removeAttribute('style'); card.inert = false; }); return; }
      const height = stage.clientHeight;
      const distance = section.offsetHeight - height;
      const traveled = scroller.getBoundingClientRect().top - section.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, traveled / Math.max(1, distance))) * (cards.length - 1);
      const current = Math.min(cards.length - 1, Math.floor(progress + .38));
      if (activeRef.current !== current) { activeRef.current = current; setActive(current); }
      cards.forEach((card, index) => {
        const depth = index - progress;
        const scale = depth >= 0 ? .76 ** depth : 1 + -depth * .32;
        const offset = depth >= 0 ? -height * .31 * (1 - Math.exp(-depth * .72)) : height * .88 * ((-depth) ** 1.45);
        const opacity = depth < -1.15 ? 0 : Math.max(0, Math.min(1, (depth + 1.15) / .2));
        card.style.transform = `translate3d(-50%, calc(-50% + ${offset}px), 0) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.setProperty('--card-reveal', String(Math.max(0, Math.min(1, 1 - depth))));
        card.style.zIndex = String(cards.length - index);
        card.inert = index !== current;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const resize = new ResizeObserver(schedule);
    resize.observe(stage);
    scroller.addEventListener('scroll', schedule, { passive: true });
    motion.addEventListener('change', schedule);
    paint();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); scroller.removeEventListener('scroll', schedule); motion.removeEventListener('change', schedule); };
  }, []);

  function goTo(index: number) {
    const section = sectionRef.current;
    const scroller = section?.closest<HTMLElement>('.season-page');
    const stage = section?.querySelector<HTMLElement>('.season-stack-stage');
    if (!section || !scroller || !stage) return;
    const start = scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
    scroller.scrollTo({ top: start + index / (children.length - 1) * (section.offsetHeight - stage.offsetHeight), behavior: 'smooth' });
  }

  return <section className="season-stack" ref={sectionRef} aria-label="Previous season at a glance" style={{ '--deck-count': children.length } as CSSProperties}>
    <div className="season-stack-stage">
      <div className="season-stack-cards">{children.map((child, index) => <div className="season-stack-card" key={labels[index]} style={{ transform: `translate3d(-50%, calc(-50% - ${31 * (1 - Math.exp(-index * .72))}svh), 0) scale(${.76 ** index})`, zIndex: children.length - index }}>{child}</div>)}</div>
      <div className="season-stack-progress"><span>0{active + 1} <i>/ 0{children.length}</i></span><p>{labels[active]}</p><div>{labels.map((label, index) => <button key={label} aria-label={`Show card ${index + 1}: ${label}`} aria-current={active === index ? 'step' : undefined} onClick={() => goTo(index)} />)}</div></div>
    </div>
  </section>;
}
