import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ServiceKey } from "../data/studio";

interface StudioState {
  active: ServiceKey;
  setActive: (key: ServiceKey) => void;
  goToService: (key: ServiceKey) => void;
}

const StudioContext = createContext<StudioState | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ServiceKey>("design");

  const goToService = useCallback((key: ServiceKey) => {
    setActive(key);
    window.setTimeout(() => {
      const el = document.getElementById("services");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }, 20);
  }, []);

  const value = useMemo<StudioState>(
    () => ({ active, setActive, goToService }),
    [active, goToService],
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStudio(): StudioState {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used within StudioProvider");
  return ctx;
}
