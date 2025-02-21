import React, { useState } from "react";
import Board from "./components/Board";
import "./styles.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
      <Board />
    </div>
  );
};

export default App;