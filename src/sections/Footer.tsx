import { Container } from "../components/layout";
import { MicroCaption, MuseumLabel } from "../components/ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink">
      <Container className="flex flex-col gap-22 py-43 md:flex-row md:items-center md:justify-between">
        <div className="font-haasr text-nav uppercase tracking-[0.12em] text-ink">
          ПРОСТРАНСТВО <sup className="text-[8px]">®</sup>
        </div>

        <MuseumLabel muted>
          Инвестиционный дизайн · меблировка · хоумстейджинг
        </MuseumLabel>

        <div className="flex items-center gap-29">
          <MicroCaption>© {year} · Все права защищены</MicroCaption>
          <a
            href="#top"
            className="font-mono text-label uppercase tracking-[0.06em] text-ink hover:opacity-60"
          >
            Наверх ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
