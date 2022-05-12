import React, { useState, useEffect, useRef } from "react";
import "../index.css";

function RosterChecklist() {
  const [roster, setRoster] = useState(() => {
    // Check if there are any local stored character data
    const localData = localStorage.getItem("roster");
    if (localData) {
      const data = JSON.parse(localData);
      return data;
    } else {
      const newObj = {
        rapport: false,
        island: false,
        chaosGate: false,
        fieldBoss: false,
        ghostShip: false,
      };
      return newObj;
    }
  });

  let rosterRef = useRef({});

  useEffect(() => {
    // add or update the local storage whenver a new character is created
    localStorage.setItem("roster", JSON.stringify(roster));
    rosterRef.current = roster;
  }, [roster]);

  const handleChange = (e) => {
    const type = e.target.name;

    switch (type) {
      case "rapport": {
        const prevTodo = rosterRef.current;
        const updateRoster = { ...prevTodo, rapport: !prevTodo.rapport };
        prevTodo.current = updateRoster;
        setRoster(updateRoster);
        break;
      }
      case "island": {
        const prevTodo = rosterRef.current;
        const updateRoster = { ...prevTodo, island: !prevTodo.island };
        prevTodo.current = updateRoster;
        setRoster(updateRoster);
        break;
      }
      case "chaosGate": {
        const prevTodo = rosterRef.current;
        const updateRoster = { ...prevTodo, chaosGate: !prevTodo.chaosGate };
        prevTodo.current = updateRoster;
        setRoster(updateRoster);
        break;
      }
      case "fieldBoss": {
        const prevTodo = rosterRef.current;
        const updateRoster = { ...prevTodo, fieldBoss: !prevTodo.fieldBoss };
        prevTodo.current = updateRoster;
        setRoster(updateRoster);
        break;
      }
      case "ghostShip": {
        const prevTodo = rosterRef.current;
        const updateRoster = { ...prevTodo, ghostShip: !prevTodo.ghostShip };
        prevTodo.current = updateRoster;
        setRoster(updateRoster);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="roster-container">
      <div className="rapport-title title">
        <img
          className="rapport-img img"
          src="/assets/rapport-icon.png"
          alt="rapport"
        />
        <h2 className="rapport-name">Rapport</h2>
      </div>
      <input
        className="rapport-input"
        type="checkbox"
        name="rapport"
        id="rapport"
        checked={roster.rapport}
        onChange={handleChange}
      />

      <div className="island-title title">
        <img className="island-img img" src="/assets/island.png" alt="island" />
        <h2 className="island-name">Adventure Island</h2>
      </div>
      <input
        className="island-input"
        type="checkbox"
        name="island"
        id="island"
        checked={roster.island}
        onChange={handleChange}
      />

      <div className="chaosGate-title title">
        <img
          className="chaosGate-img img"
          src="/assets/chaos-gate.png"
          alt="chaosGate"
        />
        <h2 className="chaosGate-name">Chaos Gate</h2>
      </div>
      <input
        className="chaosGate-input"
        type="checkbox"
        name="chaosGate"
        id="chaosGate"
        checked={roster.chaosGate}
        onChange={handleChange}
      />

      <div className="fieldBoss-title title">
        <img
          className="fieldBoss-img img"
          src="/assets/field-boss.png"
          alt="fieldBoss"
        />
        <h2 className="fieldBoss-name">Field Boss</h2>
      </div>
      <input
        className="fieldBoss-input"
        type="checkbox"
        name="fieldBoss"
        id="fieldBoss"
        checked={roster.fieldBoss}
        onChange={handleChange}
      />

      <div className="ghostShip-title title">
        <img
          className="ghostShip-img img"
          src="/assets/ghost-ship.png"
          alt="ghostShip"
        />
        <h2 className="ghostShip-name">Ghost Ship</h2>
      </div>
      <input
        className="ghostShip-input"
        type="checkbox"
        name="ghostShip"
        id="ghostShip"
        checked={roster.ghostShip}
        onChange={handleChange}
      />
    </div>
  );
}

export default RosterChecklist;
