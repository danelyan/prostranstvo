import { faq } from "../data/content";
import { Container, Section } from "../components/layout";
import { Hairline, MuseumLabel, SectionHeadline } from "../components/ui";

export function Faq() {
  return (
    <Section>
      <Container>
        <div className="mb-43 text-center">
          <MuseumLabel muted>FAQ</MuseumLabel>
          <SectionHeadline className="mt-22">
            Часто задаваемые
            <br />
            вопросы
          </SectionHeadline>
        </div>

        <div className="mx-auto max-w-[900px]">
          <Hairline />
          {faq.map((item) => (
            <details key={item.question} className="group border-b border-graphite">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-22 py-22">
                <span className="font-haasr text-statement text-ink">
                  {item.question}
                </span>
                <span className="font-mono text-label text-graphite transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-22 font-haasr text-body text-ink">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
