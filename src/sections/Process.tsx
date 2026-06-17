import { processSteps } from "../data/content";
import { Container, Section } from "../components/layout";
import { Hairline, MuseumLabel, SectionHeadline } from "../components/ui";

export function Process() {
  return (
    <Section>
      <Container>
        <div className="mb-43 text-center">
          <MuseumLabel muted>Как мы работаем</MuseumLabel>
          <SectionHeadline className="mt-22">
            Простая система,
            <br />
            где всё под контролем
          </SectionHeadline>
        </div>

        <div>
          <Hairline />
          {processSteps.map((step) => (
            <div key={step.index}>
              <div className="grid grid-cols-1 gap-7 py-29 md:grid-cols-[120px_1fr] md:gap-43">
                <div>
                  <MuseumLabel>{step.index}</MuseumLabel>
                </div>
                <div className="flex flex-col gap-7">
                  {step.lines.map((line) => (
                    <p key={line} className="font-haasr text-statement text-ink">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <Hairline tone="graphite" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
