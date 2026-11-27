'use client';

import { useEffect, useState } from 'react';
import { BallIcon } from './icons';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
const BALLS = 24;
const SHOW_MS = 6000;

/** The Konami code makes footballs rain down the page. Purely decorative and skipped for reduced motion. */
export function FootballRain() {
  const [raining, setRaining] = useState(false);

  useEffect(() => {
    let progress = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    function onKeyDown(event: KeyboardEvent) {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress < KONAMI.length) return;
      progress = 0;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setRaining(true);
      clearTimeout(timer);
      timer = setTimeout(() => setRaining(false), SHOW_MS);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(timer);
    };
  }, []);

  if (!raining) return null;

  return (
    <div aria-hidden="true">
      {Array.from({ length: BALLS }, (_, index) => (
        <span
          key={index}
          className="ball text-accent"
          style={
            {
              '--x': `${(index * 37) % 100}vw`,
              '--drift': `${((index * 53) % 21) - 10}vw`,
              '--duration': `${2.6 + ((index * 7) % 10) / 5}s`,
              '--delay': `${((index * 11) % 20) / 10}s`,
            } as React.CSSProperties
          }
        >
          <BallIcon className={index % 3 === 0 ? 'size-10' : 'size-7'} />
        </span>
      ))}
    </div>
  );
}
