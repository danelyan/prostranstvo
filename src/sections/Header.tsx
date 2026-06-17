import { useRoom } from "../room/RoomContext";
import { useLeadForm } from "../components/LeadForm";
import { Container } from "../components/layout";

const NAV = [
  { href: "#studio", label: "Студия" },
  { href: "#formats", label: "Форматы" },
  { href: "#catalog", label: "Коллекции" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const room = useRoom();
  const lead = useLeadForm();

  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-bleach/90 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-22 py-14">
        <a
          href="#top"
          className="font-haasr text-nav uppercase tracking-[0.12em] text-ink"
        >
          ПРОСТРАНСТВО <sup className="text-[8px]">®</sup>
        </a>

        <nav className="hidden items-center gap-29 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-haasr text-nav uppercase tracking-[0.08em] text-ink hover:opacity-60"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-22">
          <button
            type="button"
            onClick={lead.open}
            className="hidden font-mono text-label uppercase tracking-[0.06em] text-ink hover:opacity-60 sm:inline"
          >
            Написать нам
          </button>
          <button
            type="button"
            onClick={room.toggle}
            className="font-mono text-label uppercase tracking-[0.06em] text-ink hover:opacity-60"
          >
            Комната ( {room.count} )
          </button>
        </div>
      </Container>
    </header>
  );
}
