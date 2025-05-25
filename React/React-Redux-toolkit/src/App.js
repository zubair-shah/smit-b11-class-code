import React from "react";
import { createRoot } from "react-dom/client";

import Main from "./Main.jsx";
const container = document.getElementById("root");
const root = createRoot(container);
// root.render(React.createElement("h2", {}, "We are learning React"));
root.render(React.createElement(Main));
