import { useEffect, useRef, useState } from "react";
import { useLeadForm } from "../components/LeadForm";
import { Container } from "../components/layout";
import { Photo } from "../components/Photo";
import { GhostLink, PillButton } from "../components/ui";
import { gallery, heroImage, stats, type Stat } from "../data/studio";
import { Reveal, useParallax, useReveal } from "../lib/effects";
import { useStudio } from "../lib/studioState";

const WORD = "PROSTRANSTVO".split("");

export function Hero() {
  const lead = useLeadForm();
  const studio = useStudio();
  const parallax = useParallax<HTMLDivElement>(0.08);

  return (
    <>
      <header id="top" className="relative">
        <Container className="pt-[118px] pb-[96px]">
          <div
            className="font-mono text-label uppercase tracking-[0.14em] text-ink"
            style={{ animation: "var(--animate-fade-in)", animationDelay: ".1s" }}
          >
            Студия полного цикла · Москва
          </div>

          <h1 className="mt-[30px] font-haast text-display font-thin tracking-[-0.02em] whitespace-nowrap text-ink">
            {WORD.map((ch, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom"
              >
                <span
                  className="inline-block"
                  style={{
                    animation: "var(--animate-mask-up)",
                    animationDelay: `${0.04 + i * 0.04}s`,
                  }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-[54px] grid items-end gap-[48px] md:grid-cols-[1.15fr_0.85fr]">
            <p
              className="max-w-[620px] font-haasr text-[22px] font-extralight leading-[1.32] tracking-[-0.01em] text-ink"
              style={{ animation: "var(--animate-fade-in)", animationDelay: ".7s" }}
            >
              Разработка интерьерного дизайна и его реализация «под&nbsp;ключ» —
              с минимальными затратами вашего времени. Один договор от концепции
              до&nbsp;готового пространства.
            </p>
            <div
              className="flex flex-col items-start gap-[18px]"
              style={{ animation: "var(--animate-fade-in)", animationDelay: ".9s" }}
            >
              <PillButton magnetic arrow onClick={lead.open}>
                Узнать стоимость проекта
              </PillButton>
              <GhostLink
                href="#spaces"
                onClick={() => studio.goToService("portfolio")}
              >
                Смотреть реализованные пространства
              </GhostLink>
            </div>
          </div>

          <Reveal className="mt-[72px]">
            <div
              ref={parallax}
              className="relative overflow-hidden rounded-card lift-gradient"
              style={{ height: "clamp(360px, 46vw, 640px)" }}
            >
              <div
                className="absolute inset-x-0 -top-[15%] h-[130%]"
                style={{ transform: "translateY(var(--parallax, 0px))" }}
              >
                <Photo
                  src={heroImage.src}
                  alt="Реализованный интерьер"
                  rounded={false}
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="mt-14 flex justify-between font-mono text-label tracking-[0.04em] text-graphite">
              <span>{heroImage.caption}</span>
              <span>PROSTRANSTVO ® DESIGN STUDIO</span>
            </div>
          </Reveal>
        </Container>

        <Marquee />
        <StatsBand />
      </header>
    </>
  );
}

/* Full-bleed photo conveyor — strict typographic rhythm, slow infinite drift. */
function Marquee() {
  const strip = [...gallery, ...gallery];
  return (
    <div className="group overflow-hidden border-y border-ink py-22">
      <div
        className="flex w-max gap-22 group-hover:[animation-play-state:paused]"
        style={{ animation: "var(--animate-marquee)" }}
      >
        {strip.map((item, i) => (
          <div
            key={i}
            className="h-[200px] w-[300px] shrink-0 md:h-[240px] md:w-[360px]"
          >
            <Photo src={item.src} alt={item.alt} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsBand() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Container>
      <div
        ref={ref}
        className="grid grid-cols-2 gap-x-22 gap-y-[40px] border-b border-ink py-[72px] md:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div key={i} className="reveal-child" style={{ transitionDelay: `${i * 90}ms` }}>
            <div className="font-haast text-[clamp(40px,6vw,72px)] font-thin leading-none tracking-[-0.02em] text-ink">
              <Counter stat={stat} parentRef={ref} />
            </div>
            <div className="mt-14 max-w-[180px] font-mono text-label uppercase tracking-[0.1em] text-graphite">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

function Counter({
  stat,
  parentRef,
}: {
  stat: Stat;
  parentRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (done.current) return;
      done.current = true;
      if (reduce) {
        setValue(stat.to);
        return;
      }
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(stat.to * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const check = () => {
      if (el.dataset.revealed === "true") run();
    };
    check();
    const mo = new MutationObserver(check);
    mo.observe(el, { attributes: true, attributeFilter: ["data-revealed"] });
    return () => {
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stat.to, parentRef]);

  const formatted = stat.group
    ? value.toLocaleString("ru-RU").replace(/,/g, "\u202f")
    : String(value);

  return (
    <span>
      {stat.prefix}
      {formatted}
      {stat.suffix}
    </span>
  );
}
