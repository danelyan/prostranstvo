import type { ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-[1440px] px-22 md:px-[40px]", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cx("py-72 md:py-144", className)}>
      {children}
    </section>
  );
}
