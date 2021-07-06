import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./styles/index.css";
import DictionaryContextProvider from "./context/DictionaryContext";

ReactDOM.render(
  <React.StrictMode>
    <DictionaryContextProvider>
      <App />
    </DictionaryContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
