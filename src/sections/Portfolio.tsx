import { Container, Section } from "../components/layout";
import {
  GhostLink,
  MuseumLabel,
  PlaceholderImage,
  SectionHeadline,
} from "../components/ui";

const SHOTS = [
  { label: "Студия · 28 м² · WOOD", ratio: "4 / 5" },
  { label: "Однушка · 42 м² · COZY", ratio: "1 / 1" },
  { label: "Двушка · 64 м² · SPECTRUM", ratio: "4 / 5" },
  { label: "Кухня-гостиная · WIND", ratio: "1 / 1" },
  { label: "Спальня · ROOTS", ratio: "4 / 5" },
  { label: "Гостиная · GRASS", ratio: "1 / 1" },
];

export function Portfolio() {
  return (
    <Section id="portfolio">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-22">
          <div>
            <MuseumLabel muted>Портфолио</MuseumLabel>
            <SectionHeadline className="mt-22">Сданные объекты</SectionHeadline>
          </div>
          <GhostLink href="#contacts" className="font-haasr text-body">
            Смотреть портфолио →
          </GhostLink>
        </div>

        <div className="mt-43 grid grid-cols-2 gap-22 md:grid-cols-3 md:gap-43">
          {SHOTS.map((shot, index) => (
            <PlaceholderImage
              key={shot.label}
              label={shot.label}
              ratio={shot.ratio}
              className={index % 2 === 1 ? "md:mt-43" : undefined}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
