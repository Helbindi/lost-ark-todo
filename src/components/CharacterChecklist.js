import React, { useState, useEffect, useRef } from "react";
import Character from "./Character";
import "../index.css";
import MissingPrompt from "./MissingPrompt";

function CharacterChecklist() {
  const [defaultData, setDefaultData] = useState({
    name: "default",
    subclass: "default",
    // daily
    daily: {
      dailyAll: false,
      chaosDungeon: false,
      guardianRaid: false,
      unaDaily: false,
      guildDaily: false,
    },
    // weekly
    weekly: {
      weeklyAll: false,
      abyssDungeon: false,
      argosRaid: false,
      valtanRaid: false,
      vykasRaid: false,
      kakulRaid: false,
      unaWeekly: false,
      pirateWeekly: false,
      guildWeekly: false,
    },
  });
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
    subclass: "arcanist",
  });

  let characterRef = useRef([]);

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    // add or update the local storage whenver a new character is created
    checkEmpty();
    characterRef.current = characters;
    localStorage.setItem("characters", JSON.stringify(characters));
    updateCharacters();
  }, [characters]);

  useEffect(() => {
    // compare local storage data with default data state for any differences. Update local storage if so.
    checkDefault();
  }, []);

  function checkDefault() {
    const localData = JSON.parse(localStorage.getItem("characters"));

    for (const obj of localData) {
      const objProp = Object.keys(obj);
      const objDefault = Object.keys(defaultData);
      const dailyProp = Object.keys(obj.daily);
      const dailyDefault = Object.keys(defaultData.daily);
      const weeklyProp = Object.keys(obj.weekly);
      const weeklyDefault = Object.keys(defaultData.weekly);

      objDefault.forEach((item) => {
        if (!objProp.includes(item)) {
          obj[item] = false;
        }
      });

      dailyDefault.forEach((item) => {
        if (!dailyProp.includes(item)) {
          obj.daily[item] = false;
        }
      });

      weeklyDefault.forEach((item) => {
        if (!weeklyProp.includes(item)) {
          obj.weekly[item] = false;
        }
      });
    }
    setCharacters(localData);
  }

  function updateCharacters() {
    const localData = JSON.parse(localStorage.getItem("characters"));
    setCharacters(localData);
  }

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
      ...defaultData,
      name: inputs.name,
      subclass: inputs.subclass,
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

  const handleReset = (e) => {
    const type = e.target.getAttribute("reset-type");
    if (type === "daily") {
      const daily = {
        dailyAll: false,
        chaosDungeon: false,
        guardianRaid: false,
        unaDaily: false,
        guildDaily: false,
      };
    } else {
      const weekly = {
        weeklyAll: false,
        abyssDungeon: false,
        argosRaid: false,
        valtanRaid: false,
        vykasRaid: false,
        kakulRaid: false,
        unaWeekly: false,
        pirateWeekly: false,
        guildWeekly: false,
      };
    }
  };

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
          <option value="arcanist">Arcanist</option>
          <option value="artist">Artist</option>
          <option value="artillerist">Artillerist</option>
          <option value="bard">Bard</option>
          <option value="berserker">Berserker</option>
          <option value="deadeye">Deadeye</option>
          <option value="deathblade">Deathblade</option>
          <option value="destroyer">Destroyer</option>
          <option value="glaivier">Glaivier</option>
          <option value="gunlancer">Gunlancer</option>
          <option value="gunslinger">Gunslinger</option>
          <option value="machinist">Machinist</option>
          <option value="paladin">Paladin</option>
          <option value="reaper">Reaper</option>
          <option value="scrapper">Scrapper</option>
          <option value="shadowhunter">Shadowhunter</option>
          <option value="sharpshooter">Sharpshooter</option>
          <option value="sorceress">Sorceress</option>
          <option value="soulfist">Soulfist</option>
          <option value="striker">Striker</option>
          <option value="summoner">Summoner</option>
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
                    src="https://firebasestorage.googleapis.com/v0/b/ninohuh-d7b3c.appspot.com/o/mokoGood.png?alt=media"
                    alt="mokoGood"
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr id="daily-row" task-type="daily">
                <td>
                  <th className="row-header reset-type" scope="row">
                    Daily
                    {/* <button
                      className="reset-btn"
                      reset-type="daily"
                      onClick={handleReset}
                    >
                      Reset
                    </button> */}
                  </th>
                </td>
              </tr>
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

              <tr id="guild-daily-row" task-type="daily">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/guild-icon.png"
                    alt=""
                  />
                  Guild Log-in
                </th>
              </tr>

              <tr id="weekly-row" task-type="weekly">
                <td>
                  <th className="row-header reset-type" scope="row">
                    Weekly
                    {/* <button
                      className="reset-btn"
                      reset-type="weekly"
                      onClick={handleReset}
                    >
                      Reset
                    </button> */}
                  </th>
                </td>
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
                  Argos
                </th>
              </tr>
              <tr id="legion-valtan-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/legion-raid-icon.png"
                    alt=""
                  />
                  Valtan
                </th>
              </tr>
              <tr id="legion-vykas-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/legion-raid-icon.png"
                    alt=""
                  />
                  Vykas
                </th>
              </tr>
              <tr id="legion-kakul-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/legion-raid-icon.png"
                    alt=""
                  />
                  Kakul-Saydon
                </th>
              </tr>
              <tr id="legion-brel-row" task-type="weekly">
                <th className="row-header" scope="row">
                  <img
                    className="row-img img"
                    src="/assets/legion-raid-icon.png"
                    alt=""
                  />
                  Brelshaza
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
              updateCharacters={updateCharacters}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterChecklist;
