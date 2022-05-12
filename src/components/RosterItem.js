import React, { useState } from "react";
import { useEffect } from "react";

function RosterItem({ data }) {
  const [todo, setTodo] = useState(data);

  // Append to Table - **Note: empty dependency in useEffect will render twice
  useEffect(() => {
    // check if the column already exists
    const exist = document.getElementsByTagName();
    if (!exist) {
      console.log(`created new column ${todo.name}`);
      // Create table column for specific character
      createHeader(todo.name, todo.subclass);
      createRowCell(todo.CD, "chaos-dungeon", todo.name);
      createRowCell(todo.GR, "guardian-raid", todo.name);
      createRowCell(todo.unaDaily, "una-daily", todo.name);
      createRowCell(todo.AD, "abyss-dungeon", todo.name);
      createRowCell(todo.AR, "abyss-raid", todo.name);
      createRowCell(todo.unaWeekly, "una-weekly", todo.name);
    }
  }, []);

  function createHeader(name) {
    const headers = document.getElementById("table-col");
    const headerName = document.createElement("h2");
    const newHeader = document.createElement("th");

    // Create Elements for Column Header
    headerName.textContent = name;
    headerName.classList.add("header-name");
    newHeader.classList.add("character-header");
    newHeader.id = name;
    newHeader.style.backgroundColor = "hsl(0, 0%, 0%, 0.7)";

    // Append all new Elements
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
  const handleChange = (e) => {};

  // Update the local storage on State change
  async function updateLocalStorage() {
    localStorage.setItem("roster", JSON.stringify(todo));
  }

  useEffect(() => {
    updateLocalStorage();
  }, [todo]);
}

export default RosterItem;
