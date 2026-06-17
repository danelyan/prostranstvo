import { useMemo, useState, type ReactNode } from "react";
import {
  collections,
  elements,
  type CollectionId,
  type InteriorElement,
} from "../data/elements";
import { useRoom } from "../room/RoomContext";
import { Container, Section } from "../components/layout";
import {
  Hairline,
  MuseumLabel,
  PillButton,
  PlaceholderImage,
  SectionHeadline,
  SpecTable,
} from "../components/ui";

type Filter = "ALL" | CollectionId;

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("ALL");

  const visible = useMemo(
    () =>
      filter === "ALL"
        ? elements
        : elements.filter((el) => el.collection === filter),
    [filter],
  );

  const activeTagline =
    filter === "ALL"
      ? "Шесть коллекций. Кликните по элементу — он сложится в вашу комнату, а не в корзину."
      : collections.find((c) => c.id === filter)?.tagline;

  return (
    <Section id="catalog">
      <Container>
        <div className="text-center">
          <MuseumLabel muted>Каталог · элементы интерьера</MuseumLabel>
          <SectionHeadline className="mt-22">Соберите комнату</SectionHeadline>
          <p className="mx-auto mt-29 max-w-[640px] font-haasr text-body text-ink">
            {activeTagline}
          </p>
        </div>

        <div className="mt-43 flex flex-wrap items-center justify-center gap-7">
          <FilterTab active={filter === "ALL"} onClick={() => setFilter("ALL")}>
            Все
          </FilterTab>
          {collections.map((c) => (
            <FilterTab
              key={c.id}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.id}
            </FilterTab>
          ))}
        </div>

        <div className="mt-43">
          <Hairline />
          <div className="grid grid-cols-1 gap-x-43 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((el) => (
              <ElementCard key={el.id} element={el} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-pill border px-22 py-7 font-mono text-label uppercase tracking-[0.06em] transition-opacity ${
        active
          ? "border-ink bg-paper text-ink"
          : "border-graphite text-graphite hover:opacity-60"
      }`}
    >
      {children}
    </button>
  );
}

function ElementCard({ element }: { element: InteriorElement }) {
  const room = useRoom();
  const inRoom = room.has(element.id);

  return (
    <article className="flex flex-col gap-22 border-b border-graphite py-43">
      <PlaceholderImage label={element.ref} ratio="4 / 5" />

      <div className="flex items-baseline justify-between gap-14">
        <MuseumLabel muted>{element.collection}</MuseumLabel>
        <MuseumLabel muted>{element.category}</MuseumLabel>
      </div>

      <div>
        <h3 className="font-haasr text-statement text-ink">{element.name}</h3>
        <p className="mt-7 font-haasr text-body text-ink">{element.description}</p>
      </div>

      <SpecTable unit={element.unit} rows={element.specs} />

      <p className="font-mono text-micro text-graphite">
        Состав: {element.ingredients}
        <br />
        {element.note}
      </p>

      <div className="mt-auto">
        <PillButton
          active={inRoom}
          className="w-full"
          onClick={() => (inRoom ? room.open() : room.add(element.id))}
        >
          {inRoom ? "В комнате ✓" : "Добавить в комнату"}
        </PillButton>
      </div>
    </article>
  );
}
