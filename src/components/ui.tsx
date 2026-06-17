import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import type { SpecRow } from "../data/elements";

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/* ---------------------------------------------------------------- Pill button
   Transparent fill, 1px ink border, full pill radius. No color fill — the
   outline IS the button (DESIGN.md › Pill Button). */
type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function PillButton({
  active = false,
  className,
  children,
  ...rest
}: PillButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cx(
        "inline-flex items-center justify-center gap-7 rounded-pill border bg-transparent px-29 py-14",
        "font-haasr text-nav uppercase tracking-[0.08em] transition-opacity duration-200",
        "disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "border-graphite text-graphite"
          : "border-ink text-ink hover:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ----------------------------------------------------------------- Ghost link
   Reads as a continuation of the sentence; underline only on hover. */
type GhostLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function GhostLink({ className, children, ...rest }: GhostLinkProps) {
  return (
    <a
      {...rest}
      className={cx(
        "text-ink no-underline hover:underline hover:underline-offset-[2px] hover:decoration-1",
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ---------------------------------------------------------------- Museum label
   PT Mono 11px — the only typographic ornament (DESIGN.md › Museum Label). */
export function MuseumLabel({
  children,
  className,
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <span
      className={cx(
        "font-mono text-label uppercase tracking-[0.06em]",
        muted ? "text-graphite" : "text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------- Micro caption */
export function MicroCaption({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cx("font-haasr text-micro text-ink", className)}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ Display headline
   HaasT weight 100 at the display size, paired with a PT Mono label. */
export function DisplayHeadline({
  children,
  label,
  align = "center",
  className,
}: {
  children: ReactNode;
  label?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cx(align === "center" ? "text-center" : "text-left", className)}>
      <h1 className="font-haast text-display font-thin tracking-[-0.01em] text-ink">
        {children}
      </h1>
      {label ? (
        <div className="mt-22">
          <MuseumLabel>{label}</MuseumLabel>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------- Section headline */
export function SectionHeadline({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cx(
        "font-haast text-heading font-thin tracking-[-0.01em] text-ink",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/* --------------------------------------------------------- Statement block
   Centered editorial copy, max-width 640px (DESIGN.md › Centered Statement). */
export function StatementBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "mx-auto max-w-[640px] text-center font-haasr text-statement font-normal text-ink",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* --------------------------------------------------------------- Hairline */
export function Hairline({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "graphite";
  className?: string;
}) {
  return (
    <div
      role="separator"
      className={cx(
        "w-full border-t",
        tone === "ink" ? "border-ink" : "border-graphite",
        className,
      )}
    />
  );
}

/* --------------------------------------------------------------- Paper card */
export function PaperCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("rounded-card bg-paper p-29", className)}>{children}</div>
  );
}

/* ---------------------------------------------------------------- Spec table
   "Nutrition facts" catalog table — graphite rules keep dense data light. */
export function SpecTable({
  unit,
  rows,
  className,
}: {
  unit: string;
  rows: SpecRow[];
  className?: string;
}) {
  return (
    <table
      className={cx(
        "w-full border-collapse font-mono text-label text-ink",
        className,
      )}
    >
      <thead>
        <tr className="border-t border-b border-graphite">
          <th className="py-7 text-left font-normal uppercase tracking-[0.06em]">
            Состав
          </th>
          <th className="py-7 text-right font-normal uppercase tracking-[0.06em]">
            {unit}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-graphite">
            <td className="py-7 text-left">{row.label}</td>
            <td className="py-7 text-right">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ----------------------------------------------------- Floating placeholder
   Stand-in for product photography: a warm-paper artifact floating on white,
   captioned only by a PT Mono signature. Swap for real photos later. */
export function PlaceholderImage({
  label,
  ratio = "4 / 5",
  className,
}: {
  label?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative flex items-end overflow-hidden rounded-card lift-gradient",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {label ? (
        <div className="p-14">
          <MuseumLabel muted>{label}</MuseumLabel>
        </div>
      ) : null}
    </div>
  );
}
