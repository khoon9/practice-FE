import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import styled from "styled-components";

import { setupIonicReact } from "@ionic/react";
import NewComponent from "./components/NewComponent";

function App() {
  setupIonicReact();
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NewComponent />
    </div>
  );
}

export default App;
