import { useLeadForm } from "../components/LeadForm";
import { Container } from "../components/layout";
import { MuseumLabel, PillButton, PlaceholderImage } from "../components/ui";

export function Hero() {
  const lead = useLeadForm();

  return (
    <section id="top" className="pt-72 pb-43 md:pt-144">
      <Container>
        <div className="text-center">
          <MuseumLabel muted>
            ® PROSTRANSTVO — INVESTMENT INTERIORS · EST. МОСКВА
          </MuseumLabel>

          <h1 className="mt-29 font-haast text-display font-thin leading-[0.9] tracking-[-0.02em] text-ink">
            Готовая
            <br />
            квартира
            <br />
            за 30 дней
          </h1>

          <p className="mx-auto mt-29 max-w-[640px] font-haasr text-statement text-ink">
            Инвестиционный дизайн, меблировка и хоумстейджинг. Соберите свою
            комнату из элементов интерьера — остальное мы возьмём на себя.
          </p>

          <div className="mt-43 flex flex-wrap items-center justify-center gap-14">
            <PillButton onClick={() => scrollToCatalog()}>
              Собрать комнату
            </PillButton>
            <PillButton onClick={lead.open}>Написать нам</PillButton>
          </div>
        </div>

        <div className="mt-72 grid grid-cols-2 gap-22 md:grid-cols-4 md:gap-43">
          <PlaceholderImage label="PRO-0001 · Диван «Молоко»" ratio="3 / 4" />
          <PlaceholderImage
            label="PRO-0011 · Светильник «Диск»"
            ratio="3 / 4"
            className="md:mt-43"
          />
          <PlaceholderImage label="PRO-0022 · Ковёр «Тёплый»" ratio="3 / 4" />
          <PlaceholderImage
            label="PRO-0033 · Ваза «Дюна»"
            ratio="3 / 4"
            className="md:mt-43"
          />
        </div>
      </Container>
    </section>
  );
}

function scrollToCatalog() {
  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
}
