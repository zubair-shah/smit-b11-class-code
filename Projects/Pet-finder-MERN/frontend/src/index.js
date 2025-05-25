import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
const container = document.getElementById("root");
const root = createRoot(container);
// root.render(React.createElement("h2", {}, "We are learning React"));
root.render(React.createElement(App));
