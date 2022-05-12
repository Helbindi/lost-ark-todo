import React, { useState } from "react";
import CharacterChecklist from "./components/CharacterChecklist";
import Navigation from "./components/Navigation";
import RosterChecklist from "./components/RosterChecklist";

function App() {
  const [showCharacter, setShowCharacter] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault();

    setShowCharacter(!showCharacter);
  };

  return (
    // Render between Character and Rooster Checklist
    <>
      <Navigation active={showCharacter} handleToggle={handleToggle} />
      {showCharacter && <CharacterChecklist />}
      {!showCharacter && <RosterChecklist />}
    </>
  );
}

export default App;
