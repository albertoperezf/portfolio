import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, className = 'size-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export const GridIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18" />
  </Icon>
);

export const AccessibilityIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="4.5" r="1.5" />
    <path d="M5 8l7 1.5L19 8M12 9.5V14m0 0l-3 6m3-6l3 6" />
  </Icon>
);

export const GaugeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 14l4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </Icon>
);

export const LayersIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2l10 5-10 5L2 7l10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </Icon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const DownloadIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16" />
  </Icon>
);

export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Icon>
);

export const SortIcon = ({ direction, ...props }: IconProps & { direction?: 'ascending' | 'descending' }) => (
  <Icon {...props}>
    {direction === 'ascending' ? (
      <path d="M12 19V5M6 11l6-6 6 6" />
    ) : direction === 'descending' ? (
      <path d="M12 5v14M6 13l6 6 6-6" />
    ) : (
      <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
    )}
  </Icon>
);
