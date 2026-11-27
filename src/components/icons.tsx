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

export const HeartIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </Icon>
);

export const BallIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 7.5l3.8 2.8-1.5 4.4H9.7l-1.5-4.4zM12 7.5V2.2M15.8 10.3l5.1-1.6M14.3 14.7l3.1 4.3M9.7 14.7l-3.1 4.3M8.2 10.3L3.1 8.7" />
  </Icon>
);

export const TrophyIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
  </Icon>
);

export const GamepadIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 11h4M8 9v4M15 12h.01M18 10h.01" />
    <path d="M17.3 5H6.7a4 4 0 0 0-3.9 3.2l-1.6 7.5A2.5 2.5 0 0 0 3.7 19c.9 0 1.7-.5 2.1-1.3L7 15.5h10l1.2 2.2c.4.8 1.2 1.3 2.1 1.3a2.5 2.5 0 0 0 2.5-3.3l-1.6-7.5A4 4 0 0 0 17.3 5z" />
  </Icon>
);

export const CodeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </Icon>
);

export const PauseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 5v14M16 5v14" />
  </Icon>
);

export const PlayIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 4l13 8-13 8z" />
  </Icon>
);

export const ExternalIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 17L17 7M8 7h9v9" />
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
