const CIRCUMFERENCE_PATH = 'M50 8a42 42 0 1 1 0 84a42 42 0 1 1 0-84';

/** A Lighthouse-style score ring. The fill animates as it scrolls into view where the browser supports it. */
export function ScoreGauge({ label, score, description }: { label: string; score: number; description: string }) {
  return (
    <div role="img" aria-label={description} className="flex flex-col items-center text-center">
      <div className="relative size-28 sm:size-32">
        <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className="size-full">
          <path d={CIRCUMFERENCE_PATH} fill="none" strokeWidth="7" className="stroke-border" pathLength={100} />
          <path
            d={CIRCUMFERENCE_PATH}
            fill="none"
            strokeWidth="7"
            pathLength={100}
            strokeDasharray={`${score} 100`}
            className="gauge-ring stroke-good"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl tabular-nums">
          {score}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium">{label}</p>
    </div>
  );
}
