import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/inter/100.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/pt-mono/400.css";

import "./styles/theme.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
