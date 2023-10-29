import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { IonApp } from "@ionic/react";
import { setupIonicReact } from "@ionic/react";

setupIonicReact();

ReactDOM.createRoot(document.getElementById("root")).render(
  <IonApp>
    <App />
  </IonApp>
);
