import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MovieContext } from "./Components/movieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieContext>
        <App />
      </MovieContext>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
