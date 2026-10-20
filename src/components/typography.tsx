export function SectionHeading({
  id,
  eyebrow,
  title,
  as: Heading = 'h2',
}: {
  id: string;
  eyebrow?: string;
  title: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div>
      {eyebrow && (
        <p className="font-mono text-sm text-accent" aria-hidden="true">
          {eyebrow}
        </p>
      )}
      <Heading id={id} className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </Heading>
    </div>
  );
}

/** Renders `[text]` segments with the accent colour. */
export function Highlight({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\])/).map((part, index) =>
    part.startsWith('[') ? (
      <span key={index} className="text-accent">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}

export const pageTitleClass =
  'text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] font-semibold tracking-tighter text-balance';
