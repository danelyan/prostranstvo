import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/cyrillic-100.css";
import "@fontsource/inter/cyrillic-200.css";
import "@fontsource/inter/cyrillic-300.css";
import "@fontsource/inter/cyrillic-400.css";
import "@fontsource/inter/cyrillic-500.css";
import "@fontsource/inter/cyrillic-700.css";
import "@fontsource/pt-mono/400.css";
import "@fontsource/pt-mono/cyrillic-400.css";

import "./styles/theme.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
