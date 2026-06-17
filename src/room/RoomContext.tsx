import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

export interface RoomLine {
  id: string;
  qty: number;
}

type RoomAction =
  | { type: "add"; id: string }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; qty: number }
  | { type: "clear" };

const STORAGE_KEY = "prostranstvo.room.v1";

function readStoredLines(): RoomLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as RoomLine[];
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (line) => typeof line?.id === "string" && Number.isFinite(line?.qty),
        );
      }
    }
  } catch {
    /* ignore corrupted storage */
  }
  return [];
}

function reducer(state: RoomLine[], action: RoomAction): RoomLine[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((line) => line.id === action.id);
      if (existing) {
        return state.map((line) =>
          line.id === action.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...state, { id: action.id, qty: 1 }];
    }
    case "remove":
      return state.filter((line) => line.id !== action.id);
    case "setQty": {
      if (action.qty <= 0) {
        return state.filter((line) => line.id !== action.id);
      }
      return state.map((line) =>
        line.id === action.id ? { ...line, qty: action.qty } : line,
      );
    }
    case "clear":
      return [];
    default:
      return state;
  }
}

interface RoomContextValue {
  lines: RoomLine[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const RoomContext = createContext<RoomContextValue | null>(null);

export function RoomProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, undefined, readStoredLines);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  const value = useMemo<RoomContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    return {
      lines,
      count,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
      has: (id: string) => lines.some((line) => line.id === id),
      add: (id: string) => {
        dispatch({ type: "add", id });
        setIsOpen(true);
      },
      remove: (id: string) => dispatch({ type: "remove", id }),
      setQty: (id: string, qty: number) => dispatch({ type: "setQty", id, qty }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines, isOpen]);

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoom(): RoomContextValue {
  const ctx = useContext(RoomContext);
  if (!ctx) {
    throw new Error("useRoom must be used within RoomProvider");
  }
  return ctx;
}
