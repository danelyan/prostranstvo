import { useState } from "react";
import { useLeadForm } from "../components/LeadForm";
import { Container } from "../components/layout";
import { Photo } from "../components/Photo";
import { Accordion, cx, Label, PillButton } from "../components/ui";
import {
  designAccordion,
  designExample,
  designOptions,
  designProcess,
  faq,
  portfolio,
  serviceMenu,
  servicePanels,
  type ServiceKey,
  type ServicePanelData,
} from "../data/studio";
import { Reveal } from "../lib/effects";
import { useStudio } from "../lib/studioState";

export function Services() {
  const studio = useStudio();
  const lead = useLeadForm();

  return (
    <section id="services" className="border-t border-ink">
      <Container className="pt-[90px] pb-[130px]">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-22">
          <div>
            <Label>Услуги — 05 направлений</Label>
            <h2 className="mt-[16px] font-haast text-[clamp(38px,6vw,58px)] font-thin leading-[0.92] tracking-[-0.02em] text-ink">
              Что мы берём
              <br />
              на себя
            </h2>
          </div>
          <p className="max-w-[360px] font-haasr text-[15px] font-light leading-[1.5] text-ink">
            Полный цикл — от проекта до ключей. Выберите направление, чтобы
            увидеть состав, сроки и условия.
          </p>
        </Reveal>

        <div className="mt-[64px] grid items-start gap-[40px] lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-[64px]">
          <IndexMenu />
          <div className="min-h-[520px]">
            <Panel key={studio.active} active={studio.active} onLead={lead.open} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- index menu */
function IndexMenu() {
  const studio = useStudio();
  const portfolioActive = studio.active === "portfolio";

  return (
    <div className="lg:sticky lg:top-[96px]">
      {serviceMenu.map((item) => {
        const active = studio.active === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => studio.setActive(item.key)}
            className={cx(
              "grid w-full grid-cols-[42px_1fr_24px] items-center gap-14 border-t border-ink py-[25px] pl-[4px] text-left",
              "transition-[opacity,padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-[16px] hover:opacity-100",
              active ? "opacity-100" : "opacity-40",
            )}
          >
            <span className="font-mono text-label tracking-[0.04em] text-graphite">
              {item.num}
            </span>
            <span
              className={cx(
                "text-[21px] leading-[1.1] tracking-[-0.01em] text-ink",
                active ? "font-medium" : "font-light",
              )}
            >
              {item.title}
            </span>
            <span
              className="font-mono text-[14px] transition-opacity duration-300"
              style={{ opacity: active ? 1 : 0 }}
            >
              →
            </span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => studio.setActive("portfolio")}
        className={cx(
          "grid w-full grid-cols-[42px_1fr_24px] items-center gap-14 border-t border-b border-ink py-[25px] pl-[12px] text-left",
          "transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
          portfolioActive ? "bg-ink text-bleach" : "bg-transparent text-ink",
        )}
      >
        <span
          className={cx(
            "font-mono text-label tracking-[0.04em] opacity-60",
            portfolioActive ? "text-bleach" : "text-graphite",
          )}
        >
          06
        </span>
        <span className="text-[21px] font-normal leading-[1.1] tracking-[-0.01em]">
          Реализованные пространства
        </span>
        <span className="font-mono text-[14px]">↗</span>
      </button>
    </div>
  );
}

/* ----------------------------------------------------------------- panels */
function Panel({
  active,
  onLead,
}: {
  active: ServiceKey;
  onLead: () => void;
}) {
  const style = { animation: "var(--animate-panel-in)" };

  if (active === "design") return <DesignPanel onLead={onLead} style={style} />;
  if (active === "portfolio") return <PortfolioPanel onLead={onLead} style={style} />;
  return <ServicePanel data={servicePanels[active]} onLead={onLead} style={style} />;
}

/* ===== Design project ===== */
function DesignPanel({
  onLead,
  style,
}: {
  onLead: () => void;
  style: React.CSSProperties;
}) {
  const [option, setOption] = useState<"self" | "invest">("self");
  const opt = designOptions[option];

  return (
    <div style={style}>
      <Label tone="graphite">01 / Проектирование</Label>
      <h3 className="mt-[16px] text-balance font-haast text-[clamp(30px,4.4vw,44px)] font-thin leading-none tracking-[-0.02em] text-ink">
        Дизайн-проект квартиры, апартаментов, дома от студии полного цикла
      </h3>

      <p className="mt-[28px] max-w-[640px] font-haasr text-[17px] font-light leading-[1.5] text-ink">
        Дизайн-проект является инструкцией по сборке предстоящего интерьера и
        отвечает на вопросы что, где будет находиться и как это будет выглядеть.
      </p>
      <p className="mt-[18px] max-w-[640px] font-haasr text-[17px] font-light leading-[1.5] text-ink">
        Разработка дизайн-проекта осуществляется из индивидуальных потребностей,
        предпочтений и образа жизни жильцов, с учётом особенностей исходного
        пространства.
      </p>

      <div className="mt-[34px] inline-flex items-baseline gap-[12px] rounded-card border border-ink px-26 py-[18px]">
        <Label tone="graphite">Стоимость</Label>
        <span className="font-haasr text-[28px] font-extralight tracking-[-0.01em] text-ink">
          от 5 000 ₽ / м²
        </span>
      </div>

      <div className="mt-[48px]">
        <Accordion items={designAccordion} mode="multi" defaultOpen={["get"]} />
      </div>

      {/* Example project */}
      <div className="mt-[64px]">
        <div className="flex items-baseline justify-between gap-22">
          <h4 className="font-haast text-[clamp(24px,3vw,32px)] font-thin tracking-[-0.01em] text-ink">
            Пример дизайн-проекта
          </h4>
          <Label tone="graphite">{designExample.meta}</Label>
        </div>
        <div className="mt-22 grid gap-[14px] md:grid-cols-[1.6fr_1fr] md:grid-rows-2">
          <Photo
            src={designExample.images[0].src}
            alt={designExample.images[0].alt}
            className="md:row-span-2"
            style={{ height: "clamp(280px, 32vw, 440px)" }}
          />
          <Photo
            src={designExample.images[1].src}
            alt={designExample.images[1].alt}
            style={{ height: "clamp(133px, 15.4vw, 213px)" }}
          />
          <Photo
            src={designExample.images[2].src}
            alt={designExample.images[2].alt}
            style={{ height: "clamp(133px, 15.4vw, 213px)" }}
          />
        </div>
        <div className="mt-14 font-mono text-label text-graphite">
          {designExample.caption}
        </div>
      </div>

      {/* Options */}
      <div className="mt-[72px]">
        <Label>Опции</Label>
        <h4 className="mt-14 font-haast text-[clamp(26px,3.4vw,38px)] font-thin tracking-[-0.01em] text-ink">
          Под какую задачу проект
        </h4>

        <div className="mt-26 inline-flex gap-[4px] rounded-pill border border-ink p-[5px]">
          {(["self", "invest"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setOption(key)}
              className={cx(
                "rounded-pill px-[30px] py-[12px] text-nav uppercase tracking-[0.14em] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                option === key ? "bg-ink text-bleach" : "bg-transparent text-ink",
              )}
            >
              {key === "self" ? "Для себя" : "Инвестиция"}
            </button>
          ))}
        </div>

        <div
          key={option}
          className="mt-[34px] grid gap-[40px] md:grid-cols-[1.1fr_0.9fr]"
          style={style}
        >
          <div>
            <Label tone="graphite">{opt.badge}</Label>
            <h5 className="mt-[10px] font-haasr text-[30px] font-extralight tracking-[-0.01em] text-ink">
              {opt.title}
            </h5>
            <p className="mt-[18px] max-w-[520px] font-haasr text-[16px] font-light leading-[1.55] text-ink">
              {opt.body}
            </p>
            <div className="mt-26 grid max-w-[520px] grid-cols-2 gap-x-[28px] gap-y-[18px]">
              <SpecCell k="Срок" v={opt.term} />
              <SpecCell k="Кому" v={opt.audience} />
            </div>
          </div>
          <div className="rounded-card bg-paper p-29">
            <Label>Преимущества</Label>
            <ul className="mt-[16px] flex list-none flex-col gap-14 p-0">
              {opt.perks.map((perk, i) => (
                <li
                  key={perk}
                  className={cx(
                    "font-haasr text-[15px] font-light leading-[1.4] text-ink",
                    i < opt.perks.length - 1 && "border-b border-ink/[0.18] pb-14",
                  )}
                >
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="mt-[78px]">
        <h4 className="font-haast text-[clamp(24px,3vw,32px)] font-thin tracking-[-0.01em] text-ink">
          Процесс работы над дизайн-проектом
        </h4>
        <div className="mt-[28px] grid gap-x-[48px] md:grid-cols-2">
          {designProcess.map((title, i) => (
            <div
              key={title}
              className="flex items-baseline gap-[20px] border-t border-ink py-22"
            >
              <span className="min-w-[30px] font-mono text-label text-graphite">
                /0{i + 1}
              </span>
              <span className="font-haasr text-[17px] font-light leading-[1.3] text-ink">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-[78px]">
        <h4 className="font-haast text-[clamp(24px,3vw,32px)] font-thin tracking-[-0.01em] text-ink">
          Частые вопросы
        </h4>
        <div className="mt-26">
          <Accordion
            items={faq.map((f) => ({ id: f.q, title: f.q, body: f.a }))}
            mode="single"
          />
        </div>
      </div>

      <div className="mt-[54px]">
        <PillButton magnetic arrow onClick={onLead}>
          Узнать стоимость проекта
        </PillButton>
      </div>
    </div>
  );
}

function SpecCell({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-t border-ink pt-[12px]">
      <Label tone="graphite">{k}</Label>
      <div className="mt-[4px] font-haasr text-[18px] font-light text-ink">{v}</div>
    </div>
  );
}

/* ===== Generic service panel (repair / supervision / completion / mgmt) ===== */
function ServicePanel({
  data,
  onLead,
  style,
}: {
  data: ServicePanelData;
  onLead: () => void;
  style: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <Label tone="graphite">{data.tag}</Label>
      <h3 className="mt-[16px] text-balance font-haast text-[clamp(30px,4.4vw,44px)] font-thin leading-none tracking-[-0.02em] text-ink">
        {data.title}
      </h3>

      {data.price && (
        <div className="mt-22 inline-flex items-baseline gap-[12px] rounded-card border border-ink px-24 py-[16px]">
          <Label tone="graphite">Стоимость</Label>
          <span className="font-haasr text-[26px] font-extralight tracking-[-0.01em] text-ink">
            {data.price}
          </span>
        </div>
      )}

      <p className="mt-[28px] max-w-[640px] font-haasr text-[17px] font-light leading-[1.5] text-ink">
        {data.lead}
      </p>

      <div className="mt-[40px]">
        <Photo
          src={data.image.src}
          alt={data.image.alt}
          className="w-full"
          style={{ height: "clamp(260px, 30vw, 420px)" }}
        />
      </div>

      <div className="mt-[40px] grid grid-cols-1 gap-x-[28px] sm:grid-cols-3">
        {data.rows.map((r) => (
          <div key={r.k} className="border-t border-ink pt-[16px]">
            <Label tone="graphite">{r.k}</Label>
            <div className="mt-[8px] font-haasr text-[20px] font-light leading-[1.2] text-ink">
              {r.v}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[54px]">
        <Label>{data.stepsLabel}</Label>
        <div className="mt-[18px] border-t border-ink">
          {data.steps.map((label, i) => (
            <div
              key={label}
              className="flex items-baseline gap-22 border-b border-graphite py-[20px]"
            >
              <span className="min-w-[32px] font-mono text-label text-graphite">
                /0{i + 1}
              </span>
              <span className="font-haasr text-[18px] font-light leading-[1.35] text-ink">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[50px]">
        <PillButton magnetic arrow onClick={onLead}>
          Узнать стоимость проекта
        </PillButton>
      </div>
    </div>
  );
}

/* ===== Portfolio ===== */
function PortfolioPanel({
  onLead,
  style,
}: {
  onLead: () => void;
  style: React.CSSProperties;
}) {
  return (
    <div id="spaces" style={style}>
      <Label tone="graphite">06 / Портфолио</Label>
      <h3 className="mt-[16px] font-haast text-[clamp(30px,4.4vw,44px)] font-thin leading-none tracking-[-0.02em] text-ink">
        Реализованные пространства
      </h3>
      <p className="mt-22 max-w-[560px] font-haasr text-[17px] font-light leading-[1.5] text-ink">
        Объекты, доведённые нами от концепции до ключей — от компактных студий
        до загородных резиденций.
      </p>

      <div className="mt-[40px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
        {portfolio.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 90}>
            <Photo
              src={p.src}
              alt={p.name}
              className="w-full"
              style={{ height: "clamp(240px, 26vw, 360px)" }}
            />
            <div className="mt-[12px] flex items-baseline justify-between">
              <span className="font-haasr text-[17px] font-light text-ink">
                {p.name}
              </span>
              <Label tone="graphite">{p.meta}</Label>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-[50px]">
        <PillButton magnetic arrow onClick={onLead}>
          Обсудить свой проект
        </PillButton>
      </div>
    </div>
  );
}
