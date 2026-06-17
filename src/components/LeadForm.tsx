import {
  createContext,
  useContext,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRoom } from "../room/RoomContext";
import { elements } from "../data/elements";
import { contacts } from "../data/content";
import { Hairline, MuseumLabel, PillButton } from "./ui";

const byId = new Map(elements.map((el) => [el.id, el]));

interface LeadFormContextValue {
  open: () => void;
  close: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<LeadFormContextValue>(
    () => ({ open: () => setIsOpen(true), close: () => setIsOpen(false) }),
    [],
  );

  return (
    <LeadFormContext.Provider value={value}>
      {children}
      <LeadFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </LeadFormContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLeadForm(): LeadFormContextValue {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used within LeadFormProvider");
  return ctx;
}

function LeadFormModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const room = useRoom();
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      phone: data.get("phone"),
      telegram: data.get("telegram"),
      whatsapp: data.get("whatsapp"),
      consent: data.get("consent") === "on",
      room: room.lines.map((line) => ({
        ref: byId.get(line.id)?.ref,
        name: byId.get(line.id)?.name,
        qty: line.qty,
      })),
    };
    // No backend in this MVP — the assembled room travels with the request.
    console.info("Заявка ПРОСТРАНСТВО:", payload);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-22">
      <div
        className="absolute inset-0 bg-ink/30"
        onClick={handleClose}
        aria-hidden
      />

      <div className="relative z-10 flex max-h-[88dvh] w-full max-w-[560px] flex-col overflow-y-auto border border-ink bg-bleach">
        <header className="flex items-baseline justify-between px-29 pt-29 pb-22">
          <h2 className="font-haast text-heading-sm font-thin text-ink">
            {submitted ? "Принято" : "Заявка"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="font-mono text-label uppercase tracking-[0.06em] text-ink hover:opacity-60"
          >
            Закрыть ✕
          </button>
        </header>
        <Hairline />

        {submitted ? (
          <div className="px-29 py-43">
            <p className="font-haasr text-statement text-ink">
              Спасибо. Мы очень скоро свяжемся с вами по указанным контактам и
              соберём пространство по вашей комнате.
            </p>
            <div className="mt-29">
              <PillButton onClick={handleClose}>Хорошо</PillButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-29 py-29">
            {room.lines.length > 0 ? (
              <div className="mb-29">
                <MuseumLabel muted>Ваша комната</MuseumLabel>
                <ul className="mt-14">
                  {room.lines.map((line) => {
                    const el = byId.get(line.id);
                    if (!el) return null;
                    return (
                      <li
                        key={line.id}
                        className="flex items-baseline justify-between border-b border-graphite py-7 font-mono text-label text-ink"
                      >
                        <span>{el.name}</span>
                        <span>×{line.qty}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <p className="mb-29 font-haasr text-body text-graphite">
                Комната пока пуста — оставьте заявку, и мы подберём элементы
                интерьера вместе с вами.
              </p>
            )}

            <div className="flex flex-col gap-22">
              <Field name="phone" label="Телефон *" type="tel" required placeholder="+7 ___ ___ __ __" />
              <Field name="telegram" label="Telegram" placeholder="@username" />
              <Field name="whatsapp" label="WhatsApp" placeholder="+7 ___ ___ __ __" />
            </div>

            <label className="mt-29 flex items-start gap-14 font-haasr text-micro text-ink">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-[14px] w-[14px] accent-black"
              />
              <span>
                Я подтверждаю ознакомление и даю согласие на обработку моих
                персональных данных в порядке и на условиях, указанных в Политике
                обработки персональных данных.
              </span>
            </label>

            <div className="mt-29 flex flex-wrap items-center gap-22">
              <PillButton type="submit">Отправить</PillButton>
              <MuseumLabel muted>{contacts.phone}</MuseumLabel>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-label uppercase tracking-[0.06em] text-graphite">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-7 w-full border-b border-ink bg-transparent pb-7 font-haasr text-body text-ink outline-none placeholder:text-graphite focus:border-ink"
      />
    </label>
  );
}
