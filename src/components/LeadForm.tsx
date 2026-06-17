import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { contacts } from "../data/studio";
import { Label, PillButton } from "./ui";

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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // No backend in this MVP — log the assembled request.
    console.info("Заявка PROSTRANSTVO:", Object.fromEntries(data.entries()));
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/30 px-22 py-[40px] backdrop-blur-[6px]"
      style={{ animation: "var(--animate-backdrop-in)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-[40px] w-full max-w-[560px] rounded-card border border-ink bg-bleach p-[42px]"
        style={{ animation: "var(--animate-card-in)" }}
      >
        {submitted ? (
          <div
            className="py-22 text-center"
            style={{ animation: "var(--animate-panel-in)" }}
          >
            <Label tone="graphite" className="tracking-[0.12em]">
              Готово
            </Label>
            <h3 className="mt-[18px] font-haast text-[34px] font-thin leading-none tracking-[-0.01em] text-ink">
              Заявка отправлена
            </h3>
            <p className="mx-auto mt-[18px] max-w-[380px] font-haasr text-[15px] font-light leading-[1.5] text-ink">
              Мы очень скоро свяжемся с вами. Спасибо за&nbsp;доверие
              к&nbsp;PROSTRANSTVO.
            </p>
            <div className="mt-[32px] flex justify-center">
              <PillButton onClick={handleClose}>Закрыть</PillButton>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <Label tone="graphite" className="tracking-[0.12em]">
                  Заявка
                </Label>
                <h3 className="mt-14 font-haast text-[30px] font-thin leading-none tracking-[-0.01em] text-ink">
                  Узнать стоимость
                  <br />
                  проекта
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Закрыть"
                className="text-[24px] font-extralight leading-none text-ink transition-opacity hover:opacity-60"
              >
                ×
              </button>
            </div>

            <p className="mt-[18px] font-haasr text-[14px] font-light leading-[1.5] text-ink">
              Оставьте данные — мы свяжемся в течение рабочего дня и обсудим ваш
              объект, бюджет и сроки.
            </p>

            <form onSubmit={handleSubmit} className="mt-[28px] flex flex-col gap-22">
              <Input name="name" placeholder="Ваше имя" required />
              <Input name="phone" type="tel" placeholder="Телефон" required />
              <Input name="address" placeholder="Адрес объекта" />
              <Input name="area" type="number" placeholder="Площадь, м²" />
              <select
                name="channel"
                required
                defaultValue=""
                className="w-full border-b border-ink bg-transparent py-[12px] font-haasr text-body font-light text-ink outline-none"
              >
                <option value="" disabled>
                  Удобный способ связи
                </option>
                <option>Telegram</option>
                <option>WhatsApp</option>
                <option>Телефон</option>
              </select>

              <label className="flex items-start gap-[10px] font-haasr text-[12px] font-light leading-[1.45] text-graphite">
                <input
                  required
                  type="checkbox"
                  name="consent"
                  className="mt-[3px] accent-black"
                />
                <span>
                  Я подтверждаю согласие на обработку моих персональных данных в
                  порядке и на условиях политики обработки персональных данных.
                </span>
              </label>

              <PillButton type="submit" solid full className="mt-[6px]">
                Отправить заявку
              </PillButton>
            </form>

            <div className="mt-22 flex flex-wrap gap-22 border-t border-graphite pt-[18px]">
              <a
                href={contacts.telegram}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-label uppercase tracking-[0.06em] text-ink hover:opacity-60"
              >
                Telegram ↗
              </a>
              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-label uppercase tracking-[0.06em] text-ink hover:opacity-60"
              >
                WhatsApp ↗
              </a>
              <a
                href={contacts.phoneHref}
                className="font-mono text-label uppercase tracking-[0.06em] text-ink hover:opacity-60"
              >
                {contacts.phone}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Input({
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full border-b border-ink bg-transparent py-[12px] font-haasr text-body font-light text-ink outline-none placeholder:text-graphite"
    />
  );
}
