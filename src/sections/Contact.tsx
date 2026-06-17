import { useLeadForm } from "../components/LeadForm";
import { Container } from "../components/layout";
import { Label, PillButton } from "../components/ui";
import { contacts } from "../data/studio";
import { Reveal } from "../lib/effects";

export function Contact() {
  const lead = useLeadForm();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-ink text-bleach">
      <Container className="pt-[96px] pb-[48px]">
        <div className="grid items-end gap-[48px] md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <Label tone="graphite">Свяжитесь с нами</Label>
            <h2 className="mt-[20px] font-haast text-[clamp(36px,6vw,64px)] font-thin leading-[0.95] tracking-[-0.02em] text-bleach">
              Обсудим ваше
              <br />
              пространство
            </h2>
          </Reveal>
          <div className="flex flex-col items-start gap-[16px]">
            <PillButton tone="bleach" magnetic arrow onClick={lead.open}>
              Узнать стоимость проекта
            </PillButton>
          </div>
        </div>

        <div className="mt-[72px] grid grid-cols-2 gap-[32px] border-t border-bleach pt-[34px] md:grid-cols-4">
          <Column title="Телефон">
            <FooterLink href={contacts.phoneHref}>{contacts.phone}</FooterLink>
          </Column>
          <Column title="Мессенджеры">
            <FooterLink href={contacts.telegram} external>
              Telegram
            </FooterLink>
            <FooterLink href={contacts.whatsapp} external>
              WhatsApp
            </FooterLink>
          </Column>
          <Column title="Почта">
            <FooterLink href={`mailto:${contacts.email}`} small>
              {contacts.email}
            </FooterLink>
            <FooterLink href={`mailto:${contacts.emailPartner}`} small>
              {contacts.emailPartner}
            </FooterLink>
          </Column>
          <Column title="Студия">
            <p className="mt-[10px] font-haasr text-[15px] font-light text-paper">
              Полный цикл: дизайн, ремонт, комплектация, надзор
            </p>
          </Column>
        </div>

        <div className="mt-[56px] flex flex-wrap items-center justify-between gap-[16px]">
          <span className="font-haasr text-[14px] font-light tracking-[0.42em] text-bleach">
            PROSTRANSTVO
          </span>
          <span className="font-mono text-label text-graphite">
            © {year} PROSTRANSTVO ® DESIGN STUDIO · МОСКВА
          </span>
        </div>
      </Container>
    </footer>
  );
}

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label tone="graphite">{title}</Label>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
  small = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={
        small
          ? "mt-[6px] font-haasr text-[15px] font-light text-bleach no-underline transition-opacity first:mt-[10px] hover:opacity-60"
          : "mt-[6px] font-haasr text-[17px] font-light text-bleach no-underline transition-opacity first:mt-[10px] hover:opacity-60"
      }
    >
      {children}
    </a>
  );
}
