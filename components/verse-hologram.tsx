'use client';

import { useState, type CSSProperties, type PointerEvent } from 'react';
import { CrystalMark } from '@/components/verse-crystal-mark';

export function VerseHologram() {
  const [turns, setTurns] = useState(0);

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'touch') return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width));
    const y = Math.max(0, Math.min(1, (event.clientY - box.top) / box.height));
    const style = event.currentTarget.style;
    style.setProperty('--tilt-x', `${(0.5 - y) * 28}deg`);
    style.setProperty('--tilt-y', `${(x - .5) * 38}deg`);
    style.setProperty('--light-x', `${x * 100}%`);
    style.setProperty('--light-y', `${y * 100}%`);
    style.setProperty('--shine-x', `${(x - .5) * 240}px`);
  }

  function reset(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
    event.currentTarget.style.setProperty('--light-x', '50%');
    event.currentTarget.style.setProperty('--light-y', '50%');
    event.currentTarget.style.setProperty('--shine-x', '0px');
  }

  return (
    <button
      className="verse-hologram"
      type="button"
      aria-label="Spin the interactive HC hologram"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onClick={() => {
        setTurns((value) => value + 1);
      }}
      style={{ '--spin': `${turns * 360}deg` } as CSSProperties}
    >
      <span className="verse-hologram-aura" aria-hidden="true" />
      <span className="verse-hologram-ring" aria-hidden="true" />
      <span className="verse-hologram-tilt"><span className="verse-hologram-spin"><CrystalMark /></span></span>
    </button>
  );
}
