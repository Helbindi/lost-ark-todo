import React, { useState, useEffect, useRef } from "react";
import Character from "./Character";
import "../index.css";
import MissingPrompt from "./MissingPrompt";

function CharacterChecklist() {
  const [characters, setCharacters] = useState(() => {
    // Check if there are any local stored character data
    const localData = localStorage.getItem("characters");
    if (localData) {
      return JSON.parse(localData);
    } else {
      return [];
    }
  });
  const [inputs, setInputs] = useState({
    name: "",
    subclass: "artillerist",
  });

  let characterRef = useRef([]);

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    // add or update the local storage whenver a new character is created
    checkEmpty();
    characterRef.current = characters;
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  function checkEmpty() {
    characters.length === 0 ? setEmpty(true) : setEmpty(false);
  }

  function handleSubClass(e) {
    setInputs({ ...inputs, subclass: e.target.value });
  }

  function handleInput(e) {
    setInputs({ ...inputs, name: e.target.value });
  }

  function handleSubmit(e) {
    // create new character object
    const newCharacter = {
      name: inputs.name,
      subclass: inputs.subclass,
      // daily
      CD: false,
      GR: false,
      unaDaily: false,
      // weekly
      AD: false,
      AR: false,
      unaWeekly: false,
      pirate: false,
      guild: false,
    };

    let exists = false;
    characters.forEach((character) => {
      if (character.name === newCharacter.name) {
        exists = true;
      }
    });

    // update the state with new character
    if (exists) {
      e.preventDefault();
      alert("This character already exists...");
    } else {
      checkEmpty();
      setCharacters([...characters, newCharacter]);
      setInputs({ name: "", subclass: "artillerist" });
    }
  }

  function handleDelete(e) {
    const name = e.target.id;

    // Filter the character state of the delete item
    const prevRef = characterRef.current;
    const update = prevRef.filter((character) => character.name !== name);

    // Update characters State
    characterRef.current = update;
    setCharacters(update);

    // Remove the elements from the page
    const delCol = document.querySelectorAll("td");
    const delHeader = document.querySelectorAll("th");

    delHeader.forEach((item) => {
      if (item.id === name) {
        item.remove();
      }
    });

    delCol.forEach((item) => {
      if (item.id === name) {
        item.remove();
      }
    });

    checkEmpty();
  }

  return (
    <div className="content-container">
      <form className="form-add" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={inputs.name}
          onChange={handleInput}
          required
        />

        <label htmlFor="subclass"> Subclass: </label>
        <select
          name="subclass"
          id="subclass"
          value={inputs.subclass}
          onChange={handleSubClass}
        >
          <option value="artillerist">Artillerist</option>
          <option value="bard">Bard</option>
          <option value="berserker">Berserker</option>
          <option value="deadeye">Deadeye</option>
          <option value="deathblade">Deathblade</option>
          <option value="glaivier">Glaivier</option>
          <option value="gunlancer">Gunlancer</option>
          <option value="gunslinger">Gunslinger</option>
          <option value="paladin">Paladin</option>
          <option value="scrapper">Scrapper</option>
          <option value="shadowhunter">Shadowhunter</option>
          <option value="sharpshooter">Sharpshooter</option>
          <option value="sorceress">Sorceress</option>
          <option value="soulfist">Soulfist</option>
          <option value="striker">Striker</option>
          <option value="wardancer">Wardancer</option>
        </select>

        <input type="submit" />
      </form>

      {empty && <MissingPrompt />}

      {!empty && (
        <div className="todo-container">
          <table>
            <thead>
              <tr id="table-col">
                <th className="filler-col">
                  <img
                    className="filler-img img"
                    src="https://firebasestorage.googleapis.com/v0/b/ninohuh-d7b3c.appspot.com/o/NinoHuh.png?alt=media"
                    alt="NinoHuh"
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr id="chaos-dungeon-row" task-type="daily">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/chaos-dungeon-icon.png"
                    alt=""
                  />
                  Chaos Dungeon
                </th>
              </tr>
              <tr id="guardian-raid-row" task-type="daily">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/guardian-raid-icon.png"
                    alt=""
                  />
                  Guardian Raid
                </th>
              </tr>
              <tr id="una-daily-row" task-type="daily">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/una-daily-icon.png"
                    alt=""
                  />
                  Una Daily
                </th>
              </tr>
              <tr id="abyss-dungeon-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/abyss-dungeon-icon.png"
                    alt=""
                  />
                  Abyss Dungeon
                </th>
              </tr>
              <tr id="abyss-raid-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/abyss-raid-icon.png"
                    alt=""
                  />
                  Abyss Raid
                </th>
              </tr>
              <tr id="una-weekly-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/una-weekly-icon.png"
                    alt=""
                  />
                  Una Weekly
                </th>
              </tr>
              <tr id="pirate-weekly-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/pirate.png"
                    alt=""
                  />
                  Pirate Coin Exchange
                </th>
              </tr>
              <tr id="guild-weekly-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img className="row-img img" src="/assets/guild.png" alt="" />
                  Guild Shop
                </th>
              </tr>
            </tbody>
          </table>

          {characters.map((character, index) => (
            <Character
              data={character}
              key={index}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterChecklist;
