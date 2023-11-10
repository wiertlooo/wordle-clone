import { React } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GameProvider } from "./context/game";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <GameProvider>
    <App />
  </GameProvider>
);
