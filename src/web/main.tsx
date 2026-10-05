import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";

const container = document.querySelector<HTMLDivElement>("#root");

if (!container) {
  throw new Error("找不到 #root 挂载点");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
