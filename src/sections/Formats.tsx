import { formats, type FormatBlock } from "../data/content";
import { useLeadForm } from "../components/LeadForm";
import { Container, Section } from "../components/layout";
import {
  Hairline,
  MuseumLabel,
  PaperCard,
  PillButton,
  SectionHeadline,
} from "../components/ui";

export function Formats() {
  return (
    <Section id="formats">
      <Container>
        <div className="mb-43 text-center">
          <MuseumLabel muted>Опции</MuseumLabel>
          <SectionHeadline className="mt-22">
            Два формата работы
          </SectionHeadline>
        </div>

        <div className="grid grid-cols-1 gap-22 md:grid-cols-2 md:gap-43">
          {formats.map((format) => (
            <FormatCard key={format.id} format={format} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FormatCard({ format }: { format: FormatBlock }) {
  const lead = useLeadForm();

  return (
    <PaperCard className="flex flex-col">
      <div className="flex items-baseline justify-between">
        <h3 className="font-haast text-heading-sm font-thin text-ink">
          {format.id}
        </h3>
        <MuseumLabel muted>
          {format.id === "SIMPLE" ? "готовые стили" : "авторский проект"}
        </MuseumLabel>
      </div>

      <p className="mt-22 font-haasr text-body text-ink">{format.summary}</p>

      <div className="mt-29">
        <MuseumLabel muted>Что входит</MuseumLabel>
        <ul className="mt-14">
          {format.includes.map((item) => (
            <li
              key={item}
              className="border-b border-graphite py-7 font-mono text-label text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <SpecLine label="Сроки" value={format.timing} />
      <div className="mt-22">
        <MuseumLabel muted>Оплата · 4 этапа</MuseumLabel>
        <ol className="mt-14">
          {format.payment.map((step, index) => (
            <li
              key={step}
              className="flex gap-14 border-b border-graphite py-7 font-mono text-label text-ink"
            >
              <span className="text-graphite">{`0${index + 1}`}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <SpecLine label="Гарантии" value={format.warranty} />

      <div className="mt-29 flex-1" />
      <Hairline tone="graphite" className="mb-22" />
      <PillButton onClick={lead.open}>Оставить заявку</PillButton>
    </PaperCard>
  );
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-22">
      <MuseumLabel muted>{label}</MuseumLabel>
      <p className="mt-7 font-haasr text-body text-ink">{value}</p>
    </div>
  );
}
