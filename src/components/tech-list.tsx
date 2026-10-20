export function TechList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label={label}>
      {items.map((tech) => (
        <li key={tech} className="rounded-full bg-surface px-3 py-1 font-mono text-xs">
          {tech}
        </li>
      ))}
    </ul>
  );
}
