import { useLeadForm } from "../components/LeadForm";
import { PillButton } from "../components/ui";
import { Container } from "../components/layout";
import { contacts } from "../data/studio";
import { useScrollProgress } from "../lib/effects";
import { useStudio } from "../lib/studioState";

const NAV = [
  { href: "#services", label: "Услуги" },
  { href: "#spaces", label: "Пространства", spaces: true },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const lead = useLeadForm();
  const studio = useStudio();
  const progress = useScrollProgress();

  return (
    <nav className="sticky top-0 z-[60] border-b border-ink bg-bleach/[0.86] backdrop-blur-[14px]">
      <Container className="flex items-center justify-between gap-22 py-[18px]">
        <a
          href="#top"
          className="whitespace-nowrap font-haasr text-[14px] font-light tracking-[0.42em] text-ink"
        >
          PROSTRANSTVO
        </a>

        <div className="flex items-center gap-[18px] md:gap-[34px]">
          <a
            href={contacts.phoneHref}
            className="font-haasr text-[13px] font-light tracking-[0.04em] text-ink md:hidden"
          >
            {contacts.phone}
          </a>
          <div className="hidden items-center gap-[34px] md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={
                  item.spaces
                    ? (e) => {
                        e.preventDefault();
                        studio.goToService("portfolio");
                      }
                    : undefined
                }
                className="font-mono text-label uppercase tracking-[0.06em] text-ink opacity-70 transition-opacity duration-300 hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
            <a
              href={contacts.phoneHref}
              className="whitespace-nowrap font-haasr text-[13px] font-light tracking-[0.04em] text-ink"
            >
              {contacts.phone}
            </a>
          </div>

          <PillButton
            magnetic
            onClick={lead.open}
            className="px-[18px] py-[11px] !tracking-[0.16em] sm:px-26 sm:py-[13px]"
          >
            Узнать стоимость
          </PillButton>
        </div>
      </Container>

      {/* Strict scroll-progress rule that rides the bottom border. */}
      <div
        className="absolute bottom-[-1px] left-0 h-[2px] origin-left bg-ink"
        style={{ width: "100%", transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </nav>
  );
}
