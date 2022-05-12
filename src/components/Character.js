import React, { useState, useRef } from "react";
import { useEffect } from "react";

function Character({ data, handleDelete }) {
  const [todo, setTodo] = useState(data);
  let todoRef = useRef(data);

  // Append to Table - **Note: empty dependency in useEffect will render twice
  useEffect(() => {
    // check if the column already exists
    const exist = document.getElementById(todo.name);
    if (!exist) {
      // Create table column for specific character
      createHeader(todo.name, todo.subclass);
      createRowCell(todo.CD, "chaos-dungeon", todo.name);
      createRowCell(todo.GR, "guardian-raid", todo.name);
      createRowCell(todo.unaDaily, "una-daily", todo.name);
      createRowCell(todo.AD, "abyss-dungeon", todo.name);
      createRowCell(todo.AR, "abyss-raid", todo.name);
      createRowCell(todo.unaWeekly, "una-weekly", todo.name);
      createRowCell(todo.pirate, "pirate-weekly", todo.name);
      createRowCell(todo.guild, "guild-weekly", todo.name);
    }
  }, []);

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

  function createRowCell(value, type, name) {
    const cd_row = document.getElementById("chaos-dungeon-row");
    const gr_row = document.getElementById("guardian-raid-row");
    const unaD_row = document.getElementById("una-daily-row");
    const ad_row = document.getElementById("abyss-dungeon-row");
    const ar_row = document.getElementById("abyss-raid-row");
    const unaW_row = document.getElementById("una-weekly-row");
    const pirate_row = document.getElementById("pirate-weekly-row");
    const guild_row = document.getElementById("guild-weekly-row");
    const newCell = document.createElement("td");
    newCell.id = name;

    // Append Data Cells to Specific Rows
    switch (type) {
      case "chaos-dungeon": {
        newCell.classList.add(`${type}-cell`);
        const input = checkedInput(type, value, name);

        newCell.append(input);
        cd_row.append(newCell);
        break;
      }
      case "guardian-raid": {
        newCell.classList.add(`${type}-cell`);
        const input = checkedInput(type, value, name);

        newCell.append(input);
        gr_row.append(newCell);
        break;
      }
      case "una-daily": {
        newCell.classList.add(`${type}-cell`);
        const input = checkedInput(type, value, name);

        newCell.append(input);
        unaD_row.append(newCell);
        break;
      }
      case "abyss-dungeon": {
        newCell.classList.add(`${type}-cell`);
        const input = checkedInput(type, value, name);
        newCell.append(input);
        ad_row.append(newCell);
        break;
      }
      case "abyss-raid": {
        newCell.classList.add(`${type}-cell`);
        const input = checkedInput(type, value, name);

        newCell.append(input);
        ar_row.append(newCell);
        break;
      }
      case "una-weekly": {
        newCell.classList.add(`${type}-cell`);
        const input = checkedInput(type, value, name);

        newCell.append(input);
        unaW_row.append(newCell);
        break;
      }
      case "pirate-weekly": {
        newCell.classList.add(`${type}-cell`);
        const input = checkedInput(type, value, name);

        newCell.append(input);
        pirate_row.append(newCell);
        break;
      }
      case "guild-weekly": {
        newCell.classList.add(`${type}-cell`);
        const input = checkedInput(type, value, name);

        newCell.append(input);
        guild_row.append(newCell);
        break;
      }
      default:
        return;
    }
  }

  function checkedInput(type, value, name) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = type;
    input.id = name;
    input.checked = value;
    input.onchange = handleChange;

    return input;
  }

  // Handle changes when User checks/unchecks boxes
  const handleChange = (e) => {
    const { name } = e.target;
    switch (name) {
      case "chaos-dungeon":
        toggleCD();
        break;
      case "guardian-raid":
        toggleGR();
        break;
      case "abyss-dungeon":
        toggleAD();
        break;
      case "abyss-raid":
        toggleAR();
        break;
      case "una-daily":
        toggleUnaDaily();
        break;
      case "una-weekly":
        toggleUnaWeekly();
        break;
      case "pirate-weekly":
        togglePirate();
        break;
      case "guild-weekly":
        toggleGuild();
        break;
      default:
        return;
    }
  };

  const toggleCD = () => {
    // Get current ref for todo State
    const prevTodo = todoRef.current;
    // Create new todo Object using ref
    const updateTodo = { ...prevTodo, CD: !prevTodo.CD };
    // Update ref and todo state with new Object
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleGR = () => {
    const prevTodo = todoRef.current;
    const updateTodo = { ...prevTodo, GR: !prevTodo.GR };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleAD = () => {
    const prevTodo = todoRef.current;
    const updateTodo = { ...prevTodo, AD: !prevTodo.AD };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleAR = () => {
    const prevTodo = todoRef.current;
    const updateTodo = { ...prevTodo, AR: !prevTodo.AR };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleUnaDaily = () => {
    const prevTodo = todoRef.current;
    const updateTodo = { ...prevTodo, unaDaily: !prevTodo.unaDaily };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleUnaWeekly = () => {
    const prevTodo = todoRef.current;
    const updateTodo = { ...prevTodo, unaWeekly: !prevTodo.unaWeekly };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const togglePirate = () => {
    const prevTodo = todoRef.current;
    const updateTodo = { ...prevTodo, pirate: !prevTodo.pirate };
    todoRef.current = updateTodo;
    setTodo(updateTodo);
  };

  const toggleGuild = () => {
    const prevTodo = todoRef.current;
    const updateTodo = { ...prevTodo, guild: !prevTodo.guild };
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
