import React from "react";
import ReactDOM from "react-dom/client";
import "@/style.less";
import MyRoutes from "./components/routes";
import { Normalize } from "styled-normalize";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Normalize />
    <MyRoutes />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();