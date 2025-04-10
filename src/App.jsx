import { useState } from "react";
import "./App.css";

function App() {
  const [heading, setHeading] = useState("Cli-MTL");

  const clickHandler = () => {
    setHeading("La Carte");
  };

  return (
    <>
      <h1>{heading}</h1>
      <button type="button" onClick={clickHandler}>
        Clickez-moi
      </button>
    </>
  );
}

export default App;
