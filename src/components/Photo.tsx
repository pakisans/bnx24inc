/**
 * Art-directed <picture> for pre-generated AVIF/WebP/JPEG renditions in
 * /public/images (see scripts/photos/process_photos.py). Static export has no
 * image optimizer, so sizes are produced ahead of time and the browser picks.
 */
interface Rendition {
  /** File stem, e.g. "hero-desktop" for /images/hero-desktop-720.avif. */
  name: string;
  widths: number[];
  sizes: string;
  /** Media query that selects this rendition. Omit for the default. */
  media?: string;
  /** Intrinsic dimensions of the largest file, for aspect ratio. */
  width: number;
  height: number;
}

interface PhotoProps {
  /** Ordered most specific first; the last entry is the default. */
  renditions: [Rendition, ...Rendition[]];
  /** Width of the single JPEG fallback rendered for the default rendition. */
  fallbackWidth: number;
  alt: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

const srcSet = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(", ");

export function Photo({ renditions, fallbackWidth, alt, priority = false, className, imgClassName }: PhotoProps) {
  const fallback = renditions[renditions.length - 1]!;
  return (
    <picture className={className}>
      {renditions.flatMap((r) =>
        (["avif", "webp"] as const).map((ext) => (
          <source
            key={`${r.name}-${ext}`}
            type={`image/${ext}`}
            media={r.media}
            srcSet={srcSet(r.name, r.widths, ext)}
            sizes={r.sizes}
            width={r.width}
            height={r.height}
          />
        )),
      )}
      <img
        src={`/images/${fallback.name}-${fallbackWidth}.jpg`}
        width={fallback.width}
        height={fallback.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className={imgClassName}
      />
    </picture>
  );
}
