import { contacts } from "../data/content";
import { useLeadForm } from "../components/LeadForm";
import { Container, Section } from "../components/layout";
import {
  GhostLink,
  Hairline,
  MuseumLabel,
  PillButton,
} from "../components/ui";

export function Contacts() {
  const lead = useLeadForm();

  return (
    <Section id="contacts">
      <Container>
        <Hairline />
        <div className="py-72 text-center md:py-144">
          <MuseumLabel muted>Заказать проект</MuseumLabel>

          <a
            href={contacts.phoneHref}
            className="mt-29 block font-haast text-heading font-thin tracking-[-0.01em] text-ink hover:opacity-70"
          >
            {contacts.phone}
          </a>

          <div className="mt-29 flex flex-wrap items-center justify-center gap-29 font-haasr text-body">
            <GhostLink href={contacts.telegram} target="_blank" rel="noreferrer">
              Telegram
            </GhostLink>
            <GhostLink href={contacts.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </GhostLink>
          </div>

          <div className="mt-43 flex flex-wrap items-center justify-center gap-14">
            <PillButton onClick={lead.open}>Оставить заявку</PillButton>
            <PillButton onClick={lead.open}>Заказать обратный звонок</PillButton>
          </div>

          <div className="mt-43">
            <MuseumLabel muted>{contacts.city}</MuseumLabel>
          </div>
        </div>
        <Hairline />
      </Container>
    </Section>
  );
}
