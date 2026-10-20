import Image from 'next/image';

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
}: {
  light: string;
  dark: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  /** For above-the-fold images: both variants load eagerly, so the visible one isn't delayed. */
  eager?: boolean;
}) {
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
