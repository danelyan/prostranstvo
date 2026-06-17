import { useRoom } from "../room/RoomContext";
import { elements } from "../data/elements";
import { useLeadForm } from "./LeadForm";
import { Hairline, MuseumLabel, PillButton } from "./ui";

const byId = new Map(elements.map((el) => [el.id, el]));

export function RoomDrawer() {
  const room = useRoom();
  const lead = useLeadForm();

  return (
    <>
      {/* Scrim */}
      <div
        aria-hidden={!room.isOpen}
        onClick={room.close}
        className={`fixed inset-0 z-40 bg-ink/20 transition-opacity duration-300 ${
          room.isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Комната"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[440px] flex-col border-l border-ink bg-bleach transition-transform duration-300 ${
          room.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-baseline justify-between px-29 pt-29 pb-22">
          <div>
            <h2 className="font-haast text-heading-sm font-thin text-ink">Комната</h2>
            <div className="mt-7">
              <MuseumLabel muted>
                {room.count > 0
                  ? `${room.count} ${pluralItems(room.count)} в наборе`
                  : "Набор пуст"}
              </MuseumLabel>
            </div>
          </div>
          <button
            type="button"
            onClick={room.close}
            className="font-mono text-label uppercase tracking-[0.06em] text-ink hover:opacity-60"
          >
            Закрыть ✕
          </button>
        </header>

        <Hairline />

        <div className="flex-1 overflow-y-auto px-29">
          {room.lines.length === 0 ? (
            <p className="py-43 font-haasr text-body text-graphite">
              Выбирайте элементы интерьера в каталоге — они складываются сюда,
              в вашу комнату. Затем оставьте заявку, и мы соберём пространство
              под ключ.
            </p>
          ) : (
            <ul>
              {room.lines.map((line) => {
                const el = byId.get(line.id);
                if (!el) return null;
                return (
                  <li key={line.id} className="border-b border-graphite py-22">
                    <div className="flex items-start justify-between gap-14">
                      <div>
                        <p className="font-haasr text-body text-ink">{el.name}</p>
                        <div className="mt-4">
                          <MuseumLabel muted>
                            {el.ref} · {el.collection}
                          </MuseumLabel>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => room.remove(line.id)}
                        className="font-mono text-label uppercase tracking-[0.06em] text-graphite hover:text-ink"
                      >
                        Убрать
                      </button>
                    </div>

                    <div className="mt-14 inline-flex items-center gap-14 rounded-pill border border-ink px-14 py-7">
                      <button
                        type="button"
                        aria-label="Меньше"
                        onClick={() => room.setQty(line.id, line.qty - 1)}
                        className="font-mono text-label text-ink hover:opacity-60"
                      >
                        −
                      </button>
                      <span className="min-w-[20px] text-center font-mono text-label text-ink">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Больше"
                        onClick={() => room.setQty(line.id, line.qty + 1)}
                        className="font-mono text-label text-ink hover:opacity-60"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <Hairline />

        <div className="flex flex-col gap-14 px-29 py-22">
          <PillButton
            disabled={room.lines.length === 0}
            onClick={() => {
              room.close();
              lead.open();
            }}
            className="w-full"
          >
            Оформить заявку
          </PillButton>
          {room.lines.length > 0 ? (
            <button
              type="button"
              onClick={room.clear}
              className="font-mono text-label uppercase tracking-[0.06em] text-graphite hover:text-ink"
            >
              Очистить комнату
            </button>
          ) : null}
        </div>
      </aside>
    </>
  );
}

function pluralItems(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "элемент";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "элемента";
  return "элементов";
}
