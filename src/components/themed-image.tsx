import Image from 'next/image';

interface ThemedImageProps {
  light: string;
  dark: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  /** For above-the-fold images: both variants load eagerly, so the visible one isn't delayed. */
  eager?: boolean;
}

/** Renders one image per theme; CSS shows the one matching the active theme (lazy, so only it loads). */
export function ThemedImage({
  light,
  dark,
  alt,
  width,
  height,
  sizes,
  className = '',
  eager = false,
}: ThemedImageProps) {
  const loading = eager ? ({ loading: 'eager', fetchPriority: 'high' } as const) : {};
  return (
    <>
      <Image
        src={light}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`only-light ${className}`}
        {...loading}
      />
      <Image
        src={dark}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`only-dark ${className}`}
        {...loading}
      />
    </>
  );
}

/** Renders a full-size image link per theme so clicking in dark mode opens the dark screenshot. */
export function ThemedImageLink({
  light,
  dark,
  alt,
  width,
  height,
  sizes,
  className = '',
  linkClassName = '',
  openFullSizeLabel,
  eager = false,
}: ThemedImageProps & { linkClassName?: string; openFullSizeLabel: string }) {
  const loading = eager ? ({ loading: 'eager', fetchPriority: 'high' } as const) : {};
  return (
    <>
      <a href={light} className={`only-light ${linkClassName}`}>
        <Image src={light} alt={alt} width={width} height={height} sizes={sizes} className={className} {...loading} />
        <span className="sr-only">{openFullSizeLabel}</span>
      </a>
      <a href={dark} className={`only-dark ${linkClassName}`}>
        <Image src={dark} alt={alt} width={width} height={height} sizes={sizes} className={className} {...loading} />
        <span className="sr-only">{openFullSizeLabel}</span>
      </a>
    </>
  );
}
