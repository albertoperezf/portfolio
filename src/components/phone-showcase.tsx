'use client';

import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { ArrowRightIcon, PauseIcon, PlayIcon } from './icons';
import { ThemedImage } from './themed-image';

export interface PhoneSlide {
  id: string;
  /** Short name used on the selector. */
  label: string;
  name: string;
  kind: string;
  light: string;
  dark: string;
  width: number;
  height: number;
  alt: string;
  href?: string;
}

export interface PhoneShowcaseCopy {
  label: string;
  choose: string;
  pause: string;
  play: string;
  caseStudy: string;
}

const INTERVAL_MS = 5000;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

const reducedMotionSnapshot = () => window.matchMedia(REDUCED_MOTION).matches;

/** A phone that cycles through my projects; it follows the site theme and stops as soon as the visitor interacts. */
export function PhoneShowcase({
  slides,
  copy,
  badges,
}: {
  slides: PhoneSlide[];
  copy: PhoneShowcaseCopy;
  badges: { top: string; bottom: string };
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Pressing Play overrides the hover/focus pause, otherwise it would do nothing while the pointer is still on the button.
  const [forcedPlay, setForcedPlay] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, reducedMotionSnapshot, () => false);
  const playing = !paused && (forcedPlay || !engaged) && !reducedMotion;
  const active = slides[index];

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [playing, slides.length]);

  return (
    // Hovering or focusing only pauses the rotation; every control inside is keyboard operable on its own.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={copy.label}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => {
        setEngaged(false);
        setForcedPlay(false);
      }}
      onFocus={() => setEngaged(true)}
      onBlur={() => {
        setEngaged(false);
        setForcedPlay(false);
      }}
      className="relative mx-auto w-full max-w-sm"
    >
      <figure className="relative">
        <div className="relative mx-auto w-[15rem] sm:w-[16.5rem]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-accent/20 blur-3xl motion-reduce:hidden"
          />
          <div className="phone float">
            <div className="phone-screen">
              {slides.map((slide, position) => (
                <div
                  key={slide.id}
                  hidden={position !== index}
                  className={position === index ? 'slide-in absolute inset-0' : undefined}
                >
                  <ThemedImage
                    light={slide.light}
                    dark={slide.dark}
                    width={slide.width}
                    height={slide.height}
                    alt={slide.alt}
                    sizes="(min-width: 640px) 264px, 240px"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
          <span
            aria-hidden="true"
            className="float-alt absolute top-24 -left-20 hidden rounded-full border border-border bg-bg px-3 py-1.5 font-mono text-xs shadow-lg lg:block"
          >
            {badges.top}
          </span>
          <span
            aria-hidden="true"
            className="float absolute -right-20 bottom-28 hidden rounded-full border border-border bg-bg px-3 py-1.5 font-mono text-xs shadow-lg lg:block"
          >
            {badges.bottom}
          </span>
        </div>

        <figcaption className="mt-8 text-center">
          <p className="font-medium">{active.name}</p>
          <p className="text-sm text-muted">{active.kind}</p>
          {active.href && (
            <Link href={active.href} className="link mt-2 inline-flex min-h-6 items-center gap-1.5 text-sm font-medium">
              {copy.caseStudy}
              <span className="sr-only">: {active.name}</span>
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
        </figcaption>
      </figure>

      <div className="mt-4 flex items-center justify-center gap-1">
        <ul aria-label={copy.choose} className="flex flex-wrap justify-center gap-1">
          {slides.map((slide, position) => (
            <li key={slide.id}>
              <button
                type="button"
                aria-current={position === index ? 'true' : undefined}
                onClick={() => {
                  setIndex(position);
                  setPaused(true);
                  setForcedPlay(false);
                }}
                className="inline-flex min-h-9 items-center rounded-full px-3 text-sm text-muted hover:bg-surface hover:text-fg aria-[current=true]:bg-fg aria-[current=true]:text-bg"
              >
                {slide.label}
              </button>
            </li>
          ))}
        </ul>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => {
              setForcedPlay(paused);
              setPaused((value) => !value);
            }}
            className="inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-fg"
          >
            {paused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
            <span className="sr-only">{paused ? copy.play : copy.pause}</span>
          </button>
        )}
      </div>
      <p className="sr-only" aria-live={playing ? 'off' : 'polite'}>
        {active.name}
      </p>
    </div>
  );
}
