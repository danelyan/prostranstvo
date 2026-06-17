import {
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useMagnetic } from "../lib/effects";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const PILL_TRANSITION: CSSProperties = {
  transition:
    "transform .35s var(--ease-silk), background-color .5s var(--ease-silk), color .5s var(--ease-silk), border-color .5s var(--ease-silk)",
};

/* ---------------------------------------------------------------- Pill button
   Full pill (129.6px), 1px border, fills on hover. `tone` controls the resting
   palette so the same component works on white and on the black footer. */
type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "ink" | "bleach";
  solid?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
  full?: boolean;
};

export function PillButton({
  tone = "ink",
  solid = false,
  arrow = false,
  magnetic = false,
  full = false,
  className,
  children,
  ...rest
}: PillButtonProps) {
  const mag = useMagnetic<HTMLButtonElement>();

  const palette = solid
    ? tone === "ink"
      ? "border-ink bg-ink text-bleach hover:bg-transparent hover:text-ink"
      : "border-bleach bg-bleach text-ink hover:bg-transparent hover:text-bleach"
    : tone === "ink"
      ? "border-ink text-ink hover:bg-ink hover:text-bleach"
      : "border-bleach text-bleach hover:bg-bleach hover:text-ink";

  return (
    <button
      type="button"
      ref={magnetic ? mag.ref : undefined}
      onMouseMove={magnetic ? mag.onMouseMove : undefined}
      onMouseLeave={magnetic ? mag.onMouseLeave : undefined}
      style={PILL_TRANSITION}
      {...rest}
      className={cx(
        "group inline-flex items-center justify-center gap-14 rounded-pill border bg-transparent",
        "px-[40px] py-[19px] font-haasr text-nav font-normal uppercase tracking-[0.18em]",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-40",
        full && "w-full",
        palette,
        className,
      )}
    >
      {children}
      {arrow && (
        <span className="font-mono transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
  );
}

/* ----------------------------------------------------------------- Ghost link
   Reads as a continuation of the sentence; a 1px rule grows on hover. */
export function GhostLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        "group relative inline-block font-haasr text-[14px] font-light text-ink no-underline",
        className,
      )}
    >
      <span>{children}</span>
      <span className="absolute -bottom-[2px] left-0 h-px w-full origin-left scale-x-100 bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-0" />
    </a>
  );
}

/* ---------------------------------------------------------------- Museum label
   PT Mono — the only typographic ornament. */
export function Label({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "graphite";
}) {
  return (
    <span
      className={cx(
        "font-mono text-label uppercase tracking-[0.14em]",
        tone === "graphite" ? "text-graphite" : "text-ink",
        className,
      )}
    >
      {children}
    </span>
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

/* ---------------------------------------------------------------- Accordion
   Shared by the design tab (multi, "Что я получу" open) and the FAQ (single).
   The plus rotates to a minus; the body rises in with panelIn. */
export function Accordion({
  items,
  mode = "single",
  defaultOpen = [],
  topRule = true,
}: {
  items: { id: string; title: string; body: ReactNode }[];
  mode?: "single" | "multi";
  defaultOpen?: string[];
  topRule?: boolean;
}) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(mode === "single" ? [] : prev);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={cx(topRule && "border-t border-ink")}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id} className="border-b border-graphite">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-22 py-22 text-left"
            >
              <span className="font-haasr text-[18px] font-normal leading-[1.25] text-ink">
                {item.title}
              </span>
              <span
                className="font-mono text-[16px] text-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
              >
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen && (
              <p
                className="max-w-[680px] pb-[26px] font-haasr text-body font-light leading-[1.55] text-ink"
                style={{ animation: "var(--animate-panel-in)" }}
              >
                {item.body}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
