import React from "react";
import "../index.css";

function TodoItem({ todo, handleChange }) {
  return (
    <div className="todo-list" id={todo.name}>
      <img src="/assets/scrapper-icon.png" alt="" />
      <h2 className="todo-header">{todo.name}</h2>

      <div className="todo-group">
        <label htmlFor="chaos-dungeon">
          <img src="/assets/chaos-dungeon-icon.png" alt="" />
          <input
            type="checkbox"
            name="chaos-dungeon"
            id="chaos-dungeon"
            checked={todo.CD}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="guardian-raid">
          <img src="/assets/guardian-raid-icon.png" alt="" />
          <input
            type="checkbox"
            name="guardian-raid"
            id="guardian-raid"
            checked={todo.GR}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="una-daily">
          <img src="/assets/una-daily-icon.png" alt="" />
          <input
            type="checkbox"
            name="una-daily"
            id="una-daily"
            checked={todo.unaDaily}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="abyss-dungeon">
          <img src="/assets/abyss-dungeon-icon.png" alt="" />
          <input
            type="checkbox"
            name="abyss-dungeon"
            id="abyss-dungeon"
            checked={todo.AD}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="abyss-raid">
          <img src="/assets/abyss-raid-icon.png" alt="" />
          <input
            type="checkbox"
            name="abyss-raid"
            id="abyss-raid"
            checked={todo.AR}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="una-weekly">
          <img src="/assets/una-weekly-icon.png" alt="" />
          <input
            type="checkbox"
            name="una-weekly"
            id="una-weekly"
            checked={todo.unaWeekly}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default TodoItem;
