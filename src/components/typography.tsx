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
      <Heading id={id} className="mt-2 font-display text-4xl tracking-tight text-balance sm:text-5xl">
        {title}
      </Heading>
    </div>
  );
}

/** Renders `[text]` segments in the accent colour and the italic display face. */
export function Highlight({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\])/).map((part, index) =>
    part.startsWith('[') ? (
      <span key={index} className="font-display-italic text-accent italic">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}

export const pageTitleClass =
  'font-display text-[clamp(2.75rem,6.5vw,4.75rem)] leading-[1] font-normal tracking-tight text-balance';
