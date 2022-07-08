import { React, useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={buttonHandler}>{!isOpen ? "Open" : "Close"}</button>
      {isOpen && <p>It's open</p>}
    </div>
  );
}

export default App;
