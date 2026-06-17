import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ----------------------------------------------------------------- useReveal
   Toggles data-revealed="true" on an element the first time it enters the
   viewport. Pairs with the `.reveal` / `.reveal-child` utilities. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  { once = true, threshold = 0.15 }: { once?: boolean; threshold?: number } = {},
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.revealed = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.dataset.revealed = "true";
            if (once) io.unobserve(el);
          } else if (!once) {
            el.dataset.revealed = "false";
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  return ref;
}

/* A drop-in wrapper around useReveal for simple rising blocks. */
export function Reveal({
  children,
  className = "",
  delay,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------- useScrollProgress
   Returns scroll completion 0 → 1 for the thin progress rule in the header. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/* ------------------------------------------------------------- useParallax
   Translates an element slightly against scroll while it's on screen. */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  strength = 0.12,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const centered = rect.top + rect.height / 2 - viewport / 2;
      el.style.setProperty("--parallax", `${(-centered * strength).toFixed(2)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}

/* -------------------------------------------------------------- useMagnetic
   A restrained magnetic pull for primary CTAs — the button leans a few px
   toward the cursor, then eases home. */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  pull = 0.28,
) {
  const ref = useRef<T | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(x * pull).toFixed(2)}px, ${(y * pull).toFixed(2)}px)`;
    },
    [pull],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
