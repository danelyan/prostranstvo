import { Container, Section } from "../components/layout";
import { Hairline, MuseumLabel, StatementBlock } from "../components/ui";

export function Manifesto() {
  return (
    <Section id="studio">
      <Container>
        <Hairline />
        <div className="py-72 text-center md:py-144">
          <MuseumLabel muted>Студия</MuseumLabel>
          <StatementBlock className="mt-29">
            Мы превращаем пустые стены в готовое к жизни пространство. Замеры,
            концепция, закупка, логистика, сборка и уборка — простая система, где
            всё под контролем, а вам остаётся только переехать.
          </StatementBlock>
        </div>
        <Hairline />
      </Container>
    </Section>
  );
}
