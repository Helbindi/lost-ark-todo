import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "../index.css";

function Character({ data, handleDelete }) {
  const [todo, setTodo] = useState(data);
  let todoRef = useRef(data);

  // Append to Table - **Note: empty dependency in useEffect will render twice
  useEffect(() => {
    // check if the column already exists
    const exist = document.getElementById(todo.name);
    if (!exist) {
      // Create table column for specific character
      createColumn();
    } else {
      updateColumn();
    }
  }, [todo]);

  function updateColumn() {
    console.log("update column " + todo.name);
    const col = document.getElementsByTagName("input");
    let inputs = [];
    for (let item of col) {
      if (item.id === todo.name) {
        inputs.push(item);
      }
    }

    for (let input of inputs) {
      const reset = input.getAttribute("reset-type");
      if (reset === "daily") {
        if (todo.daily.hasOwnProperty(input.name)) {
          input.checked = todo.daily[input.name];
        }
      }

      if (reset === "weekly") {
        if (todo.weekly.hasOwnProperty(input.name)) {
          input.checked = todo.weekly[input.name];
        }
      }
    }
  }

  function createColumn() {
    createHeader(todo.name, todo.subclass);
    createRowCell(todo.daily.dailyAll, "dailyAll", todo.name, "daily");
    createRowCell(todo.daily.chaosDungeon, "chaosDungeon", todo.name, "daily");
    createRowCell(todo.daily.guardianRaid, "guardianRaid", todo.name, "daily");
    createRowCell(todo.daily.unaDaily, "unaDaily", todo.name, "daily");
    createRowCell(todo.daily.guildDaily, "guildDaily", todo.name, "daily");
    createRowCell(todo.weekly.weeklyAll, "weeklyAll", todo.name, "weekly");
    createRowCell(
      todo.weekly.abyssDungeon,
      "abyssDungeon",
      todo.name,
      "weekly"
    );
    createRowCell(todo.weekly.abyssRaid, "abyssRaid", todo.name, "weekly");
    createRowCell(todo.weekly.unaWeekly, "unaWeekly", todo.name, "weekly");
    createRowCell(
      todo.weekly.pirateWeekly,
      "pirateWeekly",
      todo.name,
      "weekly"
    );
    createRowCell(todo.weekly.guildWeekly, "guildWeekly", todo.name, "weekly");
  }

  function createHeader(name, subclass) {
    const headers = document.getElementById("table-col");
    const headerName = document.createElement("h2");
    const newHeader = document.createElement("th");
    const close = document.createElement("button");
    const img = document.createElement("img");

    // Create Elements for Column Header
    headerName.textContent = name;
    headerName.classList.add("header-name");
    newHeader.classList.add("character-header");
    newHeader.id = name;
    newHeader.style.backgroundColor = "hsl(0, 0%, 0%, 0.7)";
    img.classList.add("header-img");
    img.classList.add("img");
    img.src = `/assets/subclass/${subclass}.png`;
    img.alt = subclass;

    // Create Close/Delete Button
    close.id = name;
    close.onclick = handleDelete;
    close.textContent = "X";
    close.classList.add("close-btn");
    newHeader.append(close);

    // Append all new Elements
    newHeader.append(img);
    newHeader.append(headerName);
    headers.append(newHeader);
  }

  function createRowCell(value, type, name, reset) {
    const daily_row = document.getElementById("daily-row");
    const cd_row = document.getElementById("chaos-dungeon-row");
    const gr_row = document.getElementById("guardian-raid-row");
    const unaD_row = document.getElementById("una-daily-row");
    const guildD_row = document.getElementById("guild-daily-row");
    const weekly_row = document.getElementById("weekly-row");
    const ad_row = document.getElementById("abyss-dungeon-row");
    const ar_row = document.getElementById("abyss-raid-row");
    const unaW_row = document.getElementById("una-weekly-row");
    const pirate_row = document.getElementById("pirate-weekly-row");
    const guildW_row = document.getElementById("guild-weekly-row");
    const newCell = document.createElement("td");
    newCell.id = name;

    // Append Data Cells to Specific Rows
    switch (type) {
      case "dailyAll": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "daily");
        const input = checkedInput(type, value, name, reset);

        const div = document.createElement("div");
        div.className = "toggle-all";
        const p = document.createElement("p");
        p.textContent = "Toggle All";
        div.append(p);
        div.append(input);
        newCell.append(div);
        daily_row.append(newCell);
        break;
      }
      case "weeklyAll": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "weekly");
        const input = checkedInput(type, value, name, reset);

        const div = document.createElement("div");
        div.className = "toggle-all";
        const p = document.createElement("p");
        p.textContent = "Toggle All";
        div.append(p);
        div.append(input);
        newCell.append(div);
        weekly_row.append(newCell);
        break;
      }
      case "chaosDungeon": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "daily");
        const input = checkedInput(type, value, name, reset);

        newCell.append(input);
        cd_row.append(newCell);
        break;
      }
      case "guardianRaid": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "daily");
        const input = checkedInput(type, value, name, reset);

        newCell.append(input);
        gr_row.append(newCell);
        break;
      }
      case "unaDaily": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "daily");
        const input = checkedInput(type, value, name, reset);

        newCell.append(input);
        unaD_row.append(newCell);
        break;
      }
      case "guildDaily": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "daily");
        const input = checkedInput(type, value, name, reset);

        newCell.append(input);
        guildD_row.append(newCell);
        break;
      }
      case "abyssDungeon": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "weekly");
        const input = checkedInput(type, value, name, reset);
        newCell.append(input);
        ad_row.append(newCell);
        break;
      }
      case "abyssRaid": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "weekly");
        const input = checkedInput(type, value, name, reset);

        newCell.append(input);
        ar_row.append(newCell);
        break;
      }
      case "unaWeekly": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "weekly");
        const input = checkedInput(type, value, name, reset);

        newCell.append(input);
        unaW_row.append(newCell);
        break;
      }
      case "pirateWeekly": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "weekly");
        const input = checkedInput(type, value, name, reset);

        newCell.append(input);
        pirate_row.append(newCell);
        break;
      }
      case "guildWeekly": {
        newCell.classList.add(`${type}-cell`);
        newCell.setAttribute("cell-type", "weekly");
        const input = checkedInput(type, value, name, reset);

        newCell.append(input);
        guildW_row.append(newCell);
        break;
      }
      default:
        return;
    }
  }

  function checkedInput(type, value, name, reset) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = type;
    input.id = name;
    input.setAttribute("reset-type", reset);
    input.defaultChecked = value;
    input.onchange = handleChange;

    return input;
  }

  // Handle changes when User checks/unchecks boxes
  const handleChange = (e) => {
    const { name } = e.target;
    switch (name) {
      case "dailyAll":
        toggleDaily();
        break;
      case "weeklyAll":
        toggleWeekly();
        break;
      case "chaosDungeon":
        toggleCD();
        break;
      case "guardianRaid":
        toggleGR();
        break;
      case "abyssDungeon":
        toggleAD();
        break;
      case "abyssRaid":
        toggleAR();
        break;
      case "unaDaily":
        toggleUnaDaily();
        break;
      case "guildDaily":
        toggleGuildDaily();
        break;
      case "unaWeekly":
        toggleUnaWeekly();
        break;
      case "pirateWeekly":
        togglePirate();
        break;
      case "guildWeekly":
        toggleGuildWeekly();
        break;
      default:
        return;
    }
  };

  const toggleDaily = () => {
    const prevTodo = todoRef.current;
    const reset = {
      dailyAll: !prevTodo.daily.dailyAll,
      chaosDungeon: !prevTodo.daily.dailyAll,
      guardianRaid: !prevTodo.daily.dailyAll,
      unaDaily: !prevTodo.daily.dailyAll,
      guildDaily: !prevTodo.daily.dailyAll,
    };
    const updateAll = { ...prevTodo, daily: reset };

    todoRef.current = updateAll;
    setTodo(updateAll);
  };

  const toggleWeekly = () => {
    const prevTodo = todoRef.current;
    const reset = {
      weeklyAll: !prevTodo.weekly.weeklyAll,
      abyssDungeon: !prevTodo.weekly.weeklyAll,
      abyssRaid: !prevTodo.weekly.weeklyAll,
      unaWeekly: !prevTodo.weekly.weeklyAll,
      pirateWeekly: !prevTodo.weekly.weeklyAll,
      guildWeekly: !prevTodo.weekly.weeklyAll,
    };
    const updateAll = { ...prevTodo, weekly: reset };

    todoRef.current = updateAll;
    setTodo(updateAll);
  };

  const toggleCD = () => {
    // Get current ref for todo State
    const prevTodo = todoRef.current;
    // Create new todo Object using ref
    const daily = {
      ...prevTodo.daily,
      chaosDungeon: !prevTodo.daily.chaosDungeon,
    };
    const updateTodo = { ...prevTodo, daily: daily };
    // Update ref and todo state with new Object
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleGR = () => {
    const prevTodo = todoRef.current;
    const daily = {
      ...prevTodo.daily,
      guardianRaid: !prevTodo.daily.guardianRaid,
    };
    const updateTodo = { ...prevTodo, daily: daily };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleAD = () => {
    const prevTodo = todoRef.current;
    const weekly = {
      ...prevTodo.daily,
      abyssDungeon: !prevTodo.weekly.abyssDungeon,
    };
    const updateTodo = { ...prevTodo, weekly: weekly };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleAR = () => {
    const prevTodo = todoRef.current;
    const weekly = { ...prevTodo.daily, abyssRaid: !prevTodo.weekly.abyssRaid };
    const updateTodo = { ...prevTodo, weekly: weekly };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleUnaDaily = () => {
    const prevTodo = todoRef.current;
    const daily = { ...prevTodo.daily, unaDaily: !prevTodo.daily.unaDaily };
    const updateTodo = { ...prevTodo, daily: daily };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleUnaWeekly = () => {
    const prevTodo = todoRef.current;
    const weekly = { ...prevTodo.daily, unaWeekly: !prevTodo.weekly.unaWeekly };
    const updateTodo = { ...prevTodo, weekly: weekly };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const togglePirate = () => {
    const prevTodo = todoRef.current;
    const weekly = {
      ...prevTodo.daily,
      pirateWeekly: !prevTodo.weekly.pirateWeekly,
    };
    const updateTodo = { ...prevTodo, weekly: weekly };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleGuildDaily = () => {
    const prevTodo = todoRef.current;
    const daily = { ...prevTodo.daily, guildDaily: !prevTodo.daily.guildDaily };
    const updateTodo = { ...prevTodo, daily: daily };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleGuildWeekly = () => {
    const prevTodo = todoRef.current;
    const weekly = {
      ...prevTodo.daily,
      guildWeekly: !prevTodo.weekly.guildWeekly,
    };
    const updateTodo = { ...prevTodo, weekly: weekly };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  // Update the local storage on State change
  function updateLocalStorage() {
    const characters = JSON.parse(localStorage.getItem("characters"));
    const updated = characters.map((character) =>
      character.name === todo.name ? { ...character, ...todo } : character
    );
    localStorage.setItem("characters", JSON.stringify(updated));
  }

  useEffect(() => {
    updateLocalStorage();
  }, [todo]);
}

export default Character;
