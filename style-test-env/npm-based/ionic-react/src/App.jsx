import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IonButton } from "@ionic/react";

import { setupIonicReact } from "@ionic/react";

function App() {
  setupIonicReact();
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <IonButton>Hello, Ionic</IonButton>
    </div>
  );
}

export default App;
