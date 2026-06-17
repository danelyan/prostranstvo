import { useState, type CSSProperties } from "react";

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/*
  A framed interior photograph. Lives inside the monochrome system: it loads
  desaturated and lifts to full colour + a slow zoom on hover. While the image
  is in flight a warm-paper gradient holds the frame so nothing pops in.
*/
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  rounded = true,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  rounded?: boolean;
  style?: CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cx(
        "group/photo relative overflow-hidden lift-gradient",
        rounded && "rounded-card",
        className,
      )}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cx(
          "h-full w-full object-cover",
          "[filter:grayscale(1)_contrast(1.02)] [transform:scale(1.001)]",
          "transition-[filter,transform,opacity] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]",
          "group-hover/photo:[filter:grayscale(0)_contrast(1)] group-hover/photo:scale-[1.05]",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />
    </div>
  );
}

/* Photo paired with the FIG-style caption rule beneath it. */
export function FigurePhoto({
  src,
  alt,
  caption,
  meta,
  className,
  style,
}: {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure className={cx("m-0", className)} style={style}>
      <Photo src={src} alt={alt} className="h-full w-full" />
      {(caption || meta) && (
        <figcaption className="mt-14 flex items-center justify-between font-mono text-label tracking-[0.04em] text-graphite">
          {caption && <span>{caption}</span>}
          {meta && <span>{meta}</span>}
        </figcaption>
      )}
    </figure>
  );
}
